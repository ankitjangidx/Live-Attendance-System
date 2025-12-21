import classModel from "../model/class.model.js";

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

    // check is teacher of class id or not
    const classExists = await classModel.findOne({
      _id: id,
      teacherId: userId,
    });
    if (!classExists) {
      return res.status(401).json({
        success: false,
        error: "This class does not belong to you",
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


