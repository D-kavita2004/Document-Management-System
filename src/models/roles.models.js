import mongoose from "mongoose";
import { nanoid } from "nanoid";

const roleSchema = new mongoose.Schema({
  roleName:{
      type:String,
      required:true,
      trim:true,
      unique:true
  }
});

const Role = mongoose.model("Role",roleSchema);
export default Role;