import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Recipe } from "./models/recipeModel.js";
import recipesRoute from "./routes/recipesRoute.js";
import cors from 'cors'

const app = express();
app.use(express.json())

//cors: allow all origins
app.use(cors())

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("hello");
});

app.use('/recipes', recipesRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
