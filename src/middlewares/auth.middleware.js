import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; // Add `.js` if using ES modules

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token. Please refresh the page." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded?._id;

    const user = await User.findById(id).populate("role"); 

    if (user) {
      req.user = {_id:user._id,email:user.email,role:user.role.roleName}; // ✅ Attach full user info
      return next();
    }
    else {
 
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
      });
      return res.status(401).json({ message: "Unauthorized - User does not exist anymore." });
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden - Invalid or expired token" });
  }
};

export default authMiddleware;
