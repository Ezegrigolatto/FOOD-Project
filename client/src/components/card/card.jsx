import React from "react";
import "./card.css";
export default function Card({ name, diets, image, id }) {
  return (
    <div className="card">
      <h3 className="name">{name}</h3>
      <img className="img" src={image} alt="sin imagen" />
      <p className="diet"> {diets.map((d)=>d.name)}</p>
    


    </div>
  );
}
