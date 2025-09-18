import mongoose from "mongoose";
import dotenv from "dotenv";
import RolePermissionMapping from "../models/rolePermissionMapping.models.js";
import Permission from "../models/permissions.models.js"; // import Permission model

dotenv.config();

const runMigration = async () => {
  try {
    const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    const listOfPermissions = await Permission.find().select("_id").lean();
    await RolePermissionMapping.updateMany(
      {},  // update all role mappings
      { $set: { permissionsList:listOfPermissions} }
     )

//     console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

runMigration();
