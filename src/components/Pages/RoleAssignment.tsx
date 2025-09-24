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
          value={row.original.role?.roleName}
          onValueChange={(newRole) => handleChangeInRole(newRole, row.original)}
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
  initialState: {
    pagination: {
      pageSize: 7, // 👈 default rows per page
    },
  },
  // 👇 Custom filter for username + email + role
  globalFilterFn: (row, _columnId, filterValue) => {
    const search = filterValue.toLowerCase();

    const name =
      row.original.username ||
      `${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`;

    const email = row.original.email ?? "";
    const role = row.original.role?.roleName ?? "";

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      role.toLowerCase().includes(search)
    );
  },
});


  // ✅ Handle role change
const handleChangeInRole = (newRole: string, userObj: User) => {
  if (newRole === userObj?.role?.roleName) return;

  const newRoleObj = allRoles.find((role) => role.roleName === newRole);
  if (!newRoleObj) return;

  // update temporary state for saving
  const newRoleData = { _id: userObj._id, role: newRoleObj._id };

  setUpdatedUserData((prev) => {
    const existing = prev.find((u) => u._id === userObj._id);
    if (existing) {
      return prev.map((u) => (u._id === userObj._id ? newRoleData : u));
    }
    return [...prev, newRoleData];
  });

  // also update UI immediately
  setAllUsers((prev) =>
    prev.map((u) =>
      u._id === userObj._id ? { ...u, role: newRoleObj } : u
    )
  );
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
    <div className=" space-y-4 lg:max-w-[80%] mx-auto max-w-[100%]">
      {/* 🔍 Global Search */}
      <div className="flex items-center justify-between w-full">
          <Input
            placeholder="Search users..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-[70%]"
          />
          <Button
            className="w-fit"
            onClick={saveRoleChanges}
            disabled={updatedUserData.length === 0}
          >
            Save
          </Button>
      </div>

      {/* 📊 Table */}
      <div className="overflow-auto border rounded-md shadow-md max-h-[70vh]">
        <table className="w-full border-collapse">
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
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="even:bg-gray-200 dark:bg-[#3b3636]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-2 py-1 text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              )}
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
            className="ml-1"
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

    </div>
  );
};

export default RoleAssignment;
