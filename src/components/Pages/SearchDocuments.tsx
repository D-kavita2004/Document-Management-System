import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { Table } from "../ReusableComponents/Table";
import GridDocs from "../ReusableComponents/GridDocs";
import { Input } from "@/components/ui/input";
import { LayoutGrid } from "lucide-react";
import { List } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useDocTable } from "@/components/Hooks/useDocTable";
import axios from "axios";
import { toast } from "sonner";
import ColumnFilter from "../ReusableComponents/ColumnFilter";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchDocuments = () => {
  const { table, globalFilter, setGlobalFilter, setPagination, setData } = useDocTable();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  useEffect(() => {
    setGlobalFilter(query);
  }, [query]);

  const [DisplayFormat, setDisplayFormat] = useState(false); //default table will be shown
  const commandRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [debouncedValue] = useDebounceValue(globalFilter, 300);

  const filteredRows = useMemo(() => {
    return table.getFilteredRowModel().rows;
  }, [debouncedValue]);

  // Suggestions while searching
  const handleSuggestions = (value:string) => {
    setGlobalFilter(value);
    const searchSuggestions = filteredRows.slice(0, 5).map((row) => row.original);
    setSuggestions(searchSuggestions);
  };
  useEffect(() => {
    if (!globalFilter.trim()) setSuggestions([]);
  }, [globalFilter]);
  
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

  //Search Api Logic
  const handleSearchCall = async() => {
    try {
      const response = await axios.get(`http://localhost:8080/api/search`, {
        params: { searchText: debouncedValue },
      });
  
      if (response.status === 200 && Array.isArray(response.data)) {
        const processedData = response.data.map((obj) => {
          const { customMetadataMap = {}, ...rest } = obj;
          return { ...rest, ...customMetadataMap };
        });
        setData(processedData);
      } else {
        toast.error(`Unexpected response format or status: ${response.status}`);
      }
  }
    catch{
      toast.error(`Something went wrong`);
    }
  }

  useEffect(() => {
    if (!debouncedValue.trim()) return; // Prevents call if input is empty or spaces
    handleSearchCall(); // Only call when valid input exists
  }, [debouncedValue]);

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
                    {suggestions.length > 0 && (
                      <CommandList className="absolute top-full w-[70%] lg:w-[60%] left-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-background shadow-md z-50">
                        <CommandEmpty className="dark:text-white">
                          No results found.
                        </CommandEmpty>
                        <CommandGroup heading="Suggestions">
                          {suggestions.map((item, index) => {
                            return (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  setGlobalFilter(item.dDocName);
                                  setSuggestions([]);
                                }} // or item.name, etc.
                              >
                                {item.dDocName}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    )}
                  </Command>
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                      {/* Column Filters Button */}
                      <ColumnFilter table={table}/>

                      {/* Layout Change buttons to toggle between table and grid layout*/}
                      <div className="flex gap-2 border-2 justify-center items-center">
                        <div
                          className={`p-1 size-full flex justify-center items-center ${
                            DisplayFormat && "bg-[#1a32a9] dark:bg-white"
                          }`}
                          onClick={() => {
                            setDisplayFormat(true);
                          }}
                        >
                          <List
                            className={`size-[6vmin] rounded ${
                              DisplayFormat && "text-white dark:text-black"
                            }`}
                          />
                        </div>

                        <div
                          className={`p-1 size-full flex justify-center items-center ${
                            !DisplayFormat && "bg-[#1a32a9]  dark:bg-white"
                          }`}
                          onClick={() => {
                            setDisplayFormat(false);
                          }}
                        >
                          <LayoutGrid
                            className={`size-[6vmin] rounded ${
                              !DisplayFormat && "text-white dark:text-black"
                            }`}
                          />
                        </div>
                      </div>
                </div>
          </div>

      {globalFilter && table.getFilteredRowModel().rows.length > 0 ? (
        <>
          {/* Document Display */}
          <div className="overflow-auto border-black rounded shadow-md shadow-gray-700 max-h-[55vh] my-4">
            {DisplayFormat ? (
              <Table table={table} />
            ) : (
              <GridDocs table={table} />
            )}
          </div>

          <div className="flex justify-between px-1 gap-2">
            {/* Rows per Page */}
            <div className="flex">
              <label
                htmlFor="pageSize"
                className="text-sm font-medium mt-1 mr-0.5"
              >
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

            {/* Page Navigation (pagination) */}
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
      ) : (
        <div className="flex justify-center items-center h-[55vh]">
          <h2 className="text-lg font-semibold">No Search Results</h2>
        </div>
      )}
    </div>
  );
};

export default SearchDocuments;
