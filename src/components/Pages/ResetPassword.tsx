import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";

const ResetPassword = () => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const navigate = useNavigate();

      const [newPassErr,setNewPassErr] = useState("");
      const [conPassErr,setConPassErr] = useState("");
      const [loading,setLoading] = useState(false);
      const [passwordVisibility,setPasswordVisibility] = useState(false);

      const togglePasswordVisibility = ()=>{
            setPasswordVisibility(!passwordVisibility);
      }

      const {token} = useParams();

      const newPasswordRef = useRef(null);
      const confirmPasswordRef = useRef(null);

      const handleResetPassword = async (e) => {
      e.preventDefault();
      setNewPassErr("");
      setConPassErr("");

      const newPassword = newPasswordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      setLoading(true);
      try {
            let hasError = false;

            if (!/^(?=.*[A-Za-z])(?=.*\d).{4,}$/.test(newPassword)) {
                  setNewPassErr("Password must be at least 4 characters long and include at least one letter and one number.");
                  hasError = true;
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d).{4,}$/.test(confirmPassword)) {
                  setConPassErr("Password must be at least 4 characters long and include at least one letter and one number.");
                  hasError = true;
            }

            if (newPassword !== confirmPassword) {
                  setConPassErr("Passwords do not match.");
                  hasError = true;
            }

            if (hasError) return;

            const res = await axios.post(`${BASE_URL}/password/reset-password`, {
                  jwtToken: token,
                  updatedPassword: newPassword,
            });
            setLoading(false);
            toast.success(res.data.message);
            navigate("/Login");
            // maybe show a success toast or redirect here
      } catch (error) {
            console.log(error);
           toast.error(error.response?.data?.message || "Could not save the updated password");
            // optionally show a toast here too
      }
      };


  return (
      <div className="flex justify-center items-center h-screen w-screen">
            <Card className="w-full max-w-sm">

                  <CardHeader>
                        <CardTitle className="text-xl">Forget Password</CardTitle>
                        <CardDescription>Password Reset link will be sent at your registered email</CardDescription>
                  </CardHeader>

                  <form onSubmit={handleResetPassword}>
                        <CardContent>
                        
                        <div className="flex flex-col gap-4">

                              <div className="grid gap-1">
                                    <Label htmlFor="newPassword" className="text-md">New Password :</Label>
                                    <div className="relative">
                                          <input id="newPassword" type={passwordVisibility ? "text" : "password"} placeholder="Enter new password..." required ref={newPasswordRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                                          <div onClick={togglePasswordVisibility}>
                                          {passwordVisibility ? <Eye className="absolute h-5 w-5 right-3 top-2.5"/>:<EyeOff className="absolute h-5 w-5 right-3 top-2.5"/>}
                                          </div>
                                    </div>
                                    {newPassErr && <p className="text-red-600">{newPassErr}</p>}
                              </div>

                              <div className="grid gap-1">
                                    <Label htmlFor="confirmPassword" className="text-md">Confirm Password :</Label>
                                    <div>
                                          <input id="confirmPassword" type={passwordVisibility ? "text" : "password"} placeholder="Enter password again..." required ref={confirmPasswordRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                                    </div>
                                    {conPassErr && <p className="text-red-600">{conPassErr}</p>}
                              </div>

                        </div>
                        
                        </CardContent>

                        <CardFooter className="flex-col mt-5">
                              <Button type="submit" className="w-full font-bold p-5" disabled={loading}>Save New Password</Button>
                        </CardFooter>
                  </form>
            </Card>
      </div>
  )
}

export default ResetPassword;