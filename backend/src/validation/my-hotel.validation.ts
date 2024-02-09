import { body } from "express-validator";


export const myHotelsValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
  body("imageUrls").notEmpty().isArray().withMessage("ImageUrls is required"),
  body("adultCount").notEmpty().isNumeric().withMessage("AdultCount is required"),
  body("childCount").notEmpty().isNumeric().withMessage("ChildCount is required"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("PricePerNight is required"),
  body("starRating").notEmpty().isNumeric().withMessage("StarRating is required"),
  body("lastUpdated").notEmpty().withMessage("LastUpdated is required"),
];