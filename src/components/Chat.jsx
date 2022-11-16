import React from "react";
import ChatHeader from "./ChatHeader";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
