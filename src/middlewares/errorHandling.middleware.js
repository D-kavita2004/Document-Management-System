export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  // Handle duplicate key errors from MongoDB

  if (err.code === 11000) {
    const duplicatedField = err.keyPattern
      ? Object.keys(err.keyPattern)[0]
      : Object.keys(err.keyValue)[0];
    console.log("duplicatedField",duplicatedField);
    return res.status(409).json({
      success: false,
      message: `${duplicatedField} already exists`
    });
  }

  // Handle validation or cast errors
  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};
