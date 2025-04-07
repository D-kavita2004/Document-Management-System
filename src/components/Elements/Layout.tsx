import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

export const Layout = () => {
  // Sidebar should be visible by default on large screens
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <div>
        <div className="flex h-screen">
            <Navbar displayNav={displayNav} setDisplayNav={setDisplayNav} />

            <div className="flex flex-col flex-1">
              <Header displayNav={displayNav} setDisplayNav={setDisplayNav} />
              <main className="flex-1 bg-gray-100"><Outlet/></main>
            </div>       
        </div>
        {/* <footer>I am a footer</footer> */}
    </div>
  );
};