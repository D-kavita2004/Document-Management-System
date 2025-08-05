import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const generateAccessToken = (payload)=>{
      if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRY) {
            throw new Error("Missing JWT config in .env");
      }

      const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
      return token;
}
export const generateRefreshToken = ()=>{
      const token = crypto.randomBytes(64).toString("hex");
      return token
}