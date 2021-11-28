import React from "react";
import "./card.css";
export default function Card({ name, diets, image }) {
const arr = diets.map((d)=>d.name)
  return (
    <div className="card">
      <h3 className="name">{name}</h3>
      <img className="img" src={image} alt="sin imagen" />
      <span className="diet"> Diets: {diets.length? arr.join(", " ):"There are no diets"}.</span>
    </div>
  );
}
