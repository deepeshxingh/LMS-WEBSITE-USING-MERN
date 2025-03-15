import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controller/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs)
router.get("/:id", getBlogById)
router.post("/", createBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)

export default router;