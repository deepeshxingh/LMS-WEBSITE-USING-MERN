import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:8000/api/blog/${id}`)
      .then(response => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog:", error);
        setError("An error occurred while fetching the blog details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold">Blog Details</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold">Blog Details</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-14 mb-72">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-gray-600" dangerouslySetInnerHTML={{__html:blog.content}} />
    </div>
  );
};

export default BlogDetails;
