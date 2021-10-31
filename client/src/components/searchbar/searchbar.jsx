import React from "react";
import { Link } from "react-router-dom";
import {useState} from "react";
import { useDispatch} from "react-redux";
import { searchByName } from "../../actions";




export default function SearchBar() {
const dispatch = useDispatch();
const [inputValue, setInputValue] = useState("");

function handleSearch(e) {
    e.preventDefault();
    setInputValue(e.target.value)
    
  }

function handleClick(e){
    e.preventDefault();
    dispatch(searchByName(inputValue))
}
  

  return (
    <div className="searchbar">
      <input type="text" placeholder="search..." onChange={handleSearch}></input>
      <button type="submit" onClick={(e)=>handleClick(e)}>Search</button>
      <Link to="/recipe">Create recipe</Link>
      {/* <button
      onClick={(e) => {
        handleClick(e);
      }}
      >
        surprise
      </button> */}
    </div>
  );
}
