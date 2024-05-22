import axios from 'axios'

const recipePhotosApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/recipe-photos/'
})

export const getAllPhotos= () =>  recipePhotosApi.get('/')
export const getRecipePhoto = (id) =>  recipePhotosApi.get(`/${id}/`)
export const deleteRecipePhoto = (id) => recipePhotosApi.delete(`/${id}`)
export const updateRecipePhoto = (id, recipe) => recipePhotosApi.put(`/${id}/`, recipePhoto)

export const createRecipePhoto = (recipePhoto) => {
    const formData = new FormData();
    formData.append('recipe', recipePhoto.recipe);
    formData.append('photo', recipePhoto.photo);

    return recipePhotosApi.post('/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};