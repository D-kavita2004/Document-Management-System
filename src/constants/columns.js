

export const attributes = [
  "dID",
  "dDocName",
  "dDocAuthor",
  "dRevLabel",
  "dDocType",
  "dSecurityGroup",
  "dDocAccount",
  "dDocTitle",
  "dCheckedOutUser",
  "dInDate",
  "folderPath",
  "parentGUID",
  "primaryFile",
  "dOriginalName",
  "filecontent",
  "customMetadataMap",
  "dDocOwner",
  "xIPMSYS_BATCH_ID1",
  "xComments",
  "dRendition1",
  "xPackagedConversions",
  "dRendition2",
  "dFullTextFormat",
  "dDocClass",
  "VaultFileSize",
  "WebFileSize",
  "xDiscussionCount",
  "dWebExtension",
  "otsFormat",
  "srfDocSnippet",
  "dExtension",
  "xStorageRule",
  "dDocFunction",
  "xVideoRenditions",
  "dDocCreatedDate",
  "dOutDate",
  "dRevClassID",
  "AlternateFormat",
  "xIdcProfile",
  "SCORE",
  "dDocCreator",
  "dDocLastModifier",
  "xIPMSYS_BATCH_SEQ",
  "dPublishType",
  "URL",
  "dFormat",
  "xDiscussionType",
  "xIPMSYS_APP_ID",
  "xPartitionId",
  "xWebFlag",
  "dGif",
  "dCreateDate",
  "dRevisionID",
  "dDocLastModifiedDate",
  "otsCharset",
  "xDamConversionType",
  "otsLanguage",
  "xLibraryGUID"
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
