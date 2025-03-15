import Blog from "../models/blogModel.js";

// Add a new blog post
export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      err,
    });
  }
};

// Update blog

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog)
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      err,
    });
  }
};

// Delete blog

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      err,
    });
  }
};

// Get all blog posts

export const getAllBlogs = async(req,res)=>{
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      blogs,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch blogs",
      error: err,
    });
  }
}

// Get single blog post

export const getBlogById = async(req,res)=>{
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) 
      return res.status(404).json({ 
    success: false, 
    message: "Blog not found"
  });
    res.status(200).json({
      success: true,
      blog,
      message: "Blog fetched successfully"
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch blog",
      error: err,
     });
  }
}
