import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenValidate = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    console.log("authheader:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token missing",
      });
    }
    const decoded = await jwt.verify(token, JWT_SECRET);

    console.log("decoded", decoded.userId);

    //   check if user exist
    const isUserExist = await userModel.findById(decoded.userId);
    if (!isUserExist) {
      res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // attach user info to request
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid",
      message: error,
    });
  }
};
