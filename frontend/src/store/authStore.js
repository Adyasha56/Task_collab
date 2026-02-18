import { create } from 'zustand'

const getStoredUser = () => {
  try {
    const u = localStorage.getItem('taskflow_user')
    const user = u ? JSON.parse(u) : null
    // Ensure both _id and id are set for consistency
    if (user && !user.id && user._id) {
      user.id = user._id
    }
    return user
  } catch {
    return null
  }
}

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem('taskflow_token'),
  isAuthenticated: !!localStorage.getItem('taskflow_token'),

  setAuth: (user, token) => {
    localStorage.setItem('taskflow_token', token)
    localStorage.setItem('taskflow_user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('taskflow_token')
    localStorage.removeItem('taskflow_user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  updateUser: (updates) =>
    set((state) => {
      const updated = { ...state.user, ...updates }
      // Ensure both _id and id are set
      if (!updated.id && updated._id) {
        updated.id = updated._id
      }
      localStorage.setItem('taskflow_user', JSON.stringify(updated))
      return { user: updated }
    }),
}))
