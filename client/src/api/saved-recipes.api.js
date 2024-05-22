import axios from 'axios';

const savedrecipesApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/saved-recipes/'
});

export const getSaves = async (collectionId) => {
    return await savedrecipesApi.get(`?collection=${collectionId}`);
};

export const createSaved = (saved) => savedrecipesApi.post('/', saved);
/* export const deleteCollection = (id) => collectionApi.delete(`/${id}`);
export const updateCollection = (id, collection) => collectionApi.put(`/${id}/`, collection);
export const getUserCollections = (userId) => collectionApi.get(`?user=${userId}`); */
