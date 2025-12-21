import z from "zod";

export const CreateClassSchema = z.object({
  className: z.string(),
});

export const addStudentSchema = z.object({
  studentId: z.string(),
});
