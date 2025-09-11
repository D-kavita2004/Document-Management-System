import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Menu, Search, Sun, Moon, Settings } from "lucide-react";
import { useTheme } from "./theme-provider";
import logo_url from "../../assets/c-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/Constants/userContext";

const Header = ({ displayNav, setDisplayNav }) => {
  const [HeaderSearch, setHeaderSearch] = useState("");
  const {user} = useUser();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const handleNavDisplay = () => {
    setDisplayNav(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && HeaderSearch.trim() !== "") {
      navigate(`/Search_Documents?q=${encodeURIComponent(HeaderSearch.trim())}`);
      setHeaderSearch("");
    }
  };

  return (
    <header className="bg-white dark:bg-[#3b3636] border-b border-gray-300 dark:border-black shadow-md px-4 py-2.5 flex items-center justify-between w-full">
      
      {/* Left - Logo & Menu */}
      <div className="flex items-center gap-4">
        <Menu
          onClick={handleNavDisplay}
          className={`w-8 h-8 lg:hidden cursor-pointer ${displayNav ? "hidden" : "block"}`}
        />

        {/* Logo */}
        <a href="https://www.smartcodersconsulting.com/" target="_blank" rel="noopener noreferrer">
          <div className="w-12 h-12 lg:w-11 lg:h-11 rounded-full overflow-hidden">
            <img
              src={logo_url}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </a>
      </div>

      {/* Center - Search Input */}
      <div className="flex-grow max-w-md mx-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search Docs..."
            value={HeaderSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-3 py-2 rounded-xl border-2 border-[#1A33A9] shadow-sm dark:bg-white dark:text-black dark:border-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Right - Icons and Avatar */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        {theme === "light" ? (
          <Moon
            data-testid="theme-toggle"
            size={30}
            onClick={() => setTheme("dark")}
            className="cursor-pointer hover:scale-110 transition"
          />
        ) : (
          <Sun
            data-testid="theme-toggle"
            size={30}
            onClick={() => setTheme("light")}
            className="cursor-pointer hover:scale-110 transition"
          />
        )}

        {/* Settings Icon */}
        <Settings
          size={30}
          className="cursor-pointer hover:scale-110 transition"
          onClick={() => navigate("/Settings")}
        />
        {/* {
          user.role === "admin" && 
          <Settings
          size={30}
          className="cursor-pointer hover:scale-110 transition"
          onClick={() => navigate("/Settings")}
        />
        } */}

        {/* Avatar */}
        <Avatar onClick={() => navigate("/profile")} className="cursor-pointer" size={30}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
