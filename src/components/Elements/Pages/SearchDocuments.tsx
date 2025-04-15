import DisplayDocs from "../DisplayDocs";
import { mockData } from "@/Constants/Data";
import { columns } from "@/Constants/Columns";
import { useSearchParams } from "react-router-dom";

const SearchDocuments = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <>
        <DisplayDocs mockData={mockData} columns={columns} headerSearch={query}/> 
    </>
  );
};

export default SearchDocuments;
