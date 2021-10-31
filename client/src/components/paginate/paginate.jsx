import React from "react";
import "./paginate.css";

export default function Paginate({ recipesPerPage, filteredRecipes, paginate }) {
  const pageNumbers = [];

  for (let x = 1; x <= Math.ceil(filteredRecipes / recipesPerPage); x++) {
    pageNumbers.push(x);
  }

  return (
    <nav className="paginate">
      
        {pageNumbers.map((n) => (
          <button className="button" onClick={() => paginate(n)}>
            {n} </button>
        
        ))}
      
    </nav>
  );
}