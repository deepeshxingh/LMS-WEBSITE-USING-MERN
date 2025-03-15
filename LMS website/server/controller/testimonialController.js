import { Testimonial } from "../models/testimonialModel.js";

// Add a new testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { studentName, course, rating, reviewText, videoUrl } = req.body;
    const newTestimonial = new Testimonial({
      studentName,
      course,
      rating,
      reviewText,
      videoUrl,
    });
    await newTestimonial.save();
    res
      .status(201)
      .json({ success: true, message: "Testimonial added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
