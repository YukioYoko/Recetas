import axios from 'axios';

const profileApi = axios.create({
  baseURL: 'http://localhost:8000/tastopia/api/v1/users/'
});

export const getProfile = (id) => profileApi.get(`/${id}/`);




export const updateProfile = (id, profile) => {
    return profileApi.put(`/${id}/`, profile, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};
export const createProfile = (profile) => profileApi.post('/', profile);
