import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFoods, searchByName } from "../../actions";
import lupa from "../../assets/lupa.png";
import "./searchbar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  var input = ""

  function handleSearch(e) {
    e.preventDefault();
    setInputValue(e.target.value)
  }
  function handleClick(e) {
    setInputValue("")
    input =  document.getElementById("input")
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(searchByName(inputValue));
    } else {
      dispatch(getFoods());
    }
    input.value = "";
  }

  return (
    <div className="form">
      <form name="form">
        <div className="searchBox">
          <input
            id = "input"
            className="searchInput"
            type="text"
            value= {input.value}
            placeholder="Search..."
            onChange={handleSearch}
          ></input>
          <button
            className="searchButton"
            type="submit"
            onClick={(e) => handleClick(e)}
          >
            <i className="material-icons">
              {" "}
              <img width="16px" height="16px" src={lupa} alt="Search" />{" "}
            </i>
          </button>
        </div>
      </form>
    </div>
  );
}

