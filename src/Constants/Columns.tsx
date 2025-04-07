import { createColumnHelper } from "@tanstack/react-table";
import { FileText } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import {User} from 'lucide-react';
import {FilePen} from 'lucide-react';
import {FileType} from 'lucide-react';

type Document = {
      "id": string,
      "fileName": string,
      "date": string,
      "type": string,
      "author": string,
      "description":string
}

const columnHelper = createColumnHelper<Document>();

export const columns = [

      columnHelper.accessor("fileName", {
            header: () => (
                  <span className="flex items-center gap-1">
                        <FileText /> Name
                  </span>           

            ),
            cell: info => info.getValue()
          }),   
      columnHelper.accessor("date",{
            header:()=>(
                  <span className="flex items-center gap-1">
                        <CalendarDays /> Date
                  </span>
            ),
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("type",{
            header:()=>(
                  <span className="flex items-center gap-1">
                        <FileType /> Type
                  </span>   
            ),
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("author",{
            header:()=>(
                  <span className="flex items-center gap-1">
                        <User /> Author
                  </span>
            ),
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("description",{
            header:()=>(
                  <span className="flex items-center gap-1">
                        <FilePen /> Description
                  </span>
            ),
            cell:info=>info.getValue()
      })
]