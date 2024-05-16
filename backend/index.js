import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { PORT, mongoDBURL } from "./config.js";
import { recipesRouter } from "./routes/recipesRoute.js";
import { usersRouter } from "./routes/usersRoute.js"

const app = express();
app.use(express.json())

//cors: allow all origins
app.use(cors())

app.use('/recipes', recipesRouter)
app.use('/auth', usersRouter)

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
