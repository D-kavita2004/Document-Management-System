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
            return next(err);
      }
}
export const addRole = async(req,res,next) =>{
      try{
            const {roleName,description} = req.body;
            // You can now use these values
            // console.log("Role Name:", roleName);
            // console.log("Description:", description);
            // if(roleName==="" || description ===""){
            //       return res.status(400).json({
            //             message:"Data is not found",
            //             success:false
            //       });
            // }
            // if((!/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/.test(roleName))){
            //       return res.status(400).json({
            //             message:"Role name must be 3–15 characters, start with a letter, and contain only letters, numbers, hyphens (-), or underscores (_).",
            //             success:false
            //       });
            // }
            // if((!/^.{10,200}$/.test(description))){
            //       return res.status(400).json({
            //             message:"Description should be between 10 and 200 characters",
            //             success:false
            //       });
            // }
            const new_role = new Role({roleName,description});
            const saved_role = await new_role.save();
            return res.status(201).json({
                  success:true,
                  data:saved_role,
                  message:"role created successfully"
            })
      }
      catch(err){
            // console.log(err);
            return next(err);
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
export const updateRole = async(req,res,next)=>{
      try{
            const {roleName,description,id} = req.body;
            const data = await Role.findOneAndUpdate({_id:id},{roleName,description},{new:true});
            if(data){
                  return res.status(200).json({
                  success:true,
                  message:"Data Updated Successfully"
            })
            }
            else{
                  return res.status(404).json({
                  success:false,
                  message:"Could not update the data"
            })
      }
      }
      catch(err){
            next(err);
      }
}