import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(cookieParser());


import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"
import myHotelRoutes from "./routes/my-hotels.routes"
import hotelsRoutes from "./routes/hotel.routes"
import bookingsRoutes from "./routes/my-booking.routes"


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/my-hotels", myHotelRoutes)
app.use("/api/v1/hotels", hotelsRoutes)
app.use("/api/v1/bookings", bookingsRoutes)


app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
})


export { app };