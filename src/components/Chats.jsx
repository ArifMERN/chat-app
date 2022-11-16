import { onSnapshot, doc } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [Chats, setChats] = useState([]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    console.log(user);
  };
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  // console.log(chat[1].lastMessage);
  return (
    <div className="userContainer">
      <div className="userWrapper">
        {Object.entries(Chats).map((chat) => {
          return (
            <div
              className="user"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="user" />
              <div className="userDetails">
                <span className="name">{chat[1].userInfo.displayName}</span>
                <span className="message">{chat[1].lastMessage}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
