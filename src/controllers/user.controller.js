import User from "../models/user.models.js";

export const AllUsersData = async(req,res,next)=>{
      try{
           const allUsers = await User.find({})
            .select("username firstName lastName email role")
            .populate("role")
            .lean();
            if(allUsers.length === 0){
                  return res.status(200).json({
                        success:true,
                        message:"Database is empty",
                  })
            }

            return res.status(200).json({
                        success:true,
                        message:"Users data fetched successfully",
                        data:allUsers
            })
      }
      catch(error){
            return next(error);
      }

};

export const changeRoles = async(req,res,next)=>{
      try{
            const userList = req.body.data;
            if(!userList || userList.length === 0){
                  return res.status(400).json({
                        success:false,
                        message:"Data Missing!!!"
                  })
            }
            const operations = userList.map((user)=>({
                  updateOne:{
                        filter:{_id: user._id},
                        update:{$set:{role:user.role}}
                  }
            }))
      //      console.log(JSON.stringify(operations, null, 2));

            await User.bulkWrite(operations);
            return res.status(200).json({
                  success: true,
                  message: "Roles updated successfully",
            });
      }
      catch(error){
            console.log(error);
            return next(error);
      }
};
