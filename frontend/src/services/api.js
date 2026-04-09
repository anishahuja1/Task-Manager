import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskService = {
    getTasks: () => api.get('/tasks'),
    createTask: (title) => api.post('/tasks', { title }),
    updateTask: (id, updates) => api.patch(`/tasks/${id}`, updates),
    deleteTask: (id) => api.delete(`/tasks/${id}`)
};
