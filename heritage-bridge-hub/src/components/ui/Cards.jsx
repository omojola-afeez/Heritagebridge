import React from 'react'
import { Star, Clock, Users, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, instructors } from '../../data/data'

export function ClassCard({ cls, compact = false }) {
  const instructor = instructors.find(i => i.id === cls.instructorId)
  const category = categories.find(c => c.id === cls.category)
  const spotsLeft = cls.maxStudents - cls.enrolled

  return (
    <Link to={`/classes/${cls.id}`} className="card block hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <span className="text-6xl">{cls.emoji}</span>
        {cls.featured && (
          <div className="absolute top-3 left-3 badge bg-amber-600 text-white text-xs">
            ✦ Featured
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`badge text-xs ${category?.color || 'bg-amber-100 text-amber-800'}`}>
            {category?.emoji} {category?.name}
          </span>
        </div>
        {spotsLeft <= 3 && (
          <div className="absolute bottom-3 right-3 badge bg-red-100 text-red-700 text-xs">
            🔥 {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-bold text-amber-900 text-base leading-snug mb-2 group-hover:text-amber-700 transition-colors">
          {cls.title}
        </h3>

        {/* Instructor */}
        {instructor && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{instructor.avatar}</span>
            <span className="text-sm text-amber-700 font-medium">{instructor.name}</span>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-amber-600 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {cls.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            Ages {cls.ageGroup}
          </span>
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-500 fill-amber-500" />
            {cls.rating} ({cls.reviews})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-amber-800 text-lg">₦{cls.price.toLocaleString()}</span>
            <span className="text-xs text-amber-500 ml-1">/ session</span>
          </div>
          <div className="text-xs text-amber-600 font-medium flex items-center gap-0.5 group-hover:text-amber-800">
            Book now <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function InstructorCard({ instructor }) {
  return (
    <Link to={`/instructors`} className="card p-5 block hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">
            {instructor.avatar}
          </div>
          {instructor.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-amber-900 text-base">{instructor.name}</h3>
          <p className="text-xs text-amber-600 mb-1">{instructor.location}</p>
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-amber-800">{instructor.rating}</span>
            <span className="text-xs text-amber-500">({instructor.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {instructor.languages.slice(0, 2).map(lang => (
              <span key={lang} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-600">
        <span>{instructor.students} students</span>
        <span className="font-bold text-amber-800">{instructor.badge}</span>
        <span>₦{instructor.price.toLocaleString()}/class</span>
      </div>
    </Link>
  )
}

export function StarRating({ rating, size = 'sm' }) {
  const s = size === 'sm' ? 12 : 16
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={s}
          className={i <= Math.round(rating) ? 'text-amber-500 fill-amber-500' : 'text-amber-200'}
        />
      ))}
    </div>
  )
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-amber-100 text-amber-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-800',
    premium: 'bg-amber-600 text-white',
  }
  return (
    <span className={`badge text-xs ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3 ${center ? 'justify-center w-full' : ''}`}>
          <span className="w-8 h-0.5 bg-amber-400 rounded-full"></span>
          <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">{eyebrow}</span>
          <span className="w-8 h-0.5 bg-amber-400 rounded-full"></span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle mt-3 ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>{subtitle}</p>}
    </div>
  )
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
    </div>
  )
}

export function EmptyState({ emoji, title, description, action }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="font-display text-xl text-amber-900 mb-2">{title}</h3>
      <p className="text-amber-600 text-sm max-w-xs mx-auto mb-6">{description}</p>
      {action}
    </div>
  )
}
