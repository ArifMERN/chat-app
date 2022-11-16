import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleEnter = async (e) => {
    if (e.code === "Enter") {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", e.target.value)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setErr(true);
      }
      e.target.value = "";
    }
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      console.log(combinedId);
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        // create the chat between current user and searched user
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // update the current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // add the details to searched user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
    }
    setUser("");
  };
  return (
    <div className="searchBox">
      <input type="text" placeholder="find a user" onKeyDown={handleEnter} />
      {user && (
        <div className="user" onClick={handleSelect}>
          <img src={user.photoURL} alt="user-search" />
          <div className="userDetails">
            <span className="name">{user.displayName}</span>
          </div>
        </div>
      )}
      {err && <p>User not found !</p>}
    </div>
  );
};

export default Search;
