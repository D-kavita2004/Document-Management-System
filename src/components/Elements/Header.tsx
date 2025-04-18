import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import { Sun }  from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import logo_url from "../../assets/c-logo.jpg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";



const Header = ({displayNav,setDisplayNav}) => {

  const [HeaderSearch, setHeaderSearch] = useState("");
  const navigate = useNavigate();
  const { setTheme } = useTheme()
  
  const handleNavDisplay = ()=>{
    console.log("I am Clickng");
    setDisplayNav(true);
  }
  const handleSearch = (e) => {
    if (e.key === "Enter" && HeaderSearch.trim() !== "") {
      navigate(`/Search_Documents?q=${encodeURIComponent(HeaderSearch.trim())}`);
    }
  };

  return (
    <header className={`bg-white border-b-2 border-black items-center flex justify-between shadow-lg shadow-gray-400 overflow-hidden object-contain max-w-screen dark:bg-[#3b3636]`}>
      <div className="items-center flex justify-between w-full object-contain p-2 h-full lg:pl-4 lg:pr-4">
          <div className="flex items-center space-x-2">
            <Menu onClick={handleNavDisplay} className={`w-[8vmin] h-[8vmin] lg:w-[7vmin] lg:h-[8vmin] lg:hidden ${displayNav ? "hidden":"block"}`} />
            <div className="w-[12vmin] lg:w-[10vmin] rounded-full overflow-hidden">
                <a href="https://www.smartcodersconsulting.com/" target="_blank"><img
                className="w-full h-full object-fill"
                src={logo_url}
                alt="logo"
              /></a>
            </div>
          </div>
        <div className="flex h-full items-center space-x-2 object-contain">
          <div className="flex items-center relative max-w-md">
            <Input
              className="rounded-xl lg:p-3 lg:pl-10 border-2 border-[#1A33A9] w-[42vmin] h-[8vmin] md:h-[7vmin] object-contain shadow-md shadow-gray-400  dark:bg-white dark:border-black dark:text-black"
              value={HeaderSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              type="text"
              placeholder="Search Docs..."
              onKeyDown={handleSearch}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black " />
          </div>
          
          <DropdownMenu >
                  <DropdownMenuTrigger>
                      <Button className="rounded-2xl text-xl ml-1 p-4 md:p-7 lg:p-5 italic bg-white text-black border-2 border-[#1A33A9] shadow-md shadow-gray-400 hover:text-black hover:bg-[#1A33A9] dark:bg-white dark:border-black">
                      Theme
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}><Sun/>Light</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}><Moon/>Dark</DropdownMenuItem>
                  </DropdownMenuContent>
          </DropdownMenu>          
        </div>
      </div>
    </header>
  );
};

export default Header;
