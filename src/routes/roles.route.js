import express from "express";
import { allRoles,addRole,deleteRole, updateRole } from "../controllers/roles.controller.js";
import { validateRole } from "../validators/roleValidation.js";
import checkAuthorisation from "../middlewares/authorisaton.middleware.js";
const router = express.Router();

router.get("/fetchRoles", checkAuthorisation("can_get_all_roles"), allRoles);
router.post("/addRole",  checkAuthorisation("can_add_new_role"), validateRole,addRole);
router.post("/deleteRole", checkAuthorisation("can_delete_role"), deleteRole);
router.post("/updateRole", checkAuthorisation("can_update_role"), validateRole,updateRole);

export default router;