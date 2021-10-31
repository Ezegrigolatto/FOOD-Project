import React from "react";
import "./landingPage.css";
import banquete from "../../assets/banquete.jpg"
import {Link} from "react-router-dom";

export default function LandingPage({ imageSrc }) {
  return (
    <div className="landing">
      <img src={banquete} alt="landing" className="landingImg" />
      <h1 className="landingTxt">Aplicacion food Henry</h1>
      <p className="landingPgp">Welcome to food application, in this site you can search and create for recipes from around world.</p>
      <p className="landingPgp2">Please, do click on the home button and enjoy. </p>
      <Link to="/home">
      <button className="landingBtn"> Home</button>
      </Link>
    </div>
  );
}
