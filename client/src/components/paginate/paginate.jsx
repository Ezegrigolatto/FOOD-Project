import React from "react";

export default function Paginate({ recipesPerPage, filteredRecipes, paginate }) {
  const pageNumbers = [];

  for (let x = 1; x <= Math.ceil(filteredRecipes / recipesPerPage); x++) {
    pageNumbers.push(x);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((n) => (
          <li>
            <a onClick={() => paginate(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}