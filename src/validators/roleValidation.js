// middlewares/validateRole.js
export const validateRole = (req, res, next) => {
  const { roleName, description } = req.body;
  
  if (!roleName || !description) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/.test(roleName)) {
    return res.status(400).json(
      { success: false,
        message: "Role name must be 3–15 characters, start with a letter, and contain only letters, numbers, hyphens (-), or underscores (_)." 
      });
  }
  if (!/^.{10,200}$/.test(description)) {
    return res.status(400).json(
      { success: false, 
        message: "Description should be between 10 and 200 characters" });
  }
  next();
};
