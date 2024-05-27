import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'
import DeleteRecipe from './pages/DeleteRecipe'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SavedRecipes from './pages/SavedRecipes'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/saved-recipes' element={<SavedRecipes />} />
      <Route path='/recipes' element={<Recipes />} />
      <Route path='/recipes/create' element={<CreateRecipe />} />
      <Route path='/recipes/details/:id' element={<Recipe />} />
      <Route path='/recipes/edit/:id' element={<EditRecipe />} />
      <Route path='/recipes/delete/:id' element={<DeleteRecipe />} />
    </Routes>
  )
}

export default App