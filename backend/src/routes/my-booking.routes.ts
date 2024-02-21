import { Router } from "express";


import {
  getMyBookings
} from "../controllers/my-booking.controller";

import verifyToken from "../middleware/auth.middleware";

const router = Router();


router.get("/", verifyToken, getMyBookings)


export default router;
