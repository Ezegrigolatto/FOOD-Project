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
  }
  
  
  
  function handleClick(e) {
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(searchByName(inputValue));
    } else {
      dispatch(getFoods());
    }
    document.form.reset()
    }

  return (
    <div className="form">
    <form  name="form">
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
    </form>
    </div>
  );
}
