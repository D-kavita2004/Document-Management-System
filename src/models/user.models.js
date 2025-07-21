import mongoose from "mongoose";
import Role from "./roles.models.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "First name is required"],
    trim: true,
    minlength: [1, "First name must be at least 1 character long"],
    maxlength: [50, "First name must be at most 50 characters long"],
    match: [/^[A-Za-z]+$/, "First Name must have only alphabets"],
  },
  lastName: {
    type: String,
    // required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
    match: [/^[A-Za-z\s'-]+$/, "Last name contains invalid characters"]
  },
  username:{
    type:String,
    unique:true,
    trim:true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number"]
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
    trim: true,
    select: false,
  },
    // OAuth-specific fields
  providerId: {  //Unique identifier of a user provided by authentication provider also named as sub in payload
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {   
    type: String,
    enum: ['google', 'github', 'facebook', 'local'],
    default:"local",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default:"6865005889937e6eee93640f"
  }
});


userSchema.pre("save", async function (next) {
  try {
    if (!this.role) {
      const userRole = await Role.findOne({ roleName: "User" });
      if (userRole) {
        this.role = userRole._id;
      } else {
        console.error("Role 'User' not found.");
      }
    }
    next();
  } catch (err) {
    console.error("Could not assign default role:", err);
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
