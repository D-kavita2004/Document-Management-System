import Permission from "../models/permissions.models.js";
import RolePermissionMapping from "../models/rolePermissionMapping.models.js";

// Middleware function to check if the user has the required role(s)
const checkAuthorisation = (requiredpermissionName) => async(req, res, next) => {
  try{
    const permissionId = await Permission.find({permissionName:requiredpermissionName}).lean();
    if(permissionId){
      const role_id = req.user.roleId;
      const mappingDoc = await RolePermissionMapping.findOne({role:role_id}).lean();

      if(!mappingDoc){
        return res.status(403).json({ message: 'Permission is not assigned to the user' });
      }
      const isPermissionGranted = mappingDoc.permissionsList.find((data)=>data.permissionId == permissionId);
      if(isPermissionGranted){
        return next();
      }
      else{
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    }
    else{
      return res.status(403).json({ message: 'Required Permission is not registered' });
    }
  }
  catch(err){
    console.log(err);
    console.log("Authorisation system falied");
  }

};
export default checkAuthorisation;