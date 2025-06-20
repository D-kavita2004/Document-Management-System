import {Profile} from "../models/profile.models.js";
import ProfilePermission from "../models/attributePermission.models.js";

export const addProfile = async (req, res, next) => {
  try {
    const { profileId, profileName } = req.body;

    if(!profileId || !profileName){
      return res.status(400).json({
        success: false,
        message:"Missing Data"
      })
    } 
    if (!/^\d{1,10}$/.test(profileId)) {
      return res.status(400).json({
        success: false,
        message: "Profile ID must be a string of up to 10 numeric digits"
      });
    }


    if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(profileName)) {
      return res.status(400).json({
        success: false,
        message: "Name must start with a letter and contain only letters, numbers, hyphens or underscores."
      });
    }
    const existingId = await Profile.findOne({profileId})
    if(existingId){
          return res.status(409).json({
          success: false,
          message: "Profile ID already exists",
        });
    }

    const existingName = await Profile.findOne({profileName})
    if(existingName){
          return res.status(409).json({
          success: false,
          message: "Profile Name already exists",
        });
    }

    const new_profile = new Profile({ profileId, profileName });

    const saved_profile = await new_profile.save();

    if(saved_profile){
      return res.status(201).json({
      success: true,
      data: saved_profile,
      message: "Profile created successfully"
    });
    }
    
  } catch (error) {
      next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId.trim();

    const deletedProfile = await Profile.findOneAndDelete({ profileId });

    if (deletedProfile) {
        const deletedAttributes = await ProfilePermission.findOneAndDelete({ profileId });
        if(deletedAttributes){
            return res.status(200).json({
                  success:true,
                  message: "Profile deleted successfully",
                  });
        }
    }
    else{
      return res.status(404).json({ 
              success:false,
              message: "Profile not found" });

    }
  } 
  catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res , next) => {
  try {
    const { profileId } = req.params; // we expect profileId in the URL
    const { profileName } = req.body; // updated data in the body

    if(!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(profileName)){
      return res.status(400).json({
        success: false,
        message:"Name must start with a letter and contain only letters, numbers, hyphens or underscores."
      })
    }

    const updatedProfile = await Profile.findOneAndUpdate({ profileId },{ profileName });

    if (!updatedProfile) {
      return res.status(404).json({ 
        success: false,
        message: "Profile not found" });
    }

    res.status(200).json({
      success:true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });

  }  catch (error) {
    next(error);
  }
};

export const AllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find(); // fetches all documents
    res.status(200).json({
      success:true,
      message: "All profiles fetched successfully",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};
