import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import logo_url from "../../assets/c-logo.jpg";

const Header = ({displayNav,setDisplayNav}) => {
  
  const handleNavDisplay = ()=>{
    console.log("I am Clickng");
    setDisplayNav(true);
  }

  return (
    <header className={`border-b-2 border-black items-center flex justify-between shadow-lg shadow-gray-400 overflow-hidden object-contain max-w-screen `}>
      <div className="items-center flex justify-between w-full object-contain p-2 h-full lg:pl-4 lg:pr-4">
          <div className="flex items-center space-x-2">
            <Menu onClick={handleNavDisplay} className={`w-[8vmin] h-[8vmin] lg:w-[7vmin] lg:h-[8vmin] lg:hidden ${displayNav ? "hidden":"block"}`} />
            <div className="w-[12vmin] lg:w-[10vmin] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-fill"
                src={logo_url}
                alt="logo"
              />
            </div>
          </div>
        <div className="flex h-full items-center space-x-2 object-contain">
          <div className="flex items-center relative max-w-md">
            <Input
              className="rounded-2xl lg:p-4 lg:pl-10 border-2 border-black w-[40vmin] h-[7vmin] object-contain"
              style={{ backgroundColor: "#0097b2" }}
              type="text"
              placeholder="Search Docs.."
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
          </div>
          <Button className="rounded-2xl text-xl ml-1 p-4 md:p-7 lg:p-5 italic bg-[#3b3636]">
            Theme
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
