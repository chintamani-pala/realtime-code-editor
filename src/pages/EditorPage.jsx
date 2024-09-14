import { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const reactNavigator = useNavigate();
  const [isSocketReady, setSocketReady] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      setSocketReady(true);
      const handleError = (e) => {
        console.log("Socket error", e);
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: roomId,
        userName: location.state?.userName,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        // eslint-disable-next-line no-unused-vars
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            console.log(`${userName} joined`);
            toast.success(`${userName} joined the room.`);
          }
          setClients(clients);
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  if (!location.state?.userName || roomId == undefined) {
    return <Navigate to={"/"} />;
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID copied to clipboard");
  };

  const handleLeaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    reactNavigator("/");
  };

  return (
    <>
      <div
        className={`hamburger ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`mainWrap ${isSidebarOpen ? "sidebarOpen" : ""}`}>
        <div className={`aside ${isSidebarOpen ? "open" : ""}`}>
          <div className="asideInner">
            <div className="logo">
              <img className="logoImg" src="/code-editor-logo.png" alt="logo" />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client) => (
                <Client userName={client.userName} key={client.socketId} />
              ))}
            </div>
          </div>
          <div className="buttons">
            <button className="btn copyBtn" onClick={handleCopyRoomId}>
              Copy Room ID
            </button>
            <button className="btn leaveBtn" onClick={handleLeaveRoom}>
              Leave Room
            </button>
          </div>
        </div>
        <div className="editorWrap">
          {isSocketReady && <Editor socketRef={socketRef} roomId={roomId} />}
        </div>
      </div>
    </>
  );
};

export default EditorPage;
