export const attributes = [
  "dID",
  "dDocName",
  "dDocAuthor",
  "dRevLabel",
  "dDocType",
];

const formAttributes = () => {
    const listOfAttributes = attributes.map((key) => ({
      attID: key,
      Selected: false,
      Label: "",
    }));
    return listOfAttributes;
  };
const hardCodedListOfAttributes = formAttributes();
export default hardCodedListOfAttributes;
