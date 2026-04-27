import React, { useState } from 'react'
import { X, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

export default function AuthModal({ type, onClose, onLogin, onSwitchType }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLogin = type === 'login'
  const isInstructor = type === 'signup-instructor'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: isInstructor ? 'instructor' : 'parent',
      })
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 px-6 pt-8 pb-6 pattern-kente">
          <button onClick={onClose} className="absolute top-4 right-4 text-amber-400 hover:text-amber-600 p-1">
            <X size={20} />
          </button>
          <div className="text-3xl mb-3">
            {isLogin ? '👋' : isInstructor ? '👴🏿' : '👨‍👩‍👧'}
          </div>
          <h2 className="font-display text-2xl font-bold text-amber-900">
            {isLogin ? 'Welcome back' : isInstructor ? 'Become an Elder Instructor' : 'Join Heritage Bridge Hub'}
          </h2>
          <p className="text-sm text-amber-700 mt-1">
            {isLogin
              ? 'Continue your cultural learning journey'
              : isInstructor
              ? 'Share your wisdom. Earn income. Leave a legacy.'
              : 'Give your child the gift of cultural roots'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">
                {isInstructor ? 'Your full name' : 'Parent / Guardian name'}
              </label>
              <input
                type="text"
                placeholder={isInstructor ? 'e.g. Adaeze Okonkwo' : 'e.g. Chidinma Okafor'}
                className="input-field"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="input-field"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field pr-10"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
          )}

          {!isLogin && isInstructor && (
            <div className="bg-amber-50 rounded-xl p-3 space-y-1.5">
              {['Elderly-friendly platform (we help with setup)', 'Earn ₦5,000–₦25,000/week', 'Teach from home, on your schedule'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-amber-700">
                  <CheckCircle size={13} className="text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign in' : isInstructor ? 'Apply to teach' : 'Create free account'}
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {isLogin ? (
            <p className="text-center text-sm text-amber-600">
              Don't have an account?{' '}
              <button type="button" onClick={() => onSwitchType('signup-parent')} className="font-semibold text-amber-800 hover:underline">
                Join free
              </button>
            </p>
          ) : (
            <p className="text-center text-sm text-amber-600">
              Already have an account?{' '}
              <button type="button" onClick={() => onSwitchType('login')} className="font-semibold text-amber-800 hover:underline">
                Sign in
              </button>
            </p>
          )}

          {!isInstructor && !isLogin && (
            <div className="text-center">
              <span className="text-xs text-amber-500">Are you an elder who wants to teach? </span>
              <button type="button" onClick={() => onSwitchType('signup-instructor')} className="text-xs font-semibold text-amber-700 hover:underline">
                Apply here →
              </button>
            </div>
          )}
        </form>

        <div className="px-6 pb-5 text-center">
          <p className="text-xs text-amber-400">
            By joining, you agree to our{' '}
            <a href="#" className="hover:text-amber-600">Terms of Service</a> and{' '}
            <a href="#" className="hover:text-amber-600">Child Safety Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
