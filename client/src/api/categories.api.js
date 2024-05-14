import axios from 'axios'

const categoryApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/categories/'
})

export const getAllCategories= () =>  categoryApi.get('/')
export const getCategory = (id) =>  categoryApi.get(`/${id}/`)
export const createCategory = (category) => categoryApi.post('/', category)
export const deleteCategory = (id) => categoryApi.delete(`/${id}`)
export const updateCategory = (id, recipe) => categoryApi.put(`/${id}/`, category)