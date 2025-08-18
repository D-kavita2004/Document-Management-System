import express from "express";
import { allRoles,addRole,deleteRole, updateRole } from "../controllers/roles.controller.js";
import { validateRole } from "../validators/roleValidation.js";

const router = express.Router();

router.get("/fetchRoles",allRoles);
router.post("/addRole",validateRole,addRole);
router.post("/deleteRole",deleteRole);
router.post("/updateRole",validateRole,updateRole);

export default router;