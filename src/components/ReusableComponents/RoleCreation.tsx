import axios from "axios";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Trash2} from "lucide-react";
import { Label } from "@/components/ui/label"

const RoleCreation = () => {
  const Base_url = import.meta.env.VITE_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const roleNameRef = useRef(null);
  const roleDescRef = useRef(null);
  const [existingRoles,setExistingRoles] = useState([]);

  const [roleNameErr,setRoleNameErr] = useState("");
  
  const fetchExistingRoles = async()=>{
    try{
      const res = await axios.get(`${Base_url}/roles/fetchRoles`,{withCredentials:true});
      console.log(res?.data?.data);
      setExistingRoles(res?.data?.data);
    }
    catch(err){
      toast.error(err?.response?.data?.message || "Could not fetch the Existing roles");
    }
  }

  const insertNewrole = async (e) => {
    e.preventDefault(); 
    setRoleNameErr("");
    const roleName = roleNameRef?.current?.value.trim();
    const roleDesc = roleDescRef?.current?.value.trim();

    if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/.test(roleName)) {
     setRoleNameErr(
        "Role name must be 3–15 characters, start with a letter, and contain only letters, numbers, hyphens (-), or underscores (_)."
      );
      return;
    }

    try{
      const res = await axios.post(`${Base_url}/roles/addRole`,{roleName:roleName},{withCredentials:true});
      console.log(res?.data?.data);
      toast.success(res?.data?.message);
      roleNameRef.current.value = "";
      fetchExistingRoles();
      setOpen(false);
    }
    catch(err){
      //  toast.error(err?.response?.data?.message || "Role is not added");
      console.log(err);
      // toast.error(err);
    }
  };

  const deleteRole = async(id)=>{
    try{
      const res = await axios.post(`${Base_url}/roles/deleteRole`,{roleId:id},{withCredentials:true});
      toast.success(res?.data?.message);
      fetchExistingRoles();
    }
    catch(err){
      toast.error(err?.response?.data?.message);
    }
  }

  useEffect(()=>{
    fetchExistingRoles();
  },[]);
  return (
    <div className="flex items-center justify-center flex-col ">
        <div className="mb-10 mt-5">
            <AlertDialog open={open} onOpenChange={(val) => {
                  setOpen(val);
                  if (val === true) {
                    setRoleNameErr(""); // Clear error when opening
                  }
              }}>
                <AlertDialogTrigger asChild>
                    <Button
                      className="px-6 py-2 rounded-md bg-[#1A33A9] text-white dark:hover:text-black
                        transition-colors duration-200 shadow-md">
                      Create New Role
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <form onSubmit={insertNewrole}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add Role</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can create a custom role here
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                    <div className="grid mt-4 mb-5 gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="newrole">Role Name : </Label>
                        <input id="newrole" placeholder="Enter role name..." required ref={roleNameRef} className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"/>
                        {roleNameErr && <p className="text-red-700 text-sm">{roleNameErr}</p>}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="desc">Description : </Label>
                        <Textarea id="desc" placeholder="Write the role description here" ref={roleDescRef} required/>
                      </div>
                    </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit">Save changes</Button>
                  </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
            </AlertDialog>

        </div>
          <div className="flex justify-center items-center gap-5 flex-wrap max-w-[80%]">
            {existingRoles.length !== 0 && (
              existingRoles.map((roleData, index) => (
                <div
                  key={index}
                  className="flex items-center flex-wrap justify-between gap-2 w-50 p-3 rounded-lg shadow-md border 
                  bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="max-w-[70%] overflow-hidden flex break-all flex-wrap">{roleData.roleName}</div>
                  <Trash2 className="cursor-pointer max-w-[30%]" onClick={()=>{deleteRole(roleData._id)}}/>
                </div>
              ))
            )}
        </div>
    </div>
  )
}

export default RoleCreation;