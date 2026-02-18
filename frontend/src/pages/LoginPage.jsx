import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authAPI } from '@/services/api'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      setAuth(
        { 
          _id: data._id, 
          id: data._id,
          name: data.name, 
          email: data.email 
        }, 
        data.token
      )
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials'
      toast.error(msg)
      setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-950/50 to-black items-center justify-center p-16">
        {/* Decorative */}
        <div className="absolute inset-0 bg-purple-radial opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-600/8 rounded-full blur-3xl" style={{ animation: 'float 5s ease-in-out infinite 2s' }} />
        <div className="absolute inset-0 border-r border-white/5" />

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-2xl">
              Task<span className="text-purple-400">Flow</span>
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Welcome back
          </h2>
          <p className="text-white/40 text-base max-w-xs mx-auto leading-relaxed">
            Your team is waiting. Let's pick up where you left off.
          </p>

          {/* Fake board preview */}
          <div className="mt-10 grid grid-cols-3 gap-2 max-w-xs mx-auto opacity-40">
            {['To Do', 'In Progress', 'Done'].map((col) => (
              <div key={col} className="rounded-lg border border-white/10 bg-white/3 p-2">
                <p className="text-[9px] text-white/50 font-medium mb-2">{col}</p>
                {[...Array(col === 'In Progress' ? 3 : 2)].map((_, i) => (
                  <div key={i} className="h-3 rounded-sm bg-white/8 mb-1.5 last:mb-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">
              Task<span className="text-purple-400">Flow</span>
            </span>
          </div>

          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold text-white mb-1">Sign in</h1>
            <p className="text-white/45 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={errors.email ? 'border-red-500/50' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                <p className="text-xs text-red-400">{errors.general}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="purple"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-white/25">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-white/50 transition-colors">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
