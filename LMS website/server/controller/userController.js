import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import getDataUri from "../utils/uri/dataUri.js";
import cloudinary from "../utils/cloudinary/cloudinary.js";

export const createUser = async(req,res)=>{
  try {
    const { name, email, password, role} = req.body;  
    if(!name || !email || !password || !role){
      return res.status(400).json({
        success : false, 
        message: "All fields are required"
      })
    }
    // Check if email already exists
    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(400).json({
        success : false,
        message: "Email already exists",
      })
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10)
   let response = await User.create({
    name,
    email,
    password: hashedPassword,
    role
   })
   return res.status(200).json({
    success : true,
    message: "Account created successfully",
    user : response

   })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to register.Please try Again",
      error
    })
  }
}

export const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body
    if(!email ||!password){
      return res.status(400).json({
        success : false,
        message: "All fields are required"
      })
    }
    // Check if email exists
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        success : false,
        message: "User not found",
      })
    }
    // Compare password
    const match = await bcrypt.compare(password, user.password)
    if(!match){
      return res.status(401).json({
        success : false,
        message: "Incorrect password",
      })
    }
    
    // Generate JWT token
    
    // Here initial code was id later i changed to userId

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


res.cookie("token", token, {
  httpOnly: true,        // Secure, cannot be accessed by JavaScript
  secure: true,         // true only for HTTPS (use false for localhost)
  sameSite: true,       // Helps with cross-origin (lax or none for cross-origin)
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
});

return res.status(200).json({
  success: true,
  message: `Welcome Back ${user.name}`,
  user,
});

    
    
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to login. Please try Again",
      error
    })
    
  }
}

export const logout = async (req,res)=>{
  try {
    res.status(200).cookie("token","",{maxAge: 0}).json({
      success : true,
      message: "Logged Out Successfully"
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success : false,
      message: "Failed to Logout. Please try Again",
      error
    })
  }
}


export const updateProfile = async (req, res) => {
  try {
    console.log("File received: ", req.file); // ✅ Check if file exists
    console.log("Body: ", req.body); // ✅ Verify form fields

    const userId = req.id; // Ensure 'req.id' is being set properly (from middleware)
    const { name, description } = req.body;
    const file = req.file;

    // Check if user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update basic details
    if (name) user.name = name;
    if (description) user.description = description;

    // Handle file upload only if a file is provided
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      user.photoUrl = cloudResponse.secure_url;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}

// For deleting user

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
