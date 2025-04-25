import { useState } from "react";

const useSearchSuggestions = (table, globalFilter) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggestions = (value) => {
    setGlobalFilter(value);
    const filteredRows = table.getFilteredRowModel().rows;
    const searchSuggestions = filteredRows.slice(0, 5).map((row) => row.original);
    setSuggestions(searchSuggestions);
  };

  return { suggestions, handleSuggestions };
};

export default useSearchSuggestions;
