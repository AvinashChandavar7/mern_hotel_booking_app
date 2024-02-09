import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import User from "../models/users.model";
import { validateAndHandleErrors } from "../validation/auth.validation";




const registerUser = asyncHandler(async (req, res) => {
  validateAndHandleErrors(req, res);

  const { firstName, lastName, email, password } = req.body;


  if ([firstName, lastName, email, password].some(
    (field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field is required")
  }

  const exitedUser = await User.findOne({ email: email });

  if (exitedUser) {
    throw new ApiError(400, "User email already exited")
  }


  const user = await User.create({ email, password, firstName, lastName });

  if (!user) {
    throw new ApiError(400, "Invalid user")
  }

  const token = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  };

  return res.status(200)
    .cookie("auth_Token", token, options)
    .json(new ApiResponse(200, { user: user, token }, "User successfully login"));
})


export {
  registerUser
}