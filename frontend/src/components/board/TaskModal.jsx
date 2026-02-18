import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/index'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { tasksAPI } from '@/services/api'
import { useBoardStore } from '@/store/boardStore'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'blocked', label: 'Blocked' },
]

export default function TaskModal({ open, onClose, task, listId, boardId, members = [] }) {
  const { addTask, updateTask } = useBoardStore()
  const isEditing = !!task

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    assignedTo: '',
  })

  useEffect(() => {
    if (task) {
      // Handle assignedTo as array - get first member's id if exists
      const assignedId = task.assignedTo && task.assignedTo.length > 0
        ? task.assignedTo[0]._id || task.assignedTo[0]
        : ''
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        assignedTo: assignedId,
      })
    } else {
      setForm({ title: '', description: '', status: 'todo', assignedTo: '' })
    }
  }, [task, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Task title is required')
      return
    }

    setLoading(true)
    try {
      // Convert single assignedTo to array
      const assignedTo = form.assignedTo ? [form.assignedTo] : []
      
      if (isEditing) {
        const { data } = await tasksAPI.update(task._id, {
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
          assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
        })
        updateTask(data)
        toast.success('Task updated')
      } else {
        const { data } = await tasksAPI.create({
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
          assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
          listId,
          boardId,
        })
        // Task will be added via socket event (taskCreated)
        toast.success('Task created')
      }
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit task' : 'Create task'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="task-title">Title *</Label>
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-desc">Description</Label>
            <Textarea
              id="task-desc"
              placeholder="Add more details..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(val) => setForm({ ...form, status: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {members.length > 0 && (
              <div className="space-y-1.5">
                <Label>Assign to</Label>
                <Select
                  value={form.assignedTo}
                  onValueChange={(val) => setForm({ ...form, assignedTo: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((m) => (
                      <SelectItem key={m._id} value={m._id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="purple" type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? 'Save changes' : 'Create task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
