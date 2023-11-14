import { useState, useEffect } from "react";
import "../styles/chat.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import web3 from "../images/send-message.png";
import NavBar from "./Navbar.js";

const Chat = (props) => {
  const { room, signOutHandler } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unscribe = onSnapshot(queryMessages, (Snapshot) => {
      let messages = [];
      Snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="chat">
      <NavBar signOutHandler={signOutHandler} />
      <div className="chat_room">
        <div className="chatbox">
          <h1 className="welcome">Room : {room.toUpperCase()}</h1>
          <hr className="line" />
          <div className="messages">
            {messages.map((message) => (
              <div
                className={`message ${
                  message.user === auth.currentUser.displayName
                    ? "sent"
                    : "received"
                }`}
                key={message.id}
              >
                {" "}
                <div className="user-container">
                  <p className="user">{message.user.charAt(0)}</p>
                </div>
                <div className="content-container">
                  <p className="text">{message.text}</p>
                </div>{" "}
              </div>
            ))}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="input_btn">
              <input
                type="text"
                name=""
                className="inpt"
                placeholder="Type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <button type="submit" className="send_btn">
                <img src={web3} alt="send" className="send_icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
