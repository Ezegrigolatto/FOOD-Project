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

export function searchByName(payload){
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
    dispatch({
      type: "SEARCH_BY_NAME",
      payload: response.data,
    });
  };
}


export function postRecipes(payload){
  return async function(dispatch){
    const response = await axios.post("http://localhost:3001/recipe", payload);
    dispatch({
      type: "POST_RECIPES",
    })
    return response
  };
}

export function filterByDiets(payload){

  return {
    type: "FILTER_BY_DIET",
    payload
  }
}

export function orderRecipes(payload){
  return {
    type: "ORDER_RECIPES",
    payload
  }
}

export function getDetails(payload){
  return {
    type: "GET_DETAILS",
    payload
  }
}