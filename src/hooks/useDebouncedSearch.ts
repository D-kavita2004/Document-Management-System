import { useDebounceValue } from "usehooks-ts";

const useDebouncedSearch = (globalFilter) => {
  const [debouncedValue, setValue] = useDebounceValue(globalFilter, 500);

  return debouncedValue;
};

export default useDebouncedSearch;
