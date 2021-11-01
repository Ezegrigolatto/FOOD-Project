import React from "react";
import {Link} from "react-router-dom";
import {postRecipes, getDiets} from "../../actions"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);
    const [recipe, setRecipe] = useState({
        name: "",
        resume:"",
        score:0,
        healthy: 0,
        steps: "",     
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets());
    },[]);

function handleChange(e) {
    console.log(recipe)
    setRecipe({
        ...recipe,
        [e.target.name]: e.target.value
    });
}

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipes(recipe));
    }

function handleCheckbox(e) {
    console.log(recipe)
    if(e.target.checked&&!recipe.diets.includes(e.target.value)) {
        setRecipe({
            ...recipe,
            diets: [...recipe.diets, e.target.value]
        });
    
        } else {
            setRecipe({
                ...recipe,
                diets: recipe.diets.filter(diet => diet !== e.target.value)
            });
        }

    }



  return (
    <div>
        <Link to="/home">Go back</Link>
      <h1>Create Recipe</h1>

       <form>
           <div>
               <label>Name</label>
               <input type="text" name="name" value={recipe.name} onChange={handleChange}/>
           </div>

           <div>
               <label>Resume</label>
                <input type="textarea" name="resume" value={recipe.resume} onChange={handleChange}/>
           </div>

           <div>
               <label>Score</label>
                <input type="number" name="score" value={recipe.score} onChange={handleChange}/>
           </div>

           <div>
               <label>Healthy</label>
                <input type="number" name="healthy" value={recipe.healthy} onChange={handleChange}/>
           </div>

           <div>
               <label>Steps</label>
                <input type="text" name="steps" value={recipe.steps} onChange={handleChange}/>
           </div>

           <div>
               <h3>Diets</h3>
               <div>
                   {allDiets.map((d) => (<label><input onChange={handleCheckbox} type="checkbox" name={d.name} value={d.name}/>{d.name}</label>))}
               </div>
           </div>

           <button type="submit" onClick={handleSubmit}>Create!</button>
       </form>
    </div>
  );
}
