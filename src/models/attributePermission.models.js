import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
  attID: String,
  Selected: Boolean,
  Label: String
});

const profilePermissionSchema = new mongoose.Schema({
  profileId: {
    unique:true,
    type: String,
    required: true,
  },
  attributes: [attributeSchema]
}, { timestamps: true });

const ProfilePermission = mongoose.model("ProfilePermission", profilePermissionSchema);

export default ProfilePermission;
