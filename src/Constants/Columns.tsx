import { createColumnHelper } from "@tanstack/react-table";
import dummyData from "./DummmyDocs";

type Document = {
  [key: string]: string | { [key: string]: string }; // for simplified dynamic typing
  customMetadataMap: {
    [key: string]: string;
  };
};

function formatFieldName(fieldName) {
  // Remove leading "d" or any prefix like "x", "d", etc.
  const cleaned = fieldName.replace(/^[dx]+/, "");

  // Add space before capital letters and trim the result
  return cleaned.replace(/([A-Z])/g, " $1").trim();
}

const documentKeysSet = new Set();

if (dummyData.length > 0) {
  Object.keys(dummyData[0]).forEach((key) => {
    if (key === "customMetadataMap" && dummyData[0].customMetadataMap) {
      Object.keys(dummyData[0].customMetadataMap).forEach((nestedKey) => {
        documentKeysSet.add(nestedKey);
      });
    }
    else{
      documentKeysSet.add(key);
    }
  });
}

// Convert Set to Array
const documentKeys = Array.from(documentKeysSet);
console.log(documentKeys);

const columnHelper = createColumnHelper<Document>();

export const columns = documentKeys.map((key) =>
      columnHelper.accessor(key, {
        header: () => (
          <span className="flex items-center gap-1">
            {formatFieldName(key)}
          </span>
        ),
        cell: info => info.getValue()
      })
    );