import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

// Login

router.post("/login", memberController.login);

// Signup

router.post("/signup", memberController.signup);

export default router;
