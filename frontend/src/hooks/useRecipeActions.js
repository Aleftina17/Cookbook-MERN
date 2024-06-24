import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useGetUserID } from "./useGetUserID";

const useRecipeActions = () => {
    const userID = useGetUserID();
    const { enqueueSnackbar } = useSnackbar();
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const res = await axios.get(`https://cookbook-mern.onrender.com/recipes/saved-recipes/ids/${userID}`);
                setSavedRecipes(res.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        if (userID) {
            fetchSavedRecipes();
        }
    }, [userID]);

    const saveRecipe = async (recipeID) => {
        if (!userID) {
            enqueueSnackbar("Log in to save recipes.", { variant: "error" });
            return;
        }
        try {
            const response = await axios.put("https://cookbook-mern.onrender.com/recipes/save", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error("Save Recipe Error: ", error.response.data);
            enqueueSnackbar("Failed to save the recipe.", { variant: "error" });
        }
    };

    const removeSavedRecipe = async (recipeID) => {
        try {
            const response = await axios.put("https://cookbook-mern.onrender.com/recipes/remove", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error("Remove Recipe Error: ", error.response.data);
            enqueueSnackbar("Failed to remove the recipe from saved.", { variant: "error" });
        }
    };

    const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

    return {
        savedRecipes,
        saveRecipe,
        removeSavedRecipe,
        isRecipeSaved,
    };
};

export default useRecipeActions;
