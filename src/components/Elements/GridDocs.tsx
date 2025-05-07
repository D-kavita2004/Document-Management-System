import { useState } from 'react';
import { Button } from '../ui/button';
import {EllipsisVertical} from "lucide-react";
import { flexRender } from '@tanstack/react-table';
import axios from "axios";
import { Separator } from "@/components/ui/separator"
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
  const [docDetails,setDocDetails] = useState("");
  const rows = table.getPaginationRowModel().rows;

    //Search Api Logic
    const fetchDetails = async(id) => {
      try{
        const details = await axios.get(`http://localhost:8080/api/content-info/${id}`)
        console.log(details.data);
        setDocDetails(details.data);
      }
      catch{
        alert("Data could not be fetched 😔😔😔😔");
      }
    };
    const BringDetails = (id)=>{
      fetchDetails(id);
      setOpenDialog(true);
      
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">

        {rows.map((row) => {
          const nameCell = row.getVisibleCells().find(cell => cell.column.id === 'dDocName'); 
          const dateCell = row.getVisibleCells().find(cell => cell.column.id === 'dInDate'); 

          return (
            <div
              key={row.id}
              className="bg-white border border-gray-400 p-2 rounded shadow hover:shadow-md transition flex relative dark:bg-[#3b3636] dark:hover:bg-white dark:hover:text-black hover:text-white hover:bg-[#1A33A9]"
            >     
                <div className='absolute right-1 cursor-pointer'>
                  <DropdownMenu >
                      <DropdownMenuTrigger><div><EllipsisVertical/></div></DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => BringDetails(row.original.dID)}>Details</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Dialog Component */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                      <DialogContent className='max-h-[80vh] overflow-y-auto max-w-[80vw] overflow-x-hidden p-3'>
                        <DialogHeader className='text-left'>
                          <DialogTitle className='text-lg underline mx-auto'>Details</DialogTitle>
                        </DialogHeader>
                        {
                              docDetails && Object.entries(docDetails).map(([key, value]) => {
                                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                                  return (
                                    <div key={key} className="mt-2">
                                      <strong className="text-md flex gap-1 items-center flex-wrap text-center">
                                        {key}
                                      </strong>
                                      <Separator className='mb-2'/>
                                        <div className="ml-4 space-y-2">
                                          {Object.entries(value).map(([nestedKey, nestedValue]) => (
                                            <div key={nestedKey} className="flex gap-4 flex-wrap">
                                              <strong className="text-sm flex gap-1 items-center flex-wrap">
                                                {nestedKey} :
                                              </strong>
                                              <div className="flex flex-wrap break-all whitespace-pre-wrap text-sm">
                                                {nestedValue !== null && nestedValue !== "" ? nestedValue.toString() : "—"}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div key={key} className="flex gap-4 flex-wrap">
                                      <strong className="text-sm flex gap-1 items-center flex-wrap">
                                        {key} :
                                      </strong>
                                      <div className="flex flex-wrap break-all whitespace-pre-wrap text-sm">
                                        {value !== null && value !== "" ? value.toString() : "—"}
                                      </div>
                                    </div>
                                  );
                                }
                              })
                        }



                        {/* {row.getVisibleCells().map((cell) => (
                            <div key={cell.id} className="flex gap-4 flex-wrap">
                                <strong className="text-md flex gap-1 items-center flex-wrap">
                                  {flexRender(cell.column.columnDef.header, cell.getContext())}:
                                </strong>
                                <div className="flex flex-wrap break-all whitespace-pre-wrap">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            </div>
                        ))} */}
                          <DialogFooter >
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
