import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String },
  videoUrl: { type: String }, // Optional for video testimonials
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
