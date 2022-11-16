import React from "react";

import { Navbar, Chats, Chat, Search } from "../components";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <div className="left">
          <Navbar />
          <Search />
          <Chats />
        </div>
        <div className="right">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
