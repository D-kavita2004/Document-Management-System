import { X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { Label } from 'recharts';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/Constants/userContext';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar = ({ displayNav , setDisplayNav }) => {

    const {user,setUser} = useUser();
    const [userRole,setUserRole] = useState("User");

    const location = useLocation(); 
    const navigate = useNavigate();

    const handleNavDisplay = ()=>{
        setDisplayNav(false);
    }
    const afterNavigation = ()=>{
        setDisplayNav(false);
    }

    const handleLogOut = async()=>{
        try{
            const res = await axios.post(":4000/auth/LogOut",{},{withCredentials:true});
            console.log(res);
            toast.success(res.data.message);
            localStorage.removeItem("loggedIn");
            setUser(null);
            navigate("/Login");
        }
        catch(error){
            toast.error(error?.response?.data?.message || "Internal Server Error !!!");
            console.log(error);
        }
    }

    useEffect(()=>{
        if(user){
            setUserRole(user.role);
        }
    },[])
    
  return (
    <nav  className={`fixed lg:static top-0 left-0 z-50 h-screen w-[62vmin] md:w-[48vmin] p-3 overflow-y-auto flex flex-col bg-[#3b3636] shadow-md 
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
        <div className="mt-5 p-2 flex-grow">

                <div
                        className={`text-center my-5 text-xl p-2 rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9] hover:dark:bg-white hover:dark:text-black transition
                            ${"/" === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}
                        >
                        <Link className="cursor-pointer" to="/" onClick={afterNavigation}>
                            Dashboard
                        </Link>
                </div>
                <div
                        className={`text-center my-5 text-xl p-2 rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9] hover:dark:bg-white hover:dark:text-black transition
                            ${"/My_Documents" === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}
                        >
                        <Link className="cursor-pointer" to="/My_Documents" onClick={afterNavigation}>
                            My Documents
                        </Link>
                </div>
            {   
                (userRole === "Admin" || userRole === "Editor") && 
                <div
                        className={`text-center my-5 text-xl p-2 rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9] hover:dark:bg-white hover:dark:text-black transition
                            ${"/Upload_Documents" === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}
                        >
                        <Link className="cursor-pointer" to="/Upload_Documents" onClick={afterNavigation}>
                            Upload Documents
                        </Link>
                </div>
            }
                <div
                        className={`text-center my-5 text-xl p-2 rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9] hover:dark:bg-white hover:dark:text-black transition
                            ${"/Search_Documents" === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}
                        >
                        <Link className="cursor-pointer" to="/Search_Documents" onClick={afterNavigation}>
                            Search Documents
                        </Link>
                </div>                

            {
                userRole === "Admin" && 
                <div className={`text-center my-5 p-2 flex justify-center items-center text-xl rounded-3xl shadow-md shadow-gray-400 hover:font-bold hover:bg-[#1A33A9]              hover:dark:bg-white hover:dark:text-black transition ${"/Search_Documents" === location.pathname ? "bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:font-bold" : "text-white"}`}>            
                    <Accordion collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='text-lg font-bold cursor-pointer'> Admin Settings</AccordionTrigger>
                            <AccordionContent className='text-md font-bold cursor-pointer mt-3' onClick={() => {
                                navigate("/Profile_Settings");
                                afterNavigation(); 
                            }}>
                                Profile Settings
                            </AccordionContent>
                            <AccordionContent className='text-md font-bold cursor-pointer' onClick={() => {
                                navigate("/Profile_Permissions");
                                afterNavigation(); 
                            }}>
                                Profile Permissions
                            </AccordionContent>
                            <AccordionContent className='text-md font-bold cursor-pointer'onClick={() => {
                                navigate("/Role-Assignment");
                                afterNavigation(); 
                            }}>
                                Role Assignment
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            }

        </div>
        {/* Logout Button */}
        <div className="mt-auto p-3 text-center relative bottom-2 cursor-pointer">
             <h4 className="text-white text-2xl italic" onClick={handleLogOut}>LogOut</h4>
        </div>
    </nav>
  );
}

export default Navbar;
