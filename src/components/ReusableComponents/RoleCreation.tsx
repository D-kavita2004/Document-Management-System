import axios from "axios";
import { Button } from "../ui/button";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { UserPen, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RoleCreation = () => {
  const Base_url = import.meta.env.VITE_API_BASE_URL;

  const roleNameRef = useRef(null);
  const roleDescRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("create");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [existingRoles, setExistingRoles] = useState([]);

  const [roleNameErr, setRoleNameErr] = useState("");
  const [descErr, setDescErr] = useState("");

  // fetch roles
  const fetchExistingRoles = async () => {
    try {
      const res = await axios.get(`${Base_url}/roles/fetchRoles`, {
        withCredentials: true,
      });
      setExistingRoles(res?.data?.data || []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Could not fetch the Existing roles"
      );
    }
  };

  // util fn
  const removeExtraSpaces = (str) =>
    (str || "").replace(/\s+/g, " ").trim();

  // insert/update handler
  const handleInsertRole = async (e) => {
    e.preventDefault();
    setRoleNameErr("");
    setDescErr("");

    const roleName = roleNameRef?.current?.value;
    const cleanedText = removeExtraSpaces(roleDescRef?.current?.value);
    let hasError = false;

    if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/.test(roleName)) {
      setRoleNameErr(
        "Role name must be 3–15 characters, start with a letter, and contain only letters, numbers, hyphens (-), or underscores (_)."
      );
      hasError = true;
    }

    if (cleanedText.length < 10 || cleanedText.length > 200) {
      setDescErr("Description should be between 10 and 200 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      const api_url =
        action === "create"
          ? `${Base_url}/roles/addRole`
          : `${Base_url}/roles/updateRole`;

      const payload =
        action === "create"
          ? { roleName, description: cleanedText }
          : { id: selectedRoleId, roleName, description: cleanedText };

      const res = await axios.post(api_url, payload, {
        withCredentials: true,
      });

      toast.success(res?.data?.message);
      fetchExistingRoles();
      setOpen(false);

      // reset
      roleNameRef.current.value = "";
      roleDescRef.current.value = "";
      setSelectedRoleId(null);
      setAction("create");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error occurred");
    }
  };

  // delete handler
  const deleteRole = async (id) => {
    try {
      const res = await axios.post(
        `${Base_url}/roles/deleteRole`,
        { roleId: id },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      fetchExistingRoles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting role");
    }
  };

  useEffect(() => {
    fetchExistingRoles();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Add Role Button */}
      <div className="mb-10 mt-3">
        <AlertDialog open={open} onOpenChange={(val) => {
              setOpen(val);
              if (val) {
                setDescErr("");
                setRoleNameErr("");
                setAction("create");
              }
          }}>
          <AlertDialogTrigger asChild>
            <Button
              className="px-6 py-2 rounded-md bg-[#1A33A9] text-white dark:hover:text-black shadow-md"
              onClick={() => {
                setAction("create");
                setSelectedRoleId(null);
              }}
            >
              Create New Role
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <form onSubmit={handleInsertRole}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {action === "create" ? "Add Role" : "Edit Role"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {action === "create"
                    ? "You can create a custom role here"
                    : "Update the role details"}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid mt-4 mb-5 gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="newrole">Role Name : </Label>
                  <input
                    id="newrole"
                    placeholder="Enter role name..."
                    required
                    ref={roleNameRef}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"
                  />
                  {roleNameErr && (
                    <p className="text-red-700 text-sm">{roleNameErr}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="desc">Description : </Label>
                  <textarea
                    id="desc"
                    placeholder="Write the role description here"
                    ref={roleDescRef}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:border-gray-700 dark:bg-white dark:text-black"
                    rows={3}
                  />
                  {descErr && (
                    <p className="text-red-700 text-sm">{descErr}</p>
                  )}
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Save changes</Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Role List */}
      <div className="flex flex-wrap gap-5 max-w-[80%] max-h-[50vh] overflow-y-auto">
        {existingRoles.map((roleData) => (
          <div
            key={roleData._id}
            className="rounded-lg shadow-md border bg-gray-100 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 w-55"
          >
            <div className="flex items-center flex-wrap justify-between gap-2 p-3">
              <div className="max-w-[70%] overflow-hidden flex break-all flex-wrap font-bold">
                {roleData.roleName}
              </div>

              <div className="flex items-center gap-2">
                {/* Edit Role */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <UserPen
                      className="cursor-pointer"
                      onClick={() => {
                        setAction("update");
                        setSelectedRoleId(roleData._id);
                        setOpen(true);
                        setDescErr("");
                        setRoleNameErr("");
                        setTimeout(() => {
                          roleNameRef.current.value = roleData.roleName;
                          roleDescRef.current.value = roleData.description;
                        }, 0);
                      }}
                    />
                  </AlertDialogTrigger>
                </AlertDialog>

                {/* Delete Role */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this role.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteRole(roleData._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="p-3 text-gray-600 dark:text-gray-400">{roleData.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleCreation;
