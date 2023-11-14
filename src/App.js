import React, { useState, useRef } from "react";
import SignUp from "./components/signUp";
import "../src/App.css";
import Cookies from "universal-cookie";
import Chat from "./components/chat.js";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import NavBar from "./components/Navbar.js"; // Import NavBar component

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return <SignUp setIsAuth={setIsAuth} />;
  }

  return (
    <div>
      {room ? (
        <Chat room={room} signOutHandler={signUserOut} />
      ) : (
        <div className="room">
          <NavBar signOutHandler={signUserOut} /> {/* Use NavBar component */}
          <div className="quick">
            <h1 className="room_tag">
              Enter a room number to join private chats instantly – share the
              same code with your chat partner!
            </h1>
          </div>
          <div className="room_enter">
            <div className="contain">
              <label htmlFor="" className="label">
                Enter Room Name
              </label>
              <input
                ref={roomInputRef}
                placeholder="Enter Room No"
                className="room_input"
              />
              <button
                className="enter_room_btn"
                onClick={() => setRoom(roomInputRef.current.value)}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
