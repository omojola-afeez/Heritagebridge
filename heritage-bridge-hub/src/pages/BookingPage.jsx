import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Shield, CheckCircle, CreditCard, Smartphone, Lock, ChevronRight, Calendar, Clock, Users } from 'lucide-react'
import { classes, instructors } from '../data/data'

const UPCOMING_DATES = [
  { date: 'Mon, Jan 13', time: '10:00 AM', spots: 2 },
  { date: 'Wed, Jan 15', time: '10:00 AM', spots: 4 },
  { date: 'Fri, Jan 17', time: '10:00 AM', spots: 6 },
  { date: 'Mon, Jan 20', time: '10:00 AM', spots: 8 },
]

const STEPS = ['Select Session', 'Child Details', 'Payment', 'Confirmation']

export default function BookingPage() {
  const { classId } = useParams()
  const cls = classes.find(c => c.id === parseInt(classId)) || classes[0]
  const instructor = instructors.find(i => i.id === cls.instructorId)

  const [step, setStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState(0)
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [notes, setNotes] = useState('')
  const [payMethod, setPayMethod] = useState('card')
  const [completed, setCompleted] = useState(false)

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
    else setCompleted(true)
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 gradient-warm">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-amber-900 mb-2">Booked! 🎉</h2>
          <p className="text-amber-600 mb-1">
            <strong>{childName || 'Your child'}</strong> is enrolled in
          </p>
          <p className="font-display font-bold text-amber-800 text-lg mb-4">{cls.title}</p>
          <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Calendar size={14} className="text-amber-500" />
              <span>{UPCOMING_DATES[selectedDate].date} at {UPCOMING_DATES[selectedDate].time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <span className="text-lg">{instructor?.avatar}</span>
              <span>with {instructor?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <CreditCard size={14} className="text-amber-500" />
              <span>₦{cls.price.toLocaleString()} — Payment confirmed</span>
            </div>
          </div>
          <p className="text-xs text-amber-500 mb-6">
            📧 Confirmation and joining link sent to your email. We'll also send a reminder 1 hour before the session.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard" className="btn-primary w-full text-center">
              Go to My Dashboard
            </Link>
            <Link to="/classes" className="btn-secondary w-full text-center">
              Book Another Class
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-amber-500 mb-6">
          <Link to={`/classes/${classId}`} className="hover:text-amber-700 flex items-center gap-1">
            <ArrowLeft size={14} /> Back to class
          </Link>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-amber-100 z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-amber-500 z-0 transition-all duration-500"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((label, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' :
                'bg-white border-2 border-amber-200 text-amber-400'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-amber-800 font-medium' : 'text-amber-400'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">

            {/* Step 0: Select Session */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-amber-900 mb-5">Choose a Session Date</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {UPCOMING_DATES.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        selectedDate === i
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-amber-100 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className={selectedDate === i ? 'text-amber-600' : 'text-amber-400'} />
                        <span className="font-semibold text-amber-900 text-sm">{d.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-amber-400" />
                        <span className="text-sm text-amber-600">{d.time}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        d.spots <= 2 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                      }`}>
                        {d.spots} spots left
                      </span>
                    </button>
                  ))}
                </div>
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 1: Child Details */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-amber-900 mb-2">Tell us about your child</h2>
                <p className="text-amber-600 text-sm mb-5">This helps the instructor tailor the experience.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-amber-700 mb-1.5">Child's first name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Zara"
                      className="input-field"
                      value={childName}
                      onChange={e => setChildName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-700 mb-1.5">Child's age *</label>
                    <select className="input-field" value={childAge} onChange={e => setChildAge(e.target.value)}>
                      <option value="">Select age</option>
                      {[2,3,4,5,6,7].map(a => <option key={a} value={a}>{a} years old</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-700 mb-1.5">
                      Anything the instructor should know? (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. She's shy but warms up quickly. He speaks a little Igbo already."
                      className="input-field resize-none"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700 flex gap-2">
                    <Shield size={16} className="shrink-0 mt-0.5 text-blue-500" />
                    <span>Your child's information is private and only shared with their instructor.</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-secondary">Back</button>
                  <button
                    onClick={handleNext}
                    disabled={!childName || !childAge}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-amber-900 mb-5">Payment</h2>
                <div className="flex gap-3 mb-5">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'transfer', label: 'Bank Transfer', icon: Smartphone },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPayMethod(method.id)}
                      className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        payMethod === method.id
                          ? 'border-amber-500 bg-amber-50 text-amber-800'
                          : 'border-amber-100 text-amber-600 hover:border-amber-300'
                      }`}
                    >
                      <method.icon size={16} />
                      {method.label}
                    </button>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-amber-700 mb-1.5">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="input-field" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-amber-700 mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM / YY" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-amber-700 mb-1.5">CVV</label>
                        <input type="text" placeholder="123" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-amber-700 mb-1.5">Name on Card</label>
                      <input type="text" placeholder="Chidinma Okafor" className="input-field" />
                    </div>
                  </div>
                )}

                {payMethod === 'transfer' && (
                  <div className="bg-amber-50 rounded-2xl p-4 space-y-2 text-sm text-amber-700">
                    <p className="font-semibold text-amber-900">Transfer ₦{cls.price.toLocaleString()} to:</p>
                    <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                      <span className="text-amber-500">Bank</span><span className="font-medium">GTBank</span>
                      <span className="text-amber-500">Account Name</span><span className="font-medium">Heritage Bridge Hub</span>
                      <span className="text-amber-500">Account No.</span><span className="font-bold text-amber-900 text-sm">0123456789</span>
                      <span className="text-amber-500">Reference</span><span className="font-bold text-amber-900">HBH-{classId}-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <p className="text-xs text-amber-500">Use the reference code above. Booking confirmed automatically within 15 minutes.</p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 text-xs text-amber-500">
                  <Lock size={12} />
                  <span>Secured by Paystack. Your card details are never stored on our servers.</span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                    Pay ₦{cls.price.toLocaleString()} <Lock size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card p-5">
              <h3 className="font-display font-bold text-amber-900 mb-4">Order Summary</h3>

              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-amber-100">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {cls.emoji}
                </div>
                <div>
                  <div className="font-semibold text-amber-900 text-sm leading-snug">{cls.title}</div>
                  <div className="text-xs text-amber-500 mt-1">with {instructor?.name}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-amber-600">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> Date</span>
                  <span className="font-medium text-amber-900">{UPCOMING_DATES[selectedDate].date}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> Time</span>
                  <span className="font-medium text-amber-900">{UPCOMING_DATES[selectedDate].time}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span className="flex items-center gap-1.5"><Users size={13} /> Duration</span>
                  <span className="font-medium text-amber-900">{cls.duration} min</span>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-100 space-y-1.5 text-sm mb-4">
                <div className="flex justify-between text-amber-600">
                  <span>Session fee</span>
                  <span>₦{cls.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>Platform fee</span>
                  <span>₦0</span>
                </div>
                <div className="flex justify-between font-bold text-amber-900 text-base pt-1 border-t border-amber-100 mt-1">
                  <span>Total</span>
                  <span>₦{cls.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-amber-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-green-500" />
                  Free cancellation (24h before)
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-green-500" />
                  Session recording available
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield size={12} className="text-green-500" />
                  Verified & safe instructor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
