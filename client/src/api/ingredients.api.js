import axios from 'axios'

const ingredientApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/ingredients/'
})

export const getAllIngredients = () =>  ingredientApi.get('/')
export const getIngredient = (id) =>  ingredientApi.get(`/${id}/`)
export const createIngredient = (ingredient) => ingredientApi.post('/', ingredient)
export const deleteIngredient = (id) => ingredientApi.delete(`/${id}`)
export const updateIngredient = (id, ingredient) => ingredientApi.put(`/${id}/`, ingredient)