import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, "Role name is required"],
    trim: true,
    unique: true,
    lowercase: true,
    minlength: [3, "Role name must be at least 3 characters"],
    maxlength: [15, "Role name cannot exceed 15 characters"],
    match: [/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Role name must start with a letter and contain only letters, numbers, hyphens (-), or underscores (_)"]
  },
  description: {
    type: String,
    trim: true,
    required:true,
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [200, "Description cannot exceed 200 characters"]
  }
}, {
  timestamps: true 
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
