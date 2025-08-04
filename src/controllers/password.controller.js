import User from "../models/user.models.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

export const forgetPassword = async(req,res,next)=>{
      try{
            const {email} = req.body;

            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                  return res.status(400).json({
                        success:false,
                        message:"Email is not valid"
                  })                   
            }

            const userData = await User.findOne({email});

            if(userData){
                  const token = jwt.sign({userId:userData._id},process.env.RESET_PASSWORD_TOKEN,{expiresIn:process.env.RESET_LINK_EXPIRY});

                  //Email server configuration
                  var transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                        user: process.env.APP_EMAIL,
                        pass: process.env.PASSWORD_APP_EMAIL
                  }
                  });
                  const mailOptions = {
                        from:process.env.APP_EMAIL,
                        to:email,
                        subject:"Reset password link",
                        html:`<h1>RESET PASSWORD LINK</h1>
                        <p>Please click on the below link to reset your password</p>
                        <p><a href="http://localhost:5173/reset-password/${token}">http://localhost:4000/password/reset-password/${token}</a></p>
                        <p>The link will expire in 10 minutes.</p>
                        <p>If you didn't request a password reset, please ignore this email.</p>`
                        
                  }

                  await transporter.sendMail(mailOptions,(err,info)=>{
                        if(err){
                              return res.status(500).json({ success:false,message:"Could not send email"});
                        }
                        return res.status(200).json({success:true,message:"Reset Link Sent"})
                  })
            }
            else{
                  return res.status(404).json({
                        success:false,
                        message:"Cannot find user with this email"
                  })
            }
      }
      catch(error){
            next(error);
      }
}

export const resetPassword = async(req,res,next)=>{
      try{
            const {jwtToken,updatedPassword} = req.body;
            console.log("Token",jwtToken);
            console.log("password",updatedPassword);
            let id;

            const decodedData = jwt.verify(jwtToken,process.env.RESET_PASSWORD_TOKEN);

            if(decodedData){
                  id = decodedData.userId;

                  const salt = await bcrypt.genSalt(10);
                  const hashedpassword = await bcrypt.hash(updatedPassword,salt);

                  const user = await User.findOneAndUpdate({_id:id},{password:hashedpassword});
                  if(!user){
                        return res.status(404).json({
                              success:false,
                              message:"Colud not found the user"
                        })
                  }
                  return res.status(200).json({
                              success:true,
                              message:"Password updated successfully"
                        })
            }
            else{
                  return res.status(401).json({
                        success:false,
                        message:"Link has been expired"
                  })
            }
      }
      catch(error){
            next(error);
      }
}