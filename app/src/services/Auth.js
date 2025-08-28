import api from '.';

export default {
    login: (payload) => api.post('auth/login', payload),
    logout: () => api.post('auth/logout'),
    register: (payload) => api.post('auth/register', payload),
};
