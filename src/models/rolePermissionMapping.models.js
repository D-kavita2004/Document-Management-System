import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      unique: true,
    },
    // Store only array of Permission IDs
    permissionsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const RolePermissionMapping = mongoose.model(
  "RolePermissionMapping",
  rolePermissionSchema
);

export default RolePermissionMapping;

