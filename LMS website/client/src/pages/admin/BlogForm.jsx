import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
// import "jodit/build/jodit.min.css"; // Ensure CSS is loaded

const BlogForm = ({ fetchBlogs, editingBlog, setEditingBlog }) => {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const editor = useRef(null);

  useEffect(() => {
    if (editingBlog) setBlog(editingBlog);
  }, [editingBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBlog) {
      axios
        .put(`http://localhost:8000/api/blog/${editingBlog._id}`, blog)
        .then(() => {
          fetchBlogs();
          setEditingBlog(null);
        })
        .catch((error) => console.error("Error updating blog:", error));
    } else {
      axios
        .post("http://localhost:8000/api/blog/", blog)
        .then(() => {
          fetchBlogs();
          setBlog({ title: "", content: "" });
        })
        .catch((error) => console.error("Error creating blog:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="border p-2 w-full mb-2"
        placeholder="Title"
        required
      />
      <JoditEditor
        value={blog.content}
        ref={editor}
        
        onChange={(newContent) => setBlog({ ...blog, content: newContent })}
        className="border p-2 w-full mb-2"
        placeholder="Content"
        required
      />


      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingBlog ? "Update" : "Create"} Blog
      </button>
    </form>
  );
};

export default BlogForm;
