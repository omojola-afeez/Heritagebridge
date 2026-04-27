# 🌿 Heritage Bridge Hub

> **Africa's First Intergenerational Learning Platform** — Connecting verified African elders with children ages 2–7 through live, culturally rich sessions.

---

## 🚀 Live Demo

Deploy to Vercel in one click — see instructions below.

---

## 📋 Project Overview

Heritage Bridge Hub is a full-featured web application that:

- **Connects elderly African instructors** with young children (ages 2–7) for live cultural learning
- **Preserves cultural heritage** through storytelling, music, dance, games, crafts, and language
- **Creates economic opportunity** for retired elders (75% revenue share)
- **Serves diaspora families** globally who want their children connected to African roots

---

## 🗂 Project Structure

```
heritage-bridge-hub/
├── dist/
│   └── index.html          ← ✅ MAIN DEPLOYABLE FILE (zero-dependency, runs anywhere)
│
├── src/                    ← React source (for future development)
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── data/
│   │   └── data.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/
│   │       ├── Cards.jsx
│   │       └── AuthModal.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── ClassesPage.jsx
│       ├── ClassDetailPage.jsx
│       ├── InstructorsPage.jsx
│       ├── HowItWorksPage.jsx
│       ├── PricingPage.jsx
│       ├── DashboardPage.jsx
│       ├── InstructorDashboard.jsx
│       ├── BookingPage.jsx
│       └── OnboardingPage.jsx
│
├── public/
│   └── favicon.svg
│
├── vercel.json             ← Vercel deployment config
├── package.json            ← React project config
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## ⚡ Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Heritage Bridge Hub"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/heritage-bridge-hub.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) → Sign in → "New Project"
   - Import your GitHub repository
   - Vercel auto-detects the `vercel.json` config
   - Click **Deploy** — live in ~30 seconds ✅

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
cd heritage-bridge-hub
vercel --prod
```

### Option 3: Direct Static Deploy (Netlify / GitHub Pages)

The `dist/index.html` is a **self-contained single file** — no build step needed.

**Netlify Drop:** Just drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🛠 Local Development

### Option A: Open directly (instant, no server needed)
```bash
open dist/index.html
# or on Windows:
start dist/index.html
```

### Option B: Local server (recommended for development)
```bash
# Using Python
cd dist && python3 -m http.server 8080
# Open: http://localhost:8080

# Using Node.js (npx)
npx serve dist
# Open: http://localhost:3000
```

### Option C: Full React Development (requires Node.js 18+)
```bash
npm install
npm run dev
# Open: http://localhost:5173
```

---

## 🏗 Build React App (for production)

```bash
npm install
npm run build
# Output → dist/
```

---

## 📄 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Hero, featured classes, how it works, testimonials |
| 📚 Classes | `/classes` | Browse & filter all cultural classes |
| 🔍 Class Detail | `/classes/:id` | Full class info + booking sidebar |
| 👴 Instructors | `/instructors` | Meet all elder instructors |
| ❓ How It Works | `/how-it-works` | Steps for parents & instructors + FAQ |
| 💰 Pricing | `/pricing` | 3 subscription tiers + pay-per-class |
| 📊 Dashboard | `/dashboard` | Parent dashboard with bookings & achievements |
| 🎓 Instructor Hub | `/instructor-dashboard` | Earnings, sessions, reviews |
| 🛒 Booking | `/book/:classId` | 4-step booking flow with payment |
| 📝 Onboarding | `/onboarding/:role` | Multi-step signup for parents & instructors |

---

## 💡 Key Features

### For Parents
- ✅ Browse 30+ live cultural classes
- ✅ Filter by culture, age group, duration
- ✅ View instructor profiles with ratings & reviews
- ✅ 4-step booking flow (session → child details → payment → confirm)
- ✅ Child progress dashboard with cultural badges/achievements
- ✅ 3 subscription tiers (Explorer ₦5k, Heritage ₦12k, Legacy ₦25k/month)
- ✅ Free first class for new families

### For Elder Instructors
- ✅ Simple application flow
- ✅ Instructor dashboard with earnings, sessions, reviews
- ✅ 75% revenue share (weekly Friday payouts)
- ✅ Earn ₦5,000–₦25,000/week
- ✅ Set own schedule and class sizes

### Platform
- ✅ Verified & background-checked instructors
- ✅ Child safety policies (no private messaging, monitored sessions)
- ✅ Gamification (cultural achievement badges)
- ✅ Diaspora-friendly (serves Nigeria, Ghana, UK, USA, Canada, UAE)
- ✅ Paystack payment integration (mock)
- ✅ Responsive design (mobile + desktop)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Gold | `#d97706` (amber-600) |
| Dark Earth | `#78350f` (amber-900) |
| Cream BG | `#fdf8f0` |
| Forest Green | `#287455` |
| Terracotta | `#cd3f1f` |
| Font Display | Playfair Display (serif) |
| Font Body | DM Sans (sans-serif) |
| Font Accent | Cormorant Garamond (italic) |

---

## 🛣 Roadmap

### Phase 1 — MVP (Current)
- [x] Full landing page & marketing site
- [x] Class browse & discovery
- [x] Instructor profiles
- [x] Booking flow
- [x] Parent & instructor dashboards
- [x] Pricing & subscription tiers
- [x] Onboarding flows

### Phase 2 — Backend Integration
- [ ] Supabase or Firebase authentication
- [ ] Real database for classes, bookings, users
- [ ] Paystack live payment processing
- [ ] Email notifications (Resend or SendGrid)
- [ ] Real-time video (Daily.co or Agora SDK)

### Phase 3 — Growth Features
- [ ] Mobile app (React Native)
- [ ] WhatsApp community integration
- [ ] Instructor training portal
- [ ] Cultural curriculum CMS
- [ ] NGO & school partnerships portal
- [ ] Multilingual support (Yoruba, Igbo, Hausa, Twi)

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display, DM Sans) |
| Deployment | Vercel (static) |
| Payments | Paystack (mock — integrate API key) |
| Video | Daily.co / Agora (to integrate) |
| Database | Supabase (recommended) |
| Auth | Supabase Auth or Firebase Auth |

---

## 🌍 Cultural Catalog

Current cultures represented:
- 🇳🇬 **Igbo** (Storytelling, Proverbs, Traditional Games)
- 🇳🇬 **Yoruba** (Dance, Music, Crafts)  
- 🇳🇬 **Hausa** (Language, Values, Textiles)
- 🇬🇭 **Ghanaian/Akan** (Drumming, Ananse Stories, Songs)
- 🌍 **Fulani, Efik, Tiv** (coming soon)

---

## 🤝 Contributing

Pull requests welcome! Please read our contribution guidelines and child safety policies before contributing.

---

## 📜 License

MIT License — free to use and build upon.

---

## 🙏 Mission

> *"A child who knows where they come from will never be lost, no matter where they go."*

Heritage Bridge Hub was built to ensure that Africa's youngest generation — whether in Lagos, London, Houston, or Dubai — grows up knowing who they are.

---

**Built with ❤️ for African families everywhere.**
