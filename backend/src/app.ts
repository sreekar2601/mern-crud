import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NotesRoutes from "./routes/NoteRoutes";
import UserRoutes from "./routes/UserRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/user", UserRoutes);

app.use("/api/notes", NotesRoutes);

app.use((req, res, next) => {
  console.log("Hello");
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let erroMessage = " An Error Occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    erroMessage = error.message;
  }
  res.status(statusCode).json({ error: erroMessage });
});
export default app;
