import React, { useState, useMemo } from 'react'
import { Search, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { ClassCard, SectionHeader, EmptyState } from '../components/ui/Cards'
import { classes, categories } from '../data/data'

const AGE_GROUPS = ['All Ages', '2-4 years', '5-7 years']
const DURATIONS = ['Any Duration', 'Under 20 min', '20-30 min', '30+ min']
const SORT_OPTIONS = ['Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low']

export default function ClassesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAge, setSelectedAge] = useState('All Ages')
  const [selectedDuration, setSelectedDuration] = useState('Any Duration')
  const [sortBy, setSortBy] = useState('Most Popular')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...classes]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory)
    }

    if (selectedAge !== 'All Ages') {
      const [min, max] = selectedAge.split('-').map(s => parseInt(s))
      result = result.filter(c => {
        const [cMin, cMax] = c.ageGroup.split('-').map(Number)
        return !(cMax < min || cMin > max)
      })
    }

    if (selectedDuration !== 'Any Duration') {
      result = result.filter(c => {
        if (selectedDuration === 'Under 20 min') return c.duration < 20
        if (selectedDuration === '20-30 min') return c.duration >= 20 && c.duration <= 30
        if (selectedDuration === '30+ min') return c.duration > 30
        return true
      })
    }

    switch (sortBy) {
      case 'Highest Rated': result.sort((a, b) => b.rating - a.rating); break
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break
      default: result.sort((a, b) => b.enrolled - a.enrolled)
    }

    return result
  }, [search, selectedCategory, selectedAge, selectedDuration, sortBy])

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="gradient-warm pattern-kente border-b border-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cultural Classes"
            title="Discover Your Heritage"
            subtitle="Live, interactive sessions led by verified African elders. Something magical for every child."
          />

          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                placeholder="Search by culture, skill, or instructor..."
                className="input-field pl-11 pr-4 py-4 text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-56 shrink-0">
            <button
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-amber-700 mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Categories */}
              <div>
                <h3 className="font-display font-bold text-amber-900 text-sm mb-3">Category</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === 'all' ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        selectedCategory === cat.id ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <h3 className="font-display font-bold text-amber-900 text-sm mb-3">Age Group</h3>
                <div className="space-y-1">
                  {AGE_GROUPS.map(age => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedAge === age ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h3 className="font-display font-bold text-amber-900 text-sm mb-3">Duration</h3>
                <div className="space-y-1">
                  {DURATIONS.map(dur => (
                    <button
                      key={dur}
                      onClick={() => setSelectedDuration(dur)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedDuration === dur ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-amber-600">
                <span className="font-bold text-amber-900">{filtered.length}</span> class{filtered.length !== 1 ? 'es' : ''} found
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-amber-200 rounded-lg px-3 py-2 text-amber-700 bg-white focus:outline-none focus:border-amber-400"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Active filters */}
            {(selectedCategory !== 'all' || selectedAge !== 'All Ages' || search) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCategory !== 'all' && (
                  <span className="badge bg-amber-100 text-amber-800 text-xs">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button className="ml-1" onClick={() => setSelectedCategory('all')}>×</button>
                  </span>
                )}
                {selectedAge !== 'All Ages' && (
                  <span className="badge bg-amber-100 text-amber-800 text-xs">
                    {selectedAge}
                    <button className="ml-1" onClick={() => setSelectedAge('All Ages')}>×</button>
                  </span>
                )}
                {search && (
                  <span className="badge bg-amber-100 text-amber-800 text-xs">
                    "{search}"
                    <button className="ml-1" onClick={() => setSearch('')}>×</button>
                  </span>
                )}
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedAge('All Ages'); setSearch('') }}
                  className="text-xs text-amber-500 hover:text-amber-700"
                >
                  Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <EmptyState
                emoji="🔍"
                title="No classes found"
                description="Try adjusting your filters or search terms."
                action={
                  <button
                    onClick={() => { setSelectedCategory('all'); setSelectedAge('All Ages'); setSearch('') }}
                    className="btn-primary text-sm"
                  >
                    Clear filters
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(cls => (
                  <ClassCard key={cls.id} cls={cls} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
