import React from "react";
import { Link } from "react-router-dom";
import { postRecipes, getDiets } from "../../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      alert("Please, complete all inputs");
    }
  }

  function handleReload() {
    let result = window.confirm(
      "You are about to cancel the creation of your recipe"
    );
    if (result) {
      window.location.reload();
    }
  }

  return (
    <div>
      <Link to="/home">Go back</Link>
      <h1>Create Recipe</h1>

      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Recipe name"
            name="name"
            value={recipe.name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <label>Resume</label>
          <input
            type="text"
            placeholder="Resume or summary"
            name="resume"
            value={recipe.resume}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Score</label>
          <input
            type="number"
            min="1"
            max="100"
            name="score"
            value={recipe.score}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Healthy</label>
          <input
            type="number"
            min="1"
            max="100"
            name="healthy"
            value={recipe.healthy}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Steps</label>
          <input
            type="text"
            placeholder="Recipe steps"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Diets</h3>
          <div>
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
        </div>

        <button type="submit" onClick={handleSubmit}>
          Create!
        </button>
      </form>
      <button onClick={handleReload}>Discard </button>
    </div>
  );
}
