import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8000/tastopia/api/v1/auth/users/'
});

export const deleteProfile = (id) => {authApi.delete(`/${id}/`);};