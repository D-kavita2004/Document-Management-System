import Role from "../models/roles.models.js"
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