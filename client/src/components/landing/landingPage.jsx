import React from "react";
import { useEffect } from "react";
import "./landingPage.css";
import fondolanding from "../../assets/fondolanding.jpg"
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDiets } from "../../actions";
import Carousel from "../carousel/carousel.jsx"


export default function LandingPage({ imageSrc }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className="landing">
      <img src={fondolanding} alt="landing" className="landingImg" />
      <div className="carouselcontainer">
      <Carousel />
      </div>
      <div className="textcontainer">
      <h1 >Henry food page</h1>
      <p>Welcome to my food Page!
      This is an individual project realized during henry's course.
      Please, do click on the home button and enjoy. </p>
      </div>
      <Link to="/home">
      <button className="landingBtn"> Home</button>
      </Link>
    </div>
  );
}

