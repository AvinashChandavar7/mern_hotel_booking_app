import { Router } from "express";

import {
  searchHotel,
} from "../controllers/hotel.controller";


const router = Router();


router.get("/search", searchHotel)

export default router;
