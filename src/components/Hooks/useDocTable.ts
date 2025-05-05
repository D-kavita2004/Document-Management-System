import { columns } from "@/Constants/Columns";
import { useEffect } from "react";
import { useState } from "react";
import {
      useReactTable,
      getCoreRowModel,
      getSortedRowModel,
      getFilteredRowModel,
      getPaginationRowModel,
    } from "@tanstack/react-table";

 export const useDocTable = ()=>{
      const [data, setData] = useState('');
      const [sorting,setSorting] = useState([]);
      const [globalFilter,setGlobalFilter] = useState("");
      const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
      const [pagination, setPagination] = useState({
            pageIndex: 0,
            pageSize: 5,
          });

        // creating state for the columns
      useEffect(() => {
          const visibilityMap: Record<string, boolean> = {};
          table.getAllColumns().forEach((col) => {
            if (col.id) {
              visibilityMap[col.id] = true; // false if you want them hidden by default
            }
          });
          setColumnVisibility(visibilityMap);
      }, []);
      
      const table = useReactTable({
      data,
      columns,
      state:{
            columnVisibility,
            sorting,
            globalFilter,
            pagination,
      },
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel:getCoreRowModel(),

      onSortingChange:setSorting,
      getSortedRowModel:getSortedRowModel(),

      onGlobalFilterChange:setGlobalFilter,
      getFilteredRowModel:getFilteredRowModel(),

      onPaginationChange:setPagination,
      getPaginationRowModel: getPaginationRowModel(),
      });


      return {
            table,
            globalFilter,
            setGlobalFilter,
            setPagination,
            setData,
          };
 }