import React from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ displayNav , setDisplayNav }) => {

    const location = useLocation(); 

    const handleNavDisplay = ()=>{
        setDisplayNav(false);
    }

    const menuItems = [
        { path: "/", label: "Dashboard" },
        { path: "/My_Documents", label: "My Documents" },
        { path: "/Upload_Documents", label: "Upload Documents" },
        { path: "/Search_Documents", label: "Search Documents" }
    ];

    
  return (
    <nav  className={`fixed lg:static top-0 left-0 z-50 h-screen w-[62vmin] md:w-[48vmin] p-3 flex flex-col bg-[#3b3636] shadow-md 
        transition-transform duration-300 ease-in-out 
        ${displayNav ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <X 
            onClick={handleNavDisplay}
            size={32}
            data-testid="close-icon"
            className='text-gray-400 absolute right-2 top-2 object-contain cursor-pointer lg:hidden' 
        />
        {/* Company Name */}
        <h3 className="text-2xl text-white text-center lg:mx-4 mt-4 font-bold cursor-pointer italic"><a href='https://www.smartcodersconsulting.com/' target='_blank'>SmartCoders Consulting Pvt. Ltd.</a></h3>

        {/* Navigation Menus */}
        <div className="mt-8 p-2 flex-grow">
                {
                    menuItems.map((item)=>(
                        <div
                        key={item.path}
                        className={`text-center my-5 text-xl p-2 rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9] hover:dark:bg-white hover:dark:text-black transition
                            ${item.path === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}
                        >
                        <Link className="cursor-pointer" to={item.path}>
                            {item.label}
                        </Link>
                        </div>
                    ))
                }

        </div>

        {/* Logout Button */}
        <div className="mt-auto p-3 text-center">
             <h4 className="text-white text-2xl italic">LogOut</h4>
        </div>
    </nav>
  );
}

export default Navbar;
