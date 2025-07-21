import express from "express";
import { signUp, logIn, logOut, handleGoogleLogin,handleGithubLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/SignUp",signUp);
router.post("/LogIn",logIn);
router.post("/LogOut",logOut);
router.post("/google-login",handleGoogleLogin);
router.get("/github/callback",handleGithubLogin);
export default router;