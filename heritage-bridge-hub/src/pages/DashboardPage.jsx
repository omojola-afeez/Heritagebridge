import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Star, BookOpen, Award, TrendingUp, Bell, Settings, ChevronRight, Play, Heart } from 'lucide-react'
import { classes, instructors } from '../data/data'

const MOCK_BOOKINGS = [
  { id: 1, classId: 1, date: 'Mon, Jan 13', time: '10:00 AM', status: 'upcoming' },
  { id: 2, classId: 2, date: 'Tue, Jan 14', time: '11:00 AM', status: 'upcoming' },
  { id: 3, classId: 8, date: 'Tue, Jan 14', time: '7:00 PM', status: 'live' },
]

const MOCK_COMPLETED = [
  { id: 4, classId: 4, date: 'Fri, Jan 10', rating: 5, badge: '🐢 Story Explorer' },
  { id: 5, classId: 5, date: 'Thu, Jan 9', rating: 5, badge: '💃 Dance Star' },
]

const ACHIEVEMENTS = [
  { emoji: '🐢', name: 'Story Explorer', earned: true, date: 'Jan 10' },
  { emoji: '💃', name: 'Dance Star', earned: true, date: 'Jan 9' },
  { emoji: '🥁', name: 'Rhythm Keeper', earned: false },
  { emoji: '🌍', name: 'Culture Traveler', earned: false },
  { emoji: '📖', name: 'Oral Historian', earned: false },
  { emoji: '🌟', name: 'Heritage Hero', earned: false },
]

export default function DashboardPage({ user }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-display text-2xl text-amber-900 mb-2">Please sign in</h2>
          <p className="text-amber-600 mb-4">You need to be logged in to view your dashboard.</p>
          <Link to="/" className="btn-primary inline-block">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50/50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-amber-900">
              Welcome back, {user?.name?.split(' ')[0] || 'Parent'} 👋
            </h1>
            <p className="text-amber-600 mt-1">Zara's cultural journey is growing beautifully.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 bg-white rounded-xl border border-amber-100 text-amber-600 hover:bg-amber-50">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2.5 bg-white rounded-xl border border-amber-100 text-amber-600 hover:bg-amber-50">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-amber-100 rounded-2xl p-1 mb-8 w-fit">
          {['overview', 'bookings', 'achievements', 'billing'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-amber-600 text-white shadow' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Classes Completed', value: '5', icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
                { label: 'Upcoming Sessions', value: '3', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
                { label: 'Badges Earned', value: '2', icon: Award, color: 'bg-yellow-50 text-yellow-600' },
                { label: 'Avg Rating Given', value: '5.0', icon: Star, color: 'bg-green-50 text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-amber-100">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon size={18} />
                  </div>
                  <div className="font-display text-2xl font-bold text-amber-900">{stat.value}</div>
                  <div className="text-xs text-amber-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-amber-900">Upcoming Sessions</h2>
                <button onClick={() => setActiveTab('bookings')} className="text-xs text-amber-600 hover:text-amber-800">View all →</button>
              </div>
              <div className="space-y-3">
                {MOCK_BOOKINGS.map(booking => {
                  const cls = classes.find(c => c.id === booking.classId)
                  const instructor = cls && instructors.find(i => i.id === cls.instructorId)
                  return (
                    <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-50 transition-colors">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {cls?.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-amber-900 text-sm truncate">{cls?.title}</div>
                        <div className="text-xs text-amber-500">{instructor?.name} · {booking.date}, {booking.time}</div>
                      </div>
                      {booking.status === 'live' ? (
                        <span className="flex items-center gap-1 text-xs bg-red-100 text-red-600 font-medium px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          Live Now
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                          Upcoming
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              <Link to="/classes" className="mt-4 block">
                <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-amber-200 rounded-xl text-sm text-amber-600 hover:bg-amber-50 transition-colors">
                  + Book Another Class
                </div>
              </Link>
            </div>

            {/* Child Profile */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h2 className="font-display font-bold text-amber-900 mb-4">Zara's Cultural Profile</h2>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">👧🏿</div>
                <div className="flex-1">
                  <div className="font-bold text-amber-900 text-lg">Zara Okafor</div>
                  <div className="text-sm text-amber-500 mb-3">Age 5 · Lagos, Nigeria</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-amber-600 mb-1">
                        <span>Cultural Progress</span>
                        <span>35%</span>
                      </div>
                      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                        <div className="h-full w-[35%] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ACHIEVEMENTS.filter(a => a.earned).map(a => (
                        <span key={a.name} className="text-lg" title={a.name}>{a.emoji}</span>
                      ))}
                      <span className="text-xs text-amber-400 self-center">+4 badges to unlock</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h2 className="font-display font-bold text-amber-900 mb-4">Your Bookings</h2>
              <div className="space-y-3">
                {[...MOCK_BOOKINGS, ...MOCK_COMPLETED].map((booking, i) => {
                  const cls = classes.find(c => c.id === booking.classId)
                  const instructor = cls && instructors.find(ins => ins.id === cls.instructorId)
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-amber-50 hover:bg-amber-50">
                      <div className="text-3xl">{cls?.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900">{cls?.title}</div>
                        <div className="text-sm text-amber-500">{instructor?.name} · {booking.date}</div>
                        {booking.badge && (
                          <div className="text-xs text-amber-600 mt-0.5">Earned: {booking.badge}</div>
                        )}
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        booking.status === 'live' ? 'bg-red-100 text-red-600' :
                        booking.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {booking.status === 'live' ? '🔴 Live' : booking.status === 'upcoming' ? 'Upcoming' : '✓ Completed'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl border border-amber-100 p-6">
            <h2 className="font-display font-bold text-amber-900 mb-2">Zara's Cultural Badges</h2>
            <p className="text-sm text-amber-600 mb-6">Each badge is earned by completing classes in different cultural areas.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {ACHIEVEMENTS.map((achievement, i) => (
                <div key={i} className={`text-center p-4 rounded-2xl border-2 ${
                  achievement.earned
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-amber-100 bg-white opacity-50'
                }`}>
                  <div className="text-4xl mb-2">{achievement.emoji}</div>
                  <div className="text-xs font-semibold text-amber-900">{achievement.name}</div>
                  {achievement.earned && (
                    <div className="text-xs text-green-600 mt-1">Earned {achievement.date}</div>
                  )}
                  {!achievement.earned && (
                    <div className="text-xs text-amber-400 mt-1">Locked 🔒</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h2 className="font-display font-bold text-amber-900 mb-4">Current Plan</h2>
              <div className="flex items-center justify-between p-4 bg-amber-600 rounded-xl text-white mb-4">
                <div>
                  <div className="font-bold text-lg">Heritage Plan</div>
                  <div className="text-amber-200 text-sm">12 classes/month · Renews Feb 1</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl">₦12,000</div>
                  <div className="text-amber-200 text-sm">per month</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary text-sm flex-1">Change Plan</button>
                <button className="text-sm text-red-500 hover:text-red-700 px-4">Cancel</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h2 className="font-display font-bold text-amber-900 mb-4">Payment History</h2>
              {[
                { date: 'Jan 1, 2025', amount: '₦12,000', plan: 'Heritage Plan', status: 'Paid' },
                { date: 'Dec 1, 2024', amount: '₦12,000', plan: 'Heritage Plan', status: 'Paid' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-amber-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-amber-900">{item.plan}</div>
                    <div className="text-xs text-amber-500">{item.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-900">{item.amount}</div>
                    <div className="text-xs text-green-600">{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
