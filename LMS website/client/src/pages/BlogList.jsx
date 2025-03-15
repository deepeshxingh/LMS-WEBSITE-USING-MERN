import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost:8000/api/blog")
      .then(response => {
        const fetchedBlogs = response.data.blogs; 
        setBlogs(fetchedBlogs);
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setError("An error occurred while fetching blogs.");  
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-16">
        <h1 className="text-4xl font-bold mb-6">Blogs</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 mt-16">
        <h1 className="text-4xl font-bold mb-6">Blogs</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <div key={blog._id} className="border p-4 rounded mb-4">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600" dangerouslySetInnerHTML={{__html:blog.content.substring(0,100).concat("...")}} />
            <Link to={`/blog/${blog._id}`} className="text-blue-500">Read More</Link>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;
