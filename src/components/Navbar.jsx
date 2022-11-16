import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navContainer">
      <div className="navWrapper">
        <span className="logo">Chat Mini</span>
        <div className="user">
          <img src={currentUser.photoURL} alt="user" />
          <span className="userName">{currentUser.displayName}</span>

          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
