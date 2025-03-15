import express from "express";
import { addTestimonial, getTestimonials, deleteTestimonial } from "../controller/testimonialController.js";

const router = express.Router();

router.post("/add", addTestimonial);
router.get("/all", getTestimonials);
router.delete("/:id", deleteTestimonial);

export default router;
