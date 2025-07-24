import express from "express";
import { signUp, logIn, logOut, handleGoogleLogin,handleGithubLogin,handleLinkedInLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/SignUp",signUp);
router.post("/LogIn",logIn);
router.post("/LogOut",logOut);
router.post("/google-login",handleGoogleLogin);
router.get("/github/callback",handleGithubLogin);
router.get("/linkedin/callback",handleLinkedInLogin);
export default router;