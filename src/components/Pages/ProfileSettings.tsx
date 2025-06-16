import { useEffect, useState } from "react";
import axios from "axios";
import {UserPen,Trash2,Plus} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react";

const ProfileSettings = () => {
  const [profiles,setProfiles] = useState([]);
  const profileIdRef = useRef<HTMLInputElement>(null);
  const profileNameRef = useRef<HTMLInputElement>(null);


  const handleGetProfiles = async ()=>{
    try{
      const allProfiles = await axios.get("http://localhost:4000/profile/getProfiles");

      if(allProfiles.status == 200){
        setProfiles(allProfiles?.data?.data);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleAddProfile = async (e) => {
  e.preventDefault();

  const profileId = profileIdRef?.current?.value;
  const profileName = profileNameRef?.current?.value;
  console.log(profileId,profileName);

  try {
    const res = await axios.post("http://localhost:4000/profile/addProfile", {
      profileId,
      profileName,
    });
    console.log("Add profile API",res)
    if (res.status === 200 || res.status === 201) {
      // Refresh the list
      handleGetProfiles();
    }
  } catch (error) {
    console.error("Error adding profile:", error);
  }
};
  useEffect(()=>{
    handleGetProfiles();
  },[])


  return (
      <div>
            <div className="flex justify-end mr-10 mt-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-[#1A33A9] dark:bg-white dark:text-black text-white dark:hover:text-white"><Plus />ADD</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add profile</DialogTitle>
                    <DialogDescription>
                      Add New Profile to the Database
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddProfile}>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="id">ID</Label>
                        <input id="id" placeholder="Enter id..." required ref={profileIdRef} className="border-3 rounded-sm px-5 py-1"/>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="profile">Profile</Label>
                        <input id="profile" placeholder="Enter profile..." required ref={profileNameRef}
                        className="border-3 rounded-sm px-5 py-1" />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose className="flex justify-end gap-4">
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="submit">Save changes</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>


          </div>
          <div className="max-h-[85%] flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%] my-5">
              <table className="border-collapse text-wrap h-full">
                <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((item) => (
                    <tr key={item.profileId} className="even:bg-gray-200 dark:bg-[#3b3636]">
                      <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                        <div className="flex items-center justify-center h-full">
                          {item.profileId}
                        </div>
                      </td>
                      <td
                        className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer">
                        {item.profileName}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                        <div className="flex justify-evenly">
                            <UserPen/>
                            <Trash2/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </div>
  )
}

export default ProfileSettings;
