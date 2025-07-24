import express from "express";
import { AllUsersData,changeRoles } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/AllUsers",AllUsersData);
router.put("/changeRoles",changeRoles);

export default router;