import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";


export const Layout = () => {
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex h-full ">
          {/* Sidebar - stays fixed */}
          <Navbar displayNav={displayNav} setDisplayNav={setDisplayNav} />

          {/* Main Content */}
          <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <div className="shrink-0">
                  <Header displayNav={displayNav} setDisplayNav={setDisplayNav} />
                </div>
                <main className="flex-1 bg-gray-100 p-4">
                  <Outlet />
                </main>
                {/* <footer>I Am a Footer</footer> */}
          </div>
      </div>
      {/* <div>Footer</div> */}
    </div>
  );
};
