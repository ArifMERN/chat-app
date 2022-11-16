import React from "react";
import { useContext, useState } from "react";
import { IoIosAttach, IoIosImage } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuid } from "uuid";
const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      // update the latest message to currentUser
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: text,
        [data.chatId + ".date"]: serverTimestamp(),
      });
      // update for the chat user
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: text,
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {}
    setText("");
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleSend();
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Typing something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleEnter(e)}
      />
      <div className="send">
        <span>
          <IoIosAttach />
        </span>
        <span>
          <IoIosImage />
          <input type="file" name="" id="file" />
        </span>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
