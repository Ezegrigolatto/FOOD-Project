import React from 'react';

export default function Card({name, diets, image}){
    return (
        <div>
            
            <h3>{name}</h3>
            <img src={image} alt="sin imagen" width="200px" height="250px"/>
            <h5>{diets}</h5>
        </div>
    )
}