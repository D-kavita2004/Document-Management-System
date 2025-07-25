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

const ResetPassword = () => {
      const newPasswordRef = useRef("");
      const confirmPasswordRef = useRef("");

      const handleResetPassword = (e)=>{
            e.preventDefault();
            console.log(newPasswordRef.current.value);
            console.log(confirmPasswordRef.current.value);
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
                  <div className="flex flex-col gap-4">

                        <div className="grid gap-1">
                        <Label htmlFor="newPassword" className="text-md">New Password :</Label>
                        <input id="newPassword" placeholder="Enter new password..." required ref={newPasswordRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>

                        <div className="grid gap-1">
                        <Label htmlFor="confirmPassword" className="text-md">Confirm Password :</Label>
                        <input id="confirmPassword" placeholder="Enter password again..." required ref={confirmPasswordRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        </div>

                  </div>
                  </form>
                  </CardContent>

                  <CardFooter className="flex-col mt-5">
                        <Button type="submit" className="w-full font-bold p-5" onClick={handleResetPassword}>Save New Password</Button>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default ResetPassword;