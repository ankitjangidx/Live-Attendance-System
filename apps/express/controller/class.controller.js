import attendanceModel from "../model/attendance.model.js";
import classModel from "../model/class.model.js";
import userModel from "../model/user.model.js";

export const createClassController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { className } = req.body;

    const createClass = await classModel.create({
      className,
      teacherId: userId,
    });

    return res.status(201).json({
      success: true,
      data: createClass,
    });
  } catch (error) {
    return next(error);
  }
};

export const addStudentToClassController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { studentId } = req.body;

    // check is class exist
    const classExists = await classModel.findOne({
      _id: id,
    });
    //if class don't exist
    if (!classExists) {
      return res.status(404).json({
        success: false,
        error: "Class not found",
      });
    }
    // if class exist but not a class teacher
    if (!classExists.teacherId.equals(userId)) {
      return res.status(403).json({
        success: false,
        error: "Forbidden, not class teacher",
      });
    }
    // check is user is exist and its student
    const studentExists = await userModel.findOne({
      $and: [
        {
          _id: studentId,
        },
        {
          role: "student",
        },
      ],
    });
    if (!studentExists) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    //add studentid to studentIds
    const addStudent = await classModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { studentIds: studentId },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: addStudent,
    });
  } catch (error) {
    return next();
  }
};
// Auth Required: Yes (Teacher who owns class OR Student enrolled in class)
export const getClassController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const classExists = await classModel
      .findOne({
        _id: id,
        $or: [
          {
            teacherId: userId,
          },
          {
            studentIds: userId,
          },
        ],
      })
      .populate("studentIds");
    if (!classExists) {
      return res.status(403).json({
        success: false,
        error: "Forbidden or class not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: classExists,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllStudentsController = async (req, res, next) => {
  try {
    const allStudents = await userModel
      .find({
        role: "student",
      })
      .select(["_id", "name", "email"]);
    return res.status(200).json({
      success: true,
      data: allStudents,
    });
  } catch (error) {
    return next(error);
  }
};
export const myAttendanceController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    // must be inrolled in a class
    const isEnrolled = await classModel.findOne({
      _id: id,
      studentIds: { $in: [userId] },
    });
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        error: "Not enrolled in this class",
      });
    }
    const myAttendance = await attendanceModel
      .findOne({
        classId: id,
      })
      .select(["classId", "status"]);
    return res.status(200).json({
      success: true,
      data: myAttendance, // it is null but ti should be classId , status 
    });
  } catch (error) {
    return next();
  }
};
