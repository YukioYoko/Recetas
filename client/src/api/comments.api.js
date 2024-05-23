import axios from 'axios';

const commentApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/comments/'
});

export const getAllComments = () => commentApi.get('/');
export const createComment = (comment) => commentApi.post('/', comment);
export const getComment = (id) => commentApi.get(`/${id}/`);
export const deleteComment = (id) => commentApi.delete(`/${id}`);
export const updateComment = (id, comment) => commentApi.put(`/${id}/`, comment);