import React, { useRef, useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = (message) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="user">
        <img
          src={
            message.message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="user"
        />
      </div>
      <p>{message.message.text}</p>
    </div>
  );
};

export default Message;
