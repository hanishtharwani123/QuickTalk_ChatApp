import React from "react";

const NavBar = ({ signOutHandler }) => {
  return (
    <div className="navlin">
      <h1 className="logo_name1">QuickTalk</h1>
      <button className="sign_out" onClick={signOutHandler}>
        Sign Out
      </button>
    </div>
  );
};

export default NavBar;
