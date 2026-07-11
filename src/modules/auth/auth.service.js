import User from "../../models/User.js";
import generateToken from "../../common/utils/generateToken.js";
import cloudinary from "../../common/utils/cloudinary.js";
import AppError from "../../common/utils/AppError.js";
import fs from "fs";
import bcrypt from "bcryptjs";

export const registerUserService = async ({ name, email, password, file }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new AppError("User already exists", 400);

  let avatarUrl = "";
  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      avatarUrl = result.secure_url;
    } finally {
      fs.unlink(file.path, () => {});
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarUrl,
  });

  return {
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Please register", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Password not matched", 401);

  return {
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role || "user",
    },
  };
};

export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};
