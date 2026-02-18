import { useEffect, useState } from 'react'
import { Activity, X, Loader2 } from 'lucide-react'
import { activitiesAPI } from '@/services/api'
import { Avatar, AvatarFallback } from '@/components/ui/index'
import { getInitials, generateAvatarColor, formatRelativeTime } from '@/lib/utils'

export default function ActivityPanel({ boardId, onClose }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (boardId) fetchActivities()
  }, [boardId])

  const fetchActivities = async () => {
    try {
      const { data } = await activitiesAPI.getByBoard(boardId)
      setActivities(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-72 border-l border-white/8 bg-black/40 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="font-display font-semibold text-sm text-white">
            Activity
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-sm text-white/25">
            No activity yet
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="flex gap-3">
              <Avatar className="h-6 w-6 flex-shrink-0 mt-0.5">
                <AvatarFallback
                  className="text-[9px]"
                  gradient={generateAvatarColor(activity.user?._id || 'U')}
                >
                  {getInitials(activity.user?.name || 'U')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/60 leading-relaxed">
                  <span className="font-medium text-white/80">
                    {activity.user?.name || 'Someone'}
                  </span>{' '}
                  {activity.details || activity.action}
                  {activity.assignedToUser && (
                    <>
                      {' '}to{' '}
                      <span className="font-medium text-white/80">
                        {activity.assignedToUser.name}
                      </span>
                    </>
                  )}
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
