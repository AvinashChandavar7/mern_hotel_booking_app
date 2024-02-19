import { Router } from "express";

import {
  searchHotel,
  getHotelDetailsById
} from "../controllers/hotel.controller";

import { hotelDetailValidation } from "../validation/hotel.validation";


const router = Router();




router.get("/search", searchHotel)

router.get("/:id",
  hotelDetailValidation,
  getHotelDetailsById
);



export default router;
