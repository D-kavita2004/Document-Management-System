import Role from "../models/roles.models.js";
import User from "../models/user.models.js";

export const allRoles = async(req,res,next) =>{
      try{
            const roles = await Role.find({});
            return res.status(200).json({
                  success:true,
                  message : "Data fetched successfully",
                  data : roles
            })
      }
      catch(err){
            console.log(err);
            return next();
      }
}
export const addRole = async(req,res,next) =>{
      try{
            const { roleName } = req.body;
            if(roleName===""){
                  return res.status(400).json({
                        message:"Role name is empty",
                        success:false
                  });
            }
            if((!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(roleName))){
                  setInputError('Role name must start with a letter and only include letters, numbers, - or _.');
                  return res.status(400).json({
                        message:"Role name is empty",
                        success:false
                  });
            }
            const new_role = new Role({roleName});
            const saved_role = await new_role.save();
            return res.status(201).json({
                  success:true,
                  data:saved_role,
                  message:"role created successfully"

            })
      }
      catch(err){
            console.log(err);
            return next();
      }
}
export const deleteRole = async(req,res,next)=>{                        
      try{
            const {roleId} = req.body;
            if(!roleId){
                  return res.status(400).json({
                        success:false,
                        message:"Colud not receive the role id"
                  })
            }
            const assignedUser = await User.findOne({role:roleId});
            if(assignedUser){
                  return res.status(200).json({
                        success:true,
                        message:"This role is assigned to some user"
                  });
            }
            const roleData = await Role.findOneAndDelete({_id:roleId});
            return res.status(200).json({
                  success:true,
                  message:"Role deleted successfully"
            })
      }
      catch(err){
            return next(err);
      }
      
}