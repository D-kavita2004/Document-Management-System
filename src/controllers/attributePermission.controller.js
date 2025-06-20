import ProfilePermission from "../models/attributePermission.models.js";
import hardCodedListOfAttributes from "../constants/columns.js";

// It is a controller to handle get request which will bring all the attributes list corresponding to that profileID
export const ProfileAttributes = async (req,res,next)=>{
      try{
            const profileId = req.params.profileId;
            const profileDoc = await ProfilePermission.findOne({profileId});
            if(profileDoc === null){
                  // TODO: Cal WCC backend API to get attribute list.
                  const new_data = new ProfilePermission({ profileId, attributes:hardCodedListOfAttributes });
                  const saved_data = await new_data.save();
                  res.status(200).json({
                        success:true,
                        message:"Attribute List for this fetched successfully",
                        data:hardCodedListOfAttributes
                  })
            }
            else{
                  res.status(200).json({
                        success:true,
                        message:"Attribute List for this fetched successfully",
                        data:profileDoc.attributes
                  })
            } 
      }
      catch(error){
            next(error);
      }
}
export const updateProfilePermission = async(req,res,next)=>{
      try{
            const profileId = req.params.profileId;
            const attributeList = req.body.attributes;
            const profileDoc = await ProfilePermission.findOneAndUpdate(
                  {profileId},
                  {attributes:attributeList},
                  { new: true }
            )
            if(!profileDoc){
                        res.status(404).json({
                              success:false,
                              message:"Attribute permission for this profile cannot be saved"
                        })
            }
            else{       
                        res.status(200).json({
                              success:true,
                              message:"Attribute permission for this profile updated successfully",
                              data:profileDoc.attributes
                        })
            }
      }
      catch(error){
            next(error);
      }

}
