import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ClassesPage from './pages/ClassesPage'
import InstructorsPage from './pages/InstructorsPage'
import HowItWorksPage from './pages/HowItWorksPage'
import PricingPage from './pages/PricingPage'
import DashboardPage from './pages/DashboardPage'
import InstructorDashboard from './pages/InstructorDashboard'
import BookingPage from './pages/BookingPage'
import ClassDetailPage from './pages/ClassDetailPage'
import OnboardingPage from './pages/OnboardingPage'
import AuthModal from './components/ui/AuthModal'

export default function App() {
  const [authModal, setAuthModal] = useState(null) // 'login' | 'signup-parent' | 'signup-instructor'
  const [user, setUser] = useState(null)

  const openAuth = (type) => setAuthModal(type)
  const closeAuth = () => setAuthModal(null)
  const handleLogin = (userData) => {
    setUser(userData)
    closeAuth()
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onOpenAuth={openAuth} onLogout={() => setUser(null)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenAuth={openAuth} />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:id" element={<ClassDetailPage onOpenAuth={openAuth} />} />
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage onOpenAuth={openAuth} />} />
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard user={user} />} />
            <Route path="/book/:classId" element={<BookingPage />} />
            <Route path="/onboarding/:role" element={<OnboardingPage />} />
          </Routes>
        </main>
        <Footer />
        {authModal && (
          <AuthModal
            type={authModal}
            onClose={closeAuth}
            onLogin={handleLogin}
            onSwitchType={openAuth}
          />
        )}
      </div>
    </Router>
  )
}
