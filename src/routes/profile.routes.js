import express from "express";
import { addProfile, deleteProfile, getAllProfiles, updateProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/getProfiles",getAllProfiles)
router.post("/addProfile",addProfile);
router.delete("/deleteProfile/:profileId",deleteProfile);
router.put("/updateProfile/:profileId",updateProfile);

export default router;
