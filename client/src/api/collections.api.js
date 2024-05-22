import axios from 'axios';

const collectionApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/collections/'
});

export const getAllCollections = () => collectionApi.get('/');
export const getCollection = (id) => collectionApi.get(`/${id}/`);
export const createCollection = (collection) => collectionApi.post('/', collection);
export const deleteCollection = (id) => collectionApi.delete(`/${id}`);
export const updateCollection = (id, collection) => collectionApi.put(`/${id}/`, collection);
export const getUserCollections = (userId) => collectionApi.get(`?user=${userId}`);
