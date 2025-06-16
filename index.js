import dotenv from "dotenv";
import express from "express";
import profileRoutes from "./src/routes/profile.routes.js"
import attributeRoutes from "./src/routes/attribute.routes.js";
import connectDB from "./src/config/db.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express()

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

const port = process.env.PORT || 3000

app.use("/profile",profileRoutes);
app.use("/attribute",attributeRoutes);

//Static route
app.get("/",(req,res)=>{
  res.send("Hello world");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
