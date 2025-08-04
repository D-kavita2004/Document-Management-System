import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Constants/userContext";
import { useState } from "react";
import { Eye,EyeOff } from "lucide-react";
const SignUp = () => {

      const navigate = useNavigate();
      const { user, loading, setUser } = useUser();
      const firstNameRef = useRef(null);
      const lastNameRef = useRef(null);
      const emailRef = useRef(null);
      const phoneRef = useRef(null);
      const passwordRef = useRef(null);
      const [passwordVisibility,setPasswordVisibility] = useState(false);
      
      const togglePasswordVisibility = ()=>{
            setPasswordVisibility(!passwordVisibility);
      }

      const handleSignUp = async (e)=>{
            e.preventDefault();
            try{
                  const res = await axios.post("http://localhost:4000/auth/SignUp",{
                        firstName:firstNameRef?.current?.value,
                        lastName:lastNameRef?.current?.value,
                        email:emailRef?.current?.value,
                        phone:phoneRef?.current?.value,
                        password:passwordRef?.current?.value,
                  },{withCredentials:true})
                  console.log(res);
                  localStorage.setItem("loggedIn", "true");
                  toast.success(res.data.message);
                  setUser(res.data.data);
                  navigate("/")
            }
            catch(error){
            console.log(error);
            toast.error(error.response?.data?.message || "Sign up failed");
            }
      }

  return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
            <Card className="w-[350px] border-2 border-black dark:bg-white dark:text-black bg-black text-white max-h-[85%] overflow-auto max-w-[85%]">
                  <CardHeader>
                        <CardTitle className="text-xl mx-auto">SignUp Here</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <form onSubmit={handleSignUp}>
                  <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="firstName" className="text-md">First Name : </Label>
                        <input id="firstName" type="text" ref={firstNameRef} placeholder="Enter your first name.." required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="lastName" className="text-md">LastName : </Label>
                        <input id="lastName" type="text" ref={lastNameRef} placeholder="Enter your last name.." required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email" className="text-md">Email : </Label>
                        <input id="email" type="email" ref={emailRef} placeholder="Enter your email.." required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="phone" className="text-md">Phone : </Label>
                        <input id="phone" type="tel" ref={phoneRef} placeholder="Enter your phone number" required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password" className="text-md">Password :</Label>
                              <div className="relative">
                                    <input id="password" type={passwordVisibility ? "text" : "password"} ref={passwordRef} placeholder="Enter your password" required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                                    <div onClick={togglePasswordVisibility}>
                                          {passwordVisibility ? <Eye className="absolute h-5 w-5 right-3 top-2.5"/>:<EyeOff className="absolute h-5 w-5 right-3 top-2.5"/>}
                                    </div>
                              </div>
                        </div>

                        <Button className="text-lg mx-auto bg-black text-white hover:bg-white hover:text-black border border-gray-300" type="submit">SignUp</Button>
                  </div>
                  </form>
                  </CardContent>
                  <CardFooter className="flex justify-between flex-col my-auto">
                  
                  <p className="text-sm">Already have a account ? <Link to="/Login" className="text-blue-700">Login</Link></p>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default SignUp;

