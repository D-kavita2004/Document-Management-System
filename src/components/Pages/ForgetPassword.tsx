import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"

const ForgetPassword = () => {

      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const emailRef = useRef("");
      const [loading,setLoading] = useState(false);

      const handleForgetPassword = async(e)=>{
            e.preventDefault();
            setLoading(true);
            try{
                  const res = await axios.post(`${BASE_URL}/password/forget-password`,{
                       email:emailRef.current.value,
                  });
                  setLoading(false);
                  toast.success(res.data.message);
            }
            catch(error){
                  toast.error(error.response?.data?.message || "Could not sent reset link");
            }
      }

  return (
      <div className="flex justify-center items-center h-screen w-screen">
            <Card className="w-full max-w-sm">

                  <CardHeader>
                        <CardTitle className="text-xl">Forget Password</CardTitle>
                        <CardDescription>Password Reset link will be sent at your registered email</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleForgetPassword}>
                        <CardContent>
                        
                        <div className="flex flex-col gap-6">
                              <div className="grid gap-1">
                              <Label htmlFor="email" className="text-md">Email :</Label>
                              <input id="email" placeholder="Enter your email..." type="email" required ref={emailRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                              </div>
                        </div>
                  
                        </CardContent>

                        <CardFooter className="flex-col mt-5">
                              <Button type="submit" className="w-full" disabled={loading}>Send Reset Link</Button>
                        </CardFooter>
                  </form>
            </Card>
      </div>
  )
}

export default ForgetPassword;