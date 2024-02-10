import { Router } from "express";

import {
  myHotels
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

export default router;
