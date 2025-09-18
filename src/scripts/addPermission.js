// src/scripts/addPermission.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Permission from "../models/permissions.models.js";

// Load environment variables
dotenv.config();

const run = async () => {
  try {
    // Connect to DB
    const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Example permission you want to add
    const newPermission = {
      permissionName: "can_get_available_permission_list",  // must follow regex rule
      description: "Allows user to view existing permissions",
      enabled: true, // optional, defaults to true
    };

    // Insert into DB
    const permission = await Permission.create(newPermission);

    console.log("✅ Permission added:", permission);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to add permission:", err.message);
    process.exit(1);
  }
};

run();
