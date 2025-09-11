import express from "express";
import {updateProfilePermission} from "../controllers/attributePermission.controller.js";
import { ProfileAttributes } from "../controllers/attributePermission.controller.js";
import checkAuthorisation from "../middlewares/authorisaton.middleware.js";
const router = express.Router();

router.get("/ProfileAttributes/:profileId", checkAuthorisation("can_get_profile_attributes"), ProfileAttributes);
router.put("/updateProfilePermission/:profileId", checkAuthorisation("can_update_profile_permission"),  updateProfilePermission);

export default router;
