import dotenv from "dotenv";
import express from "express";
import profileRoutes from "./src/routes/profile.routes.js"
import attributeRoutes from "./src/routes/attribute.routes.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import { errorHandler } from "./src/middlewares/profile.middleware.js";

dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

//Routes
app.use("/profile",profileRoutes);
app.use("/attribute",attributeRoutes);

app.use(errorHandler);

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




