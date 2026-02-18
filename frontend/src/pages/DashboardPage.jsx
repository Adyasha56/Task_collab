import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutDashboard, Loader2, Zap, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { boardsAPI } from '@/services/api'
import { useBoardStore } from '@/store/boardStore'
import { useAuthStore } from '@/store/authStore'
import { getInitials, generateAvatarColor, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { boards, setBoards, addBoard } = useBoardStore()
  const { user, logout } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [boardTitle, setBoardTitle] = useState('')

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const { data } = await boardsAPI.getAll()
      setBoards(data)
    } catch {
      toast.error('Failed to load boards')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBoard = async (e) => {
    e.preventDefault()
    if (!boardTitle.trim()) return
    setCreating(true)
    try {
      const { data } = await boardsAPI.create({ title: boardTitle.trim() })
      addBoard(data)
      setModalOpen(false)
      setBoardTitle('')
      toast.success('Board created!')
      navigate(`/board/${data._id}`)
    } catch {
      toast.error('Failed to create board')
    } finally {
      setCreating(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-base">
              Task<span className="text-purple-400">Flow</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="purple"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              New board
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-purple-500/40 transition-all">
                    <AvatarFallback
                      gradient={generateAvatarColor(user?.name || user?._id || 'U')}
                    >
                      {getInitials(user?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <div className="font-medium text-white text-xs">{user?.name || 'My Account'}</div>
                  <div className="text-white/40 text-xs truncate">{user?.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            My Boards
          </h1>
          <p className="text-white/40 text-sm">
            {boards.length === 0
              ? 'Create your first board to get started'
              : `${boards.length} board${boards.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          </div>
        ) : boards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/3 flex items-center justify-center mb-4">
              <LayoutDashboard className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="font-display font-semibold text-white mb-1">No boards yet</h3>
            <p className="text-sm text-white/35 mb-5 max-w-xs">
              Boards help you organize projects and tasks for your team.
            </p>
            <Button variant="purple" onClick={() => setModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Create your first board
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {boards.map((board) => (
              <button
                key={board._id}
                onClick={() => navigate(`/board/${board._id}`)}
                className="group relative text-left p-5 rounded-xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-purple-500/25 transition-all duration-200 cursor-pointer"
              >
                {/* Color accent strip */}
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />

                <h3 className="font-display font-semibold text-white text-sm mb-2 line-clamp-2">
                  {board.title}
                </h3>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-white/30">
                    {formatDate(board.createdAt)}
                  </p>
                  <div className="flex -space-x-1.5">
                    {(board.members || []).slice(0, 3).map((member, i) => (
                      <Avatar key={i} className="h-5 w-5 border border-black">
                        <AvatarFallback
                          className="text-[8px]"
                          gradient={generateAvatarColor(member._id || String(i))}
                        >
                          {getInitials(member.name || '?')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-40 transition-opacity">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}

            {/* New board card */}
            <button
              onClick={() => setModalOpen(true)}
              className="group flex flex-col items-center justify-center gap-2 p-5 rounded-xl border border-dashed border-white/15 hover:border-purple-500/40 hover:bg-purple-500/3 transition-all duration-200 min-h-[120px] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg border border-white/15 group-hover:border-purple-500/40 flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4 text-white/30 group-hover:text-purple-400 transition-colors" />
              </div>
              <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors font-medium">
                New board
              </span>
            </button>
          </div>
        )}
      </main>

      {/* Create board modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new board</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBoard} className="space-y-4">
            <Input
              placeholder="e.g. Product Roadmap, Sprint 12..."
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              autoFocus
            />
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="purple" type="submit" disabled={creating || !boardTitle.trim()}>
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Create board
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
