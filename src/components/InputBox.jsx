import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

function InputBox({ handleMessage }) {
  const [messages, setMessages] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (e, emojiObject) => {
    // console.log(e.emoji);
    let msg = messages;
    msg += e.emoji;
    setMessages(msg);
    setShowEmojiPicker(false);
  };

  //   console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(messages);
    handleMessage(messages);
    setMessages("");
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-full p-4 h-[12%] flex items-center justify-between shadow-lg shadow-[#5a64da] ">
      <form
        onSubmit={handleSubmit}
        className="w-full  relative flex items-center gap-5"
      >
        <BsEmojiSmileFill
          className="w-8 h-8 cursor-pointer text-yellow-500"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        <div className="absolute bottom-10">
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>

        <input
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          type="text"
          placeholder="Input you Content..."
          autoFocus
          className="w-full p-2 rounded-lg bg-transparent focus-within:shadow-md  focus-within:shadow-[#5a64da] outline-none text-slate-200"
        />
        <button
          type="submit"
          disabled={messages.length === 0}
          className="px-4 py-2 rounded-lg disabled:cursor-not-allowed  bg-indigo-800 hover:bg-indigo-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default InputBox;
