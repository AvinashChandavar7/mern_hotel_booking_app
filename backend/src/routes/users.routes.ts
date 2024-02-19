import { Router } from "express";


import {
  registerUser,
  getCurrentUser,
} from "../controllers/user.controller";

import { registerValidation } from "../validation/auth.validation";
import verifyToken from "../middleware/auth.middleware";


const router = Router();



router.post('/register', registerValidation, registerUser);

router.get("/current-user", verifyToken, getCurrentUser);

export default router;
