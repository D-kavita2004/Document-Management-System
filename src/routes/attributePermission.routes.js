import express from "express";
import {updateProfilePermission} from "../controllers/attributePermission.controller.js";
import { ProfileAttributes } from "../controllers/attributePermission.controller.js";
const router = express.Router();

router.get("/ProfileAttributes/:profileId",ProfileAttributes);
router.put("/updateProfilePermission/:profileId",updateProfilePermission);

export default router;
