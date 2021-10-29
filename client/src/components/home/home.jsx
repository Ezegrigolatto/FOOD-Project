import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getDiets, filterByDiets } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../card/card.jsx";
import Paginate from "../paginate/paginate.jsx";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods()); dispatch(getDiets())
  }, []);

  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const filteredRecipes = useSelector((state)=> state.filteredRecipes);

const [thisPage, setThisPage] = useState(1);
const [recipesPerPage, setRecipesPerPage] = useState(2);
const LastRecipe = thisPage * recipesPerPage;
const FirstRecipe = LastRecipe - recipesPerPage;
const currentRecipes = filteredRecipes.slice(FirstRecipe, LastRecipe );

const paginate = (pageNumber) => {
  setThisPage(pageNumber);
}


  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getFoods());

  // }

  function handleFilterChange(e) {
    if(e.target.value === "all"){
      dispatch(getFoods());
    }
    dispatch(filterByDiets(e.target.value));
  }

  return (
    <div>
      <h1>Recipe's Page</h1>
      <div>
        <input placeholder="search"></input>
        <button>Search</button>
        <Link to="/recipe">Create recipe</Link>
        <button
          // onClick={(e) => {
          //   handleClick(e);
          // }}
        >
          surprise
        </button>
        <select>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <select onChange={handleFilterChange}>
          <option value="all">All</option>
          
          {allDiets?.map((diet) => {
            return <option value={diet.name} >{diet.name}</option>;
          })}
        </select>
        <Paginate
        recipesPerPage={recipesPerPage}
        filteredRecipes={filteredRecipes.length}
        paginate={paginate}
        />
      </div>
      {currentRecipes?.map((recipe) => {
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
