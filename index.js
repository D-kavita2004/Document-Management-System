import dotenv from "dotenv";
import express from "express";
import profileRoutes from "./src/routes/profile.routes.js"
import attributeRoutes from "./src/routes/attributePermission.routes.js"
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/errorHandling.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";

dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

//Routes
app.use("/profile",authMiddleware,profileRoutes);
app.use("/attribute",authMiddleware,attributeRoutes);
app.use("/auth",authRoutes);

app.get("/verify-token",authMiddleware,(req,res)=>{
  return res.send(req.user);
});
// Connect to DB and only then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Exit process if DB fails
  });




