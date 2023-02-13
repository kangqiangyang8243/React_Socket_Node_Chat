import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import ContactUsers from "../components/ContactUsers";
import Welcome from "../components/Welcome";
import { io } from "socket.io-client";

function ChatPage() {
  const socketRef = useRef(null);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState();
  const [currentChatUser, setCurrentChatUser] = useState();
  const [openSwitch, setopenSwitch] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_USER_TOKEN)) {
      navigate("/login");
    } else {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
      );
      setCurrentUser(user);
      // setUsers(user.users);
    }
  }, []);

  // console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(process.env.REACT_APP_SOCKET_API);
      socketRef.current.emit("add_user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + `/users/${currentUser._id}`
        );
        // console.log(res);
        setUsers(res.data);
      };
      fetchUsers();
    }
  }, [currentUser]);

  // console.log(users);

  const changeCurrentChatUser = (user) => {
    setCurrentChatUser(user);
  };

  // console.log(currentChatUser);

  return (
    <div className="max-w-7xl mx-auto w-full flex items-center justify-center ">
      <div className="w-[100%] h-[100%] m-10 bg-[#16151c] grid grid-flow-col grid-cols-3">
        {/* left */}
        <div className="md:hidden lg:col-span-1 col-span-4">
          {openSwitch ? (
            <>
              {currentChatUser === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatContainer
                  currentChatUser={currentChatUser}
                  socketRef={socketRef}
                  setOpenSwitch={setopenSwitch}
                  openSwitch={openSwitch}
                />
              )}
            </>
          ) : (
            <ContactUsers
              users={users}
              currentUser={currentUser}
              changeCurrentChatUser={changeCurrentChatUser}
              setOpenSwitch={setopenSwitch}
              openSwitch={openSwitch}
            />
          )}
        </div>

        <div className="hidden md:inline lg:col-span-1 col-span-4">
          <ContactUsers
            users={users}
            currentUser={currentUser}
            changeCurrentChatUser={changeCurrentChatUser}
            setOpenSwitch={setopenSwitch}
            openSwitch={openSwitch}
          />
        </div>

        {/* right */}

        <div className=" text-white hidden md:inline col-span-3 shadow-xl shadow-[#5a64da] ">
          {currentChatUser === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChatUser={currentChatUser}
              socketRef={socketRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
