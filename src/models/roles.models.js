import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      lowercase: true,
  },
  permissions:[String]
});

const Role = mongoose.model("Role",roleSchema);
export default Role;