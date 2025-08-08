import express from "express";
import { allRoles,addRole,deleteRole } from "../controllers/roles.controller.js";

const router = express.Router();

router.get("/fetchRoles",allRoles);
router.post("/addRole", addRole);
router.post("/deleteRole",deleteRole);

export default router;