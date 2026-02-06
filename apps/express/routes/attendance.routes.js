import express from "express";
import { isTeacher } from "../middleware/class.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { attendanceStartSchema } from "../validation/attendance.validation.js";
import { startAttendanceController } from "../controller/attendance.controller.js";

const router = express.Router();

router.post(
  "/attendance/start",
  isTeacher,
  validate({ body: attendanceStartSchema }),
 startAttendanceController
);

export default router;
