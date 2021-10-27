import axios from 'axios';

export function getFoods() {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/recipes");
        dispatch({
            type: "GET_RECIPES",
            payload: response.data
        });
    }
}