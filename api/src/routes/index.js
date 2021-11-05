const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Diet, Recipe } = require("../db");
const { APIKEY } = process.env;
const axios = require("axios");

const router = Router();

const apiRecipes = async () => {
  const dirURL = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?number=100&&apiKey=${APIKEY}&addRecipeInformation=true`
  );
  const oneRecipeApi = await dirURL.data.results.map((r) => {
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
      diets: r.diets.map((rec) => {
        return { name: rec };
      }),
    };
  });
  return oneRecipeApi;
};
// recetas de la database
const myRecipes = async () => {
  return await Recipe.findAll({
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
  const { name } = req.query; //llega por query
  let allRecipes = await reqAllInfo();

  //si no llega nada por query, mando todas las recetas; sinó mando la que contenga el name
  if (!name) {
    res.send(allRecipes);
  } else {
    let recipeName = await allRecipes.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    //si no encontro resultados, mando este error
    if (recipeName.length === 0) {
      res.send("no se encontraron resultados");
    } else {
      //de lo contrario, muestro las respuestas
      res.send(recipeName);
    }
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  if (id?.length < 15) {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`
    );

    const apiRecipeId = {
      title: data.title,
      spoonacularScore: data.spoonacularScore,
      healthScore: data.healthScore,
      image: data.image,
      summary: data.summary,
      instructions: data.instructions,
      diets: data.diets.map((rec) => {
        return rec;
      }),
    };
    res.send(apiRecipeId);
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

    res.send(dbinfo);
  }
});

router.get("/types", async (req, res) => {
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

  apiDiets.forEach(async (diet) => {
    await Diet.findOrCreate({
      where: {
        name: diet,
      },
    });
  });
  const dbDiets = await Diet.findAll();
console.log( dbDiets);
  res.json(dbDiets);
});

router.post("/recipe", async (req, res) => {
  const { name, score, resume, steps, healthy, diets } = req.body;
  let receta = await Recipe.create({
    name: name,
    resume: resume,
    score: score,
    healthy: healthy,
    steps: steps,
    recipediets: diets,
  });
  const diet = await Diet.findAll({ where: { name: diets } });
  receta.addDiets(diet);
  res.send();
});
module.exports = router;
