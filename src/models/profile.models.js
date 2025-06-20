import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
      
      profileId: {
      type: String,
      required: [true, "This is a required field"],
      unique: [true, "Profile ID already exists"],
      validate: {
      validator: (value) => /^[0-9]{1,10}$/.test(value), // 1 to 10 digits only
      message: "Profile ID must be a string of up to 10 numeric digits"
      }
      },

      profileName: {
      type: String,
      required: [true, "Profile name is required"],
      unique: [true,"Profile Name already exists"],
      lowercase: true,
      trim: true,
      minlength: [2, "Profile name must be at least 2 characters"],
      maxlength: [20, "Profile name must not exceed 20 characters"],
      validate: {
            validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
            },
            message:"Name must start with a letter and contain only letters, numbers, hyphens or underscores.",
      },
      },
},{timestamps:true})

export const Profile = mongoose.model("Profile",profileSchema);