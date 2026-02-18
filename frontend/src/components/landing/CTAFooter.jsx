import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 to-violet-950/20 p-10 sm:p-16 text-center purple-glow">
          {/* Background glow */}
          <div className="absolute inset-0 bg-purple-radial opacity-40 pointer-events-none" />

          {/* Floating dots */}
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-purple-400/40" />
          <div className="absolute top-12 right-12 w-1 h-1 rounded-full bg-purple-400/20" />
          <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-violet-400/30" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-medium text-purple-300">
                Free forever for small teams
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Start collaborating
              <br />
              <span className="text-gradient">today</span>
            </h2>

            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of teams who use TaskFlow to ship projects faster.
              No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="purple"
                size="lg"
                className="group"
                onClick={() => navigate('/register')}
              >
                Create your free account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Sign in instead
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="border-t border-white/8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-white">
                Task<span className="text-purple-400">Flow</span>
              </span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed">
              Task management for modern teams. Fast, real-time, and simple.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {['Features', 'How it works', 'Pricing', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/45 hover:text-white/80 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Company
            </p>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/45 hover:text-white/80 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Legal
            </p>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/45 hover:text-white/80 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © 2026 TaskFlow. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built for teams who move fast.
          </p>
        </div>
      </div>
    </footer>
  )
}
