import React from "react";
import "./card.css";
export default function Card({ name, diets, image }) {
const arr = diets.map((d)=>d.name)
  return (
    <div className="card">
      <h3 className="name">{name}</h3>
      <img className="img" src={image} alt="sin imagen" />
      <span className="diet"> Diets: {arr.join(", " )}.</span>

      {/* <input type="checkbox" id="abrir-cerrar" name="abrir-cerrar" value=""/>
    <label for="abrir-cerrar">&#9776; <span className="abrir">Diets</span><span className="cerrar">Cerrar</span></label>
    <div id="sidebar" className="sidebar">
        <ul className="menu">
        {diets.map((d)=><li>{d.name}</li>)}
        </ul>
    </div> */}

    </div>
  );
}
