import React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {EllipsisVertical} from "lucide-react";
import { flexRender } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
 

const GridDocs = ({ table }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const rows = table.getPaginationRowModel().rows;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">

        {rows.map((row) => {
          const nameCell = row.getVisibleCells().find(cell => cell.column.id === 'fileName'); 
          const dateCell = row.getVisibleCells().find(cell => cell.column.id === 'date'); 

          return (
            <div
              key={row.id}
              className="bg-white border border-gray-400 p-2 rounded shadow hover:shadow-md transition flex relative dark:bg-[#3b3636] dark:hover:bg-white dark:hover:text-black hover:text-white hover:bg-[#1A33A9]"
            >     
                <div className='absolute right-1 cursor-pointer'>
                  <DropdownMenu >
                      <DropdownMenuTrigger><div><EllipsisVertical/></div></DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setOpenDialog(true)}>Details</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Dialog Component */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Details</DialogTitle>
                        </DialogHeader>
                        {row.getVisibleCells().map((cell) => (
                            <div key={cell.id} className="flex gap-4">
                                <strong className="text-sm flex gap-1 items-center">
                                  {flexRender(cell.column.columnDef.header, cell.getContext())}:
                                </strong>
                                <div>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            </div>
                        ))}
                          <DialogFooter className="sm:justify-end">
                                <Button type="button" className='hover:bg-[#1A33A9] hover:shadow-md shadow-gray-700 text-white transition dark:text-black' onClick={() => setOpenDialog(false)}>
                                  Ok
                                </Button>
                          </DialogFooter>
                      </DialogContent>
                  </Dialog>

                  </div>
                  <div className='flex flex-col gap-1.5'>
                      <div className='font-bold'>{nameCell && flexRender(nameCell.column.columnDef.cell, nameCell.getContext())}</div>
                      <div className='text-sm'>{dateCell && flexRender(dateCell.column.columnDef.cell, dateCell.getContext())}</div>
                  </div>
                  
            </div>
          );
        })}

    </div>
  );
};

export default GridDocs;
