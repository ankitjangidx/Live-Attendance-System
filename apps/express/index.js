import express from "express";
import connect from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import ClassRouter from "./routes/class.routes.js";
import AttendanceRouter from "./routes/attendance.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());



app.use(AuthRouter);
app.use(ClassRouter);
app.use(AttendanceRouter);

app.use((err, req, res, _next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  await connect();

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
};

startServer();
