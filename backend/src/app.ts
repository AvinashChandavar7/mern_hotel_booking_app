import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)


export { app };