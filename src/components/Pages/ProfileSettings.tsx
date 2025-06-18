import { useEffect, useState } from "react";
import axios from "axios";
import { UserPen, Trash2, Plus } from "lucide-react";
import ProfileDialog from "../ReusableComponents/ProfileDialog";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const ProfileSettings = () => {
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false); //profile dialog
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [purpose,setPurpose] = useState(null);
  const [openAlert,setopenAlert] = useState(false);
  const [profileToBeDeleted,setProfileToBeDeleted] = useState(null);


  const handleGetProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/profile/AllProfiles");
      console.log(res.data);

      if (res.status === 200) {
        setProfiles(res?.data?.data);
      }
    } catch (error) {
        toast.error("Oops!!! Something went wrong");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await axios.delete(`http://localhost:4000/profile/deleteProfile/${profileToBeDeleted}`);

      if (res.status === 200 || res.status === 201) {
        handleGetProfiles(); // trigger profile refresh
        setopenAlert(false); // close the dialog
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    handleGetProfiles();
  }, []);

  return (
    <div>
      {/* Button to Add profile */}
      <div className="flex justify-end px-10 mt-4">
        <Button onClick={() => {
          setPurpose("addProfile");
          setSelectedProfile(null); 
          setOpen(true);
          }}>
          <Plus className="mr-2" />
          Add Profile
        </Button>
      </div>

      {/* Add Profile Dialog */}
      <ProfileDialog
        title={purpose=="addProfile" ? "Add Profile" : "Update Profile"}
        desc={purpose=="addProfile" ? "Add New Profile to the Database" : "Selected profile data will be updated in the database"}
        open={open}
        setOpen={setOpen}
        onSuccess={handleGetProfiles} // refresh data after success
        profileData = {selectedProfile}
        purpose={purpose}
      />

      <AlertDialog open={openAlert} onOpenChange={setopenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              profile and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProfile}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Profile Table */}
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
                <td className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer">
                  {item.profileName}
                </td>
                <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                  <div className="flex justify-evenly">
                    <UserPen onClick={() => {
                      setSelectedProfile(item);
                      setPurpose("updateProfile")
                      setOpen(true);
                    }} />

                    <Trash2 onClick={()=>{
                      setopenAlert(true);
                      setProfileToBeDeleted(item.profileId)
                      }}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileSettings;

