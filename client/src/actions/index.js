import axios from "axios";

export function getFoods() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/recipes")
    .then(( response ) =>
    dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    })
    )}
}

export function getDiets() {
  return  function (dispatch) {
    return axios.get("http://localhost:3001/types")
   .then ((response) => {
   dispatch ({
      type: "GET_DIETS",
      payload: response.data,
     }
  )})
}
}
export function searchByName(payload){
  return  function (dispatch) {
    return  axios.get(`http://localhost:3001/recipes?name=${payload}`)
    .then((response)=>{
    dispatch({
      type: "SEARCH_BY_NAME",
      payload: response.data,
    });
  })
  .catch((err) => {
    console.log(err)
  })
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
  return async function (dispatch) {
    const response= await axios.get(`http://localhost:3001/recipes/${payload}`)
    dispatch({
      type: "GET_DETAILS",
      payload: response.data,
    });
  };
}

export function resetDetails(){
  return {
    type: "RESET_DETAILS",
  }
}