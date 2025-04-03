import React from 'react';
import { X } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-[62vmin] md:w-[48vmin] h-[100vh] p-3 flex flex-col relative hidden lg:block" style={{ backgroundColor: "#3b3636" }}>
        <X className='text-gray-400 absolute right-2 top-2 object-contain cursor-pointer' size={32}/>
        {/* Company Name */}
        <h3 className="text-2xl text-white text-center lg:mx-4 mt-4 font-bold cursor-pointer">SmartCoders Consulting Pvt. Ltd.</h3>

        {/* Navigation Menus */}
        <div className="mt-8 p-2 flex-grow">
                <div className="text-center my-5 text-xl text-white p-2 rounded-3xl cursor-pointer shadow-md shadow-gray-400  hover:font-bold hover:bg-[#0097b2]" >
                    <Link to="/">DashBoard</Link>
                </div>
                <div className="hover:bg-[#0097b2] text-center my-5 text-xl text-white p-2 rounded-3xl cursor-pointer shadow-md shadow-gray-400  hover:font-bold ">
                    <Link to="/My Documents">My Documents</Link>
                </div>
                <div className="hover:bg-[#0097b2] text-center my-5 text-xl text-white p-2 rounded-3xl cursor-pointer shadow-md shadow-gray-400  hover:font-bold ">
                    <Link to="/Upload Documents">Upload Documents</Link>
                </div>
                <div className="hover:bg-[#0097b2] text-center my-5 text-xl text-white p-2 rounded-3xl cursor-pointer shadow-md shadow-gray-400  hover:font-bold " >
                    <Link to="/Search Documents">Search Documents</Link>
                </div>
        </div>

        {/* Logout Bottom */}
        <div className="mt-auto p-3 text-center">
             <h4 className="text-white text-2xl italic">LogOut</h4>
        </div>
    </nav>
  );
}

export default Navbar;
