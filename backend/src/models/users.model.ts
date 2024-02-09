import { Schema, models, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";


export interface UserType extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  timestamp: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    password: { type: String, required: [true, "Password is required"], },
    firstName: { type: String, required: true, trim: true, index: true, },
    lastName: { type: String, required: true, trim: true, index: true, }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY as string;

  const signOptions: SignOptions = { expiresIn: refreshTokenExpiry };

  return jwt.sign(payload, refreshTokenSecret, signOptions)
}




const User = models.User || model<UserType>("User", userSchema);

export default User;