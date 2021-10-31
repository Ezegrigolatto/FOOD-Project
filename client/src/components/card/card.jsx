import React from "react";
import "./card.css";
export default function Card({ name, diets, image }) {
  return (
    <div className="card">
      <h3 className="name">{name}</h3>
      <img className="img" src={image} alt="sin imagen" />
      <h5 className="diet">{diets}</h5>
    </div>
  );
}
