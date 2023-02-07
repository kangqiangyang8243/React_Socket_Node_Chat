import React, { useState } from "react";
import Logo from "../images/logo.svg";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ContactUsers({ users, currentUser, changeCurrentChatUser }) {
  const [currentSelected, setCurrentSelected] = useState();
  const navigate = useNavigate();
  //   console.log(users);
  const changeCurrentChat = (index, user) => {
    setCurrentSelected(index);
    // click different user and change current chat user to the user you select
    changeCurrentChatUser(user);
  };

  const LogoutBtn = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("You Have Been Logged out!");
  };
  return (
    <div className="w-full h-full font-serif text-white flex flex-col items-center">
      {/* top */}
      <div className="flex items-center justify-center text-xl py-4 gap-2 shadow-[#5a64da] shadow-lg  w-full">
        <img src={Logo} alt="logo" className="w-14 h-14 " />
        <h1>FREECHAT</h1>
      </div>

      {/* middle */}
      <div className="flex-grow h-[500px] overflow-y-scroll flex flex-col gap-5 scrollbar-thin scrollbar-thumb-gray-700 shadow-2xl shadow-[#5a64da] w-full p-4">
        {users?.map((user, index) => (
          <div
            onClick={() => changeCurrentChat(index, user)}
            key={user?._id}
            className={`flex items-center gap-3 bg-gray-700 cursor-pointer hover:bg-purple-600 transform duration-100 ease-linear p-2 rounded-lg shadow-sm shadow-[#5a64da] ${
              currentSelected !== undefined && `bg-purple-600`
            }`}
          >
            <img
              src={user?.avatarImage}
              alt="currentUser_avatar"
              className="w-14 h-14 shadow-md rounded-full shadow-[#5a64da]"
            />
            <h3 className="text-xl ">{user?.username}</h3>
          </div>
        ))}
      </div>

      {/* bottom */}
      <div className="w-full p-4 h-[12%] flex items-center justify-between shadow-lg shadow-[#5a64da] ">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatarImage}
            alt="currentUser_avatar"
            className="w-14 h-14 shadow-md rounded-full shadow-[#5a64da]"
          />
          <h3 className="text-2xl ">{currentUser?.username}</h3>
        </div>

        <button
          onClick={LogoutBtn}
          className="bg-blue-900 rounded-lg  hover:bg-blue-600 cursor-pointer shadow-sm  shadow-[#5a64da] active:shadow-md active:shadow-[#5a64da]"
        >
          <BiPowerOff className="w-7 h-7 " />
        </button>
      </div>
    </div>
  );
}

export default ContactUsers;
