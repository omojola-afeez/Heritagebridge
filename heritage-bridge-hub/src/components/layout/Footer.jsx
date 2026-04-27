import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100">
      {/* Wave divider */}
      <div className="overflow-hidden">
        <svg viewBox="0 0 1440 60" className="w-full fill-earth-50 -mb-1" style={{ fill: '#fdf8f0' }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,30 1440,25 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-terracotta-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">Heritage Bridge</div>
                <div className="text-xs text-amber-400 leading-none mt-0.5">Hub</div>
              </div>
            </div>
            <p className="text-amber-300/80 text-sm leading-relaxed mb-5">
              Connecting Africa's wisest elders with its youngest learners. Culture, stories, and love — passed down, one session at a time.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 bg-amber-900 rounded-lg flex items-center justify-center text-amber-400 hover:bg-amber-800 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm text-amber-300/80">
              {[
                { label: 'Browse Classes', href: '/classes' },
                { label: 'Meet the Elders', href: '/instructors' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Pricing & Plans', href: '/pricing' },
                { label: 'Teach on Heritage', href: '/onboarding/instructor' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-amber-200 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultures */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Cultures</h4>
            <ul className="space-y-2.5 text-sm text-amber-300/80">
              {['Igbo Heritage', 'Yoruba Culture', 'Hausa Tradition', 'Ghanaian Wisdom', 'Fulani Heritage', 'More Coming Soon...'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-amber-200 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-amber-300/80">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <span>hello@heritagebridgehub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-amber-500 shrink-0" />
                <span>+234 800 HERITAGE</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-amber-900/50 rounded-xl">
              <p className="text-xs text-amber-400 font-medium mb-1">Teach with us</p>
              <p className="text-xs text-amber-300/70">Are you an elder with wisdom to share? Join our growing community of instructors.</p>
              <Link to="/onboarding/instructor" className="mt-2 inline-block text-xs text-amber-400 hover:text-white font-medium">
                Apply to teach →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-amber-900/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-500">
          <div>© 2025 Heritage Bridge Hub. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-amber-300">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300">Terms of Service</a>
            <a href="#" className="hover:text-amber-300">Child Safety Policy</a>
            <a href="#" className="hover:text-amber-300">Refund Policy</a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
