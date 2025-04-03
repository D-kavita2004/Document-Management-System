import React from "react";
import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export const Layout = () => {

  const [displayNav,SetDisplayNav] = useState(false);
  return (
    <>
      <div>
          <div className="flex h-screen">
              <Navbar displayNav={displayNav} setDisplayNav={SetDisplayNav} />
              <div className="flex flex-col flex-1 ">
                  <Header displayNav={displayNav} setDisplayNav={SetDisplayNav} />
                  <main className=" flex-1 bg-gray-100 p-4 object-contain">
                    Main Page
                  </main>
              </div>
          </div>
          {/* <div>Footer</div> */}
      </div>
    </>
  );
};
