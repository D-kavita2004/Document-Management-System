import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
      profileId:{
           type:String,
           unique:true,
           required:[true,"This is a required field"],
      },
      profileName:{
            type:String,
            unique:true,
            required:[true,"This is a required field"],
            lowercase:true
      }
},{timestamps:true})

export const Profile = mongoose.model("Profile",profileSchema);