import React from "react";
import "./carousel.css"
export default function Carousel(){
    return(
        <section className="carousel" aria-label="Gallery">
  <ol className="carousel__viewport">
    <li id="carousel__slide1"
        tabindex="0"
        className="carousel__slide">
      <div className="carousel__snapper">
        <a href="#carousel__slide4"
           className="carousel__prev">Go to last slide</a>
        <a href="#carousel__slide2"
           className="carousel__next">Go to next slide</a>
      </div>
    </li>
    <li id="carousel__slide2"
        tabindex="0"
        className="carousel__slide">
      <div className="carousel__snapper"></div>
      <a href="#carousel__slide1"
         className="carousel__prev">Go to previous slide</a>
      <a href="#carousel__slide3"
         className="carousel__next">Go to next slide</a>
    </li>
    <li id="carousel__slide3"
        tabindex="0"
        className="carousel__slide">
      <div className="carousel__snapper"></div>
      <a href="#carousel__slide2"
         className="carousel__prev">Go to previous slide</a>
      <a href="#carousel__slide4"
         className="carousel__next">Go to next slide</a>
    </li>
    <li id="carousel__slide4"
        tabindex="0"
        className="carousel__slide">
      <div className="carousel__snapper"></div>
      <a href="#carousel__slide3"
         className="carousel__prev">Go to previous slide</a>
      <a href="#carousel__slide1"
         className="carousel__next">Go to first slide</a>
    </li>
  </ol>
  <aside className="carousel__navigation">
    <ol className="carousel__navigation-list">
      <li className="carousel__navigation-item">
        
      </li>
      <li className="carousel__navigation-item">
        
      </li>
      <li className="carousel__navigation-item">
       
      </li>
      <li className="carousel__navigation-item">
       
      </li>
    </ol>
  </aside>
</section>
    )
}