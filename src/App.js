import { useState, useRef } from "react";
import "./style.scss";
import { Auth } from "./components/auth";
import Cookie from "universal-cookie";
import { Chat } from "./components/chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
const cookies = new Cookie();

function App() {
  const [test, setTest] = useState(cookies.get("authToken"));
  const [room, setRoom] = useState(null);
  const roomRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("authToken");
    setTest(false);
    setRoom(null);
  };

  if (!test) {
    return (
      <div className="App">
        <Auth setTest={setTest} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <div className="chatdiv">
          <div className="topContainer">
            <h1>ChatConnect</h1>
            <div className="roomDetails">
              <p>Room: {room.toUpperCase()}</p>
              <div className="userAndBtn">
                <div className="userName">
                  <img src={auth.currentUser.photoURL} alt="profilePic" />
                  <span>{auth.currentUser.displayName}</span>
                </div>
                <div className="signout">
                  <button className="signoutBtn" onClick={signUserOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="middleContainer">
            <Chat room={room} />
          </div>
        </div>
      ) : (
        <div className="roomContainer">
          <div className="roomItems">
            <label>Enter Room name: </label>
            <input
              type="text"
              placeholder="Type Room name: "
              ref={roomRef}
              onKeyUp={(e) =>
                e.key === "Enter" &&
                setRoom(roomRef.current.value !== "" && roomRef.current.value)
              }
            />
            <button
              onClick={() =>
                setRoom(roomRef.current.value !== "" && roomRef.current.value)
              }
            >
              Enter
            </button>
            <div className="signout">
              <button className="signoutBtn" onClick={signUserOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
