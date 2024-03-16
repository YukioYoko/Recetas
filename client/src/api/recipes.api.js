import axios from 'axios'

const recipeApi = axios.create({
    baseURL: 'http://localhost:8000/recipes/api/v1/recipes/'
})

export const getAllRecipes = () =>  recipeApi.get('/')
export const getRecipe = (id) =>  recipeApi.get(`/${id}/`)
export const createRecipe = (recipe) => recipeApi.post('/', recipe)
export const deleteRecipe = (id) => recipeApi.delete(`/${id}`)
export const updateRecipe = (id, recipe) => recipeApi.put(`/${id}/`, recipe)