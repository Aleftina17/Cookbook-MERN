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
        type: [
            {
                step: Number,
                description: String,
            }
        ],
        required: true,
    }
});

export const Recipe = mongoose.model("Recipe", recipeSchema);

