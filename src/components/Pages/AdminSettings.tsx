import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { documentKeys } from '@/Constants/Columns';
import { Label } from '../ui/label';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { Input } from "../ui/input";
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
import axios from "axios";

const AdminSettings = () => {

  type Attribute = {
  attID: string;
  Selected: boolean;
  Label: string;
};
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [initialState, setInitialState] = useState<Attribute[]>([]);
  const [profileList,setProfileList] = useState([]);
  const [showDialog,setShowDialog] = useState(false);
  const [changesSaved,setChangesSaved] = useState(false);
  const [profile,setProfile] = useState("");
  const [changeInAttr,setChangeInAttr] = useState(false);
  const [currentProfileId,setCurrentProfileId] = useState("");

  const handleToggle = (id: string) => {
    setAttributes((prev) =>
      prev.map((item) =>
        item.attID === id
          ? { ...item, Selected: !item.Selected }
          : item
      )
    );
  };

  const handleLabelChange = (id: string, value: string) => {
    setAttributes((prev) =>
      prev.map((item) =>
        item.attID === id ? { ...item, Label: value } : item
      )
    );
  };

  //if you try to change the profile 
const handleProfile = (value: string) => {
  const data = profileList.find(obj => obj.profileName === value);
  if (!data) {
    toast.error("Selected profile not found");
    return;
  }

  const id = data.profileId;

  if (changeInAttr && !changesSaved) {
    setShowDialog(true);
  } else {
    setProfile(value);
    setCurrentProfileId(id); // keep this updated
    handleProfileAttributes(id); // call immediately with correct ID
    // setAttributes([...initialState]);
    setChangeInAttr(false);
    setChangesSaved(false);
  }
};


useEffect(()=>{
  const isChanged = JSON.stringify(attributes) !== JSON.stringify(initialState);
  setChangeInAttr(isChanged);
}, [attributes, initialState]);


//Api call to get all the profiles
const handleGetAllProfiles = async()=>{
  console.log("GetAllProfiles api called")
  try{
    const res = await axios.get("http://localhost:4000/profile/AllProfiles");
    setProfileList(res.data.data);
    setProfile(res.data.data[0].profileName)
    handleProfileAttributes(res.data.data[0].profileId)
    // toast.success(res.data.message); 
  }
  catch(error){
     toast.error(error.response?.data?.message || "Failed to fetch profiles kindly refresh the page");
  }
}

//Api call to get all the attributes list related to that profile
const handleProfileAttributes = async(id)=>{
  try{
    const res = await axios.get(`http://localhost:4000/attribute/ProfileAttributes/${id}`);
    setAttributes(res.data.data);
    setInitialState(res.data.data);
  }
  catch(error){
    console.log(error);
  }
}

//Api call to get all the attributes list related to that profile
const handleUpdateProfileAttributes = async()=>{
    console.log("UpdateProfileAttributes api called");
    const data = profileList.find((obj)=>{
      return obj.profileName == profile
    })
    try{
    const res = await axios.put(`http://localhost:4000/attribute/updateProfilePermission/${data.profileId}`,{attributes});
    console.log("My Response from update",res.data.data);
    setAttributes(res.data.data);

    setInitialState(res.data.data);
  }
  catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  handleGetAllProfiles();
},[])

useEffect(() => {
  if(profile != ""){
    const data = profileList.find((obj)=>{
      return obj.profileName === profile
    })
    setCurrentProfileId(data.profileId);
  }
}, [profile]); 

const handleOnSave = ()=>{
  handleUpdateProfileAttributes();
      setChangesSaved(true);
      toast.success("Changes saved successfully");
      console.log("Pofile",profile);
      console.log("attributes",attributes);
      console.log("ok");
  }

  return (
    <div className='flex pt-4 flex-col space-y-4 overflow-auto max-h-[85vh] scrollbar-hide'>
      {/* Profile Selection */}
      <div className='flex justify-center space-x-6 text-md'>
        <Label className='text-md'>Select the Profile : </Label>
        <Select onValueChange={handleProfile} value={profile} >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Your Profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Profiles</SelectLabel>
              {
                profileList.map((profile)=>(
                  <SelectItem key={profile.profileId} value={profile.profileName}>{profile.profileName}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Attributes Table */}
      <div className="max-h-[85%] flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%]">
        <table className="border-collapse w-full h-full">
          <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2">Selected</th>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((item) => (
              <tr key={item.attID} className="even:bg-gray-200 dark:bg-[#3b3636]">
                <td className="border border-gray-300 px-1 py-1 text-center align-middle">
                  <div className="flex items-center justify-center h-full"  onClick={() => handleToggle(item.attID)}>
                    {item.Selected && <Check className="w-6 h-6" />}
                  </div>
                </td>
                <td
                  className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer"
                  onClick={() => handleToggle(item.attID)}
                >
                  {item.attID}
                </td>
                <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                  <Input
                    placeholder="Enter..."
                    value={item.Label}
                    onChange={(e) => handleLabelChange(item.attID, e.target.value)}
                    className="w-full text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <Button
          onClick={handleOnSave}
          disabled={!changeInAttr} 
          className="w-fit self-center mb-3 bg-[#1A33A9] dark:bg-white cursor-pointer">
             Save Changes
          </Button>      

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
               You have unsaved changes. Are you sure you want to switch the profile? Unsaved data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleOnSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminSettings;
