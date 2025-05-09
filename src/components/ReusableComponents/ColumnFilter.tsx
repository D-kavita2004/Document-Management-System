import { useState } from "react";
import {
      DropdownMenu,
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ColumnFilter = ({table}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
      <div className="flex justify-center items-center">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <Button variant="outline">Filter Columns</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Columns:</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem
                onSelect={(e) => {
                  e.preventDefault();
                  const toggleableColumns = table
                    .getAllColumns()
                    .filter((col) => col.id !== "dID" && col.id !== "dDocName");

                  const allVisible = toggleableColumns.every((col) => col.getIsVisible());

                  toggleableColumns.forEach((col) => {
                    col.toggleVisibility(!allVisible);
                  });
                }}
                className="font-semibold"
              >
                Toggle All
          </DropdownMenuCheckboxItem>


          {table.getAllColumns().map((column) => {
            const isLocked = (column.id === "dID" || column.id === "dDocName") ;
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                disabled={isLocked}
                checked={column.getIsVisible()}
                onSelect={(e) => {
                  e.preventDefault(); // prevents the dropdown from closing
                  if(!isLocked){
                    column.toggleVisibility(!column.getIsVisible());
                  }
                }}
              >
                {typeof column.columnDef.header === "function"
                  ? column.columnDef.header()
                  : column.columnDef.header ?? column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ColumnFilter;