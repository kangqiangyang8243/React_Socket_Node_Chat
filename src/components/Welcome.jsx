import React from "react";
import Robots from "../images/robot.gif";

function Welcome({ currentUser }) {
  return (
    <div className="w-full h-full font-serif flex flex-col pb-10 items-center justify-end">
      <img src={Robots} alt="welcome" className="w-1/2 h-1/2 p-2" />
      <h2 className="text-xl">
        Welcome to FREECHAT!{" "}
        <span className="text-blue-700 text-2xl">{currentUser?.username}</span>!
      </h2>
      <p className="text-lg">Select a Friend to Start You Chatting!</p>
    </div>
  );
}

export default Welcome;
