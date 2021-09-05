import React, { useState } from "react";
import "../styles/components/blogitem.css";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
const BlogItem = (props) => {
  const { data } = props;
  return (
    <>
      <div className="BlogItem">
          <Card>
            <Card.Body>
            <Card.Img variant="top" src={data.pic} />
              <Card.Title><p className="BlogItem-title">{data.title}</p></Card.Title>
              <Card.Text>
                {data.short}
              </Card.Text>
              <Button variant="outline-primary" >Ver mas...</Button>
            </Card.Body>
            <Card.Footer>
                Por: {data.author} <br/>
                Fecha: {data.create}
            </Card.Footer>
          </Card>
      </div>
    </>
  );
};

export default BlogItem;
