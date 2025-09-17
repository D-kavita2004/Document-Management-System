import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; 
import RefreshTokenModel from "../models/RefreshToken.models.js";
import { generateAccessToken } from "../constants/tokens.js";

const authMiddleware =async (req, res, next) => {

  const { AccessToken, RefreshToken } = req.cookies;
  if (!AccessToken && !RefreshToken) return res.sendStatus(401);

  try {
    // 1. Try access token
    const decoded = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);
    req.user = decoded;
    return next();

  } catch (err) {
    if (RefreshToken) {
      try 
      {
        const refreshTokenDoc = await RefreshTokenModel.findOne({token:RefreshToken});
        if(refreshTokenDoc){
            const userData = await User.findOne({_id:refreshTokenDoc.userId});
            const populated_data = await userData.populate("role");
            const tokenPayload = {
                    _id: populated_data._id,
                    email: populated_data.email,
                    role: populated_data.role.roleName,
                    roleId: populated_data.role._id
            };
            // console.log("tokenPayload",tokenPayload);
            const newAccessToken = generateAccessToken(tokenPayload);
            res.cookie("AccessToken",newAccessToken, {
              httpOnly: true,
              secure: false,         
              sameSite: "lax",       
              path: "/",
              });
            // console.log("newAccessToken",newAccessToken)
          req.user = {
            _id: populated_data._id,
            email: populated_data.email,
            role: populated_data.role.roleName,
            roleId: populated_data.role._id
          };
  ;
          return next();
          }
        else{
          return res.status(401).json({
              success:false,
              message:"Refresh token expired"
          })
        }
      } 
      catch (refreshErr) 
      {

        return res.status(403).json({
              success:false,
              message:"Refresh token invalid"
        }); 
      }
    }

    return res.status(401).json({
            success:false,
            message:"Token invalid for other reason"
    }); 
  }
}

export default authMiddleware;
