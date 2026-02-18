import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Zap, Users, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image Placeholder - user will add their own image here */}
      <div className="absolute inset-0 z-0">
        {/* Background gradient */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#080808] via-[#0d0318] to-[#080808]" />
      </div>

      {/* Blur overlay to blend with image */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[2px] bg-black/50" />

      {/* Purple radial glow */}
      <div className="absolute inset-0 z-[2] bg-purple-radial opacity-60" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float z-[2]" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl z-[2]"
        style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
          <Zap className="w-3 h-3 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">
            Real-time collaboration • No setup required
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
          <span className="text-white">Ship faster.</span>
          <br />
          <span className="text-gradient">Together.</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          TaskFlow brings your team's work into one place. Organize tasks, track
          progress, and collaborate in real time — without the chaos.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button
            variant="purple"
            size="lg"
            className="group"
            onClick={() => navigate('/register')}
          >
            Start for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/login')}
          >
            Sign in
          </Button>
        </div>

        {/* Social proof stats */}
        <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {[
            { icon: Users, value: '10k+', label: 'Active teams' },
            { icon: BarChart3, value: '2M+', label: 'Tasks managed' },
            { icon: Zap, value: '99.9%', label: 'Uptime' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-white/40">
              <Icon className="w-4 h-4 text-purple-500/60" />
              <span className="font-display font-semibold text-white/80 text-sm">
                {value}
              </span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-10" />
    </section>
  )
}
