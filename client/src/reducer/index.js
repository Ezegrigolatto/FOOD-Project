const initialState = {
  recipes: [],
  diets: [],
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
        console.log(action.payload)
        console.log(allRecipes)
        console.log(filteredRecipes)
        return {
        ...state,
        recipes: filteredRecipes,
      }
    default:
      return state;
  }
}
