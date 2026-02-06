import classModel from "../model/class.model.js";
import ActiveSession from "../store/sessionStore.js";
export const startAttendanceController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { classId } = req.body;

    console.log("inside start attendance");
    // check if class belong to current teacher
    const isOwnClass = await classModel.findOne({
      _id: classId,
      teacherId: userId,
    });

    if (!isOwnClass) {
      return res.status(403).json({
        success: false,
        error: "Forbidden or class not found",
      });
    }
    console.log("before activeSession");
    //start a session
    ActiveSession.startSession(classId);
    console.log("after start  activeSession");
    const currentSession = ActiveSession.getSession();
    console.log("currentsession activeSession");
    return res.status(200).json({
      success: true,
      data: {
        classId: currentSession?.classId,
        startedAt: currentSession?.startedAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};
