import { create } from 'zustand'

export const useBoardStore = create((set, get) => ({
  boards: [],
  currentBoard: null,
  lists: [],
  loading: false,
  error: null,

  setBoards: (boards) => set({ boards }),

  setCurrentBoard: (board, lists = []) =>
    set({ currentBoard: board, lists }),

  addBoard: (board) =>
    set((state) => ({ boards: [board, ...state.boards] })),

  addList: (list) =>
    set((state) => ({
      lists: [...state.lists, { ...list, tasks: [] }].sort(
        (a, b) => a.position - b.position
      ),
    })),

  addTask: (task) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l._id === task.listId
          ? {
              ...l,
              tasks: [...l.tasks, task].sort((a, b) => a.position - b.position),
            }
          : l
      ),
    })),

  updateTask: (updatedTask) =>
    set((state) => ({
      lists: state.lists.map((l) => ({
        ...l,
        tasks: l.tasks.map((t) =>
          t._id === updatedTask._id ? { ...t, ...updatedTask } : t
        ),
      })),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      lists: state.lists.map((l) => ({
        ...l,
        tasks: l.tasks.filter((t) => t._id !== taskId),
      })),
    })),

  moveTask: (movedTask) =>
    set((state) => {
      // Remove from all lists first
      const listsWithoutTask = state.lists.map((l) => ({
        ...l,
        tasks: l.tasks.filter((t) => t._id !== movedTask._id),
      }))
      // Add to destination list
      return {
        lists: listsWithoutTask.map((l) =>
          l._id === movedTask.listId
            ? {
                ...l,
                tasks: [...l.tasks, movedTask].sort(
                  (a, b) => a.position - b.position
                ),
              }
            : l
        ),
      }
    }),

  reorderTasksLocally: (sourceListId, destListId, sourceIdx, destIdx) =>
    set((state) => {
      const lists = state.lists.map((l) => ({ ...l, tasks: [...l.tasks] }))
      const sourceList = lists.find((l) => l._id === sourceListId)
      const destList = lists.find((l) => l._id === destListId)
      if (!sourceList || !destList) return {}

      const [removed] = sourceList.tasks.splice(sourceIdx, 1)
      removed.listId = destListId
      destList.tasks.splice(destIdx, 0, removed)

      return { lists }
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  reset: () =>
    set({ boards: [], currentBoard: null, lists: [], loading: false, error: null }),
}))
