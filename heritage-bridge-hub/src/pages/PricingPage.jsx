import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, X, ArrowRight, Star, Zap } from 'lucide-react'
import { pricingPlans } from '../data/data'
import { SectionHeader } from '../components/ui/Cards'

export default function PricingPage({ onOpenAuth }) {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="gradient-warm pattern-kente py-14 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="Simple Pricing"
            title="Invest in Cultural Roots"
            subtitle="Every plan includes a free first class. No hidden fees, no long-term contracts."
            center
          />

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-amber-200 rounded-full p-1">
            {['monthly', 'yearly'].map(opt => (
              <button
                key={opt}
                onClick={() => setBilling(opt)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === opt ? 'bg-amber-600 text-white shadow' : 'text-amber-700'
                }`}
              >
                {opt === 'monthly' ? 'Monthly' : 'Yearly (Save 20%)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-7 transition-all hover:-translate-y-1 ${plan.color} ${
                plan.popular ? 'shadow-2xl shadow-amber-200' : 'shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Star size={11} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display text-2xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-amber-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-amber-200' : 'text-amber-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className={`flex items-baseline gap-2 ${plan.popular ? 'text-white' : 'text-amber-900'}`}>
                  <span className="font-display text-4xl font-bold">
                    ₦{billing === 'monthly'
                      ? plan.monthlyNGN.toLocaleString()
                      : (plan.monthlyNGN * 12 * 0.8).toLocaleString()}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-amber-300' : 'text-amber-500'}`}>
                    / {billing === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-amber-300' : 'text-amber-400'}`}>
                  ~${billing === 'monthly' ? plan.monthlyUSD : (plan.monthlyUSD * 12 * 0.8).toFixed(0)} USD
                </p>
              </div>

              <div className={`text-sm font-semibold mb-4 flex items-center gap-1.5 ${plan.popular ? 'text-amber-200' : 'text-amber-700'}`}>
                <Zap size={14} />
                {typeof plan.classes === 'number' ? `${plan.classes} classes per month` : 'Unlimited classes'}
              </div>

              <div className="space-y-2.5 mb-7">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-amber-300' : 'text-green-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-amber-100' : 'text-amber-700'}`}>{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map(feature => (
                  <div key={feature} className="flex items-start gap-2.5 opacity-50">
                    <X size={15} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-amber-300' : 'text-amber-400'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-amber-200' : 'text-amber-500'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenAuth('signup-parent')}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-white text-amber-900 hover:bg-amber-50 shadow-lg'
                    : plan.id === 'premium'
                    ? 'bg-amber-700 text-white hover:bg-amber-600'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                Get started <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Pay per class option */}
        <div className="mt-8 text-center p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <h3 className="font-display font-bold text-amber-900 mb-1">Not ready to subscribe?</h3>
          <p className="text-sm text-amber-600 mb-4">Book individual classes starting from ₦1,500 per session. No commitment required.</p>
          <Link to="/classes" className="btn-secondary text-sm inline-flex items-center gap-2">
            Browse Pay-Per-Class Sessions <ArrowRight size={14} />
          </Link>
        </div>

        {/* Free first class banner */}
        <div className="mt-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h3 className="font-display text-xl font-bold mb-1">🎁 First Class is Free</h3>
            <p className="text-amber-300 text-sm">Every new family gets one complimentary class. No credit card needed to start.</p>
          </div>
          <button onClick={() => onOpenAuth('signup-parent')} className="bg-white text-amber-900 font-bold px-6 py-3 rounded-full hover:bg-amber-50 whitespace-nowrap shrink-0">
            Claim Free Class
          </button>
        </div>

        {/* Instructor earnings */}
        <div className="mt-16">
          <SectionHeader
            eyebrow="For Instructors"
            title="How Elder Instructors Earn"
            subtitle="We believe wisdom deserves fair compensation. Here's how our revenue sharing works."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { percent: '75%', label: 'Goes to the elder instructor', emoji: '👴🏿', desc: 'Every session payment — platform keeps only 25% to maintain infrastructure.' },
              { percent: '₦5k–25k', label: 'Avg weekly earnings', emoji: '💰', desc: 'Active instructors teaching 5–20 sessions weekly. Top earners exceed ₦50k/week.' },
              { percent: '₦0', label: 'Setup cost for instructors', emoji: '🆓', desc: 'Free to apply, free to set up, free to teach. We only earn when you earn.' },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="font-display text-3xl font-bold text-amber-600 mb-1">{item.percent}</div>
                <div className="font-semibold text-amber-900 mb-2">{item.label}</div>
                <p className="text-sm text-amber-600/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
