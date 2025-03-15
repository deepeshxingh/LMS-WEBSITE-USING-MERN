import express from "express";
import { createUser, deleteUser, getAllUsers, loginUser, logout, updateProfile,  } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../multer/multer.js";

const router= express.Router()

router.route("/createUser").post(createUser)
router.route("/loginUser").post(loginUser)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile)
router.route("/getAllUser").get(isAuthenticated, getAllUsers)
router.route("/deleteUser/:id").delete (deleteUser)

export default router;