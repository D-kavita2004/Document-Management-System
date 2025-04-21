import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import { Sun }  from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import logo_url from "../../assets/c-logo.jpg";


const Header = ({displayNav,setDisplayNav}) => {

  const [HeaderSearch, setHeaderSearch] = useState("");
  const navigate = useNavigate();
  const { setTheme,theme } = useTheme()
  
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
            <Menu 
              data-testid="menu-icon"
              onClick={handleNavDisplay} 
              className={`w-[8vmin] h-[8vmin] lg:w-[7vmin] lg:h-[8vmin] lg:hidden ${displayNav ? "hidden":"block"}`} 
            />

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
          {
            theme == "light" ? 
            (
              <Moon data-testid="theme-toggle" size={29} className="mx-2" onClick={() => setTheme("dark")}/>
            ):
            (
              <Sun data-testid="theme-toggle" size={29} className="mx-2" onClick={() => setTheme("light")}/>
            )
          }
          
        </div>
      </div>
    </header>
  );
};

export default Header;
