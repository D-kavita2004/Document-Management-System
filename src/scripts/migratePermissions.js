// Script to add enabled field in permissions collection

import mongoose from "mongoose";
import dotenv from "dotenv";
import Permission from "../models/permissions.models.js";

// Load environment variables
dotenv.config();

const runMigration = async () => {
  try {
    // Construct DB connection string
    const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

    await mongoose.connect(uri);

    const result = await Permission.updateMany(
      { enabled: { $exists: false } },
      { $set: { enabled: true } }
    );

    console.log("Migration complete:", result);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

runMigration();
