import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { documentKeys } from '@/Constants/Columns';
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
} from "@/components/ui/alert-dialog"

const AdminSettings = () => {

  type Attribute = {
  attID: string;
  Selected: boolean;
  Label: string;
};
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [initialState, setInitialState] = useState<Attribute[]>([]);

  const [showDialog,setShowDialog] = useState(false);
  const [changesSaved,setChangesSaved] = useState(false);
  const [profile,setProfile] = useState("Admin");
  const [changeInAttr,setChangeInAttr] = useState(false);

  const formAttributes = () => {
    const listOfAttributes = documentKeys.map((key) => ({
      attID: key,
      Selected: false,
      Label: "",
    }));
    console.log(listOfAttributes);
    return listOfAttributes;
  };

useEffect(() => {
  const initialAttrs = formAttributes();
  setAttributes([...initialAttrs]);
  setInitialState([...initialAttrs]);
}, []);


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

  const handleProfile = (value:string)=>{
    if(changeInAttr && !changesSaved){
      setShowDialog(true);
    }
    else{
      setProfile(value);
      setAttributes([...initialState]);
      setChangeInAttr(false);
      setChangesSaved(false);
    }
  }

  const handleOnSave = ()=>{
      setChangesSaved(true);
      alert("Changes saved successfully");
      console.log("Pofile",profile);
      console.log("attributes",attributes);
      console.log("ok");
  }
useEffect(() => {
  const isChanged = JSON.stringify(attributes) !== JSON.stringify(initialState);
  setChangeInAttr(isChanged);
}, [attributes, initialState]);


  return (
    <div className='flex pt-4 flex-col space-y-4 overflow-auto max-h-[85vh] scrollbar-hide'>
      {/* Profile Selection */}
      <div className='flex justify-center space-x-6 text-md'>
        <Label className='text-md'>Select the Profile : </Label>
        <Select onValueChange={handleProfile} value={profile}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Your Profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Profiles</SelectLabel>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="User">User</SelectItem>
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
                  <div className="flex items-center justify-center h-full">
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
