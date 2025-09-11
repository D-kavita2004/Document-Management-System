import express from "express";
import { AllUsersData,changeRoles} from "../controllers/user.controller.js";
import checkAuthorisation from "../middlewares/authorisaton.middleware.js";

const router = express.Router();

router.get("/AllUsers", checkAuthorisation("can_get_all_users"), AllUsersData);
router.put("/changeRoles",checkAuthorisation("can_change_roles"), changeRoles);


export default router;