import React from "react";
import { useContext } from "react";
import { IoIosVideocam } from "react-icons/io";
import { ChatContext } from "../context/ChatContext";
const ChatHeader = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatHeader">
      <div className="user">
        <img src={data.user.photoURL} alt="user" />
        <p>{data.user?.displayName}</p>
      </div>
      <div className="connectivity">
        <span>
          <IoIosVideocam />
        </span>
        <span>add</span>
        <span>more</span>
      </div>
    </div>
  );
};

export default ChatHeader;
