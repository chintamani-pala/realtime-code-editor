import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/editor/:roomId"} element={<EditorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
