import dummyData from "@/Constants/DummmyDocs";
import { columns } from "@/Constants/Columns";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Table } from "../Table";
import GridDocs from "../GridDocs";
import { Input } from "@/components/ui/input";
import {LayoutGrid} from "lucide-react";
import {List} from "lucide-react";
import axios from "axios";
import { useDebounceValue } from 'usehooks-ts';
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const SearchDocuments = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [DisplayFormat,setDisplayFormat] = useState(true);  //default table will be shown
  const commandRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  const [data, setData] = useState(dummyData);
  const [suggestions,setSuggestions] = useState([]);
  const [sorting,setSorting] = useState([]);
  const [globalFilter,setGlobalFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [debouncedValue, setValue] = useDebounceValue(globalFilter, 500)
  useEffect(()=>{
    const processeddata = dummyData.map((obj)=>{
      const obj2 = {...obj,...obj.customMetadataMap}
        delete obj2.customMetadataMap;
        return obj2
    })
    console.log(processeddata);
    setData(processeddata);
  },[]);
  // Tanstack table instance
  const table = useReactTable({
    data,
    columns,
    state:{
      columnVisibility,
      sorting,
      globalFilter,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel:getCoreRowModel(),

    onSortingChange:setSorting,
    getSortedRowModel:getSortedRowModel(),

    onGlobalFilterChange:setGlobalFilter,
    getFilteredRowModel:getFilteredRowModel(),

    onPaginationChange:setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });
  
  // Suggestions while searching
  const handleSuggestions = (value) => {
    setGlobalFilter(value);
    const filteredRows = table.getFilteredRowModel().rows;
    const searchSuggestions = filteredRows.slice(0, 5).map((row) => row.original);
    setSuggestions(searchSuggestions);
  };

  // creating state for the columns
  useEffect(() => {
    const visibilityMap: Record<string, boolean> = {};
    
    table.getAllColumns().forEach((col) => {
      if (col.id) {
        visibilityMap[col.id] = true; // false if you want them hidden by default
      }
    });
    setColumnVisibility(visibilityMap);
  }, []);
  
  // if you click outside the input box it will close the suggestions
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
      setGlobalFilter(query);
  },[query])

  const handleSearchCall = async()=>{
    // const SearchedData = await axios.get(http://localhost:8080/api/search?searchText=${globalFilter})
    // console.log(SearchedData);
    console.log("Api call made")
  }
  useEffect(()=>{
    handleSearchCall();
  },[debouncedValue])

  return (
      <div className="p-5 lg:px-15 max-w-screen object-contain">
  
            {/* Search Functionality */}
            <div className="relative flex justify-between items-center">  
                  {/* Search Functionality */}
                  <div className="w-[55%] lg:w-[60%]" ref={commandRef}>
                      <Command className="w-full dark:bg-white dark:text-black border-2 border-black">
                          <CommandInput 
                            placeholder="Search docs..." 
                            value={globalFilter}
                            onValueChange={handleSuggestions}
                          />
                          {
                            suggestions.length > 0 && (
                              <CommandList className="absolute top-full w-[70%] lg:w-[60%] left-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-background shadow-md z-50">
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
                  
                  {/* Filters */}
                  <div className="flex gap-3">
                          {/* Column Filters Button */}
                          <div className="flex justify-center items-center">
                              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>

                                  <DropdownMenuTrigger >
                                    <Button variant="outline">Filter Columns</Button>
                                  </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-56">
                                          <DropdownMenuLabel>Select Columns:</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                              
                                          <DropdownMenuCheckboxItem
                                              onSelect={(e) => {
                                                e.preventDefault();
                                                const allVisible = table.getAllColumns().every((col) => col.getIsVisible());
                                                table.getAllColumns().forEach((col) => col.toggleVisibility(!allVisible));
                                              }}
                                              className="font-semibold"
                                            >
                                              Toggle All
                                            </DropdownMenuCheckboxItem>


                                            {
                                              table.getAllColumns().map((column)=>{
                                                return (
                                                  <DropdownMenuCheckboxItem
                                                      key={column.id}
                                                      checked={column.getIsVisible()}
                                                      onSelect={(e) => {
                                                        e.preventDefault(); // prevents the dropdown from closing
                                                        column.toggleVisibility(!column.getIsVisible());
                                                      }}
                                                    >
                                                      {typeof column.columnDef.header === "function"
                                                        ? column.columnDef.header()
                                                        : column.columnDef.header ?? column.id}

                                                </DropdownMenuCheckboxItem>
                                                ) 

                                              })
                                            }
                                    </DropdownMenuContent>
                              </DropdownMenu>
                          </div>

                            {/* Layout Change buttons to toggle between table and grid layout*/}
                            <div className="flex gap-2 border-2 justify-center items-center">
                                <div className={`p-1 size-full flex justify-center items-center ${DisplayFormat && "bg-[#1a32a9] dark:bg-white"}`} onClick={()=>{setDisplayFormat(true)}}>
                                    <List className={`size-[6vmin] rounded ${DisplayFormat && "text-white dark:text-black"}`}/>
                                </div>

                                <div  className={`p-1 size-full flex justify-center items-center ${!DisplayFormat && "bg-[#1a32a9]  dark:bg-white"}`} onClick={()=>{setDisplayFormat(false)}}>
                                    <LayoutGrid className={`size-[6vmin] rounded ${!DisplayFormat && "text-white dark:text-black"}`} />
                                </div>
                            </div>
                  </div>
            </div>
  
            {
              globalFilter ?
              (
                <>
                  {/* Document Display */}
                  <div className="overflow-auto border-black rounded shadow-md shadow-gray-700 max-h-[55vh] my-4">
                      {
                          DisplayFormat
                          ? <Table table={table} />
                          : <GridDocs table={table} />
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
                            max={100}
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
                </>
              ):
              <div className="flex justify-center items-center h-[55vh]">
                  <h2 className="text-lg font-semibold">No Search Results</h2>
              </div>

            }
      </div>
          );
};

export default SearchDocuments;