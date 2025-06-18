// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyPattern)[0]; // e.g., "profileId"

    return res.status(409).json({
      success: false,
      message: `${duplicatedField} already exists`
    });
   }

  // Handle validation errors
  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message:err
  });
};
