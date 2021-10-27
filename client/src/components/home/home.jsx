import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoods} from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../card/card.jsx'

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes= useSelector((state) => state.recipes)

    useEffect(() => {
        dispatch(getFoods());
    }, []);

function handleClick(e){
    e.preventDefault();
    dispatch(getFoods());
}

    return (
        <div>
            <Link to='/recipe'>Crear Receta</Link>
            <h1>Pagina de recetas</h1>
            <button onClick={e => {handleClick(e)}}>cargar recetas</button>
                <select>
            <div>
                <option value="asc" >Ascendente</option>
                <option value="desc">Descendente</option>
            </div>
            </select>
            {allRecipes?.map((recipe) => {
                return (
                    <div>
                        <Link to= {"/home/" + recipe.id}>
            <Card name={recipe.name} image={recipe.image} />)
                        </Link>
                        </div> 
                )
            })}
            
        </div>
        
)}