import { orderAlphabetically } from "../actions";

const initialState = {
  recipes: [],
  diets: [],
  filteredRecipes: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };

     case "SEARCH_BY_NAME":
       return {
         ...state,
         filteredRecipes: action.payload, 
       } 
    case "POST_RECIPES":
      alert ("Recipe created succesfully")
      return {
        ...state,
      };
    case "FILTER_BY_DIET":
      const allRecipes = state.recipes;
      const filteredRecipes = allRecipes.filter((recipe) =>
        recipe.diets.includes(action.payload)
      );
      if (action.payload === "all") {
        return {
          ...state,
          filteredRecipes: allRecipes,
        };
      } else {
        return {
          ...state,
          filteredRecipes: filteredRecipes,
        };
      }

    case "ORDER_ALPHABETICALLY":
      let ordered = state.filteredRecipes;

      if (action.payload === "Alpasc") {
        ordered = ordered.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "Alpdesc") {
        ordered = ordered.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });

      }
      if (action.payload === "Scrasc") {
        ordered = ordered.sort(function (a, b) {
          if (a.score > b.score) {
            return 1;
          }
          if (b.score > a.score) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "Scrdesc") {
        ordered = ordered.sort(function (a, b) {
          if (a.score > b.score) {
            return -1;
          }
          if (b.score > a.score) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        filteredRecipes: ordered,
      };

    default:
      return state;
  }
}
