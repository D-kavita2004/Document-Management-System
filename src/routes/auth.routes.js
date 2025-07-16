import express from "express";
import { signUp, logIn, logOut, handleGoogleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/SignUp",signUp);
router.post("/LogIn",logIn);
router.post("/LogOut",logOut);
router.post("/google-login",handleGoogleLogin);
export default router;