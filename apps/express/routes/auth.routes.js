import express from "express";
import { loginSchema, signupSchema,  } from "../validation/auth.validation.js";
import { LoginController, meController, SignUpController } from "../controller/auth.controller.js";
import { tokenValidate } from "../middleware/auth.middleware.js";
import {validate} from "../middleware/validate.middleware.js"

const router = express.Router();

router.post("/auth/signup", validate({ body: signupSchema }), SignUpController);
router.post("/auth/login", validate({ body: loginSchema }), LoginController);
router.get("/auth/me", tokenValidate, meController);

export default router;
