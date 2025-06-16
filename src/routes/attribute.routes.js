import express from "express";
import {updateAttributes} from "../controllers/attribute.controller.js";
const router = express.Router();

router.get("/updateAttribute",updateAttributes);
export default router;
