const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Diet, Recipe } = require("../db");
const { APIKEY } = process.env;
const axios = require("axios");

const router = Router();

const apiRecipes =  () => {
  return axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=50&&apiKey=${APIKEY}&addRecipeInformation=true`
    )

    .then((response)=>{
      const oneRecipeApi = response.data.results.map((r) => {
        return {
          name: r.title,
          score: r.spoonacularScore,
          healthy: r.healthScore,
          image: r.image,
          resume: r.summary,
          rId: r.id,
          diets: r.diets.map((rec) => {
            return { name: rec };
          }),
        };
      });
      return oneRecipeApi;
    })
    };

const myRecipes = () => {
  return Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//recetas de la API + database
const reqAllInfo = async () => {
  const apiData = await apiRecipes();
  const dbData = await myRecipes();
  const allData = apiData.concat(dbData);
  return allData;
};

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  let allRecipes = await reqAllInfo();
  
  try {if (!name) {
    res.send(allRecipes);
  } else {
    let recipeName = await allRecipes.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    if (recipeName.length === 0) {
      res.send([]);
    } else {
      res.status(200).send(recipeName);
    }
  }
} catch (error) {
    res.status(404).send(error);
  }
});

router.get("/recipes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id?.length < 15) {
      return axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`
      )

.then((response)=>{
      const apiRecipeId = {
        title: response.data.title,
        spoonacularScore: response.data.spoonacularScore,
        healthScore: response.data.healthScore,
        image: response.data.image,
        summary: response.data.summary,
        instructions: response.data.instructions,
        diets: response.data.diets.map((rec) => {
          return rec;
        }),
      };
      res.status(200).send(apiRecipeId);
    })
    } else {
      const dbRecipeId = await Recipe.findByPk(id, { include: Diet });

      const dbinfo = {
        title: dbRecipeId.name,
        healthScore: dbRecipeId.healthy,
        spoonacularScore: dbRecipeId.score,
        image: dbRecipeId.image,
        summary: dbRecipeId.resume,
        instructions: dbRecipeId.steps,
        diets: dbRecipeId.diets.map((diet) => diet.name),
      };

      res.status(200).send(dbinfo);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/types", async (req, res, next) => {
  var apiDiets = [
    "gluten free",
    "dairy free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "lacto ovo vegetarian",
    "ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
  ];
  try {
    apiDiets.forEach(async (diet) => {
      await Diet.findOrCreate({
        where: {
          name: diet,
        },
      });
    });
    const dbDiets = await Diet.findAll();
    res.status(200).send(dbDiets);
  } catch (error) {
    next(error);
  }
});

router.post("/recipe", async (req, res, next) => {
  try {
    const { name, score, resume, steps, healthy, diets } = req.body;

    let receta = await Recipe.create({
      name: name,
      resume: resume,
      score: score,
      healthy: healthy,
      steps: steps,
      recipediets: diets,
    });
    
    if(name && score && resume && steps && healthy){
     
  
    const diet = await Diet.findAll({ where: { name: diets } });
    receta.addDiets(diet);
    res.status(200).send("se creo con exito");
  }
  else{
    res.status(400).send();
  }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
