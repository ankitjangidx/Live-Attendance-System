import express from "express";
import { isStudent, isTeacher } from "../middleware/class.middleware.js";
import {
  addStudentSchema,
  CreateClassSchema,
} from "../validation/class.validation.js";
import {
  addStudentToClassController,
  createClassController,
  getAllStudentsController,
  getClassController,
  myAttendanceController,
} from "../controller/class.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { tokenValidate } from "../middleware/auth.middleware.js";


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
router.get("/class/:id", tokenValidate, getClassController);
router.get("/students", isTeacher, getAllStudentsController);
router.get("/class/:id/my-attendance", isStudent, myAttendanceController);


export default router;
