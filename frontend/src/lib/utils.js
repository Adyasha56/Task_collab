import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date) {
  if (!date) return ''
  const now = new Date()
  const d = new Date(date)
  const diff = now - d
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export function getStatusConfig(status) {
  const configs = {
    'todo': { label: 'To Do', className: 'status-todo', dot: '#71717a' },
    'in-progress': { label: 'In Progress', className: 'status-in-progress', dot: '#a855f7' },
    'done': { label: 'Done', className: 'status-done', dot: '#34d399' },
    'blocked': { label: 'Blocked', className: 'status-blocked', dot: '#f87171' },
  }
  return configs[status] || configs['todo']
}

export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateAvatarColor(str) {
  const colors = [
    'from-purple-500 to-purple-700',
    'from-violet-500 to-purple-600',
    'from-indigo-500 to-violet-600',
    'from-fuchsia-500 to-purple-600',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
