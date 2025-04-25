import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";

const useTableSetup = (data, columns, globalFilter,setGlobalFilter,setPagination, pagination, sorting,setSorting) => {

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      sorting,
      globalFilter,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const visibilityMap: Record<string, boolean> = {};
    table.getAllColumns().forEach((col) => {
      if (col.id) {
        visibilityMap[col.id] = true;
      }
    });
    setColumnVisibility(visibilityMap);
  }, [table]);

  return table;
};

export default useTableSetup;
