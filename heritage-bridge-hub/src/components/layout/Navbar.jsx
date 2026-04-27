import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, BookOpen, Users, HelpCircle, Tag, LayoutDashboard } from 'lucide-react'

export default function Navbar({ user, onOpenAuth, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { href: '/classes', label: 'Classes', icon: BookOpen },
    { href: '/instructors', label: 'Elders', icon: Users },
    { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
    { href: '/pricing', label: 'Pricing', icon: Tag },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-terracotta-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-lg">🌿</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-amber-900 text-lg leading-none">Heritage Bridge</div>
              <div className="text-xs text-amber-600 font-body leading-none mt-0.5">Hub</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-amber-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={user.role === 'instructor' ? '/instructor-dashboard' : '/dashboard'}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <div className="w-7 h-7 bg-amber-200 rounded-full flex items-center justify-center text-sm">
                    {user.name?.[0] || '👤'}
                  </div>
                  <span>{user.name}</span>
                </Link>
                <button onClick={onLogout} className="text-sm text-amber-500 hover:text-amber-700">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-900 font-body transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => onOpenAuth('signup-parent')}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Join Free
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-amber-700 hover:bg-amber-50"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-amber-50 text-amber-800'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <link.icon size={16} className="text-amber-500" />
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-amber-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'instructor' ? '/instructor-dashboard' : '/dashboard'}
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary text-center text-sm"
                >
                  My Dashboard
                </Link>
                <button onClick={onLogout} className="text-sm text-amber-500">Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => { onOpenAuth('login'); setMenuOpen(false) }} className="btn-secondary text-sm">
                  Sign in
                </button>
                <button onClick={() => { onOpenAuth('signup-parent'); setMenuOpen(false) }} className="btn-primary text-sm">
                  Join Free — Start Learning
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
