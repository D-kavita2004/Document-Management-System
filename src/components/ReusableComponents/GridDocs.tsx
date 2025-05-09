import { useState } from 'react';
import {EllipsisVertical} from "lucide-react";
import { flexRender } from '@tanstack/react-table';
import { fetchDocDetails } from '@/Constants/fetchDocDetails';
import { fetchDownloadApi } from '@/Constants/fetchDownloadApi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import { DetailsDialog } from './DetailsDialog';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter
// } from "@/components/ui/dialog"

const GridDocs = ({ table }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [docDetails,setDocDetails] = useState("");
  const rows = table.getPaginationRowModel().rows;

    const BringDetails = async(id)=>{
      const data = await fetchDocDetails(id);
      setOpenDialog(true);
      setDocDetails(data);   
    }

    // File Download Api logic 
    const handleDownloadDirect = (id) => {
      fetchDownloadApi(id);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">

        {rows.map((row) => {
            const allCells = row.getAllCells();

            const titleCell = allCells.find(cell => cell.column.id === 'dDocTitle');
            const originalNameCell = allCells.find(cell => cell.column.id === 'dOriginalName');
            const dateCell = allCells.find(cell => cell.column.id === 'dInDate');

          return (
            <div
              key={row.id}
              className="bg-white border border-gray-400 p-2 rounded shadow hover:shadow-md transition flex relative dark:bg-[#3b3636] dark:hover:bg-white dark:hover:text-black hover:text-white hover:bg-[#1A33A9] justify-between"
            >     
                  <div className='absolute right-1 cursor-pointer'>
                        <DropdownMenu >
                            <DropdownMenuTrigger><div className='cursor-pointer'><EllipsisVertical/></div></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => BringDetails(row.original.dID)}>Details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Dialog Component */}
                        <DetailsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} docDetails={docDetails}/>

                        {/* <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                            <DialogContent className='max-h-[80vh] overflow-y-auto max-w-[80vw] overflow-x-hidden p-3'>
                              <DialogHeader className='text-left'>
                                <DialogTitle className='text-lg underline mx-auto'>Details</DialogTitle>
                              </DialogHeader>
                              {
                                    docDetails && Object.entries(docDetails).map(([key, value]) => {
                                        return (
                                          <div key={key} className="flex gap-4 flex-wrap">
                                            <strong className="text-sm flex gap-1 items-center flex-wrap">
                                              {formatFieldName(key)} :
                                            </strong>
                                            <div className="flex flex-wrap break-all whitespace-pre-wrap text-sm">
                                              {value !== null && value !== "" ? value.toString() : "—"}
                                            </div>
                                          </div>
                                        );
                                
                                    })
                              }
                                <DialogFooter >
                                      <Button type="button" className='hover:bg-[#1A33A9] hover:shadow-md shadow-gray-700 text-white transition dark:text-black' onClick={() => setOpenDialog(false)}>
                                        Ok
                                      </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog> */}

                  </div>
                  <div className='flex flex-col gap-1.5 max-w-[90%] justify-between'>
                        <div className='font-bold cursor-pointer inline flex-wrap break-all' onClick={()=>{handleDownloadDirect(row.original.dID)}}>
                          {titleCell && flexRender(titleCell.column.columnDef.cell, titleCell.getContext())}
                          {" "}
                          {originalNameCell && (
                            <span>
                              (
                                {flexRender(originalNameCell.column.columnDef.cell, originalNameCell.getContext())}
                              )
                            </span>
                          )}
                        </div>
                          
                        <div className='text-sm'>{dateCell && flexRender(dateCell.column.columnDef.cell, dateCell.getContext())}</div>
                  </div>
                  
            </div>
          );
        })}

    </div>
  );
};

export default GridDocs;
