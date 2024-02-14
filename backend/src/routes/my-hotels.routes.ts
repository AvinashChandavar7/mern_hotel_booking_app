import { Router } from "express";

import {
  myHotels,
  getAllHotels,
  getHotelById,
  updateMyHotel
} from "../controllers/my-hotels.controller";

import { myHotelsValidation } from "../validation/my-hotel.validation";

import upload from "../middleware/multer.middleware";
import verifyToken from "../middleware/auth.middleware";


const router = Router();


router.post(
  '/',
  verifyToken,
  myHotelsValidation,
  upload.array("imageFiles", 6),
  myHotels
);

router.get("/", verifyToken, getAllHotels);

router.get("/:id", verifyToken, getHotelById);

router.put(
  '/:hotelId',
  verifyToken,
  myHotelsValidation,
  upload.array("imageFiles", 6),
  updateMyHotel
);



export default router;
