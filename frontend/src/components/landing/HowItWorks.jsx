import { UserPlus, LayoutDashboard, Users, Zap } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create your account',
    description:
      'Sign up in seconds. No credit card required. Your workspace is ready instantly.',
  },
  {
    number: '02',
    icon: LayoutDashboard,
    title: 'Build your board',
    description:
      'Create boards for projects, add lists for each stage, and organize tasks exactly how your team thinks.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Invite your team',
    description:
      'Add team members to boards and assign tasks with a single click. Everyone stays in sync automatically.',
  },
  {
    number: '04',
    icon: Zap,
    title: 'Collaborate live',
    description:
      'Updates happen in real time for everyone. Drag, drop, and ship — together.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
              How it works
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Up and running in minutes
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Four steps from zero to a fully collaborative workspace.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Number + Icon */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl border border-purple-500/20 bg-purple-500/5 flex items-center justify-center mb-2 mx-auto group-hover:border-purple-500/40 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-display font-bold text-purple-500/50 bg-black px-1">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-white text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
