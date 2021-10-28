import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getDiets } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/card.jsx";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoods()); dispatch(getDiets())
  }, []);
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getFoods());
  }

  return (
    <div>
      <h1>Pagina de recetas</h1>
      <div>
        <input placeholder="search"></input>
        <button>Search</button>
        <Link to="/recipe">Crear Receta</Link>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          All Recipes
        </button>
        <select>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <select>
          {allDiets?.map((diet) => {
            console.log(diet);
            return <option value="diet">{diet.name}</option>;
          })}
        </select>
      </div>
      {allRecipes?.map((recipe) => {
        return (
          <div>
            <Link to={"/home/" + recipe.id}>
              <Card
                name={recipe.name}
                image={recipe.image}
                diets={recipe.diets}
              />
              )
            </Link>
          </div>
        );
      })}
    </div>
  );
}
