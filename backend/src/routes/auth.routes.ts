import { Router } from "express";


import {
  loginUser,
  tokenValidation,
} from "../controllers/auth.controller";

import { loginValidation } from "../validation/auth.validation";
import verifyToken from "../middleware/auth.middleware";


const router = Router();


router.post('/login', loginValidation, loginUser);

router.get("/validate-token", verifyToken, tokenValidation);

export default router;
