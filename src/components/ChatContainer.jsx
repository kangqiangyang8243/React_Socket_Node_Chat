import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox";
import TimeAgo from "react-timeago";

function ChatContainer({ currentChatUser }) {
  const [message, setMessage] = React.useState([]);
  const [currentUser, setCurrentUser] = useState();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_USER_TOKEN)) {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
      );
      setCurrentUser(user);
      // setUsers(user.users);
    }
  }, []);

  //   console.log(currentChatUser);
  //   console.log(currentUser);

  useEffect(() => {
    if (currentUser && currentChatUser) {
      const fetchMessages = async () => {
        const res = await axios.post(
          process.env.REACT_APP_BASE_URL + "/messages/getAllMsgs",
          {
            from: currentUser._id,
            to: currentChatUser._id,
          }
        );
        setMessage(res.data);
      };
      fetchMessages();
    }
  }, [currentChatUser, currentUser]);

  const handleMessage = async (msg) => {
    //   setMessage([...message, msg]);
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "/messages/addMsg",
      {
        from: currentUser._id,
        to: currentChatUser._id,
        message: msg,
        sendDate: Date.now(),
      }
    );

    // console.log(res.data);

    setMessage([...message, res.data]);
  };

  //   console.log(message);

  return (
    <div className="w-full h-full font-serif text-white flex flex-col items-center">
      {/* header */}
      <div className="flex items-center  text-xl px-6 py-4 gap-3 shadow-[#5a64da] shadow-lg  w-full">
        <img
          src={currentChatUser?.avatarImage}
          alt="currentChatUser_avatar"
          className="w-14 h-14 shadow-md rounded-full shadow-[#5a64da]"
        />
        <div className="flex flex-col">
          <h3 className="text-xl ">{currentChatUser?.username}</h3>
          {/* <p className="text-sm text-gray-300 ">{currentChatUser?.loginDate}</p> */}
          <TimeAgo
            className="text-sm text-gray-300"
            date={currentChatUser?.loginDate}
          />
        </div>
      </div>

      {/* container */}
      <div
        //   ${message.sender === currentUser._id&&`flex  flex-col items-end`}
        className={`flex-grow flex-col items-start  h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 shadow-2xl shadow-[#5a64da] w-full px-3 py-4 `}
        // className="flex-grow w-full"
      >
        {message.map((msg) => (
          <div
            ref={scrollRef}
            key={msg._id}
            // className="w-full bg-red-100 flex flex-col items-start "
            className={`w-full items-start gap-3 flex mb-6 px-3 ${
              msg?.sender === currentUser?._id ? `flex-row-reverse` : `flex-row`
            }`}
          >
            <img
              src={
                msg?.sender === currentUser?._id
                  ? currentUser?.avatarImage
                  : currentChatUser?.avatarImage
              }
              alt="currentChatUser_avatar"
              className="w-14 h-14 shadow-md rounded-full shadow-[#5a64da]"
            />
            <div
              className={`flex flex-col ${
                msg?.sender === currentUser?._id ? `items-end` : `items-start`
              }`}
            >
              <p className=" p-2 text-lg rounded-lg my-1 shadow-lg shadow-[#5a64da]">
                {msg?.message?.text}
              </p>
              {/* <p>{DateChange(msg?.sendDate)}</p> */}
              <TimeAgo className="text-xs text-gray-300" date={msg?.sendDate} />
            </div>
          </div>
        ))}
      </div>

      {/* inputbox */}
      <InputBox handleMessage={handleMessage} />
    </div>
  );
}

export default ChatContainer;
