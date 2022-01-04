import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, resetDetails } from "../../actions";
import "./detail.css";
import A from "../../assets/0a17.jpg";
import B from "../../assets/18a33.jpg";
import C from "../../assets/34a50.jpg";
import D from "../../assets/51a67.jpg";
import E from "../../assets/68a83.jpg";
import F from "../../assets/84a100.jpg";
import LH from "../../assets/lowhealthy.png";
import MH from "../../assets/mediumhealthy.png";
import HH from "../../assets/highhealthy.png";
import Circulo from "../../assets/circulo.png";

export default function Detail() {
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.details);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  useEffect(() => {
    dispatch(resetDetails());
  }, [Detail]);

  function score() {
    if (recipeDetails.spoonacularScore <= 17) {
      return A;
    } else if (recipeDetails.spoonacularScore <= 33) {
      return B;
    } else if (recipeDetails.spoonacularScore <= 50) {
      return C;
    } else if (recipeDetails.spoonacularScore <= 67) {
      return D;
    } else if (recipeDetails.spoonacularScore <= 83) {
      return E;
    } else {
      return F;
    }
  }

  function healthScore() {
    if (recipeDetails.healthScore <= 33) {
      return LH;
    } else if (recipeDetails.healthScore <= 66) {
      return MH;
    } else {
      return HH;
    }
  }

  function handleSteps() {
    if (recipeDetails.instructions) {
      return (
        <p
          className="steps"
          dangerouslySetInnerHTML={{
            __html: `${recipeDetails.instructions}`,
          }}>
        </p>
      );
    } else {
      return <p className="steps">No steps available.</p>;
    }
  }

  function handleDiets(){
    if (recipeDetails.diets) {
      return (
        <h4 >
          {recipeDetails.diets.map((diet) => diet).join(", ")}.{" "}
        </h4>
      )
    }else{
      return <h4 className="diets">No diets available.</h4>;
    }
  }



  return (
    <div className="detailcontainer">
      <img className="circle" src={Circulo} alt="title"></img>
      <Link className="back" to="/home">
        Go back
      </Link>

      { recipeDetails.image?
        <div>
          <h2 className="title">{recipeDetails.title}</h2>
          <div className="imgResumeContainer">
            <img
              className="imgCard"
              src={recipeDetails.image}
              alt="detail"
            ></img>
            <div className="resumeScoreHealthy">
              <p
                className="resume"
                dangerouslySetInnerHTML={{ __html: `${recipeDetails.summary}` }}
              ></p>
              <div className="scores">
                <h3>
                  {" "}
                  Score: {recipeDetails.spoonacularScore}/100{" "}
                  <img className="score" src={score()} alt="score"></img>
                </h3>
                <h3>
                  {" "}
                  Healthy: {recipeDetails.healthScore}/100{" "}
                  <img
                    className="healthscore"
                    src={healthScore()}
                    alt="health"
                  ></img>{" "}
                </h3>
              </div>
            </div>
          </div>
          <div className="diets">
            <h2 className="dietstitle" >Diets</h2>
            <h4 className="arrdiets">
              {handleDiets()}
            </h4>
          </div>
          <h4 className="stepstitle"> Steps: </h4>
          <div className="stepscontainer">{handleSteps()}</div>
        </div>
        : <div className="spinner"></div>
      }
    </div>
  );
}
