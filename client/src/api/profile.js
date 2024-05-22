import axios from 'axios'

const profileApi = axios.create({
    baseURL: 'http://localhost:8000/tastopia/api/v1/users/'
})


export const getProfile = (id) => profileApi.get(`/${id}/`)
export const updateProfile = (id, profile) => profileApi.put(`/${id}/`, profile)
export const createProfile = (profile) => profileApi.post('/', profile)

