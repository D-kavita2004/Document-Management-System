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
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";

const ProfileDialog = ({ title, desc, open, setOpen, onSuccess, purpose, profileData }) => {
  const profileIdRef = useRef<HTMLInputElement>(null);
  const profileNameRef = useRef<HTMLInputElement>(null);
  const [errorId,setErrorId] = useState("");
  const [errorName,setErrorName]  = useState("");

// add profile api
  const handleAddProfile = async (e) => {
    e.preventDefault();

    const profileId = profileIdRef?.current?.value.trim();
    const profileName = profileNameRef?.current?.value.trim();

    try {
      const res = await axios.post("http://localhost:4000/profile/addProfile", {
        profileId,
        profileName,
      });

      if (res.status === 200 || res.status === 201) {
        onSuccess(); // trigger profile refresh
        setOpen(false); // close the dialog
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

// update profile api
    const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const profileId = profileIdRef?.current?.value.trim();
    const profileName = profileNameRef?.current?.value.trim();

    try {
      const res = await axios.put(`http://localhost:4000/profile/updateProfile/${profileId}`, {
        profileName,
      });

      if (res.status === 200 || res.status === 201) {
        onSuccess(); // trigger profile refresh
        setOpen(false); // close the dialog
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const isValid = validateFields();

  if (!isValid) return;

  if (purpose === "addProfile") {
    handleAddProfile(e);
  } else if (purpose === "updateProfile") {
    handleUpdateProfile(e);
  }
};


const validateFields = () => {
  let isValid = true;
  setErrorId("");
  setErrorName("");

  const profileId = profileIdRef?.current?.value;
  const profileName = profileNameRef?.current?.value;

  // Validate profile name
  if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(profileName.trim())) {
    setErrorName("Name must start with a letter and contain only letters, numbers, hyphens or underscores.");
    isValid = false;
  }

  // Validate profile ID
  if (!/^\d{1,10}$/.test(profileId.trim())) {
    setErrorId("Profile ID must be a string of up to 10 numeric digits");
    isValid = false;
  }


  return isValid;
};

useEffect(() => {
  if (open) {
    setErrorId("");
    setErrorName("");
  }
}, [open]);



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
                      defaultValue={purpose=="updateProfile"?profileData.profileId:""}
                      readOnly={purpose==="updateProfile"}
                      ref={profileIdRef}
                      className="border-2 rounded-sm px-5 py-1"
                      disabled={purpose==="updateProfile"}
                    />
                    {errorId && <p className="text-red-600 text-sm">{errorId}</p>}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="profile">Profile</Label>
                    <input
                      id="profile"
                      placeholder="Enter profile..."
                      defaultValue={purpose=="updateProfile"?profileData.profileName:""}
                      required
                      ref={profileNameRef}
                      className="border-2 rounded-sm px-5 py-1"
                    />
                    {errorName && <p className="text-red-600 text-sm">{errorName}</p>}
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
