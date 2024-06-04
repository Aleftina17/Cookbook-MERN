import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    cookingTime: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    sourceUrl: {
        type: String,
        required: false,
    },
    cookingSteps: {
        type: [String],
        required: true,
    },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const RecipeModel = mongoose.model("recipes", recipeSchema);
