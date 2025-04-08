import React, { useState } from "react";
import { mockData } from "@/Constants/Data";
import { columns } from "@/Constants/Columns";
import { Input } from "../ui/input";
import { ArrowUpDown } from "lucide-react";
import { Search } from "lucide-react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

const MyDocuments = () => {

  const [data, setData] = useState(mockData);
  const [sorting,setSorting] = useState([]);
  const [globalFilter,setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state:{
      sorting,
      globalFilter,
      pagination,
    },
    getCoreRowModel:getCoreRowModel(),

    onSortingChange:setSorting,
    getSortedRowModel:getSortedRowModel(),

    onGlobalFilterChange:setGlobalFilter,
    getFilteredRowModel:getFilteredRowModel(),

    onPaginationChange:setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-5 lg:px-15 max-w-screen object-contain">

          {/* Search Functionality */}
          <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
              <Input
              placeholder="Search docs..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-[70%] lg:w-[60%] border-black border-2 focus:border-gray-800 px-12"
            />
            
          </div>

          {/* Table */}
          <div className="overflow-auto border-black rounded shadow-md shadow-blue-800 max-h-[55vh] my-4">
            <table className="border-collapse w-full h-full ">
              <thead className="bg-[#1A33A9] text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                        
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowUpDown size={16} />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getPaginationRowModel().rows.map((row) => (
                  <tr key={row.id} className="even:bg-gray-200">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between px-1 gap-2">
                <div className="flex">
                    <label htmlFor="pageSize" className="text-sm font-medium mt-1 mr-0.5">
                      Rows per page:
                    </label>
                    <Input
                      id="pageSize"
                      type="number"
                      min={1}
                      defaultValue={5}
                      value={table.getState().pagination.pageSize}
                      onChange={(e) =>
                        setPagination((prev) => ({
                          ...prev,
                          pageIndex: 0,
                          pageSize: Number(e.target.value),
                        }))
                      }
                      
                      className="w-15 border-blue-900 border-2"
                    />
                </div>
                <div className="flex items-center lg:gap-3 gap-1">
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-1 py-1 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <span className="text-sm">
                      Page{" "}
                      <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                      </strong>
                    </span>

                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-1 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
              </div>
          </div>
    </div>
  );
};

export default MyDocuments;
