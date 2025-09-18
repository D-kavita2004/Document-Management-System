import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    permissionName: {
      type: String,
      required: [true, "Permission name is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Permission name must be at least 3 characters long"],
      maxlength: [50, "Permission name cannot exceed 50 characters"],
      match: [
        /^can_[a-z_]+$/,
        'Permission name must start with "can" followed by lowercase letters or underscores.',
      ],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    enabled: {
      type: Boolean,
      default: true, // you can choose true/false depending on use case
    },
  },
  { timestamps: true }
);


const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
