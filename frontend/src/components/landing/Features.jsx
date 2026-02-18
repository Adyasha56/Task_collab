import {
  Zap,
  Users,
  BarChart3,
  Move,
  Bell,
  Shield,
  Clock,
  Search,
} from 'lucide-react'

const features = [
  {
    icon: Move,
    title: 'Drag & Drop Boards',
    description:
      'Intuitively organize tasks across lists. Move cards between columns with seamless drag-and-drop powered by real-time sync.',
    accent: 'from-purple-500 to-violet-600',
  },
  {
    icon: Zap,
    title: 'Real-Time Collaboration',
    description:
      'See changes instantly as they happen. No refresh needed — your team\'s updates appear live through WebSocket connections.',
    accent: 'from-fuchsia-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Team Management',
    description:
      'Invite members to boards, assign tasks to individuals, and keep everyone accountable with clear ownership.',
    accent: 'from-violet-500 to-indigo-600',
  },
  {
    icon: Bell,
    title: 'Activity Tracking',
    description:
      'Full audit trail of every action — who created, updated, moved, or deleted tasks and exactly when.',
    accent: 'from-purple-500 to-fuchsia-600',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description:
      'Find any task instantly with full-text search across all boards. Filter by status, assignee, or date.',
    accent: 'from-indigo-500 to-violet-600',
  },
  {
    icon: BarChart3,
    title: 'Progress Overview',
    description:
      'Visual progress at a glance. Track completion rates and identify bottlenecks before they become blockers.',
    accent: 'from-violet-600 to-purple-800',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
              Features
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything your team needs
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            A complete task management platform without the bloat. Built for speed,
            designed for collaboration.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl border border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/12 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${feature.accent} mb-4 shadow-lg`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/3 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
