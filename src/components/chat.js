import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const Chat = (props) => {
  const { room } = props;
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const msgRef = collection(db, "messages");
  const today = new Date();
  const timestamp = today.toLocaleTimeString("en-us");
  const realtime = timestamp.replace(/:\d+ /, " ");

  useEffect(() => {
    const queryMsgs = query(
      msgRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMsgs, (snapshot) => {
      let messages = [];
      snapshot.forEach((item) => {
        messages.push({ ...item.data(), id: item.id });
      });
      setMsgs(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (msg !== "") {
      return addDoc(msgRef, {
        message: msg,
        createdAt: serverTimestamp(),
        time: realtime,
        name: auth.currentUser.displayName,
        profilePic: auth.currentUser.photoURL,
        room,
      }).then(() => {
        setMsg("");
      });
    }
  };
  return (
    <div className="middleDiv">
      <div className="messages">
        {msgs.map((items) => (
          <div
            className={
              items.name === auth.currentUser.displayName
                ? "nameAndMsg owner"
                : "nameAndMsg"
            }
          >
            <div className="imgTime">
              <img src={items.profilePic} alt="profilepic" />
              <span>{items.time}</span>
            </div>
            <div className="uNameMsg">
              <span className="userName">{items.name} </span>
              <span className="userMsg">{items.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bottomContainer">
        <form className="chatForm" onSubmit={handleForm}>
          <input
            type="text"
            className="inputForm"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit" className="sendBtn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
