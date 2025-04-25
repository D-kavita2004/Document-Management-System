import { LayoutGrid, List } from "lucide-react";

const LayoutToggle = ({ DisplayFormat, setDisplayFormat }) => {
  return (
    <div className="flex gap-2 border-2 justify-center items-center">
      <div
        className={`p-1 size-full flex justify-center items-center ${DisplayFormat && "bg-[#1a32a9] dark:bg-white"}`}
        onClick={() => {
          setDisplayFormat(true);
        }}
      >
        <List className={`size-[6vmin] rounded ${DisplayFormat && "text-white dark:text-black"}`} />
      </div>

      <div
        className={`p-1 size-full flex justify-center items-center ${!DisplayFormat && "bg-[#1a32a9]  dark:bg-white"}`}
        onClick={() => {
          setDisplayFormat(false);
        }}
      >
        <LayoutGrid className={`size-[6vmin] rounded ${!DisplayFormat && "text-white dark:text-black"}`} />
      </div>
    </div>
  );
};

export default LayoutToggle;
