import React, { useState } from 'react'
import { Search, Star, Shield, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { instructors, categories } from '../data/data'
import { SectionHeader } from '../components/ui/Cards'

export default function InstructorsPage() {
  const [search, setSearch] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('all')

  const filtered = instructors.filter(ins => {
    const matchesSearch = !search ||
      ins.name.toLowerCase().includes(search.toLowerCase()) ||
      ins.location.toLowerCase().includes(search.toLowerCase()) ||
      ins.languages.some(l => l.toLowerCase().includes(search.toLowerCase()))
    const matchesSpec = selectedSpec === 'all' || ins.specialties.includes(selectedSpec)
    return matchesSearch && matchesSpec
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="gradient-warm pattern-kente border-b border-amber-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Wisdom Keepers"
            title="Meet the Elder Instructors"
            subtitle="Every instructor is a living library — verified, background-checked, and deeply passionate about sharing their culture with children."
          />
          <div className="max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                placeholder="Search by name, language, or location..."
                className="input-field pl-11"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedSpec('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedSpec === 'all' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            All Specialties
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedSpec(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedSpec === cat.id ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Instructors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(instructor => (
            <div key={instructor.id} className="card p-6 hover:-translate-y-1 transition-all">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-4xl">
                    {instructor.avatar}
                  </div>
                  {instructor.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-amber-900 text-lg">{instructor.fullName}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                    <MapPin size={11} />
                    <span>{instructor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-800">{instructor.rating}</span>
                    <span className="text-xs text-amber-400">({instructor.reviews})</span>
                  </div>
                </div>
                <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-lg font-medium shrink-0">
                  Age {instructor.age}
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-amber-700/80 leading-relaxed mb-4 line-clamp-3">{instructor.bio}</p>

              {/* Languages */}
              <div className="mb-3">
                <p className="text-xs text-amber-500 font-medium mb-1.5">Languages</p>
                <div className="flex flex-wrap gap-1">
                  {instructor.languages.map(lang => (
                    <span key={lang} className="badge bg-amber-50 border border-amber-200 text-amber-700 text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs text-amber-500 font-medium mb-1.5">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {instructor.specialties.map(spec => {
                    const cat = categories.find(c => c.id === spec)
                    return cat ? (
                      <span key={spec} className={`badge text-xs ${cat.color}`}>
                        {cat.emoji} {cat.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-4">
                {instructor.badges.map(badge => (
                  <span key={badge} className="badge bg-amber-600 text-white text-xs">{badge}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">₦{instructor.price.toLocaleString()}</div>
                  <div className="text-xs text-amber-500">per session</div>
                </div>
                <div className="text-xs text-amber-600">
                  <span className="font-bold">{instructor.students}</span> students
                </div>
                <Link
                  to={`/classes`}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1"
                >
                  View Classes <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Become instructor CTA */}
        <div className="mt-16 bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl p-10 text-center pattern-kente">
          <div className="text-4xl mb-4">👴🏿</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Are You an Elder with Wisdom to Share?</h2>
          <p className="text-amber-300/80 mb-6 max-w-xl mx-auto">
            Join our community of instructors. Earn ₦5,000–₦25,000 weekly while preserving your culture for the next generation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/onboarding/instructor" className="bg-white text-amber-900 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors inline-flex items-center gap-2">
              Apply to Teach <ArrowRight size={18} />
            </Link>
            <Link to="/how-it-works" className="border-2 border-amber-500 text-amber-300 font-medium px-8 py-4 rounded-full hover:bg-amber-800 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
