import React from "react";
import { Link } from "react-router-dom";
import { postRecipes, getDiets } from "../../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createrecipe.css";
import Circulo from "../../assets/circulo.png"

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);
  const [recipe, setRecipe] = useState({
    name: "",
    resume: "",
    score: 0,
    healthy: 0,
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function handleNameChange(e) {
    setRecipe({
      ...recipe,
      //regexp para seleccionar la 1er letra de cada palabra
      [e.target.name]: e.target.value.replace(/\b\w/g, (l) => l.toUpperCase()),
    });
  }

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheckbox(e) {
    if (e.target.checked && !recipe.diets.includes(e.target.value)) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((diet) => diet !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      recipe.name.length > 0 &&
      recipe.resume.length > 0 &&
      recipe.steps.length > 0 &&
      recipe.score <= 100 &&
      recipe.score >= 1 &&
      recipe.healthy <= 100 &&
      recipe.healthy >= 1
    ) {
      dispatch(postRecipes(recipe));
      alert("Your recipe has created succesfully")
      window.location.reload();
    } else {
      alert("Please, check all inputs");
    }
  }

  function handleReload() {
    const result = window.confirm(
      "You are about to cancel the creation of your recipe"
      )
      if (result === true) {
        window.location.reload()
      }
  }

  return (
    <div className="container">
      <img className="circle" src={Circulo}></img>
      <Link to="/home" className="back">Go back</Link>

      <h1 className="createTitle">Create Recipe</h1>

      <div  className="creatingCard">
      <form>
        <div className="inputs">
          <label>Name</label>
          <input
            type="text"
            placeholder="Recipe name"
            autocomplete="off"
            name="name"
            value={recipe.name}
            onChange={handleNameChange}
          />
        </div>

        <div className="inputs">
          <label>Resume</label>
          <input
            type="text"
            placeholder="Resume or summary"
            autocomplete="off"
            name="resume"
            value={recipe.resume}
            onChange={handleChange}
          />
        </div>

        <div className="createscores">
          <label>Score:</label>
          <input
            type="number"
            min="1"
            max="100"
            name="score"
            value={recipe.score}
            onChange={handleChange}
          />
        
          <label>Healthy:</label>
          <input
            type="number"
            min="1"
            max="100"
            name="healthy"
            value={recipe.healthy}
            onChange={handleChange}
          />
        </div>

        <div className="inputs">
          <label>Steps</label>
          <input
            type="textarea"
            placeholder="Recipe steps"
            autocomplete="off"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
          />
        </div>

          <h2 className="cboxtitle">Diets</h2>
        <div className="cbox">
          
            {allDiets.map((d) => (
              <label>
                <input 
                  onChange={handleCheckbox}
                  type="checkbox"
                  name={d.name}
                  value={d.name}
                />
                {d.name}
              </label>
            ))}
        </div>
        <div className="createbuttons">
        <button className="createbutton" type="submit" onClick={handleSubmit}>
          Create!
        </button>
      </div>
      </form>
      <button className="createbutton" onClick={handleReload}>Discard </button>
      </div>
    </div>
  );
}
