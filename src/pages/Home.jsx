import { useState } from "react";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const createNewRoomId = (e) => {
    e.preventDefault();
    const newRoomID = uuidv4();
    console.log(newRoomID);
    setRoomId(newRoomID);
    toast.success("Created a new Room");
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("ROOM ID & UserName is required");
      return;
    }
    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div>
      <div className="homepageWrapper">
        <div className="formWrapper">
          <img src="/code-editor-logo.png" alt="logo" />
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={(e) => handleInputEnter(e)}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyUp={(e) => handleInputEnter(e)}
            />
            <button className="btn joinBtn" onClick={joinRoom}>
              JOIN
            </button>
            <span className="createInfo">
              Of you dont have an invite then create &nbsp;
              <a
                href=""
                className="createNewBtn"
                onClick={(e) => createNewRoomId(e)}
              >
                new Room
              </a>
            </span>
          </div>
        </div>
        <footer>
          <h4>
            Build with 💜 by{" "}
            <a href="https://chintamanipala.in">Chintamani pala</a>
          </h4>
        </footer>
      </div>
    </div>
  );
};

export default Home;
