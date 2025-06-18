import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
      profileId:{
           type: Number,
           unique: [true,"Profile Id already exists"],
           required: [true,"This is a required field"],
           validate:{
                  validator:(value)=>{
                        return Number.isInteger(value) && value.toString().length <= 10
                  },
                  message:"Profile ID must be a whole number with at most 10 digits"
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