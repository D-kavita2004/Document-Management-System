import dotenv from "dotenv";
import express from "express";
import profileRoutes from "./src/routes/profile.routes.js"
import attributeRoutes from "./src/routes/attributePermission.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/errorHandling.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";
import roleRoutes from "./src/routes/roles.route.js";
import checkAuthorisation from "./src/middlewares/authorisaton.middleware.js";
import User from "./src/models/user.models.js";
import passwordRoutes from "./src/routes/password.routes.js";
import permissiosRoutes from "./src/routes/permissions.routes.js";

dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Global middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/profile",authMiddleware,profileRoutes);
app.use("/attribute",authMiddleware,attributeRoutes);
app.use("/users",authMiddleware,userRoutes);
app.use("/roles",authMiddleware,roleRoutes);
app.use("/permissions",authMiddleware,permissiosRoutes);
// app.use("/permissions",permissiosRoutes);

app.use("/auth",authRoutes);
app.use("/password",passwordRoutes);

app.get("/verify-token",authMiddleware,(req,res)=>{
  return res.send(req.user);
});

app.post("/fetchProfileData",authMiddleware,async(req,res,next)=>{
     try{
      const {email} = req.body;
      const userData = await User.findOne({email}).select("firstName lastName email phone role").populate("role").lean();
      return res.status(200).json({
            success:true,
            message:"Profile data fetched successfully",
            data:userData
      })
     }
     catch(err){
       return next(err);
     }
})

// Error handling middleware
app.use(errorHandler);
// Connect to DB and only then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
//     app.listen(3000, "0.0.0.0", () => {
//   console.log("Server running on http://0.0.0.0:3000");
// });

    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Exit process if DB fails
  });




