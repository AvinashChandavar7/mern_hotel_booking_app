import { check } from "express-validator";
import { validationResult } from "express-validator";


export const registerValidation = [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
];


export const validateAndHandleErrors = (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
};

