import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Star, Calendar, Shield, CheckCircle, Share2, Heart, ChevronRight } from 'lucide-react'
import { classes, instructors, categories } from '../data/data'
import { StarRating } from '../components/ui/Cards'

export default function ClassDetailPage({ onOpenAuth }) {
  const { id } = useParams()
  const cls = classes.find(c => c.id === parseInt(id))
  const [liked, setLiked] = useState(false)
  const [selectedDate, setSelectedDate] = useState(0)

  if (!cls) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="font-display text-2xl text-amber-900 mb-2">Class not found</h2>
          <Link to="/classes" className="btn-primary inline-block mt-4">Browse Classes</Link>
        </div>
      </div>
    )
  }

  const instructor = instructors.find(i => i.id === cls.instructorId)
  const category = categories.find(c => c.id === cls.category)
  const spotsLeft = cls.maxStudents - cls.enrolled

  const upcomingDates = [
    'Mon, Jan 13 — 10:00 AM',
    'Wed, Jan 15 — 10:00 AM',
    'Fri, Jan 17 — 10:00 AM',
    'Mon, Jan 20 — 10:00 AM',
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-amber-500 mb-6">
          <Link to="/classes" className="hover:text-amber-700 flex items-center gap-1">
            <ArrowLeft size={14} /> Classes
          </Link>
          <ChevronRight size={12} />
          <span className="text-amber-700">{cls.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl h-64 flex items-center justify-center mb-6 overflow-hidden pattern-dots">
              <span className="text-8xl">{cls.emoji}</span>
              <div className="absolute top-4 left-4 flex gap-2">
                {cls.featured && <span className="badge bg-amber-600 text-white text-xs">✦ Featured</span>}
                <span className={`badge text-xs ${category?.color}`}>{category?.emoji} {category?.name}</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${liked ? 'bg-red-100 text-red-500' : 'bg-white text-amber-400'}`}
                >
                  <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                </button>
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-amber-400">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-amber-900 mb-3">{cls.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-amber-600 mb-5">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <strong>{cls.rating}</strong> ({cls.reviews} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {cls.duration} min / session
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                Ages {cls.ageGroup}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                Max {cls.maxStudents} students
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cls.tags.map(tag => (
                <span key={tag} className="badge bg-amber-50 text-amber-700 border border-amber-200 text-xs">{tag}</span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-bold text-amber-900 mb-3">About this class</h2>
              <p className="text-amber-700/80 leading-relaxed">{cls.description}</p>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-amber-50 rounded-2xl p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-amber-900 mb-4">What children will learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cls.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-amber-800">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-bold text-amber-900 mb-3">Schedule</h2>
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 rounded-xl px-4 py-3 mb-4">
                <Calendar size={16} className="text-amber-500" />
                <span className="text-sm font-medium">{cls.schedule}</span>
              </div>
              <p className="text-sm text-amber-600 mb-3">Select a session to book:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {upcomingDates.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                      selectedDate === i
                        ? 'border-amber-500 bg-amber-50 text-amber-800 font-medium'
                        : 'border-amber-100 text-amber-600 hover:border-amber-300'
                    }`}
                  >
                    📅 {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="border border-amber-100 rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-900 mb-4">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-4xl">
                      {instructor.avatar}
                    </div>
                    {instructor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-amber-900 text-lg">{instructor.fullName}</h3>
                    <p className="text-sm text-amber-600 mb-2">{instructor.location} · {instructor.age} years old</p>
                    <StarRating rating={instructor.rating} size="sm" />
                    <p className="text-sm text-amber-700/80 leading-relaxed mt-2">{instructor.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {instructor.badges.map(b => (
                        <span key={b} className="badge bg-amber-100 text-amber-700 text-xs">{b}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-3 text-xs text-amber-600">
                      <span>{instructor.students} total students</span>
                      <span>{instructor.reviews} reviews</span>
                      <span>{instructor.classes} classes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="card p-6 shadow-lg">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-3xl font-bold text-amber-900">₦{cls.price.toLocaleString()}</span>
                  <span className="text-amber-500 text-sm">/ session</span>
                </div>
                <p className="text-xs text-amber-500 mb-4">(~${cls.priceUSD} USD)</p>

                {spotsLeft <= 3 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs text-red-700 font-medium mb-4">
                    🔥 Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining!
                  </div>
                )}

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-600">Enrolled</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${(cls.enrolled / cls.maxStudents) * 100}%` }}
                        />
                      </div>
                      <span className="text-amber-800 font-medium">{cls.enrolled}/{cls.maxStudents}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-600">Selected date</span>
                    <span className="text-amber-800 font-medium text-xs">{upcomingDates[selectedDate].split(' — ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-600">Time</span>
                    <span className="text-amber-800 font-medium">{upcomingDates[selectedDate].split(' — ')[1]}</span>
                  </div>
                </div>

                <Link
                  to={`/book/${cls.id}`}
                  className="btn-primary w-full text-center block mb-3"
                >
                  Book This Session
                </Link>

                <div className="space-y-2 text-xs text-amber-600">
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-green-500 shrink-0" />
                    <span>Full refund if cancelled 24h before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500 shrink-0" />
                    <span>Secure payment via Paystack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500 shrink-0" />
                    <span>Join via browser — no downloads</span>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-amber-100 text-center">
                  <p className="text-xs text-amber-500 mb-2">First time? Try for free</p>
                  <button
                    onClick={() => onOpenAuth('signup-parent')}
                    className="btn-secondary w-full text-sm"
                  >
                    Get Free Trial Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
