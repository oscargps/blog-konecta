import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadBlogs } from "../utils/loadBlogs";
import Loader from "../components/loader";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/pages/blogdetail.css";
const BlogDetail = () => {
  let { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [Actualblog, setActualBlog] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    let data = await loadBlogs();
    setBlogs(data);
    setActualBlog(data.filter((blg) => blg.slug === slug)[0]);
    setloading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="BlogDetail">
          <div className="BlogDetail-actual">
            <div className="BlogDetail-actual_title">
              <Button
                className="back-btn"
                variant="secondary"
                size="sm"
                onClick={() => (window.location.href = "/")}
              >
                Regresar
              </Button>
              {Actualblog.title}
            </div>
            <div className="BlogDetail-actual_short">
              <img
                src={Actualblog.pic}
                className="BlogDetail-actual_pic"
                alt=""
              />
              <div className="BlogDetail-actual_shortext">
                <span class="badge rounded-pill bg-primary badge-category">
                  {Actualblog.category}
                </span>
                <br />
                {Actualblog.short}
              </div>
            </div>
            <div className="BlogDetail-actual_large">
              <p>{Actualblog.large}</p>
            </div>
            <div className="BlogDetail-actual_footer">
              Por: {Actualblog.author} <br />
              Fecha: {Actualblog.create}
            </div>
          </div>
          <div className="BlogDetail-recomendations">
            <h3>Mas recomendaciones para ti</h3>
            {blogs.map((blog) => (
              <Card key={blog.title} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <span class="badge rounded-pill bg-primary ">
                      {blog.category}
                    </span>
                  </Card.Subtitle>
                  <Card.Text>{blog.short}</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      (window.location.href = "/blog/" + blog.slug)
                    }
                  >
                    Ver...
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
