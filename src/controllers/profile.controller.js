import {Profile} from "../models/profile.models.js";

export const addProfile = async (req, res) => {
  try {
    const { profileId, profileName } = req.body;
    const new_profile = new Profile({ profileId, profileName });

    const saved_profile = await new_profile.save();

    res.status(201).json({
      success: true,
      data: saved_profile,
      message: "Profile created successfully"
    });
    
  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
      errorDetails: error
    });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.profileId;

    const deletedProfile = await Profile.findOneAndDelete({ profileId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile deleted successfully",
      profile: deletedProfile,
    });
  } 
  catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { profileId } = req.params; // we expect profileId in the URL
    const { profileName } = req.body; // updated data in the body

    const updatedProfile = await Profile.findOneAndUpdate(
      { profileId }, // filter
      { profileName }, // update
      {
        new: true,         // return updated document
        runValidators: true // to enforce schema validations
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find(); // fetches all documents
    res.status(200).json({
      message: "All profiles fetched successfully",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
