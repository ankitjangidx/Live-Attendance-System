import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const SignUpController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    //check if user presnet already
    const isExistingUser = await userModel.findOne({ email });
    console.log("isExistingUser:", isExistingUser);
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }
    //create user
    const CreateUser = await userModel.create({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json({
      success: true,
      data: CreateUser,
    });
  } catch (error) {
   return next(error);
  }
};

export const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        error: "user not signed up",
      });
    }
    //check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(400).json({
        success: false,
        error: "Invalid email or password",
      });
    }
    //generate jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
   return next(error);
  }
};

export const meController = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

