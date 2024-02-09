import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import User from "../models/users.model";
import { validateAndHandleErrors } from "../validation/auth.validation";



const loginUser = asyncHandler(async (req, res) => {
  validateAndHandleErrors(req, res);

  const { email, password } = req.body;


  if (!email) {
    throw new ApiError(400, "email is required")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  };


  return res.status(200)
    .cookie("auth_Token", token, options)
    .json(new ApiResponse(200, { userId: user._id }, "User successfully login"));

  // return res.status(200)
  //   .cookie("auth_Token", token, options)
  //   .json(new ApiResponse(200, { user: user, token }, "User successfully login"));
})

const tokenValidation = asyncHandler(async (req, res) => {
  return res.status(200)
    .json(new ApiResponse(200, { userId: req.userId }, "Token Validation"));
})

const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200)
    .cookie("auth_Token", "", { expires: new Date(0) })
    .json(new ApiResponse(200, "User successfully LogOut"));
})

export {
  loginUser,
  tokenValidation,
  logoutUser
}