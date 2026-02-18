import { useState } from 'react'
import { Pencil, Trash2, User, MoreHorizontal, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/index'
import { getStatusConfig, getInitials, generateAvatarColor, cn } from '@/lib/utils'

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  dragHandleProps = {},
  isDragging = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const status = getStatusConfig(task.status)

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-white/8 bg-white/3 p-3.5 hover:bg-white/5 hover:border-white/14 transition-all duration-150 cursor-pointer',
        isDragging && 'opacity-60 rotate-1 scale-102 shadow-2xl shadow-purple-900/30 border-purple-500/30'
      )}
    >
      {/* Drag handle */}
      <div
        {...dragHandleProps}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 hover:!opacity-60 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-3.5 h-3.5 text-white" />
      </div>

      <div className="pl-3">
        {/* Status badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full', status.className)}>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: status.dot }}
            />
            {status.label}
          </span>

          {/* Actions menu */}
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/8 text-white/40 hover:text-white"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onEdit(task) }}
                className="cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onDelete(task._id) }}
                className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-white/85 leading-snug mb-2 line-clamp-3">
          {task.title}
        </p>

        {/* Description preview */}
        {task.description && (
          <p className="text-xs text-white/35 mb-2.5 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Footer row */}
        {task.assignedTo && (
          <div className="flex items-center gap-1.5 mt-2">
            <User className="w-3 h-3 text-white/25" />
            <span className="text-[10px] text-white/30 truncate">
              {task.assignedTo?.name || 'Assigned'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
