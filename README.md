
# CookBook App

This is a full-stack MERN web application where users can browse, search, create and save recipes. Built with React, it provides a user-friendly interface to explore various recipes and manage a list of favorite recipes.


## Features

- Browse a variety of recipes with images, ingredients, cooking steps, etc.
- Create your own recipes and save them in MongoDB
- Search for recipes
- Filter recipes by categories and cooking time
- Save favorite recipes for easy access on the 'Saved Recipes' page
- User authentication to create recipes and manage saved recipes
## Installation

### Backend

The backend of this project is already deployed and running at https://cookbook-mern.onrender.com.

### Frontend

Clone project and navigate to frontend directory:

```bash
  git clone https://github.com/Aleftina17/Cookbook-MERN
  cd ../frontend
```

Install the frontend dependencies:
    
```bash
  npm install
```

Start the frontend development server:
    
```bash
  npm run dev
```


## API Routes

### User Routes
- Register a new user

POST /register
```
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```

- Login a user

POST /login
```
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```

### Recipe Routes
- Create a new recipe

POST /recipes
```
{
    "title": "Recipe Title",
    "categories": ["Category1", "Category2"],
    "ingredients": ["Ingredient1", "Ingredient2"],
    "cookingTime": "30 minutes",
    "imageUrl": "http://example.com/image.jpg",
    "sourceUrl": "http://example.com/source",
    "cookingSteps": ["Step 1", "Step 2"],
    "userOwner": "userId"
}
```
- Get all recipes

GET /recipes

- Get a recipe by ID

GET /recipes/:id

- Save a recipe

PUT /recipes/save

```
{
    "recipeID": "recipeId",
    "userID": "userId"
}
```
- Remove a saved recipe

PUT /recipes/remove
```
{
    "recipeID": "recipeId",
    "userID": "userId"
}
```
- Get saved recipe IDs for a user

GET /recipes/saved-recipes/ids/:userID

- Get saved recipes for a user

GET /recipes/saved-recipes/:userID
