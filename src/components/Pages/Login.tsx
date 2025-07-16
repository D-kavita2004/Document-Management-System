import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { data, Link } from "react-router-dom"
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Constants/userContext";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
      const { user, loading, setUser } = useUser();
      const navigate = useNavigate();
      const emailRef = useRef(null);
      const passwordRef = useRef(null);

      const handleLogin = async (e) =>{
            e.preventDefault();
            try{
                  const res = await axios.post("http://localhost:4000/auth/Login",{
                        email:emailRef?.current?.value,
                        password:passwordRef?.current?.value,
                  },{withCredentials:true})
                  localStorage.setItem("loggedIn", "true");
                  toast.success(res.data.message);
                  setUser(res.data.data);
                  navigate("/")
            }
            catch(error){
            console.log(error);
            toast.error(error.response?.data?.message || "Could not Login the user");
            }
      }
      const handleGoogleLogin = async (credentialResponse) => {
            try{
                  const { credential: idToken } = credentialResponse;
                  // Send id_token to backend
                  const res = await axios.post('http://localhost:4000/auth/google-login', {
                  idToken,
                  },{withCredentials:true});
                  localStorage.setItem("loggedIn", "true");
                  toast.success(res.data.message);
                  setUser(res.data.data);
                  navigate("/")
            }
            catch(err){
                  console.log(err);
            }
      }

      useEffect(()=>{
            if(user){
                  navigate("/");
            }
      },[user])
  return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
            <Card className="w-[350px] border-2 border-black dark:bg-white dark:text-black bg-black text-white">
                  <CardHeader>
                  <CardTitle className="text-xl mx-auto">Login Here</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <form onSubmit={handleLogin}>
                  <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email" className="text-md">Email : </Label>
                        <input id="email" placeholder="Enter your email..." required ref={emailRef} className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password" className="text-md">Password : </Label>
                        <input id="password" type="password" placeholder="Enter your password.." required ref={passwordRef}  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                        <Button className="text-lg mx-auto bg-black text-white hover:bg-white hover:text-black border border-gray-300" type="submit">Login</Button>
                  </div>
                  </form>
                  </CardContent>
                  <CardFooter className="flex justify-between flex-col my-auto">
                  <p className="text-sm">Have not registered yet ? <Link to="/SignUp" className="text-blue-700">SignUp</Link></p>
                  <br></br>
                  <div className="w-full"><GoogleLogin onSuccess={handleGoogleLogin}/></div>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default Login

