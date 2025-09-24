import axios from 'axios';
import { useEffect,useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';
import { toast } from 'sonner';

const RoleAssignment = () => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const [allUsers,setAllUsers] = useState([]);
      const [allRoles,setallRoles] = useState([]);
      const [updatedUserData,setUpdatedUserData] = useState([]);

      const getAllTheRoles = async()=>{
            try{
                  const res = await axios.get(`${BASE_URL}/roles/fetchRoles`,{withCredentials:true});
                  setallRoles(res.data.data);
                  console.log(res.data.data);
            }
            catch(error){
                  console.log(error);
            }
      }
      const handleGetAllUsers = async()=>{
            try{
                  const res = await axios.get(`${BASE_URL}/users/AllUsers`,{withCredentials:true});
                  setAllUsers(res?.data?.data);
                  console.log(res?.data?.data);
            }
            catch(error){
                  console.log(error);
            }
      }
      const handleChangeInRole = (newRole,userObj,idx) =>{

            if( newRole === allUsers[idx]?.role?.roleName){
                  return;
            }else{
                  const user = updatedUserData.find((user)=>user?._id === userObj?._id);

                  const newRoleId = allRoles.find((role)=> role.roleName === newRole);
                  const newRoleData = {_id:userObj._id, role:newRoleId,};

                  if(user){ 
                        const newData = updatedUserData.map((user)=>{
                             return (user._id === userObj._id) ? newRoleData : user;
                        })
                        setUpdatedUserData(newData);
                  }else{
                        
                        setUpdatedUserData((item)=>[...item, newRoleData]);
                  }
            }
      }
      const saveRoleChanges = async()=>{
            try{
                  const res = await axios.put(`${BASE_URL}/users/changeRoles`,{data:updatedUserData},{withCredentials:true});
                  console.log(res);
                  toast.success(res?.data?.message);
                  updatedUserData.length = 0;
                  handleGetAllUsers();
            }
            catch(error){
                  console.log(error?.response);
                  toast.error(error.response?.data?.message || "Roles are not assigned");
            }
      }

      useEffect(()=>{
            handleGetAllUsers();
            getAllTheRoles();
      },[])

  return (
      <div className='flex flex-col justify-center mx-aut0'>
            <div className="max-h-[85%] flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%] my-5">
            <table className="border-collapse text-wrap h-full ">
            <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
                  <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  </tr>
            </thead>
            <tbody>
                  {
                  allUsers.map((user,index)=>(
                        <tr key={index} className="even:bg-gray-200 dark:bg-[#3b3636]">
                              <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                                    <div className="flex items-center justify-center h-full">
                                   {user.username ? user.username : (user.firstName + " " + user.lastName)}

                                    {/* {user.firstName + " " + user.lastName} */}
                                    </div>
                              </td>
                              <td className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer">
                                    {user?.email}
                              </td>
                              <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                                    <Select defaultValue={user?.role?.roleName} onValueChange={(newRole) => handleChangeInRole(newRole, user, index)}>
                                          <SelectTrigger className="w-[180px] cursor-pointer">
                                                <SelectValue placeholder="Your Profile" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                      {
                                                            allRoles.length!=0 && allRoles.map((role)=>(
                                                                 <SelectItem value={role.roleName}>{role.roleName}</SelectItem> 
                                                            ))
                                                      }
                                                </SelectGroup>
                                          </SelectContent>
                                    </Select>
                              </td>
                        </tr>                        
                  ))
                  }

            </tbody>
            </table>
            </div>
            <Button className='w-fit mx-auto' onClick={saveRoleChanges} disabled={updatedUserData.length === 0}>Save Changes</Button>
      </div>
  )
}

export default RoleAssignment;


























import axios from "axios";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Role = {
  _id: string;
  roleName: string;
};

type User = {
  _id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: Role;
};

const RoleAssignment = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [updatedUserData, setUpdatedUserData] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  // ✅ Columns definition for TanStack Table
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Name",
      cell: ({ row }) =>
        row.original.username
          ? row.original.username
          : `${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Select
          defaultValue={row.original.role?.roleName}
          onValueChange={(newRole) =>
            handleChangeInRole(newRole, row.original)
          }
        >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              {allRoles.map((role) => (
                <SelectItem key={role._id} value={role.roleName}>
                  {role.roleName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
  ];

  // ✅ TanStack Table setup
  const table = useReactTable({
    data: allUsers,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ✅ Handle role change
  const handleChangeInRole = (newRole: string, userObj: User) => {
    if (newRole === userObj?.role?.roleName) return;

    const newRoleId = allRoles.find((role) => role.roleName === newRole);
    if (!newRoleId) return;

    const newRoleData = { _id: userObj._id, role: newRoleId };

    const existing = updatedUserData.find((u) => u._id === userObj._id);
    if (existing) {
      setUpdatedUserData((prev) =>
        prev.map((u) => (u._id === userObj._id ? newRoleData : u))
      );
    } else {
      setUpdatedUserData((prev) => [...prev, newRoleData]);
    }
  };

  // ✅ Save role changes
  const saveRoleChanges = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/users/changeRoles`,
        { data: updatedUserData },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      setUpdatedUserData([]);
      handleGetAllUsers();
    } catch (error: any) {
      console.log(error?.response);
      toast.error(
        error.response?.data?.message || "Roles are not assigned"
      );
    }
  };

  // ✅ Fetch roles
  const getAllTheRoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/roles/fetchRoles`, {
        withCredentials: true,
      });
      setAllRoles(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch users
  const handleGetAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/AllUsers`, {
        withCredentials: true,
      });
      setAllUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
    getAllTheRoles();
  }, []);

  return (
    <div className="p-6 space-y-4">
      {/* 🔍 Global Search */}
      <Input
        placeholder="Search users..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-full"
      />

      {/* 📊 Table */}
      <div className="max-h-[85%] flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%] my-5">
        <table className="border-collapse text-wrap h-full">
          <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-200 dark:bg-[#3b3636]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-2"
          >
            Next
          </Button>
        </div>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>

      {/* 💾 Save Changes */}
      <Button
        className="w-fit mx-auto"
        onClick={saveRoleChanges}
        disabled={updatedUserData.length === 0}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default RoleAssignment;
