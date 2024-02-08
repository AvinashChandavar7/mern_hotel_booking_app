import { Router } from "express";


import {
  loginUser,
} from "../controllers/auth.controller";

import { loginValidation } from "../validation/auth.validation";


const router = Router();


router.post('/login', loginValidation, loginUser);

export default router;
