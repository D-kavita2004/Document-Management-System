import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

const RolePermission = () => {
  const [roles, setRoles] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false); // to disable the button
  const [isChanged,setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRoleId, setActiveRoleId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/roles/fetchRoles`, {
        withCredentials: true,
      });
      setRoles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoleSpecificPermissions = async (id: string) => {
    try {
      setLoading(true);
      setActiveRoleId(id);
      const res = await axios.post(
        `${BASE_URL}/permissions/rolePermissions`,
        { id },
        { withCredentials: true }
      );
      setRolePermissions(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePermissions = (id: string) => {
    setIsChanged(true);
    setRolePermissions((prev) =>
      prev.map((permission) =>
        permission._id === id
          ? { ...permission, approved: !permission.approved }
          : permission
      )
    );
  };

  const handleUpdateRolePermissions = async (roleId: string) => {
    try {
      setChangesSaved(true);
      if(!isChanged){
        toast("There is no change to save", {
          icon: "ℹ️",
        });
        return;
      }
      const res = await axios.post(
        `${BASE_URL}/permissions/update-role-permissions`,
        { updatedPermissionList: rolePermissions, roleId: roleId },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsChanged(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err.response.statusText);
    } finally {
      setChangesSaved(false);
    }
  };

  return (
    <div className="mx-auto mt-10 md:w-[70%] max-h-[70%] lg:max-h-[70%] overflow-y-auto rounded-xl bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Manage Role Permissions
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {roles.map((roleData) => (
          <AccordionItem
            key={roleData._id}
            value={roleData.roleName}
            className="border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <AccordionTrigger
              onClick={() => fetchRoleSpecificPermissions(roleData._id)}
              className="px-4 py-3 text-lg font-semibold text-gray-700"
            >
              {roleData.roleName}
            </AccordionTrigger>

            <AccordionContent className="p-4 bg-white rounded-b-lg border-t">
              {loading && activeRoleId === roleData._id ? (
                <p className="text-gray-500 italic">Loading permissions...</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 break-words">
                    {Array.isArray(rolePermissions) &&
                      rolePermissions.length > 0 &&
                      rolePermissions.map((data) => (
                          <div
                            key={data._id}
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100"
                          >
                            <Checkbox
                              id={data.permissionName}
                              checked={data.approved}
                              onCheckedChange={() => handleTogglePermissions(data._id)}
                            />
                            <Label
                              htmlFor={data.permissionName}
                              className="text-sm font-medium text-gray-700 break-words whitespace-normal leading-snug"
                            >
                              {data.permissionName}
                            </Label>
                          </div>

                      ))}
                  </div>

                  <div className="mt-4">
                    <Button
                      className="w-fit cursor-pointer"
                      disabled={changesSaved}
                      onClick={() => handleUpdateRolePermissions(roleData._id)}
                    >
                      {changesSaved ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RolePermission;
