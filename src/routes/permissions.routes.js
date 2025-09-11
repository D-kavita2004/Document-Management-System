import express from "express";
import { insertManyPermissions,getRoleSpecificPermissions,updateRoleSpecificPermissions } from "../controllers/rolePermissions.controller.js";
import checkAuthorisation from "../middlewares/authorisaton.middleware.js";

const router = express.Router();

router.get("/insert-permissions", checkAuthorisation("can_insert_permissions"),insertManyPermissions);
router.post("/rolePermissions", checkAuthorisation("can_get_role_permissions"), getRoleSpecificPermissions);
router.post("/update-role-permissions", checkAuthorisation("can_update_role_permissions"),updateRoleSpecificPermissions);

export default router;