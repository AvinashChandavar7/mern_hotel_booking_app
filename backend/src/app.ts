import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.static("public"))

app.use(cookieParser());


import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)


export { app };