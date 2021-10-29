import axios from "axios";

export function getFoods() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/recipes");
    dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/types");
    dispatch({
      type: "GET_DIETS",
      payload: response.data,
    });
  };
}

export function postRecipes(){
  return async function(dispatch){
    const response = await axios.post("http://localhost:3001/recipe");
    dispatch({
      type: "POST_RECIPES",
      payload: response.data,
    });
  };
}

export function filterByDiets(payload){

  return {
    type: "FILTER_BY_DIET",
    payload
  }
}

