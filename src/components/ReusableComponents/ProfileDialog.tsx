import { Button } from "../ui/button";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

const ProfileDialog = ({ title, desc, open, setOpen, onSuccess, purpose, profileID }) => {
  const profileIdRef = useRef<HTMLInputElement>(null);
  const profileNameRef = useRef<HTMLInputElement>(null);

  const handleAddProfile = async (e) => {
    e.preventDefault();

    const profileId = profileIdRef?.current?.value;
    const profileName = profileNameRef?.current?.value;

    try {
      const res = await axios.post("http://localhost:4000/profile/addProfile", {
        profileId,
        profileName,
      });

      if (res.status === 200 || res.status === 201) {
        onSuccess(); // trigger profile refresh
        setOpen(false); // close the dialog
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };
    const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const profileId = profileIdRef?.current?.value;
    const profileName = profileNameRef?.current?.value;

    try {
      const res = await axios.put(`http://localhost:4000/profile/updateProfile/${profileId}`, {
        profileName,
      });

      if (res.status === 200 || res.status === 201) {
        onSuccess(); // trigger profile refresh
        setOpen(false); // close the dialog
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };
  const handleSubmit = (e)=>{
      if(purpose=="addProfile"){
            handleAddProfile(e);
      }
      if(purpose=="updateProfile"){
            handleUpdateProfile(e);
      }
      
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="id">ID</Label>
              <input
                id="id"
                placeholder="Enter id..."
                required
                defaultValue={purpose=="updateProfile"?profileID:""}
                readOnly={purpose==="updateProfile"}
                ref={profileIdRef}
                className="border-2 rounded-sm px-5 py-1"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="profile">Profile</Label>
              <input
                id="profile"
                placeholder="Enter profile..."
                required
                ref={profileNameRef}
                className="border-2 rounded-sm px-5 py-1"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
