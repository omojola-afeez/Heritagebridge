import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Clock, Users, Wifi, CreditCard, RefreshCw, Star, CheckCircle } from 'lucide-react'
import { SectionHeader } from '../components/ui/Cards'
import { howItWorks } from '../data/data'

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('parents')

  const safetyFeatures = [
    { emoji: '🔍', title: 'Background Verification', desc: 'Every instructor undergoes identity verification, reference checks, and community vouching before approval.' },
    { emoji: '📹', title: 'Monitored Sessions', desc: 'All sessions are recorded for safety. Parents can join or observe any class at any time.' },
    { emoji: '👨‍👩‍👧', title: 'Parent Always Present', desc: 'We encourage parents to sit nearby. Classes are designed for the parent-child experience.' },
    { emoji: '🚨', title: 'Report & Review System', desc: 'Simple one-tap reporting. Our safety team reviews all incidents within 2 hours.' },
    { emoji: '💬', title: 'No Private Messaging', desc: 'Instructors cannot privately message children. All communication goes through the parent.' },
    { emoji: '🔒', title: 'COPPA Compliant', desc: 'We follow international children\'s online privacy standards to protect every child.' },
  ]

  const techRequirements = [
    { icon: Wifi, title: 'Stable internet', desc: '3G or better works fine' },
    { icon: Users, title: 'Any device', desc: 'Phone, tablet, or computer' },
    { icon: Clock, title: '15–45 minutes', desc: 'Based on class type' },
  ]

  const faqs = [
    {
      q: 'What age are the classes designed for?',
      a: 'All classes are designed for children ages 2–7. Classes for ages 2–4 are 15–20 minutes with simpler activities. Ages 5–7 classes run 25–35 minutes with more structured learning.'
    },
    {
      q: 'Can my child join if they don\'t speak the cultural language?',
      a: 'Absolutely! Most classes are taught in English with cultural language woven in. Children learn words, phrases, and proverbs naturally — no prior language knowledge needed.'
    },
    {
      q: 'How do I know the instructors are safe?',
      a: 'Every instructor is verified by our team. We check identity documents, call references, and require community vouching. All sessions are recorded and parents can monitor any class.'
    },
    {
      q: 'What if my child gets bored or doesn\'t engage?',
      a: 'Our classes are specifically designed around children\'s attention spans. We use stories, songs, games, and hands-on activities. If your child doesn\'t enjoy a class, we offer a full refund for the first session.'
    },
    {
      q: 'Can I get a refund if I miss a session?',
      a: 'Yes — if you cancel at least 24 hours before the session, you\'ll receive a full credit. Missing sessions without notice may not be eligible for refunds but we review each case individually.'
    },
    {
      q: 'What do I need to prepare for a class?',
      a: 'Just a device with internet! Some classes may require simple household items (paper, crayons) — these are always listed in the class description in advance.'
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="gradient-warm pattern-kente py-16 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="How It Works"
            title="Simple, Safe, and Magical"
            subtitle="Heritage Bridge Hub was built to be as easy as possible for both families and elder instructors — regardless of tech experience."
            center
          />
        </div>
      </div>

      {/* Tab switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-12">
          <div className="bg-amber-50 rounded-full p-1 flex gap-1">
            {['parents', 'instructors'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-amber-600 text-white shadow-md' : 'text-amber-700 hover:bg-amber-100'
                }`}
              >
                {tab === 'parents' ? '👨‍👩‍👧 For Parents' : '👴🏿 For Elder Instructors'}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-100 -translate-x-0.5 hidden md:block" />

            <div className="space-y-10">
              {howItWorks[activeTab].map((item, i) => (
                <div key={i} className={`flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 hidden md:block" />

                  {/* Step number */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      {item.emoji}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                  </div>

                  <div className={`flex-1 pb-4 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="font-display text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                    <p className="text-amber-700/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            {activeTab === 'parents' ? (
              <Link to="/classes" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                Browse Classes Now <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to="/onboarding/instructor" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                Apply to Teach <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tech Requirements */}
      <div className="bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-amber-900 text-center mb-8">What You Need to Join</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {techRequirements.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-amber-100">
                <item.icon size={28} className="text-amber-600 mx-auto mb-3" />
                <h3 className="font-bold text-amber-900 mb-1">{item.title}</h3>
                <p className="text-sm text-amber-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Child Safety First"
            title="We Take Safety Seriously"
            subtitle="Every feature, every policy is designed with one priority: the safety and wellbeing of children."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {safetyFeatures.map((item, i) => (
              <div key={i} className="p-5 border border-amber-100 rounded-2xl hover:border-amber-300 transition-colors">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-amber-900 mb-1">{item.title}</h3>
                <p className="text-sm text-amber-700/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 gradient-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            center
          />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border border-amber-100 overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-display font-semibold text-amber-900 flex items-center justify-between list-none hover:bg-amber-50 transition-colors">
                  {faq.q}
                  <span className="text-amber-400 group-open:rotate-180 transition-transform text-xl">↓</span>
                </summary>
                <div className="px-6 pb-4 text-amber-700/80 text-sm leading-relaxed border-t border-amber-50">
                  <div className="pt-3">{faq.a}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
