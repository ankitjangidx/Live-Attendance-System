// In-memory global state for the active attendance session
// Assumption: Only ONE session active at a time.

export const activeSession = {
  classId: null,
  startedAt: null,
  attendance: {}, // Map studentId -> status ("present" | "absent")
};

export const resetSession = () => {
  activeSession.classId = null;
  activeSession.startedAt = null;
  activeSession.attendance = {};
};
