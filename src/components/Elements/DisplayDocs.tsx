import React, { useState, useEffect, useRef } from "react";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


const DisplayDocs = ({mockData,columns,headerSearch}) => {

  const [DisplayFormat,setDisplayFormat] = useState(true) //default table will be shown

  const [data, setData] = useState(mockData);
  const [suggestions,setSuggestions] = useState([]);
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
  const handleSuggestions = (value) => {
    setGlobalFilter(value);
  
    const filteredRows = table.getFilteredRowModel().rows;
    const searchSuggestions = filteredRows.slice(0, 5).map((row) => row.original);
    setSuggestions(searchSuggestions);
    console.log(suggestions);
  };

  const commandRef = useRef(null);
  useEffect(() => {
      function handleClickOutside(event) {
        if (commandRef.current && !commandRef.current.contains(event.target)) {
          setSuggestions([]);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);
  
  useEffect(()=>{
      setGlobalFilter(headerSearch);
  },[headerSearch])


  return (
    <div className="p-5 lg:px-15 max-w-screen object-contain">

          {/* Search Functionality */}
          <div className="relative flex justify-between items-center">
              
                {/* Search Functionality */}
                <div className="w-[70%] lg:w-[60%] z-100" ref={commandRef}>
                    <Command className="w-full dark:bg-white dark:text-black border-2 border-black">
                        <CommandInput 
                          placeholder="Search docs..." 
                          value={globalFilter}
                          onValueChange={handleSuggestions}
                        />
                        {
                          suggestions.length > 0 && (
                            <CommandList className="absolute top-full w-[70%] lg:w-[60%] left-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-background shadow-md z-50 ">
                            <CommandEmpty className="dark:text-white">No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                              {suggestions.map((item, index) => (
                                <CommandItem 
                                  key={index} 
                                  onSelect={() => 
                                    {setGlobalFilter(item.fileName);
                                    setSuggestions([]);}} // or item.name, etc.
                                >
                                  {item.fileName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                          )
                        }

                    </Command>
                </div>

                {/* Layout Change */}
                <div className="flex gap-2 border-2 justify-center items-center">
                    <div className={`p-1 size-full flex justify-center items-center ${DisplayFormat && "bg-[#1a32a9] dark:bg-white"}`} onClick={()=>{setDisplayFormat(true)}}><List className={`size-[6vmin] rounded ${DisplayFormat && "text-white dark:text-black"}`}/></div>

                    <div  className={`p-1 size-full flex justify-center items-center ${!DisplayFormat && "bg-[#1a32a9]  dark:bg-white"}`} onClick={()=>{setDisplayFormat(false)}}><LayoutGrid className={`size-[6vmin] rounded ${!DisplayFormat && "text-white dark:text-black"}`}/></div>
                </div>
            
          </div>

          {/* Document Display */}
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
