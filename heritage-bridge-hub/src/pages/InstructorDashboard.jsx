import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Users, Star, Calendar, TrendingUp, Bell, Settings, Plus, Clock, CheckCircle, BookOpen, Award, ChevronRight, Edit, Eye } from 'lucide-react'
import { classes, instructors } from '../data/data'

const MOCK_SESSIONS = [
  { id: 1, classId: 1, date: 'Mon, Jan 13', time: '10:00 AM', enrolled: 6, status: 'upcoming' },
  { id: 2, classId: 7, date: 'Fri, Jan 17', time: '2:00 PM', enrolled: 4, status: 'upcoming' },
  { id: 3, classId: 1, date: 'Wed, Jan 8', time: '10:00 AM', enrolled: 8, status: 'completed', earnings: 15000 },
  { id: 4, classId: 1, date: 'Mon, Jan 6', time: '10:00 AM', enrolled: 7, status: 'completed', earnings: 13125 },
]

const MOCK_REVIEWS = [
  { parent: 'Chidinma O.', child: 'Zara, 5', text: 'Grandma Adaeze is amazing! My daughter asks for her class every day.', rating: 5, date: 'Jan 10' },
  { parent: 'Emeka N.', child: 'Tobe, 6', text: 'The stories are so rich and engaging. Even I learned something!', rating: 5, date: 'Jan 8' },
  { parent: 'Yetunde A.', child: 'Kemi, 4', text: 'Patient, warm, and so knowledgeable. A true master storyteller.', rating: 5, date: 'Jan 6' },
]

export default function InstructorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview')
  const instructor = instructors[0] // Grandma Adaeze as mock

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-display text-2xl text-amber-900 mb-2">Please sign in</h2>
          <Link to="/" className="btn-primary inline-block mt-4">Go Home</Link>
        </div>
      </div>
    )
  }

  const totalEarnings = MOCK_SESSIONS.filter(s => s.status === 'completed').reduce((sum, s) => sum + (s.earnings || 0), 0)

  return (
    <div className="min-h-screen bg-amber-50/50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">
              {instructor.avatar}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-amber-900">
                {instructor.name}'s Studio
              </h1>
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>{instructor.rating} rating</span>
                <span>·</span>
                <span>{instructor.students} students</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle size={13} />
                  Verified
                </span>
              </div>
            </div>
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
        <div className="flex gap-1 bg-white border border-amber-100 rounded-2xl p-1 mb-8 w-fit overflow-x-auto">
          {['overview', 'sessions', 'classes', 'earnings', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-amber-600 text-white shadow' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'This Month\'s Earnings', value: `₦${totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600', change: '+12%' },
                { label: 'Active Students', value: instructor.students, icon: Users, color: 'bg-blue-50 text-blue-600', change: '+5' },
                { label: 'Avg Session Rating', value: `${instructor.rating}★`, icon: Star, color: 'bg-amber-50 text-amber-600', change: 'Excellent' },
                { label: 'Classes This Month', value: '8', icon: BookOpen, color: 'bg-purple-50 text-purple-600', change: '4 upcoming' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-amber-100">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon size={18} />
                  </div>
                  <div className="font-display text-2xl font-bold text-amber-900">{stat.value}</div>
                  <div className="text-xs text-amber-500 mt-0.5">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Upcoming sessions */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-amber-900">Next Sessions</h2>
                <button onClick={() => setActiveTab('sessions')} className="text-xs text-amber-600">View all →</button>
              </div>
              <div className="space-y-3">
                {MOCK_SESSIONS.filter(s => s.status === 'upcoming').map((session, i) => {
                  const cls = classes.find(c => c.id === session.classId)
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-amber-50 hover:bg-amber-50 transition-colors">
                      <div className="text-3xl">{cls?.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900 text-sm">{cls?.title}</div>
                        <div className="text-xs text-amber-500">{session.date} · {session.time} · {session.enrolled}/{cls?.maxStudents} students</div>
                      </div>
                      <button className="btn-primary text-xs px-3 py-1.5">
                        Start Class
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Payout summary */}
            <div className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg">Earnings Summary</h2>
                <span className="text-xs text-amber-300 bg-amber-700/50 px-2.5 py-1 rounded-full">January 2025</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="font-display text-2xl font-bold">₦{totalEarnings.toLocaleString()}</div>
                  <div className="text-amber-300 text-xs">Total earned</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">₦{Math.round(totalEarnings * 0.8).toLocaleString()}</div>
                  <div className="text-amber-300 text-xs">Paid out</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">₦{Math.round(totalEarnings * 0.2).toLocaleString()}</div>
                  <div className="text-amber-300 text-xs">Pending (Fri)</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-amber-300">
                💰 Payouts are processed every Friday to your registered bank account.
              </div>
            </div>

            {/* Recent reviews */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-amber-900">Recent Reviews</h2>
                <button onClick={() => setActiveTab('reviews')} className="text-xs text-amber-600">View all →</button>
              </div>
              <div className="space-y-3">
                {MOCK_REVIEWS.slice(0, 2).map((review, i) => (
                  <div key={i} className="p-3 bg-amber-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} className={s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'} />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-amber-900">{review.parent}</span>
                      <span className="text-xs text-amber-400">re: {review.child}</span>
                    </div>
                    <p className="text-sm text-amber-700 italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {activeTab === 'sessions' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-amber-900 text-xl">All Sessions</h2>
              <button className="btn-primary text-sm flex items-center gap-2">
                <Plus size={14} /> Schedule New Session
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-amber-50 border-b border-amber-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wide">Class</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wide hidden md:table-cell">Date & Time</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wide hidden md:table-cell">Students</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wide">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wide hidden md:table-cell">Earnings</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {MOCK_SESSIONS.map((session, i) => {
                    const cls = classes.find(c => c.id === session.classId)
                    return (
                      <tr key={i} className="hover:bg-amber-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{cls?.emoji}</span>
                            <span className="font-medium text-amber-900 text-sm">{cls?.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-amber-600 hidden md:table-cell">{session.date}, {session.time}</td>
                        <td className="px-5 py-4 text-amber-600 hidden md:table-cell">{session.enrolled}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            session.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {session.status === 'upcoming' ? 'Upcoming' : '✓ Done'}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-bold text-amber-900 hidden md:table-cell">
                          {session.earnings ? `₦${session.earnings.toLocaleString()}` : '—'}
                        </td>
                        <td className="px-5 py-4">
                          {session.status === 'upcoming' && (
                            <button className="btn-primary text-xs px-3 py-1.5">Start</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CLASSES TAB */}
        {activeTab === 'classes' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-amber-900 text-xl">My Classes</h2>
              <button className="btn-primary text-sm flex items-center gap-2">
                <Plus size={14} /> Create New Class
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.filter(c => c.instructorId === 1).map((cls, i) => (
                <div key={i} className="bg-white rounded-2xl border border-amber-100 p-4 hover:border-amber-300 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{cls.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-amber-900 text-sm">{cls.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-amber-500">
                        <span>{cls.duration} min</span>
                        <span>·</span>
                        <span>Ages {cls.ageGroup}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Star size={10} className="text-amber-500 fill-amber-500" />
                          {cls.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-900">₦{cls.price.toLocaleString()}</div>
                      <div className="text-xs text-amber-400">per session</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-50">
                    <div className="text-xs text-amber-500">
                      {cls.enrolled}/{cls.maxStudents} enrolled · {cls.reviews} reviews
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-amber-500 hover:text-amber-700"><Eye size={14} /></button>
                      <button className="p-1.5 text-amber-500 hover:text-amber-700"><Edit size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-amber-100 p-6">
              <h2 className="font-display font-bold text-amber-900 mb-5">Earnings Overview</h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                {[
                  { label: 'January 2025', value: `₦${totalEarnings.toLocaleString()}`, sub: '8 sessions' },
                  { label: 'December 2024', value: '₦38,500', sub: '6 sessions' },
                  { label: 'Total Lifetime', value: '₦142,750', sub: '48 sessions' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 bg-amber-50 rounded-xl">
                    <div className="font-display text-2xl font-bold text-amber-900">{item.value}</div>
                    <div className="text-sm font-medium text-amber-700 mt-1">{item.label}</div>
                    <div className="text-xs text-amber-400">{item.sub}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-amber-900 text-sm">Payout History</h3>
                {[
                  { date: 'Jan 10, 2025', amount: '₦20,625', status: 'Paid', bank: 'GTBank ****1234' },
                  { date: 'Jan 3, 2025', amount: '₦18,000', status: 'Paid', bank: 'GTBank ****1234' },
                  { date: 'Dec 27, 2024', amount: '₦22,500', status: 'Paid', bank: 'GTBank ****1234' },
                ].map((payout, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-amber-50 last:border-0">
                    <div>
                      <div className="font-medium text-amber-900 text-sm">{payout.date}</div>
                      <div className="text-xs text-amber-400">{payout.bank}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-900">{payout.amount}</div>
                      <div className="text-xs text-green-600 font-medium">{payout.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-amber-50">
                <div className="text-5xl font-display font-bold text-amber-900">{instructor.rating}</div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={18} className="text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <div className="text-sm text-amber-600">{instructor.reviews} total reviews</div>
                </div>
              </div>
              <div className="space-y-4">
                {MOCK_REVIEWS.map((review, i) => (
                  <div key={i} className="p-4 bg-amber-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-amber-900 text-sm">{review.parent}</span>
                        <span className="text-xs text-amber-500 ml-2">Parent of {review.child}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} className={s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'} />
                        ))}
                        <span className="text-xs text-amber-400 ml-1">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-amber-700">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
