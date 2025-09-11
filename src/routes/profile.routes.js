import express from "express";
import { addProfile, deleteProfile, AllProfiles, updateProfile } from "../controllers/profile.controller.js";
import checkAuthorisation from "../middlewares/authorisaton.middleware.js";

const router = express.Router();

router.get("/AllProfiles", checkAuthorisation("can_get_all_profiles"), AllProfiles)
router.post("/addProfile", checkAuthorisation("can_add_profile"), addProfile);
router.delete("/deleteProfile/:profileId", checkAuthorisation("can_delete_profile"), deleteProfile);
router.put("/updateProfile/:profileId", checkAuthorisation("can_update_profile"), updateProfile);

export default router;
