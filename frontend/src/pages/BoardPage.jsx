import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DragDropContext } from '@hello-pangea/dnd'
import {
  ArrowLeft,
  Plus,
  Activity,
  Search,
  Loader2,
  Zap,
  LogOut,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/index'
import ListColumn from '@/components/board/ListColumn'
import TaskModal from '@/components/board/TaskModal'
import ActivityPanel from '@/components/board/ActivityPanel'
import { boardsAPI, listsAPI, tasksAPI } from '@/services/api'
import { connectSocket, disconnectSocket, joinBoard, getSocket } from '@/services/socket'
import { useBoardStore } from '@/store/boardStore'
import { useAuthStore } from '@/store/authStore'
import { getInitials, generateAvatarColor } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const {
    currentBoard,
    lists,
    setCurrentBoard,
    addList,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasksLocally,
  } = useBoardStore()

  const [loading, setLoading] = useState(true)
  const [showActivity, setShowActivity] = useState(false)
  const [taskModal, setTaskModal] = useState({ open: false, task: null, listId: null })
  const [listModal, setListModal] = useState(false)
  const [listTitle, setListTitle] = useState('')
  const [creatingList, setCreatingList] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [joiningBoard, setJoiningBoard] = useState(false)

  // Fetch board data
  useEffect(() => {
    fetchBoard()
    return () => {
      disconnectSocket()
    }
  }, [boardId])

  // Socket setup
  useEffect(() => {
    const socket = connectSocket()
    joinBoard(boardId)

    socket.on('taskCreated', (task) => {
      addTask(task)
    })
    socket.on('taskUpdated', (task) => {
      updateTask(task)
    })
    socket.on('taskMoved', (task) => {
      moveTask(task)
    })
    socket.on('taskDeleted', (taskId) => {
      deleteTask(taskId)
    })

    return () => {
      socket.off('taskCreated')
      socket.off('taskUpdated')
      socket.off('taskMoved')
      socket.off('taskDeleted')
    }
  }, [boardId])

  const fetchBoard = async () => {
    setLoading(true)
    try {
      const { data } = await boardsAPI.getById(boardId)
      setCurrentBoard(data.board, data.lists)
    } catch {
      toast.error('Failed to load board')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return

    const sourceList = lists.find((l) => l._id === source.droppableId)
    const destList = lists.find((l) => l._id === destination.droppableId)
    if (!sourceList || !destList) return

    // Optimistic UI update
    reorderTasksLocally(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )

    try {
      await tasksAPI.move(draggableId, {
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        newPosition: destination.index,
      })
    } catch {
      toast.error('Failed to move task')
      fetchBoard() // Revert on failure
    }
  }

  const handleCreateList = async (e) => {
    e.preventDefault()
    if (!listTitle.trim()) return
    setCreatingList(true)
    try {
      const { data } = await listsAPI.create({
        title: listTitle.trim(),
        boardId,
        position: lists.length,
      })
      addList(data)
      setListModal(false)
      setListTitle('')
      toast.success('List created')
    } catch {
      toast.error('Failed to create list')
    } finally {
      setCreatingList(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId)
      deleteTask(taskId)
      toast.success('Task deleted')
    } catch {
      toast.error('Failed to delete task')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleJoinBoard = async () => {
    setJoiningBoard(true)
    try {
      const { data } = await boardsAPI.join(boardId)
      setCurrentBoard(data.board, data.lists)
      toast.success('Successfully joined the board!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to join board')
    } finally {
      setJoiningBoard(false)
    }
  }

  const filteredLists = searchQuery.trim()
    ? lists.map((l) => ({
        ...l,
        tasks: l.tasks.filter((t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
    : lists

  const members = currentBoard?.members || []
  const isUserMember = user && members.some((m) => m._id === user._id || m._id === user.id)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080808]">
      {/* Board header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/80 backdrop-blur-xl flex-shrink-0">
        <div className="h-14 px-4 sm:px-6 flex items-center gap-3">
          {/* Back + Logo */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mr-3">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm hidden sm:block">
              Task<span className="text-purple-400">Flow</span>
            </span>
          </div>

          <div className="w-px h-4 bg-white/10" />

          <h1 className="font-display font-semibold text-white text-sm sm:text-base truncate flex-1 ml-1">
            {currentBoard?.title}
          </h1>

          {/* Member avatars */}
          {members.length > 0 && (
            <div className="hidden sm:flex items-center -space-x-1.5 mr-2">
              {members.slice(0, 4).map((member) => (
                <Avatar
                  key={member._id}
                  className="h-6 w-6 border border-black ring-1 ring-white/10"
                  title={member.name}
                >
                  <AvatarFallback
                    className="text-[8px]"
                    gradient={generateAvatarColor(member._id)}
                  >
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {members.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-white/10 border border-black flex items-center justify-center text-[8px] text-white/50 ring-1 ring-white/10">
                  +{members.length - 4}
                </div>
              )}
            </div>
          )}

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 w-44 text-xs"
            />
          </div>

          {/* Activity toggle */}
          <button
            onClick={() => setShowActivity(!showActivity)}
            className={`p-2 rounded-lg transition-colors ${
              showActivity
                ? 'bg-purple-500/15 text-purple-400'
                : 'text-white/35 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>

          {/* Join board button (if not a member) */}
          {currentBoard && !isUserMember && (
            <Button
              variant="purple"
              size="sm"
              onClick={handleJoinBoard}
              disabled={joiningBoard}
            >
              {joiningBoard && <Loader2 className="w-4 h-4 animate-spin" />}
              Join board
            </Button>
          )}

          {/* Add list */}
          {isUserMember && (
            <Button
              variant="purple"
              size="sm"
              onClick={() => setListModal(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add list</span>
            </Button>
          )}

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <Avatar className="h-7 w-7 cursor-pointer ring-2 ring-transparent hover:ring-purple-500/40 transition-all">
                  <AvatarFallback
                    gradient={generateAvatarColor(user?._id || 'U')}
                    className="text-[9px]"
                  >
                    {getInitials(user?.name || 'U')}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="text-xs font-medium text-white">{user?.name || 'Account'}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                <Zap className="w-3.5 h-3.5" />
                All boards
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Board body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Board canvas */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          {currentBoard && !isUserMember ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-14 h-14 rounded-2xl border border-purple-500/30 bg-purple-500/5 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2 text-lg">Join this board</h3>
              <p className="text-sm text-white/50 mb-6 max-w-xs">
                You need to join this board to view and manage tasks.
              </p>
              <Button
                variant="purple"
                onClick={handleJoinBoard}
                disabled={joiningBoard}
              >
                {joiningBoard && <Loader2 className="w-4 h-4 animate-spin" />}
                Join Board
              </Button>
            </div>
          ) : lists.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/3 flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-white/20" />
              </div>
              <h3 className="font-display font-semibold text-white mb-1">No lists yet</h3>
              <p className="text-sm text-white/30 mb-4 max-w-xs">
                Add lists to organize your tasks by stage or category.
              </p>
              <Button variant="purple" onClick={() => setListModal(true)}>
                <Plus className="w-4 h-4" />
                Add your first list
              </Button>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex gap-4 h-full items-start">
                {filteredLists.map((list) => (
                  <ListColumn
                    key={list._id}
                    list={list}
                    onAddTask={(listId) =>
                      setTaskModal({ open: true, task: null, listId })
                    }
                    onEditTask={(task) =>
                      setTaskModal({ open: true, task, listId: task.listId })
                    }
                    onDeleteTask={handleDeleteTask}
                  />
                ))}

                {/* Add list inline button */}
                <button
                  onClick={() => setListModal(true)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/12 hover:border-purple-500/30 text-white/30 hover:text-white/50 text-sm transition-all w-64 flex-shrink-0 hover:bg-purple-500/3"
                >
                  <Plus className="w-4 h-4" />
                  Add list
                </button>
              </div>
            </DragDropContext>
          )}
        </div>

        {/* Activity sidebar */}
        {showActivity && (
          <ActivityPanel
            boardId={boardId}
            onClose={() => setShowActivity(false)}
          />
        )}
      </div>

      {/* Task modal */}
      <TaskModal
        open={taskModal.open}
        onClose={() => setTaskModal({ open: false, task: null, listId: null })}
        task={taskModal.task}
        listId={taskModal.listId}
        boardId={boardId}
        members={members}
      />

      {/* Create list modal */}
      <Dialog open={listModal} onOpenChange={setListModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add list</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateList} className="space-y-4">
            <Input
              placeholder="e.g. To Do, In Progress, Done..."
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              autoFocus
            />
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setListModal(false)}>
                Cancel
              </Button>
              <Button
                variant="purple"
                type="submit"
                disabled={creatingList || !listTitle.trim()}
              >
                {creatingList && <Loader2 className="w-4 h-4 animate-spin" />}
                Create list
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
