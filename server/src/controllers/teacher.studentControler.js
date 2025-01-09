import User from "../models/user.model.js";
import { validateFields } from "../utils/functions.js";

// update profile
export const getTecStu = async (req, res) => {



  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: {
          field: "user",
          error: "user does not exist",
        },
      });
    }
    
    return res.status(201).json({
      success: true,
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({
      success: false,
      errors: {
        field: "other",
        error: "Internal Server Error",
      },
    });
  }
};
