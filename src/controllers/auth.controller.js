import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const signUp = async (req,res,next) =>{
      try{  
            const {firstName, lastName, email, phone, password } = req.body;
            if(!firstName || !lastName || !email || !phone || !password){
                  return res.status(400).json({
                        success:false,
                        message:"Either missing data or invalid data"
                  })
            }
            if(!/^[A-Za-z]+$/.test(firstName)){
                  return res.status(400).json({
                        success:false,
                        message:"First Name must have only alphabets"
                  })                 
            }
            if(!/^[A-Za-z]+$/.test(lastName)){
                  return res.status(400).json({
                        success:false,
                        message:"last Name must have only alphabets"
                  })                 
            }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                  return res.status(400).json({
                        success:false,
                        message:"Email is not valid"
                  })                   
            }
            if(!/^[5-9]\d{9}$/.test(phone)){
                  return res.status(400).json({
                        success:false,
                        message:"Phone number is not valid"
                  })    
            }
            if(!/^(?=.*[A-Za-z])(?=.*\d).{4,}$/.test(password)){
                  return res.status(400).json({
                        success:false,
                        message: "Password must be at least 4 characters long and include at least one letter and one number and may include any special characters"
                  })                   
            }
            const existingUser = await User.findOne({email});
            if(existingUser){
                  return res.status(409).json({
                        success:false,
                        message:"user with this email already exisits"
                  })
            }
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password,salt);
            
            const new_user = new User({firstName, lastName, email, phone, password:hashedpassword});
            const saved_user = await new_user.save();
            const populated_data = await saved_user.populate("role");
            const tokenPayload = {
                  _id: populated_data._id,
                  email: populated_data.email,
                  role: populated_data.role.roleName,
            };
            console.log(populated_data)
            const token = jwt.sign(tokenPayload,process.env.JWT_SECRET);
            console.log(token);
            // Set token in secure, HTTP-only cookie
            res.cookie("token", token, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/"
            });

            const userResponse = saved_user.toObject();
            delete userResponse.password;

            return res.status(201).json({
                        success:true,
                        data: userResponse,
                        message:"user created successfully"
                  })

      }
      catch(error){
            return next(error);
      }
      
}
export const logIn = async (req,res,next)=>{
      try{
            const { email, password} = req.body;
            if(!email || !password){
                  return res.status(400).json({
                        success:false,
                        message:"Missing data"
                  })
            }
            if(!/^(?=.*[A-Za-z])(?=.*\d).{4,}$/.test(password)){
                  return res.status(400).json({
                        success:false,
                        message: "Password must be at least 4 characters long and include at least one letter and one number and may include any special characters"
                  })                   
            }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                  return res.status(400).json({
                        success:false,
                        message:"Email is not valid"
                  })                   
            }
            
            const existingUser = await User.findOne({ email }).select("+password");
            if(!existingUser){
                  return res.status(404).json({
                        success:false,
                        message:"User not found"
                  })
            }
            const isPasswordValid = await bcrypt.compare(password,existingUser.password);
            if(!isPasswordValid){
                  return res.status(401).json({
                        success:false,
                        message:"Incorrect password",
                  })
            }
            const populated_data = await existingUser.populate("role");
            const tokenPayload = {
                  _id: populated_data._id,
                  email: populated_data.email,
                  role: populated_data.role.roleName,
            };            
            const token = jwt.sign(tokenPayload,process.env.JWT_SECRET);

            res.cookie("token", token, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/"
            });

            return res.status(200).json({
                  success:true,
                  message:"User logged in succesfully",
                  data:{...tokenPayload},
            })
      }
      catch(error){
            return next(error);
      }
}
export const logOut = async (req, res, next) => {

  try {
      const token = req.cookies.token;
      res.clearCookie("token", {
      httpOnly: true,
      secure: false,         // true in production (HTTPS)
      sameSite: "lax",       // "none" + secure:true for cross-origin
      path: "/"
      });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    return next(error);
  }
};
