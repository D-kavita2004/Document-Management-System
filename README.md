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

const RolePermission = () => {
  const [roles, setRoles] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/roles/fetchRoles`, { withCredentials: true });
      setRoles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoleSpecificPermissions = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/permissions/rolePermissions`,
        { id },
        { withCredentials: true }
      );
      setRolePermissions(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTogglePermissions = (id) => {
    setRolePermissions((prev) =>
      prev.map((permission) =>
        permission._id === id ? { ...permission, approved: !permission.approved } : permission
      )
    );
  };

  const handleUpdateRolePermissions = async (roleId) => {
    try {
      setChangesSaved(true);
      const res = await axios.post(
        `${BASE_URL}/permissions/update-role-permissions`,
        { updatedPermissionList: rolePermissions, roleId: roleId },
        { withCredentials: true }
      );
      console.log(res.data);
      setChangesSaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto p-3 mt-10 md:w-[70%] max-h-[80%] lg:max-h-[50%] overflow-y-auto bg-gray-400">
      <Accordion type="single" collapsible> {/* ✅ Single accordion wrapping all */}
        {roles.map((roleData) => (
          <AccordionItem key={roleData._id} value={roleData.roleName}>
            <AccordionTrigger
              onClick={() => {
                fetchRoleSpecificPermissions(roleData._id);
              }}
              className="font-bold text-xl"
            >
              {roleData.roleName}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <div className="w-full flex justify-items-start flex-wrap gap-4">
                {Array.isArray(rolePermissions) &&
                  rolePermissions.length > 0 &&
                  rolePermissions.map((data) => (
                    <div key={data._id} className="flex items-center gap-2">
                      <Checkbox
                        id={data.permissionName}
                        checked={data.approved}
                        onCheckedChange={() => handleTogglePermissions(data._id)}
                      />
                      <Label htmlFor={data.permissionName}>{data.permissionName}</Label>
                    </div>
                  ))}
              </div>
              <Button
                className="w-fit cursor-pointer my-3"
                disabled={changesSaved}
                onClick={() => {
                  handleUpdateRolePermissions(roleData._id);
                }}
              >
                Save Changes
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RolePermission;
