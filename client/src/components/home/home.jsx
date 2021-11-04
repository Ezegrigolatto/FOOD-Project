import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getDiets, filterByDiets, orderRecipes} from "../../actions";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/searchbar.jsx";
import Card from "../card/card.jsx";
import "../card/card.css";
import Paginate from "../paginate/paginate.jsx";
import "./home.css";
import header from "../../assets/header.jpg"

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector((state) => state.diets);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);

  const [thisPage, setThisPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const LastRecipe = thisPage * recipesPerPage;
  const FirstRecipe = LastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(FirstRecipe, LastRecipe);
  const [sorted, setSorted] = useState(currentRecipes);

  useEffect(() => {
    dispatch(getFoods());
    dispatch(getDiets());
  }, []);

  const paginate = (pageNumber) => {
    setThisPage(pageNumber);
  };

  function handleFilterChange(e) {
    setThisPage(1);
    if (e.target.value === "all") {
      dispatch(getFoods());
    }else{
      dispatch(filterByDiets(e.target.value));
  }
}

  function handleSort(e) {
    dispatch(orderRecipes(e.target.value));
    setSorted(currentRecipes);
  }

  return (
    <div className="container">
      <img src={header} height="200rem" width="1500rem"/>
      <SearchBar />
     <br></br> 
     <br></br> 
     <br></br> 
     <br></br> 
      <div>
        <select onChange={handleSort}>
          <option>None</option>
          <option value="Alpasc">Alphabetical asc</option>
          <option value="Alpdesc">Alphabetical desc</option>
          <option value="Scrasc">Score asc</option>
          <option value="Scrdesc">Score desc</option>
        </select>

        <select onChange={handleFilterChange}>
          <option value="all">All</option>

          {allDiets.map((diet) => {
            return <option value={diet.name}>{diet.name}</option>;
          })}
        </select>
      </div>

      <div className="cardContainer">

        {currentRecipes.map((recipe) => {
          return (
            
            <div>
              <Link to={"/home/" + recipe.rId}>
                <Card
                  name={recipe.name}
                  image={recipe.image}
                  diets={recipe.diets}
                  id = {recipe.rId}
                />
              </Link>
            </div>
          )
        })}
      </div>

      <Paginate
        recipesPerPage={recipesPerPage}
        filteredRecipes={filteredRecipes.length}
        paginate={paginate}
      />
    </div>
  );
}