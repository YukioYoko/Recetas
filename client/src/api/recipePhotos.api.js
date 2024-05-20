import axios from 'axios'

const recipePhotosApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/recipe-photos/'
})

export const getAllPhotos= () =>  recipePhotosApi.get('/')
export const getRecipePhoto = (id) =>  recipePhotosApi.get(`/${id}/`)
export const createRecipePhoto = (recipePhoto) => recipePhotosApi.post('/', recipePhoto)
export const deleteRecipePhoto = (id) => recipePhotosApi.delete(`/${id}`)
export const updateRecipePhoto = (id, recipe) => recipePhotosApi.put(`/${id}/`, recipePhoto)