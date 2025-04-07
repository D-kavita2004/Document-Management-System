import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

export const Layout = () => {
  // Sidebar should be visible by default on large screens
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <div className="h-screen">
        <div className="flex h-screen">
          {/* navbar */}
            <Navbar displayNav={displayNav} setDisplayNav={setDisplayNav} />

            {/* main-content */}
            <div className="flex flex-col flex-1">
              <div className="">
                  <Header displayNav={displayNav} setDisplayNav={setDisplayNav} />
              </div>
              <main className="flex-1 bg-gray-100"><Outlet/></main>
            </div>       
        </div>
        {/* <footer>I am a footer</footer> */}
    </div>
  );
};