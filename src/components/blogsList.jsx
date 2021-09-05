import React, { useState, useEffect } from "react";
import { loadBlogs } from "../utils/loadBlogs";
import Loader from "./loader";
import BlogItem from "./blogItem";
import "../styles/components/blogslist.css";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(async () => {
    let data = await loadBlogs();
    setBlogs(data);
    setloading(false);
  }, []);
  return (
    <>
      <span className="BlogsList-title">Ultimas entradas</span>
      <hr></hr>
      {loading ? (
        <Loader />
      ) : (
        <div className="BlogsList-list">
          {blogs.map((blog) => (
              <>
            <BlogItem key={blog.id} data={blog} />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogsList;
