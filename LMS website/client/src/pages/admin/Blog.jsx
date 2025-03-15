import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "./BlogForm";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get("http://localhost:8000/api/blog")
      .then(response => {
        console.log('Fetched Blogs:', response.data.blogs);
        if (Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
        } else {
          console.error("Error: Blogs data is not an array");
        }
      })
      .catch(error => console.error("Error fetching blogs:", error));
  };

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:8000/api/blog/${id}`)
      .then(() => fetchBlogs())
      .catch(error => console.error("Error deleting blog:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blog Section</h1>
      <BlogForm 
        fetchBlogs={fetchBlogs} 
        editingBlog={editingBlog} 
        setEditingBlog={setEditingBlog} 
      />
      
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="border-2 border-black p-4 rounded mb-4">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <div className="flex gap-20 mt-5">
              <button 
                onClick={() => setEditingBlog(blog)} 
                className="mr-4 text-white bg-blue-600 py-1 px-3 rounded-2xl text-lg"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteBlog(blog._id)} 
                className="mr-4 text-white bg-red-600 py-1 px-3 rounded-2xl text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Blog;
