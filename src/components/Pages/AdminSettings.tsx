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
import { Checkbox } from "../ui/checkbox";
import { Label } from '../ui/label';
import { useState } from "react";

const AdminSettings = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setSelectedKeys(prev =>
      prev.includes(key)
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  return (
    <div className='flex pt-5 flex-col h-[83vh] space-y-4'>
      {/* Profile Selection */}
      <div className='flex justify-center space-x-6 text-md'>
        <Label className='text-md'>Select the Profile : </Label>
        <Select>
          <SelectTrigger className="w-[180px]">
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

      <div className="h-[90%] pt-2 flex justify-evenly">
        {/* Available Columns */}
        <div className="flex flex-col gap-3 max-w-[45%]">
          <h3 className="font-bold">All available Columns</h3>
          <div className="h-full overflow-y-auto">
            {documentKeys.map((key) => (
              <div key={key} className="flex items-center gap-3 mb-3">
                <Checkbox
                  id={key}
                  checked={selectedKeys.includes(key)}
                  onCheckedChange={() => handleToggle(key)}
                />
                <Label htmlFor={key}>{key}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Columns */}
        <div className="flex flex-col gap-3 max-w-[45%]">
          <h3 className="font-bold">Selected Columns</h3>
          <div className="h-full overflow-y-auto">
            {selectedKeys.length === 0 ? (
              <p className="text-sm italic text-gray-500">No columns selected</p>
            ) : (
              selectedKeys.map((key) => (
                <div key={key} className="flex items-center gap-3 mb-3">
                  <Label>{key}</Label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
