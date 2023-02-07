import React from "react";
import loader from "../images/loader.gif";

function Loading() {
  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <img src={loader} alt="loader" className="loader" />
    </div>
  );
}

export default Loading;
