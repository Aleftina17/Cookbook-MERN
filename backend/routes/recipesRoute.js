import express from "express";
import { Recipe } from "../models/recipeModel.js";

const router = express.Router();

//creating recipe
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.categories || !req.body.ingredients || !req.body.cookingTime || !req.body.imageUrl || !req.body.cookingSteps) {
            return res.status(400).send({
                message: "Send all required fields!",
            });
        }

        const newRecipe = {
            title: req.body.title,
            categories: req.body.categories,
            ingredients: req.body.ingredients,
            cookingTime: req.body.cookingTime,
            imageUrl: req.body.imageUrl,
            sourceUrl: req.body.sourceUrl,
            cookingSteps: req.body.cookingSteps,
        };

        const recipe = await Recipe.create(newRecipe);

        return res.status(200).send(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//getting all recipes from db
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        return res.status(200).json({
            count: recipes.length,
            data: recipes,
        });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: error.message });
    }
});

//get one recipe by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        return res.status(200).json({ recipe });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: error.message });
    }
});

//update a recipe
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.categories || !req.body.ingredients || !req.body.cookingTime || !req.body.imageUrl || !req.body.cookingSteps) {
            return res.status(400).send({
                message: "Send all required fields!",
            });
        }

        const { id } = req.params;

        const result = await Recipe.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).send({ message: "Recipe updated successfully" });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: error.message });
    }
});

//delete recipe
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Recipe.findByIdAndDelete(id);

        if (!result) {
            return req.status(404).json({ message: "Recipe not found" });
        }

        return res.status(200).send({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
