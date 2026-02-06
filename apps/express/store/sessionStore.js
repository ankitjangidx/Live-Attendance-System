const createActiveSession = () => {
  let classId = null;
  let startedAt = null;
  let attendance = {};

  const startSession = (id) => {
    if (classId) {
      throw new Error("Another class session is already active");
    }
    classId = id;
    startedAt = new Date().toISOString();
    attendance = {};
  };

  const endSession = () => {
    if (!classId) {
      throw new Error("No active class session");
    }
    classId = null;
    startedAt = null;
    attendance = {};
  };

  const markAttendance = (studentId, status = "present") => {
    if (!classId) {
      throw new Error("No active session");
    }
    attendance[studentId] = status;
  };

  const getSession = () => ({
    classId,
    startedAt,
    attendance: { ...attendance }, 
  });


  return Object.freeze({
    startSession,
    endSession,
    markAttendance,
    getSession,
  });
};

const ActiveSession = createActiveSession();
export default ActiveSession;
