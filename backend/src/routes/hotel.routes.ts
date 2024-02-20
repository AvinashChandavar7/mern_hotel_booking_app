import { Router } from "express";

import {
  searchHotel,
  getHotelDetailsById,
  handlePaymentIntent,
  handleBookings,
} from "../controllers/hotel.controller";

import {
  hotelDetailValidation
} from "../validation/hotel.validation";

import verifyToken from "../middleware/auth.middleware";

const router = Router();

router.get("/search", searchHotel)

router.get("/:id",
  hotelDetailValidation,
  getHotelDetailsById
);


router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  handlePaymentIntent
)

router.post(
  "/:hotelId/bookings",
  verifyToken,
  handleBookings
)




export default router;
