import { useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ListColumn({ list, onAddTask, onEditTask, onDeleteTask }) {
  const tasks = list.tasks || []

  return (
    <div className="flex flex-col w-72 flex-shrink-0">
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
          <h3 className="font-display font-semibold text-sm text-white/80">
            {list.title}
          </h3>
          <span className="text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 rounded text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Droppable area */}
      <Droppable droppableId={list._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 rounded-xl border min-h-[100px] p-2 transition-colors duration-150',
              snapshot.isDraggingOver
                ? 'border-purple-500/30 bg-purple-500/5'
                : 'border-white/6 bg-white/2'
            )}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="mb-2 last:mb-0"
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* Empty state */}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-16 text-xs text-white/20">
                No tasks
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Add task button */}
      <button
        onClick={() => onAddTask(list._id)}
        className="mt-2 flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-white/35 hover:text-white/60 hover:bg-white/4 transition-all group"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add task</span>
      </button>
    </div>
  )
}
