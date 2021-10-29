const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Diet, Recipe} = require('../db')
const {APIKEY} = process.env;
const axios = require('axios')

const router = Router();

// Configurar los routers

//traigo de la API lo que me sirve
const apiRecipes= async () => {
    const dirURL = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true`)
    const oneRecipeApi = await dirURL.data.results.map((r)=>{
        return {
            name: r.title,
            vegetarian: r.vegetarian,
            vegan: r.vegan,
            glutenFree: r.glutenFree,
            dairyFree: r.dairyFree,
            score: r.spoonacularScore,
            healthy: r.healthScore,
            image: r.image,
            resume: r.summary,
            rId: r.id,
            diets: r.diets.map((rec)=>{return rec}),
        }
    })
    return oneRecipeApi
}
// recetas de la database
const myRecipes= async() => {
    return await Recipe.findAll({include:Diet})
}

// dietas de la database
const myDiets= async() => {
    return await Diet.findAll()
}

//recetas de la API + database
const reqAllInfo = async() => {
    const apiData = await apiRecipes();
    const dbData = await myRecipes();
    const allData = apiData.concat(dbData)
    return allData
}


/*[ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado*/

router.get('/recipes', async (req, res) => {
    const {name} = req.query; //llega por query
    let allRecipes = await reqAllInfo()

    //si no llega nada por query, mando todas las recetas; sinó mando la que contenga el name
    if (!name) {
        res.send(allRecipes)
    } else{
        let recipeName = await allRecipes.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()))
        //si no encontro resultados, mando este error
        if(recipeName.length === 0) {
            res.send("no se encontraron resultados")
        }else{
        //de lo contrario, muestro las respuestas
        res.send(recipeName)
    }
    }
})



/*[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados*/

router.get('/recipes/:id',async (req, res) => {
const {id} = req.params;
const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`)



const recipeId = {
    id: data.id,
    title: data.title,
    vegetarian: data.vegetarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    dairyFree: data.dairyFree,
    veryHealthy: data.veryHealthy,
    spoonacularScore: data.spoonacularScore,
    healthScore: data.healthScore,
    image: data.image,
    summary: data.summary,
    diets: data.diets.map((rec)=>{return rec}),
}

res.send (recipeId)


})

/*[ ] GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá*/

router.get('/types', async (req, res) => {
   const apiDiets = ["gluten free","dairy free", "ketogenic", "vegetarian", "lacto vegetarian","lacto ovo vegetarian", "ovo vegetarian",
                     "vegan", "pescetarian", "paleolithic", "primal", "low FODMAP", "whole30"];

for (let x= 0; x < apiDiets.length; x++) {

   Diet.findOrCreate({where:{name: apiDiets[x]}})

}
   res.send(await myDiets())
})




/*[ ] POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos*/

router.post('/recipe', (req, res) => {
const {name, image, resume }= req.body;

if (!(name && image && resume)){
    res.send("debe ingresar todos los parametros")
}else{
    Recipe.create({name: name, image: image, resume: resume}) 
}

res.send("su receta se creó con exito")
})
module.exports = router;
