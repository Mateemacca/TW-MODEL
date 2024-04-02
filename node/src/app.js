import express from "express";
import morgan from "morgan";
//routes
import authRoutes from "./routes/auth.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api", authRoutes);
app.use("/api", tasksRouter);

export default app;
