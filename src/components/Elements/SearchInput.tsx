import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";

const SearchInput = ({ globalFilter, handleSuggestions, suggestions, setGlobalFilter,commandRef }) => {
  return (
    <div className="w-[55%] lg:w-[60%]" ref={commandRef}>
      <Command className="w-full dark:bg-white dark:text-black border-2 border-black">
        <CommandInput placeholder="Search docs..." value={globalFilter} onValueChange={handleSuggestions} />
        {suggestions.length > 0 && (
          <CommandList className="absolute top-full w-[70%] lg:w-[60%] left-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-background shadow-md z-50">
            <CommandEmpty className="dark:text-white">No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {suggestions.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setGlobalFilter(item.fileName);
                    setSuggestions([]);
                  }}
                >
                  {item.fileName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchInput;
