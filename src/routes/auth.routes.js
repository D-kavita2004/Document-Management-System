import express from "express";
import { signUp, logIn, logOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/SignUp",signUp);
router.post("/LogIn",logIn);
router.post("/LogOut",logOut);

export default router;