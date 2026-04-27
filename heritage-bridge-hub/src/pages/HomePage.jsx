import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Shield, Star, ChevronRight, Sparkles, Heart, Globe } from 'lucide-react'
import { ClassCard, InstructorCard, SectionHeader } from '../components/ui/Cards'
import { classes, instructors, testimonials, stats, categories } from '../data/data'

export default function HomePage({ onOpenAuth }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const featuredClasses = classes.filter(c => c.featured).slice(0, 4)
  const featuredInstructors = instructors.filter(i => i.featured).slice(0, 3)

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute inset-0 pattern-kente opacity-40" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />

        {/* Floating emojis */}
        <div className="absolute top-32 right-16 text-4xl animate-float hidden lg:block">📖</div>
        <div className="absolute top-48 right-32 text-3xl animate-float-delayed hidden lg:block">🥁</div>
        <div className="absolute bottom-32 right-24 text-4xl animate-float hidden lg:block">🌿</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
              <Sparkles size={13} className="text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 tracking-wide">Africa's First Intergenerational Learning Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-amber-950 leading-[1.1] mb-6 animate-fade-in-up delay-100">
              Where Ancient{' '}
              <span className="text-gradient italic">Wisdom</span>
              <br />Meets Young{' '}
              <span className="relative">
                <span className="text-gradient">Minds</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,4 Q50,0 100,4 Q150,8 200,4" stroke="#f59e0b" strokeWidth="2.5" fill="none"/>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-amber-800/70 leading-relaxed mb-8 max-w-2xl animate-fade-in-up delay-200">
              Connect your child (ages 2–7) with verified African elders for live, interactive cultural classes — storytelling, drumming, dance, proverbs, and more.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
              <button
                onClick={() => onOpenAuth('signup-parent')}
                className="btn-primary text-base px-8 py-4 flex items-center gap-2 pulse-glow"
              >
                Start for Free
                <ArrowRight size={18} />
              </button>
              <Link
                to="/classes"
                className="btn-secondary text-base px-8 py-4 flex items-center gap-2"
              >
                <Play size={16} className="text-amber-600" />
                Browse Classes
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-amber-700 animate-fade-in-up delay-400">
              <div className="flex items-center gap-1.5">
                <Shield size={16} className="text-green-600" />
                <span>All elders background-checked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span>4.9/5 from 500+ parents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart size={16} className="text-red-500" />
                <span>Free first class</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-2xl">{stat.emoji}</span>
                  <div>
                    <div className="font-display font-bold text-xl text-amber-900">{stat.number}</div>
                    <div className="text-xs text-amber-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED CLASSES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              eyebrow="Live Cultural Classes"
              title="Learn From the Source"
              subtitle="Every class is live, interactive, and led by a verified African elder."
            />
            <Link to="/classes" className="hidden md:flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900">
              View all classes <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredClasses.map(cls => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/classes" className="btn-secondary inline-flex items-center gap-2">
              View all classes <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Children Learn"
            title="8 Cultural Learning Paths"
            subtitle="Each category is designed by education experts and cultural practitioners to be engaging for ages 2–7."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/classes?category=${cat.id}`}
                className="card p-4 text-center hover:-translate-y-1.5 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {cat.emoji}
                </div>
                <div className="font-display font-semibold text-amber-900 text-sm">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Simple Process"
            title="Learning in 3 Easy Steps"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />

            {[
              { step: 1, emoji: '🔍', title: 'Browse & Choose', desc: 'Explore live cultural classes by culture, language, or your child\'s age group.' },
              { step: 2, emoji: '📅', title: 'Book & Prepare', desc: 'Pick a time, pay securely, and get everything you need in one confirmation email.' },
              { step: 3, emoji: '🌟', title: 'Learn & Grow', desc: 'Join a live session from home. Watch your child laugh, sing, and fall in love with heritage.' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 bg-amber-50 border-4 border-amber-200 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-sm">
                  {item.emoji}
                </div>
                <div className="absolute top-0 right-1/4 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-amber-700/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => onOpenAuth('signup-parent')} className="btn-primary inline-flex items-center gap-2 px-8 py-4">
              Start for Free — No Credit Card Needed
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTORS ===== */}
      <section className="py-20 bg-amber-950 relative overflow-hidden">
        <div className="absolute inset-0 pattern-kente opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              eyebrow="Our Elder Instructors"
              title={<span className="text-white">Meet the Wisdom Keepers</span>}
              subtitle={<span className="text-amber-300/70">Verified, background-checked elders who carry the living heritage of their cultures.</span>}
            />
            <Link to="/instructors" className="hidden md:flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-200">
              View all elders <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredInstructors.map(instructor => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block bg-amber-900/50 border border-amber-700 rounded-2xl px-6 py-4">
              <p className="text-amber-300 text-sm mb-3">Are you an elder with wisdom to share?</p>
              <Link to="/onboarding/instructor" className="btn-primary text-sm inline-flex items-center gap-2">
                Apply to Become an Instructor
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="Parent Stories"
            title="What Families Are Saying"
            center
          />

          <div className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-amber-100">
            <div className="text-5xl mb-1">{testimonials[activeTestimonial].avatar}</div>
            <div className="flex justify-center mb-4 gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
            <blockquote className="font-accent text-xl md:text-2xl text-amber-900 italic leading-relaxed mb-5">
              "{testimonials[activeTestimonial].text}"
            </blockquote>
            <div>
              <div className="font-display font-bold text-amber-900">{testimonials[activeTestimonial].parent}</div>
              <div className="text-sm text-amber-600">
                Parent of {testimonials[activeTestimonial].child} · {testimonials[activeTestimonial].location}
              </div>
              <div className="text-xs text-amber-400 mt-1">
                Enrolled in: {testimonials[activeTestimonial].classTitle}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'w-6 h-2 bg-amber-600' : 'w-2 h-2 bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Why Heritage Bridge Hub"
                title="More Than a Class — It's a Relationship"
                subtitle="Children don't just learn facts. They form real bonds with elders who remember, who lived it, who are the culture."
              />
              <div className="space-y-4">
                {[
                  { emoji: '🔒', title: 'Verified & Safe', desc: 'Every instructor is background-checked. Sessions are monitored. Parents can observe any class.' },
                  { emoji: '🌍', title: 'Culturally Authentic', desc: 'Real Igbo, Yoruba, Hausa, Ghanaian traditions — not watered-down versions for export.' },
                  { emoji: '💰', title: 'Elders Earn Fairly', desc: 'Instructors keep 75% of every session. We believe wisdom deserves proper compensation.' },
                  { emoji: '🎯', title: 'Built for Ages 2–7', desc: 'Every class is designed by child development experts for the exact attention span of little learners.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-amber-50 transition-colors">
                    <div className="text-2xl shrink-0">{item.emoji}</div>
                    <div>
                      <h4 className="font-display font-bold text-amber-900 mb-0.5">{item.title}</h4>
                      <p className="text-sm text-amber-700/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-amber-50 rounded-3xl p-8 pattern-dots">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: '🐢', title: 'Tortoise Tales', time: 'Today, 10 AM', students: 6 },
                    { emoji: '🥁', title: 'Talking Drums', time: 'Today, 11 AM', students: 8 },
                    { emoji: '💃', title: 'Bata Dance', time: 'Today, 3 PM', students: 10 },
                    { emoji: '🌙', title: 'Moonlight Songs', time: 'Tonight, 7 PM', students: 12 },
                  ].map((session, i) => (
                    <div key={i} className="bg-white rounded-2xl p-3 shadow-sm border border-amber-100">
                      <div className="text-2xl mb-1">{session.emoji}</div>
                      <div className="font-display font-bold text-amber-900 text-sm leading-tight">{session.title}</div>
                      <div className="text-xs text-amber-500 mt-1">{session.time}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex -space-x-1">
                          {['👦🏿','👧🏿','👦🏾'].slice(0, Math.min(3, session.students)).map((e, j) => (
                            <span key={j} className="text-sm">{e}</span>
                          ))}
                        </div>
                        <span className="text-xs text-amber-600">{session.students} joined</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-xs text-amber-600">
                  🔴 Live sessions happening right now
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-amber-600 text-white rounded-2xl px-4 py-2 shadow-lg">
                <div className="text-lg font-bold">Free</div>
                <div className="text-xs">First class</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIASPORA CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-amber-900 to-amber-950 relative overflow-hidden">
        <div className="absolute inset-0 pattern-kente opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe size={48} className="text-amber-400 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            In the Diaspora?
          </h2>
          <p className="text-xl text-amber-300/80 mb-8 max-w-2xl mx-auto">
            Raising African children in London, Houston, Toronto, or Dubai? Heritage Bridge Hub connects them to authentic culture — no matter where they are.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onOpenAuth('signup-parent')} className="bg-white text-amber-900 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors inline-flex items-center gap-2">
              Start Free Today
              <ArrowRight size={18} />
            </button>
            <Link to="/how-it-works" className="border-2 border-amber-500 text-amber-300 font-medium px-8 py-4 rounded-full hover:bg-amber-800 transition-colors">
              Learn More
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-amber-400">
            {['🇳🇬 Nigeria', '🇬🇭 Ghana', '🇬🇧 UK Diaspora', '🇺🇸 USA Diaspora', '🇨🇦 Canada', '🇦🇪 UAE'].map(f => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
