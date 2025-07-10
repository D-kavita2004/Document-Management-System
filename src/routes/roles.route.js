import express from "express";
import { allRoles } from "../controllers/roles.controller.js";
import { addRole } from "../controllers/roles.controller.js";

const router = express.Router();

router.get("/fetchRoles",allRoles);
router.post("/addRole", addRole);
export default router;