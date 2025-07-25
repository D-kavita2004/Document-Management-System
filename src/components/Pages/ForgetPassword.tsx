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

const ForgetPassword = () => {
      const emailRef = useRef("");
      const handleForgetPassword = (e)=>{
            e.preventDefault();
            console.log(emailRef.current.value);
      }
  return (
      <div className="flex justify-center items-center h-screen w-screen">
            <Card className="w-full max-w-sm">

                  <CardHeader>
                        <CardTitle className="text-xl">Forget Password</CardTitle>
                        <CardDescription>Password Reset link will be sent at your registered email</CardDescription>
                  </CardHeader>

                  <CardContent>
                  <form>
                  <div className="flex flex-col gap-6">
                        <div className="grid gap-1">
                        <Label htmlFor="email" className="text-md">Email :</Label>
                        <input id="email" placeholder="Enter your email..." type="email" required ref={emailRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>
                  </div>
                  </form>
                  </CardContent>

                  <CardFooter className="flex-col mt-5">
                        <Button type="submit" className="w-full" onClick={handleForgetPassword}>Send Reset Link</Button>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default ForgetPassword;