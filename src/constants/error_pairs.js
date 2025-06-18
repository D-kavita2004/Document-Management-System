export const errorObj = {
  duplicateID: {
    status: 409,
    message: "Profile ID already exists",
  },
  duplicateProfile: {
    status: 409,
    message: "Profile Name already exists",
  },
  profileNotFound: {
    status: 404,
    message: "Profile not found",
  },
  serverError: {
    status: 500,
    message: "Something went wrong",
  },
  invalidProfileId:{
      status:400,
      message:"Profile ID must be a whole number with at most 10 digits"
  },
  invalidProfileName:{
      status:400,
      message:"Profile name can only contain letters, numbers, underscores (_) and hyphens (-)"
  },
  shortProfile:{
      status:400,
      message:"Profile name must be at least 2 characters"
  },
  shortProfile:{
      status:400,
      message:"Profile name must not exceed 20 characters"
  }
};
