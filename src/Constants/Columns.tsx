import { createColumnHelper } from "@tanstack/react-table";
// import { FileText } from "lucide-react";
// import { CalendarDays } from "lucide-react";
// import { User } from "lucide-react";
// import { FilePen } from "lucide-react";
// import { FileType } from "lucide-react";

type Document = {
  [key: string]: string | { [key: string]: string }; // for simplified dynamic typing
  customMetadataMap: {
    [key: string]: string;
  };
};

function formatFieldName(fieldName) {
  // Remove leading "d" or any prefix like "x", "d", etc.
  const cleaned = fieldName.replace(/^[a-z]+/, "");

  // Add space before capital letters and trim the result
  return cleaned.replace(/([A-Z])/g, " $1").trim();
}

const documentKeys = [
      "dID", "dDocName", "dDocAuthor", "dRevLabel", "dDocType", "dSecurityGroup",
      "dDocAccount", "dDocTitle", "dCheckedOutUser", "dInDate", "folderPath",
      "parentGUID", "primaryFile", "dOriginalName", "filecontent"
];

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