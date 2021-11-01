import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getDiets, filterByDiets, orderAlphabetically} from "../../actions";


export default function Detail () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    useEffect(() => {
        dispatch(getFoods());
      }, []);

    return (
        <div>
            <Link to="/home">Go back</Link>
            <h1>Detail</h1>
            
        </div>
    )
}