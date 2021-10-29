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
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "POST_RECIPES":
      return {
        ...state,
        recipe: action.payload,
      };
      case "FILTER_BY_DIET":
        const allRecipes= state.recipes;
        const filteredRecipes = allRecipes.filter(recipe => recipe.diets.includes(action.payload));
        if (action.payload === "all"){
          return {
            ...state,
            filteredRecipes: allRecipes,
          };
        }else{
        return {
        ...state,
        filteredRecipes: filteredRecipes,
      }}
    default:
      return state;
  }
}
