import express from "express";
import { RecipeModel } from "../models/recipeModel.js";
import { UserModel } from "../models/userModel.js";
// import { verifyToken } from "./usersRoute.js";

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
            ...req.body,
        };

        const recipe = await RecipeModel.create(newRecipe);

        return res.status(200).send(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//getting all recipes from db
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const recipes = await RecipeModel.find({}).skip(skip).limit(limit);

        const totalRecipes = await RecipeModel.countDocuments({});

        return res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalRecipes / limit),
            count: recipes.length,
            data: recipes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//search for recipe
router.get("/search", async (req, res) => {
    try {
        const { query, page = 1, limit = 5 } = req.query;
        const searchQuery = new RegExp(query, "i");
        const recipes = await RecipeModel.find({ title: searchQuery })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const count = await RecipeModel.countDocuments({ title: searchQuery });
        const totalPages = Math.ceil(count / limit);

        res.json({ data: recipes, count, totalPages });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//get one recipe by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await RecipeModel.findById(id);

        return res.status(200).json({ recipe });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//update a recipe
// router.put("/:id", async (req, res) => {
//     try {
//         if (!req.body.title || !req.body.categories || !req.body.ingredients || !req.body.cookingTime || !req.body.imageUrl || !req.body.cookingSteps) {
//             return res.status(400).send({
//                 message: "Send all required fields!",
//             });
//         }
//         const { id } = req.params;
//         const result = await RecipeModel.findByIdAndUpdate(id, req.body);
//         if (!result) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }
//         return res.status(200).send({ message: "Recipe updated successfully" });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

//show saved recipes ids
router.get("/saved-recipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.status(200).json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//show saved recipes
router.get("/saved-recipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }, // найти среди всех рецептов те, id которых есть в savedRecipes данного юзера
        });
        res.status(200).json({ savedRecipes });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Save recipe
router.put("/save", async (req, res) => {
    const { recipeID, userID } = req.body;
    if (!recipeID || !userID) {
        return res.status(400).json({ message: "Recipe ID and User ID are required." });
    }

    try {
        const recipe = await RecipeModel.findById(recipeID);
        const user = await UserModel.findById(userID);

        if (!recipe || !user) {
            return res.status(404).json({ message: "Recipe or User not found." });
        }

        if (!user.savedRecipes.includes(recipeID)) {
            user.savedRecipes.push(recipeID);
            await user.save();
        }

        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "wtf" });
    }
});

// Remove saved recipe
router.put("/remove", async (req, res) => {
    const { recipeID, userID } = req.body;
    if (!recipeID || !userID) {
        return res.status(400).json({ message: "Recipe ID and User ID are required." });
    }

    try {
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.savedRecipes = user.savedRecipes.filter((id) => id.toString() !== recipeID);
        await user.save();

        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

export { router as recipesRouter };
