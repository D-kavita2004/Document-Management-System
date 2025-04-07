import React, { useState } from "react";
import { mockData } from "@/Constants/Data";
import { columns } from "@/Constants/Columns";
import { ArrowUpDown } from "lucide-react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

const MyDocuments = () => {
  const [data, setData] = useState(mockData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full h-full p-10">
      <div className="overflow-auto border-black rounded shadow-md shadow-blue-800">
        <table className="border-collapse ">
          <thead className="bg-[#0097b2]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      <ArrowUpDown size={16} />
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDocuments;
