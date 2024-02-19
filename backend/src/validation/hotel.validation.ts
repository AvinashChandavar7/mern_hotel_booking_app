import { param } from "express-validator";

export const hotelDetailValidation = [
  param("id").notEmpty().withMessage("Hotel ID is required")
];