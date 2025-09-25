import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; 
import RefreshTokenModel from "../models/RefreshToken.models.js";
import { generateAccessToken } from "../constants/tokens.js";

const authMiddleware = async (req, res, next) => {
  try {
    const { AccessToken, RefreshToken } = req.cookies;

    // If no tokens at all → Unauthorized
    if (!AccessToken && !RefreshToken) {
      return res.status(401).json({ success: false, message: "No tokens provided" });
    }

    // STEP 1: Try verifying the Access Token
    if (AccessToken) {
      try {
        const decoded = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).populate("role");

        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = {
          _id: user._id,
          email: user.email,
          role: user.role.roleName,
          roleId: user.role._id
        };

        return next();
      } catch (err) {
        // Token expired or invalid, fallback to refresh token below
      }
    }

    // STEP 2: If Access Token invalid/expired → check Refresh Token
    if (RefreshToken) {
      const refreshTokenDoc = await RefreshTokenModel.findOne({ token: RefreshToken });

      if (!refreshTokenDoc) {
        return res.status(401).json({ success: false, message: "Refresh token expired or not found" });
      }

      const user = await User.findById(refreshTokenDoc.userId).populate("role");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Create a new access token
      const tokenPayload = {
        _id: user._id,
        email: user.email,
        role: user.role.roleName,
        roleId: user.role._id
      };

      const newAccessToken = generateAccessToken(tokenPayload);

      // Send new access token cookie
      res.cookie("AccessToken", newAccessToken, {
        httpOnly: true,
        secure: false, // secure only in prod
        sameSite: "lax",
        path: "/"
      });

      req.user = tokenPayload;
      return next();
    }

    return res.status(401).json({ success: false, message: "Invalid tokens" });

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default authMiddleware;
