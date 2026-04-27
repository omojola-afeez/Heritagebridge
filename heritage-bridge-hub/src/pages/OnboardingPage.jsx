import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Shield, DollarSign, Clock, Users } from 'lucide-react'

const INSTRUCTOR_STEPS = [
  {
    title: 'Tell us about yourself',
    fields: [
      { label: 'Your full name', type: 'text', placeholder: 'e.g. Adaeze Okonkwo', key: 'name' },
      { label: 'Age', type: 'number', placeholder: 'e.g. 68', key: 'age' },
      { label: 'Location (City, Country)', type: 'text', placeholder: 'e.g. Lagos, Nigeria', key: 'location' },
      { label: 'Phone number', type: 'tel', placeholder: '+234 800 000 0000', key: 'phone' },
    ]
  },
  {
    title: 'Your cultural expertise',
    fields: [
      { label: 'Languages you speak', type: 'text', placeholder: 'e.g. Igbo, Yoruba, English', key: 'languages' },
      { label: 'Your cultural background / ethnicity', type: 'text', placeholder: 'e.g. Igbo from Enugu State', key: 'culture' },
      { label: 'What will you teach? (skills, knowledge)', type: 'textarea', placeholder: 'e.g. Igbo folktales, proverbs, traditional games, moral stories...', key: 'skills' },
    ]
  },
  {
    title: 'Your background',
    fields: [
      { label: 'Brief biography', type: 'textarea', placeholder: 'Tell us about your life, work, and what makes you special...', key: 'bio' },
      { label: 'Former occupation / profession', type: 'text', placeholder: 'e.g. Retired schoolteacher', key: 'occupation' },
      { label: 'Reference contact (name + phone)', type: 'text', placeholder: 'Someone who can vouch for you', key: 'reference' },
    ]
  },
  {
    title: 'Setup & preferences',
    fields: [
      { label: 'Preferred teaching days', type: 'text', placeholder: 'e.g. Mon, Wed, Fri', key: 'days' },
      { label: 'Preferred teaching hours', type: 'text', placeholder: 'e.g. 9 AM – 12 PM', key: 'hours' },
      { label: 'Bank account for payments', type: 'text', placeholder: 'Bank name + account number', key: 'bank' },
    ]
  }
]

const PARENT_STEPS = [
  {
    title: 'Your family details',
    fields: [
      { label: 'Your full name', type: 'text', placeholder: 'e.g. Chidinma Okafor', key: 'name' },
      { label: 'Email address', type: 'email', placeholder: 'you@email.com', key: 'email' },
      { label: 'Phone number', type: 'tel', placeholder: '+234 800 000 0000', key: 'phone' },
      { label: 'City / Country', type: 'text', placeholder: 'e.g. Lagos, Nigeria', key: 'location' },
    ]
  },
  {
    title: "About your child",
    fields: [
      { label: "Child's first name", type: 'text', placeholder: "e.g. Zara", key: 'childName' },
      { label: "Child's age", type: 'number', placeholder: 'e.g. 5', key: 'childAge' },
      { label: "Cultural heritage / ethnicity", type: 'text', placeholder: 'e.g. Igbo-Yoruba', key: 'heritage' },
      { label: "Languages spoken at home", type: 'text', placeholder: 'e.g. English, Igbo', key: 'languages' },
    ]
  },
  {
    title: "Learning preferences",
    fields: [
      { label: "What would you like your child to learn?", type: 'textarea', placeholder: 'e.g. Igbo stories, drumming, proverbs...', key: 'goals' },
      { label: "Best times for classes", type: 'text', placeholder: 'e.g. Weekday mornings, Saturday afternoons', key: 'times' },
    ]
  }
]

export default function OnboardingPage() {
  const { role } = useParams()
  const isInstructor = role === 'instructor'
  const steps = isInstructor ? INSTRUCTOR_STEPS : PARENT_STEPS

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 gradient-warm">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">{isInstructor ? '🎉' : '🌟'}</div>
          <h2 className="font-display text-3xl font-bold text-amber-900 mb-3">
            {isInstructor ? 'Application Submitted!' : 'Welcome to Heritage Bridge Hub!'}
          </h2>
          <p className="text-amber-700 leading-relaxed mb-6">
            {isInstructor
              ? `Thank you, ${formData.name || 'friend'}! Our team will review your application and contact you within 48 hours. We're excited to have you share your wisdom with our young learners.`
              : `Welcome, ${formData.name || 'family'}! Your account is being set up. Browse our classes and book your first free session.`
            }
          </p>
          {isInstructor ? (
            <div className="space-y-3 text-sm text-amber-600 bg-amber-50 rounded-2xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Application received</div>
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Review within 48 hours</div>
              <div className="flex items-center gap-2 opacity-50"><CheckCircle size={14} className="text-amber-400" /> Background verification</div>
              <div className="flex items-center gap-2 opacity-50"><CheckCircle size={14} className="text-amber-400" /> Onboarding call & training</div>
              <div className="flex items-center gap-2 opacity-50"><CheckCircle size={14} className="text-amber-400" /> Go live & start earning</div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-amber-600 bg-amber-50 rounded-2xl p-4 mb-6 text-left">
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Family profile created</div>
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> 1 free class credit added</div>
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Safety policies accepted</div>
            </div>
          )}
          <Link to={isInstructor ? '/' : '/classes'} className="btn-primary w-full block text-center">
            {isInstructor ? 'Go to Homepage' : 'Browse Classes'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-warm pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">{isInstructor ? '👴🏿' : '👨‍👩‍👧'}</div>
          <h1 className="font-display text-3xl font-bold text-amber-900">
            {isInstructor ? 'Become an Elder Instructor' : 'Join Heritage Bridge Hub'}
          </h1>
          <p className="text-amber-600 mt-2">
            {isInstructor
              ? 'Share your wisdom. Earn income. Leave a legacy for the next generation.'
              : 'Give your child the gift of cultural roots.'}
          </p>
        </div>

        {/* Benefits strip */}
        {step === 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {isInstructor ? [
              { icon: DollarSign, text: 'Earn ₦5k–25k/week', color: 'text-green-600 bg-green-50' },
              { icon: Clock, text: 'Your own schedule', color: 'text-blue-600 bg-blue-50' },
              { icon: Users, text: 'Reach 1,000+ children', color: 'text-amber-600 bg-amber-50' },
            ] : [
              { icon: Sparkles, text: 'First class free', color: 'text-amber-600 bg-amber-50' },
              { icon: Shield, text: 'Verified elders', color: 'text-green-600 bg-green-50' },
              { icon: Users, text: '85+ instructors', color: 'text-blue-600 bg-blue-50' },
            ].map((b, i) => (
              <div key={i} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-center ${b.color.split(' ')[1]}`}>
                <b.icon size={18} className={b.color.split(' ')[0]} />
                <span className="text-xs font-medium text-amber-800">{b.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-1.5 text-xs ${i === step ? 'text-amber-800 font-medium' : i < step ? 'text-green-600' : 'text-amber-300'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-amber-600 text-white' :
                  'bg-amber-100 text-amber-400'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s.title.split(' ').slice(0, 2).join(' ')}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-green-300' : 'bg-amber-100'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-sm border border-amber-100 p-7">
          <h2 className="font-display text-xl font-bold text-amber-900 mb-5">
            Step {step + 1}: {steps[step].title}
          </h2>

          <div className="space-y-4">
            {steps[step].fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-amber-700 mb-1.5">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    className="input-field resize-none"
                    value={formData[field.key] || ''}
                    onChange={e => handleChange(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="input-field"
                    value={formData[field.key] || ''}
                    onChange={e => handleChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Safety note for instructors */}
          {isInstructor && step === 2 && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex gap-2">
              <Shield size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <span>Your reference contact may be called as part of our community verification process. We never share personal information.</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-7">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <Link to="/" className="btn-ghost text-sm">Cancel</Link>
            )}

            <button onClick={handleNext} className="btn-primary flex items-center gap-2">
              {step === steps.length - 1 ? (isInstructor ? 'Submit Application' : 'Create Account') : 'Continue'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Safety note */}
        <p className="text-center text-xs text-amber-400 mt-4">
          By continuing, you agree to our{' '}
          <a href="#" className="hover:text-amber-600">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="hover:text-amber-600">Child Safety Policy</a>
        </p>
      </div>
    </div>
  )
}
