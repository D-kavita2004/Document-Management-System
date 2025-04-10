import React from 'react'
import {flexRender} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const Table = ({table}) => {
  return (
            <table className="border-collapse w-full h-full ">
                  <thead className="bg-[#1A33A9] text-white sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                        <th
                              key={header.id}
                              className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap"
                        >
                              <div className="flex items-center gap-1 cursor-pointer size-full" onClick={header.column.getToggleSortingHandler()}>
                              
                              {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                              )}
                              <ArrowUpDown size={16} />
                              </div>
                        </th>
                        ))}
                        </tr>
                  ))}
                  </thead>
                  <tbody>
                  {table.getPaginationRowModel().rows.map((row) => (
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
  )
}
