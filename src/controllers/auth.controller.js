import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import RefreshTokenModel from "../models/RefreshToken.models.js";
import jwt from "jsonwebtoken";
import { auth, OAuth2Client } from "google-auth-library";
import axios from "axios";
import { generateAccessToken,generateRefreshToken } from "../constants/tokens.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
            const accessToken = generateAccessToken(tokenPayload);
            const refreshToken = generateRefreshToken();
            const refreshTokenDoc = new RefreshTokenModel({ userId: tokenPayload._id, token: refreshToken });
            const tokenDoc = await refreshTokenDoc.save();
            if(!tokenDoc){
                  return res.status(500).json({
                        success:false,
                        message:"Refresh token cannot be saved"
                  })
            }
            res.cookie("AccessToken",accessToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/"
            });

            res.cookie("RefreshToken",refreshToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/",
            maxAge: 15 * 24 * 60 * 60 * 1000
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
            const accessToken = generateAccessToken(tokenPayload);
            const refreshToken = generateRefreshToken();
            const refreshTokenDoc = new RefreshTokenModel({ userId: tokenPayload._id, token: refreshToken });
            const tokenDoc = await refreshTokenDoc.save();
            if(!tokenDoc){
                  return res.status(500).json({
                        success:false,
                        message:"Refresh token cannot be saved"
                  })
            }
            res.cookie("AccessToken",accessToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/"
            });

            res.cookie("RefreshToken",refreshToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/",
            maxAge: 15 * 24 * 60 * 60 * 1000
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
      const refreshToken = req.cookies.RefreshToken;

      if (!refreshToken) {
      return res.status(400).json({
      success: false,
      message: "No refresh token provided"
      });
      }
      const deleted = await RefreshTokenModel.findOneAndDelete({ token: refreshToken });
      res.clearCookie("AccessToken", {
      httpOnly: true,
      secure: false,         // true in production (HTTPS)
      sameSite: "lax",       
      path: "/"
      });
      res.clearCookie("RefreshToken", {
      httpOnly: true,
      secure: false,         // true in production (HTTPS)
      sameSite: "lax",      
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
export const handleGoogleLogin = async (req,res,next)=>{
      const { idToken } = req.body;
      try {
      const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload(); // contains user info
      const {
      sub: providerId,         // Google's unique user ID
      email,
      given_name: firstName,
      family_name: lastName,
      } = payload;

      // console.log("payload ",JSON.stringify(payload,null,2));
      let user = await User.findOne({email});
      if(user){
            if(user.firstName!==firstName || user.lastName !== lastName || user.providerId!==providerId){
                  user.firstName = firstName;
                  user.lastName = lastName;
                  user.providerId = providerId;
                  await user.save();
            }
      }
      else{
            user = new User({providerId,email,firstName,lastName, authProvider:"google"});
            await user.save(); 
      }
      // console.log("user data",JSON.stringify(user,null,2));
      const populated_data = await user.populate("role");
      const tokenPayload = {
            _id: populated_data._id,
            email: populated_data.email,
            role: populated_data.role.roleName,
      };

      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken();
      const refreshTokenDoc = new RefreshTokenModel({ userId:tokenPayload._id, token: refreshToken });
      const tokenDoc = await refreshTokenDoc.save();
      if(!tokenDoc){
            return res.status(500).json({
                        success:false,
                        message:"Refresh token cannot be saved"
            })
      }
      res.cookie("AccessToken",accessToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/"
            });

      res.cookie("RefreshToken",refreshToken, {
            httpOnly: true,
            secure: false,         // Use true in production (HTTPS)
            sameSite: "lax",       // Use "none" for cross-origin + HTTPS
            path: "/",
            maxAge: 15 * 24 * 60 * 60 * 1000
            });

      return res.status(201).json({
                  success:true,
                  data:{
                  _id:populated_data._id,
                  email:populated_data.email,
                  role:populated_data.role.roleName,
                  },
                  message:"User created successfully"
            })

      } catch (err) {
      res.status(400).json({ 
            message: 'Could not Sign In with Google',
            success:false 
      });
      }
}
export const handleGithubLogin = async(req,res,next)=>{
      const authorisatonCode = req.query.code;
      if (!authorisatonCode) {
            return res.status(400).json({ error: "Authorization code missing" });
            }
      try{  
            //Exchanging authoriation code for access token
            const token = await axios.post("https://github.com/login/oauth/access_token",
            {
                  client_id:process.env.GITHUB_CLIENT_ID,
                  client_secret:process.env.GITHUB_CLIENT_SECRET,
                  code:authorisatonCode
            },
            {
                  headers:{
                        Accept: "application/json"
                  }
            })
            
            //Fetching user info with the access token
            const userInfoResponse = await axios.get("https://api.github.com/user", {
            headers: {
            Authorization: `Bearer ${token.data.access_token}`, 
            Accept: "application/json"
            }
            });
            const userEmailResponse = await axios.get("https://api.github.com/user/emails",{
            headers: {
            Authorization: `Bearer ${token.data.access_token}`,
            Accept: "application/json"
            }
            })
            const userGithubEmail = userEmailResponse.data[0].email;
            const {login,id} = userInfoResponse.data

            let user = await User.findOne({email: userGithubEmail});
            if(user){
                  if(user.username!==login || user.providerId !== id ){
                        user.username = login;
                        user.providerId = id;
                        await user.save();
                  }
            }
            else{
                  user = new User({providerId:id,email:userGithubEmail,username:login,authProvider:"github"});
                  await user.save(); 
            }
            // console.log("user data",JSON.stringify(user,null,2));
            const populated_data = await user.populate("role");
            const tokenPayload = {
                  _id: populated_data._id,
                  email: populated_data.email,
                  role: populated_data.role.roleName,
            };

            const accessToken = generateAccessToken(tokenPayload);
            const refreshToken = generateRefreshToken();
            const refreshTokenDoc = new RefreshTokenModel({ userId:tokenPayload._id, token: refreshToken });
            const tokenDoc = await refreshTokenDoc.save();
            if(!tokenDoc){
                  return res.status(500).json({
                              success:false,
                              message:"Refresh token cannot be saved"
                  })
            }
            res.cookie("AccessToken",accessToken, {
                  httpOnly: true,
                  secure: false,         // Use true in production (HTTPS)
                  sameSite: "lax",       // Use "none" for cross-origin + HTTPS
                  path: "/"
                  });

            res.cookie("RefreshToken",refreshToken, {
                  httpOnly: true,
                  secure: false,         // Use true in production (HTTPS)
                  sameSite: "lax",       // Use "none" for cross-origin + HTTPS
                  path: "/",
                  maxAge: 15 * 24 * 60 * 60 * 1000
                  });
            return res.redirect("http://localhost:5173/oauth-callback");


      }
      catch(err){
            return next(err);
      }
}
export const handleLinkedInLogin = (req,res)=>{
      res.send("Login with LinkedIn");
}