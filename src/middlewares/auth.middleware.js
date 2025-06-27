import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next)=>{
  // console.log(req.cookies.csrftoken);
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next(); // Proceed to route
  } catch (err) {
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
}

export default authMiddleware ;
