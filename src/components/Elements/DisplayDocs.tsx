import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "./Table";
import GridDocs from "./GridDocs";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {LayoutGrid} from "lucide-react";
import {List} from "lucide-react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

const DisplayDocs = ({mockData,columns,headerSearch}) => {

  const [DisplayFormat,setDisplayFormat] = useState(true) //default table will be shown

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
  useEffect(()=>{
      setGlobalFilter(headerSearch);
  },[headerSearch])


  return (
    <div className="p-5 lg:px-15 max-w-screen object-contain">

          {/* Search Functionality */}
          <div className="relative flex justify-between items-center">

              {/* Search bar */}
              <div className=" w-[70%] lg:w-[60%]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:bg-[#3C3C3C]" />
                  <Input
                  placeholder="Search docs..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className=" border-black border-2 focus:border-gray-800 px-12"
                  />
              </div>
              {/* Layout Change */}
              <div className="flex gap-2 border-2 justify-center items-center">
                  <div className={`p-1 size-full flex justify-center items-center ${DisplayFormat && "bg-[#1a32a9] dark:bg-white"}`} onClick={()=>{setDisplayFormat(true)}}><List className={`size-[6vmin] rounded ${DisplayFormat && "text-white dark:text-black"}`}/></div>

                  <div  className={`p-1 size-full flex justify-center items-center ${!DisplayFormat && "bg-[#1a32a9]  dark:bg-white"}`} onClick={()=>{setDisplayFormat(false)}}><LayoutGrid className={`size-[6vmin] rounded ${!DisplayFormat && "text-white dark:text-black"}`}/></div>
              </div>
            
          </div>

          {/* Table */}
          <div className="overflow-auto border-black rounded shadow-md shadow-gray-700 max-h-[55vh] my-4">
                {
                  DisplayFormat==true ? 
                  (
                    <Table table={table}/>
                  ):
                  (
                    <GridDocs table={table}/>
                  )
                }
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
                      
                      className="w-15 border-blue-900 border-2 dark:border-white"
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

export default DisplayDocs;
