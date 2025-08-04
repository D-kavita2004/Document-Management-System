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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Constants/userContext";
import { GoogleLogin } from '@react-oauth/google';
import {Eye,EyeOff} from "lucide-react";


const Login = () => {
      const { user, loading, setUser } = useUser();
      const navigate = useNavigate();
      const emailRef = useRef(null);
      const passwordRef = useRef(null);
      const [passwordVisibility,setPasswordVisibility] = useState(false);

      const togglePasswordVisibility = ()=>{
            setPasswordVisibility(!passwordVisibility);
      }

      //Default Login
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
      const handleSignInWithGithub = ()=>{
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
            const redirectUri = "http://localhost:4000/auth/github/callback";
            const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user%20user:email`;
            window.location.href = githubUrl;
      }
      const handleSignInWithLinkedIn = () => {
            const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
            const redirectUri = encodeURIComponent("http://localhost:4000/auth/linkedin/callback");
            const scope = encodeURIComponent("r_liteprofile r_emailaddress");

            const linkedInUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=foobar&scope=${scope}`;

            window.location.href = linkedInUrl;
            };

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

                              <div className="relative ">
                              <input id="password" type={passwordVisibility ? "text" : "password"} placeholder="Enter your password.." required ref={passwordRef}  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                              <div onClick={togglePasswordVisibility}>{passwordVisibility ? <Eye className="absolute h-5 w-5 right-3 top-2.5"/>:<EyeOff className="absolute h-5 w-5 right-3 top-2.5"/>}</div>
                              </div>
                        </div>
                        <Button className="text-lg mx-auto bg-black text-white hover:bg-white hover:text-black border border-gray-300" type="submit">Login</Button>
                  </div>
                  </form>
                  </CardContent>
                  <CardFooter className="flex justify-between flex-col my-auto">
                  <p className="text-sm m-1"><Link to="/forget-password" className="text-blue-500 underline">Forget Password ?</Link></p>
                  <p className="text-sm">Have not registered yet ? <Link to="/SignUp" className="text-blue-500">SignUp</Link></p>
                  <br></br>
                  <div className="w-full text-center bg-white text-black"><GoogleLogin onSuccess={handleGoogleLogin}/></div>
                  <br></br>
                  <div className="w-full text-center bg-white text-black pt-2 pb-2 flex cursor-pointer" onClick={handleSignInWithGithub}>   
                        <div className="object-contain w-6 h-6 relative ml-2"><img src="src\assets\github-logo.png" alt="login with github"></img></div>
                        <div className="mx-auto my-auto">SignIn with GitHub</div>
                  </div>
                  <br></br>
                  <div className="w-full text-center bg-white text-black pt-2 pb-2 flex cursor-pointer" onClick={handleSignInWithLinkedIn}>   
                        <div className="object-contain w-6 h-6 relative ml-2"><img src="src\assets\github-logo.png" alt="login with github"></img></div>
                        <div className="mx-auto my-auto">SignIn with LinkedIn</div>
                  </div>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default Login

