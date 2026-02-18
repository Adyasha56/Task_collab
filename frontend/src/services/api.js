import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskflow_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token')
      localStorage.removeItem('taskflow_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

// ─── Boards ─────────────────────────────────────────────────────────────────
export const boardsAPI = {
  getAll: () => api.get('/boards'),
  getById: (boardId) => api.get(`/boards/${boardId}`),
  create: (data) => api.post('/boards', data),
  join: (boardId) => api.post(`/boards/${boardId}/join`),
}

// ─── Lists ───────────────────────────────────────────────────────────────────
export const listsAPI = {
  create: (data) => api.post('/lists', data),
}

// ─── Tasks ───────────────────────────────────────────────────────────────────
export const tasksAPI = {
  create: (data) => api.post('/tasks', data),
  getByBoard: (boardId, params = {}) => api.get(`/tasks/board/${boardId}`, { params }),
  update: (taskId, data) => api.patch(`/tasks/${taskId}`, data),
  delete: (taskId) => api.delete(`/tasks/${taskId}`),
  move: (taskId, data) => api.patch(`/tasks/move/${taskId}`, data),
}

// ─── Activities ──────────────────────────────────────────────────────────────
export const activitiesAPI = {
  getByBoard: (boardId) => api.get(`/activities/${boardId}`),
}

export default api
