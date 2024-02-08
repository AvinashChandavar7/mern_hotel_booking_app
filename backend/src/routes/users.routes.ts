import { Router } from "express";


import {
  registerUser,
} from "../controllers/user.controller";

import { registerValidation } from "../validation/auth.validation";


const router = Router();



router.post('/register', registerValidation, registerUser);

export default router;
