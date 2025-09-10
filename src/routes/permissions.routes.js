import express from "express";
import { insertManyPermissions,getRoleSpecificPermissions,updateRoleSpecificPermissions } from "../controllers/rolePermissions.controller.js";

const router = express.Router();

router.get("/insert-permissions",insertManyPermissions);
router.post("/rolePermissions",getRoleSpecificPermissions);
router.post("/update-role-permissions",updateRoleSpecificPermissions);

export default router;