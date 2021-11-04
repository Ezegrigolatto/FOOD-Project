import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFoods, searchByName } from "../../actions";
import lupa from "../../assets/lupa.png";
import "./searchbar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  
  function handleSearch(e) {
    e.preventDefault();
    setInputValue(e.target.value);
    console.log("input value que sale de la busqueda "+inputValue);
  }
  
  
  
  function handleClick(e) {
    e.preventDefault();
    console.log("input value que llega al boton " + inputValue);
    if (inputValue !== "") {
      dispatch(searchByName(inputValue));
    } else {
      dispatch(getFoods());
    }
    // inputValue? dispatch(searchByName(inputValue)): dispatch(getFoods());
    document.form.reset()
    }

  return (
    <form name="form">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        ></input>
        <button
          className="searchButton"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          <i className="material-icons"> <img width="16px" height="16px"src={lupa}/> </i>
        </button>
      </div>
      <Link className="create"  to="/recipe">Create recipe</Link>
    </form>
  );
}
