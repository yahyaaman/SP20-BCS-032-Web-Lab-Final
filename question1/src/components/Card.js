import React from "react";
import "./Card.css";

const Card = ({ id, title, body, userId }) => {
  return (
    // <div className="background">
    <div className="card-body">
      <p>Post ID: {id}</p>
      <h3>{title}</h3>
      <div className="body">
        <p>{body}</p>
      </div>

      <h3>User ID: {userId}</h3>
    </div>
  );
};

export default Card;
