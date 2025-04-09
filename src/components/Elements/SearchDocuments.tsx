import DisplayDocs from "./DisplayDocs";
import { mockData } from "@/Constants/Data";
import { columns } from "@/Constants/Columns";

const SearchDocuments = () => {

  return (
    <>
        <DisplayDocs mockData={mockData} columns={columns}/> 
    </>
  );
};

export default SearchDocuments;
