import express from "express";
import { isTeacher } from "../middleware/class.middleware.js";
import {
  addStudentSchema,
  CreateClassSchema,
} from "../validation/class.validation.js";
import {
  addStudentToClassController,
  createClassController,
} from "../controller/class.controller.js";
import { validate } from "../middleware/validate.middleware.js";
const router = express.Router();

router.post(
  "/class",
  isTeacher,
  validate({ body: CreateClassSchema }),
  createClassController
);
router.post(
  "/class/:id/add-student",
  isTeacher,
  validate({ body: addStudentSchema }),
  addStudentToClassController
);

export default router;
