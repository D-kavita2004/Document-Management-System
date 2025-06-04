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
const AdminSettings = () => {

const [attributes, setAttributes] = useState([]);

const formAttributes = () => {
  const data: Record<string, { Selected: boolean; Label: string }> = {};
  documentKeys.forEach((key) => {
    data[key] = { Selected: false, Label: "" };
  });
  setAttributes(data);
  console.log(data);
};

useEffect(()=>{
  formAttributes();
},[])

const handleToggle = (key) => {
  setAttributes(prev => ({
    ...prev,
    [key]: {
      ...prev[key],
      Selected: !prev[key].Selected,
    }
  }));
};


  return (
    <div className='flex pt-4 flex-col space-y-4 overflow-auto max-h-[85vh] scrollbar-hide'>
        {/* Profile Selection */}
        <div className='flex justify-center space-x-6 text-md'>
          <Label className='text-md'>Select the Profile : </Label>
          <Select>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Your Profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Profiles</SelectLabel>
                <SelectItem value="apple">Admin</SelectItem>
                <SelectItem value="banana">HR</SelectItem>
                <SelectItem value="blueberry">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Attributes */}
        <div className="max-h-[85%] pt-2 flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%]">
            <table className="border-collapse w-full h-full">
              <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10 ">
                  <tr>
                      <th className="px-2 py-2">All Attributes</th>
                      <th className="px-2 py-2">Selected Attributes</th>
                      <th className="px-2 py-2">New Label</th>
                  </tr>
              </thead>
              <tbody>
                {
                  Object.keys(attributes).map((key)=>(
                    <tr className="even:bg-gray-200 dark:bg-[#3b3636]">
                        <td className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer" onClick={()=>handleToggle(key)}>{key}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center align-middle">
                          <div className="flex items-center justify-center h-full">
                            {attributes[key].Selected && <Check className="w-6 h-6" />}
                          </div>
                        </td>

                        <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                          <Input
                            placeholder="Enter..."
                            className="w-full text-center"
                          />
                        </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>          
        </div>

        <Button className="w-fit self-center mb-3 bg-[#1A33A9] dark:bg-white cursor-pointer">Save Changes</Button>
    </div>
  );
};

export default AdminSettings;

        // {/* Available Attributes */}
        // <div className="flex flex-col gap-3 max-w-[45%] md:w-auto">
        //   <h3 className="font-bold">All available Attributes</h3>
        //   <div className="h-full overflow-y-auto">
        //     {documentKeys.map((key) => (
        //       <div key={key} className="flex items-center gap-3 mb-3">
        //         <Checkbox
        //           id={key}
        //           checked={selectedKeys.includes(key)}
        //           onCheckedChange={() => handleToggle(key)}
        //         />
        //         <Label htmlFor={key} className="cursor-pointer">{key}</Label>
        //       </div>
        //     ))}
        //   </div>
        // </div>

        // {/* Selected Attributes Table */}
        // <div className="flex flex-col gap-3 max-w-[45%]">
        //   <h3 className="font-bold">Selected Attributes</h3>
        //   {selectedKeys.length === 0 ? (
        //     <p className="text-sm italic text-gray-500">No Attributes selected</p>
        //   ) : (
        //     <div className="grid grid-cols-2 gap-3">
        //       <Label className="font-semibold">Original Key</Label>
        //       <Label className="font-semibold">New Label</Label>
        //       {selectedKeys.map((key) => (
        //         <div key={key} className="contents">
        //           <Label className="self-center">{key}</Label>
        //           <Input
        //             value={customLabels[key] || key}
        //             onChange={(e) => handleLabelChange(key, e.target.value)}
        //             placeholder="Enter new label"
        //             className="w-full"
        //           />
        //         </div>
        //       ))}
        //     </div>
        //   )}
        // </div>

          // <table className="border-collapse w-full h-full">
          //   <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
          //       <tr>
          //           <th>All Attributes</th>
          //           <th>Selected Attributes</th>
          //           <th>New Label</th>
          //       </tr>
          //   </thead>
          //   <tbody>
          //     {
          //       documentKeys.map((key)=>())
          //     }
          //   </tbody>
          //   </table>
         