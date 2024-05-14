import axios from 'axios'

const categoryApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/recipe-photos/'
})

export const getAllPhotos= () =>  categoryApi.get('/')
export const getRecipePhoto = (id) =>  categoryApi.get(`/${id}/`)
export const createRecipePhoto = (recipePhoto) => categoryApi.post('/', recipePhoto)
export const deleteRecipePhoto = (id) => categoryApi.delete(`/${id}`)
export const updateRecipePhoto = (id, recipe) => categoryApi.put(`/${id}/`, recipePhoto)