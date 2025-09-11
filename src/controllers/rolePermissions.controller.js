import Permission from "../models/permissions.models.js";
import initialPermissionsList from "../constants/initialPermissionsList.js";
import RolePermissionMapping from "../models/rolePermissionMapping.models.js";

export const insertManyPermissions = async(req,res,next)=>{
      
      try{
            const addedPermissions = await Permission.insertMany(initialPermissionsList);
            return res.status(201).json({
                  message:"All permissions created successfully",
                  data:addedPermissions
            })
      }
      catch(err){
            res.status(500).json({
                  message:err.message
            })
      }

}

export const getRoleSpecificPermissions = async(req,res,next)=>{
      try{
            const roleId = req.body.id;
            let permissionData;

            const existingMapping = await RolePermissionMapping.findOne({ role: roleId })
                  .populate("permissionsList.permissionId")
                  .lean(); 

            if(!existingMapping){
                  //if it is a new role fetch the availbale permissions list
                  const data = await Permission.find({}).lean();
                  permissionData = data.map((obj)=> {
                        return {...obj, "approved":false}
                  })
            }
            else{
                  permissionData = existingMapping.permissionsList.map((obj)=>{
                        return {...obj.permissionId,approved:obj.approved};
                  })
            }

            return res.status(200).json({
                  success:true,
                  data:permissionData
            })
      }
      catch(err){
            console.log(err);
            next(err);
      }
}

export const updateRoleSpecificPermissions = async (req, res, next) => {
  try {
    const { roleId, updatedPermissionList } = req.body;

    if (!roleId || !updatedPermissionList) {
      return res.status(400).json({ message: "roleId and updatedPermissionList are required" });
    }

    if (!Array.isArray(updatedPermissionList)) {
      return res.status(400).json({ message: "updatedPermissionList must be an array" });
    }

    // Normalize incoming list (_id → permissionId)
    const normalizedList = updatedPermissionList.map((item) => ({
      permissionId: item._id, 
      approved: item.approved ?? false, // default false if not provided
    }));

    // Find existing mapping for the role
    let roleMapping = await RolePermissionMapping.findOne({ role: roleId });

    if (!roleMapping) {
      // If no mapping exists, create new
      roleMapping = new RolePermissionMapping({
        role: roleId,
        permissionsList: normalizedList,
      });
    } else {
      // Replace existing permissionsList
      roleMapping.permissionsList = normalizedList;
    }

    const savedMapping = await roleMapping.save();

    res.status(200).json({
      message: "Role permissions updated successfully",
      data: savedMapping,
    });
  } catch (err) {
    console.error("Error updating role permissions:", err);
    next(err);
  }
};

