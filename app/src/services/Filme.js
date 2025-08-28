import api from '.';

export default {
    listar: () => api.get('/filme'),
    buscarPorId: (id) => api.get(`/filme/${id}`),
    cadastrar: (dados) => api.post('/filme', dados),
    atualizar: (id, dados) => api.put(`/filme/${id}`, dados),
    excluir: (id) => api.delete(`/filme/${id}`),
};
