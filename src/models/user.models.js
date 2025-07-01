import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [1, "First name must be at least 1 characters long"],
            maxlength: [50, "First name must be at most 50 characters long"],
            match: [/^[A-Za-z]+$/, "First Name must have only alphabets"],
      },
      lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters long"],
            maxlength: [50, "Last name must be at most 50 characters long"],
            match: [/^[A-Za-z\s'-]+$/, "Last name contains invalid characters"]
      },
      email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // no need to wrap in an array
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"],
            lowercase: true, // optional: store in lowercase
            trim: true       // optional: removes leading/trailing spaces
      },
      phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number"]
      },
      password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            trim: true,
            select: false,
      },
      Role:{
            type:String,
            default:"User",
            enum:["User","Editor","Admin"],
            trim:true,
      }

})

const User = mongoose.model("User",userSchema);
export default User;