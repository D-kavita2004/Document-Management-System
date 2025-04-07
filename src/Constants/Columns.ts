import { createColumnHelper } from "@tanstack/react-table"

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

      columnHelper.accessor("fileName",{
            header:()=>"Name",
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("date",{
            header:()=>"Date",
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("type",{
            header:()=>"Type",
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("author",{
            header:()=>"Author",
            cell:info=>info.getValue()
      }),
      columnHelper.accessor("description",{
            header:()=>"Description",
            cell:info=>info.getValue()
      })
]