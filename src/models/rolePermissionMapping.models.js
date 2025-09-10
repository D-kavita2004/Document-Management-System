import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  permissionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission", 
          required: true,
  },
  approved: {
          type: Boolean,
          default: false,
  },
});

const rolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      unique: true,
    },
    permissionsList: [listSchema],
  },
  { timestamps: true }
);

const RolePermissionMapping = mongoose.model("RolePermissionMapping", rolePermissionSchema);
export default RolePermissionMapping;
