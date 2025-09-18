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
  const [permissionsList, setPermissionsList] = useState([]);
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
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAvailablePermissions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/permissions/all-permissions`, {
        withCredentials: true,
      });
      setPermissionsList(res.data);
      console.log("Hello",res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchAvailablePermissions();
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
      console.log("RoleSpecificPermissions",res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

const handleTogglePermissions = (id: string) => {
  setIsChanged(true);

  setRolePermissions((prev) => {
    // if ID already exists, remove it (uncheck)
    if (prev.includes(id)) {
      return prev.filter((permId) => permId !== id);
    } else {
      // otherwise, add it (check)
      return [...prev, id];
    }
  });
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
    <div className="mx-auto mt-10 md:w-[70%] max-h-[70%] lg:max-h-[58%] overflow-y-auto rounded-xl bg-white shadow-md p-6">
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

            <AccordionContent className="p-4 bg-white rounded-b-lg border-t max-h-200 overflow-y-auto">
              {loading && activeRoleId === roleData._id ? (
                <p className="text-gray-500 italic">Loading permissions...</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 break-words">
                    {Array.isArray(permissionsList) &&
                      permissionsList.length > 0 &&
                      permissionsList.map((data) => (
                          <div
                          key={data}
                            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100"
                          >
                            <Checkbox
                              id={data.permissionName}
                              checked={rolePermissions.includes(data._id)}
                              onCheckedChange={() => handleTogglePermissions(data._id)}
                            />
                            <Label
                              htmlFor={data.permissionName}
                              className="text-sm font-medium text-gray-700 break-words whitespace-normal leading-snug cursor-pointer"
                            >
                              {(data.permissionName).replaceAll("_"," ")}
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











import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [breadcrumb, setBreadcrumb] = useState({
    name: "",
    path: "/Settings",
  });
  return (
    <div className="w-full h-screen p-6 overflow-y-auto">

      <div className="flex items-center justify-center gap-2 mb-6">
        <p
          className="text-2xl font-bold text-center cursor-pointer"
          onClick={() => {
            navigate("/Settings");
            setBreadcrumb((prev) => ({
              ...prev,
              name: "",
            }));
          }}
        >
          Settings
        </p>
          {
              breadcrumb.name && (
                <>
                  <ChevronRight className="w-6 h-6 text-gray-500" />
                  <p
                    className="text-2xl font-bold text-center cursor-pointer"
                    onClick={() => navigate(breadcrumb.path)}
                  >
                    {breadcrumb.name}
                  </p>
                </>
              )
          }
      </div>
      <Outlet context={{ setBreadcrumb }} />
    </div>
  );
};

export default SettingsPage;
