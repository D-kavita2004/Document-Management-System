import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter
    } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { formatFieldName } from '@/Constants/Columns';

export const DetailsDialog = ({openDialog,setOpenDialog,docDetails}) => {
  return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
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
  </Dialog>
  )
}

