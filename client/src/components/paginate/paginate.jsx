import React from "react";
import "./paginate.css";

export default function Paginate({ recipesPerPage, filteredRecipes, paginate, thisPage }) {
  const pageNumbers = [];

  for (let x = 1; x <= Math.ceil(filteredRecipes / recipesPerPage); x++) {
    pageNumbers.push(x);
  }

  return (
    <nav className="paginate">
      
        {pageNumbers.map((n) => (
          <button className={thisPage === n ? "buttonactive" : "button"} onClick={() => paginate(n)}>
            {n} </button>
        ))}
      
    </nav>
  );
}