# PMPath — Project Management Transition App

> A full-stack Next.js 15 application guiding users from complete beginners to PMP-certified Project Managers. Structured learning paths, mentorship, community, events, job board, and admin panel.

---

## 🚀 Quick Start (pnpm)

```bash
# 1. Prerequisites: Node.js ≥ 20, pnpm ≥ 10
node --version   # must be v20+
pnpm --version   # install via: npm install -g pnpm@10.13.1

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local — MongoDB URI is optional (JSON fallback works out of the box)

# 4. Run development server (with Turbopack)
pnpm dev

# 5. (Optional) Seed MongoDB from JSON files
pnpm seed
```

Open [http://localhost:3000](http://localhost:3000)

**Test credentials (demo users in .data/users/users.json):**
- User: `alex@example.com` / `password123`
- Admin: `admin@pmpath.app` / `password123`
- Admin panel: `/admin/dashboard`
- Super admin: `/superadmin/dashboard`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.3.1 (App Router, Turbopack) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 3.4 + custom design tokens |
| UI Components | Radix UI primitives + custom components |
| Animation | Framer Motion 12 |
| Database | MongoDB 6 + Mongoose 8 |
| Data Fallback | JSON files (.data/ directory) |
| Auth | NextAuth v4 (credentials + OAuth) |
| State | Zustand 5 + SWR 2 |
| Forms | React Hook Form + Zod |
| Charts | Recharts 2 |
| DnD | @dnd-kit (Kanban board) |
| Rich Text | Tiptap 2 |
| Payments | Stripe 18 |
| Email | Resend 4 |
| Package Manager | pnpm 10.13.1 |
| Testing | Vitest 3 + Testing Library |

---

## 📁 Project Structure

```
pmpath-app/
├── .data/                    # JSON data store (MongoDB fallback)
│   ├── courses/              # courses.json, modules.json, quizzes.json
│   │   ├── courses.json      # 5 courses (beginner → advanced)
│   │   ├── modules.json      # 10 rich content modules
│   │   ├── quizzes.json      # 4 quizzes with 20 questions
│   │   ├── flashcards.json   # 8 flashcard decks
│   │   ├── glossary.json     # 45 PM terms
│   │   └── simulation.json   # Project simulation data
│   ├── events/               # events.json (5 events)
│   ├── jobs/                 # jobs.json (8 listings)
│   ├── mentorship/           # mentors.json, requests.json
│   ├── community/            # posts.json (5 posts with replies)
│   ├── progress/             # progress.json (5 records)
│   └── users/                # users.json, admins.json, notifications.json
│
├── app/                      # Next.js App Router
│   ├── (public routes)
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About page
│   │   ├── pricing/          # Pricing page
│   │   ├── contact/          # Contact page
│   │   ├── terms/            # Terms of Service
│   │   └── privacy/          # Privacy Policy (GDPR)
│   │
│   ├── auth/                 # Authentication
│   │   ├── login/            # Login page
│   │   └── signup/           # 3-step signup + onboarding
│   │
│   ├── dashboard/            # User dashboard (analytics, progress)
│   ├── onboarding/           # 5-question assessment quiz
│   ├── roadmap/              # Interactive visual roadmap
│   ├── progress/             # Progress tracking + badges
│   ├── leaderboard/          # Gamification leaderboard
│   ├── quiz/                 # Standalone adaptive quizzes
│   ├── glossary/             # Searchable PM glossary (45 terms)
│   ├── search/               # Global search
│   ├── notifications/        # Notification centre
│   ├── settings/             # User settings (dark mode, TTS, etc.)
│   ├── profile/              # User profile + edit
│   ├── certificates/         # Earned certificates + PDF export
│   ├── feedback/             # NPS survey
│   │
│   ├── learn/
│   │   ├── beginner/         # Beginner path + simulation + [slug]
│   │   ├── intermediate/     # Intermediate + kanban + peer review + MOOCs + [slug]
│   │   └── advanced/         # Advanced + flashcards + mock exam + study groups + analytics + [slug]
│   │
│   ├── events/               # Events calendar + [id] + submit + [id]/resources
│   ├── community/            # Forum + [id] + network
│   ├── mentorship/           # Mentors + [id] + match + requests
│   ├── jobs/                 # Job board + [id]
│   ├── resources/            # Resource library
│   │
│   ├── admin/                # Admin panel (dark theme)
│   │   ├── dashboard/        # KPIs, charts, overview
│   │   ├── users/            # User management + [id]
│   │   ├── courses/          # Course management + new + [id]
│   │   ├── events/           # Event moderation
│   │   ├── jobs/             # Job moderation
│   │   ├── community/        # Post moderation
│   │   ├── analytics/        # Full analytics
│   │   └── settings/         # Platform settings
│   │
│   ├── superadmin/           # Super Admin panel
│   │   ├── dashboard/        # System health
│   │   ├── admins/           # Admin management
│   │   ├── security/         # Security centre
│   │   ├── logs/             # Full audit logs
│   │   └── system/           # Feature flags, system config
│   │
│   ├── api/                  # API Routes (17 route groups)
│   │   ├── auth/[...nextauth]/  # NextAuth v4 (route.ts → GET/POST)
│   │   ├── users/ + [id]/
│   │   ├── courses/
│   │   ├── events/
│   │   ├── community/
│   │   ├── jobs/
│   │   ├── mentorship/
│   │   ├── progress/
│   │   ├── quiz/[id]/ + submit/
│   │   ├── glossary/
│   │   ├── leaderboard/
│   │   ├── notifications/ + [id]/
│   │   ├── feedback/
│   │   ├── alerts/
│   │   └── streak/
│   │
│   ├── layout.tsx            # Root layout (ThemeProvider, TTSProvider)
│   ├── globals.css           # Design tokens, dark mode, animations
│   ├── loading.tsx           # Global skeleton loader
│   ├── error.tsx             # Error boundary
│   ├── not-found.tsx         # 404 page
│   └── sitemap.ts            # Dynamic sitemap
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive nav with Learn dropdown
│   │   └── Footer.tsx        # 4-column footer
│   ├── providers/
│   │   ├── ThemeProvider.tsx # Dark/light mode + flash prevention
│   │   └── TTSProvider.tsx   # Text-to-speech (PRD accessibility)
│   └── quiz/
│       └── QuizEngine.tsx    # Reusable quiz: timer, flagging, review
│
├── lib/
│   ├── db.ts                 # Unified DB service (MongoDB + JSON fallback)
│   ├── dataStore.ts          # Generic JSON CRUD store
│   ├── mongodb.ts            # MongoDB singleton connection
│   ├── email.ts              # Resend email templates
│   └── utils.ts              # cn(), formatDate, getLevelColor, etc.
│
├── types/
│   └── index.ts              # All TypeScript interfaces
│
├── scripts/
│   └── seed.ts               # Seed MongoDB from JSON files
│
├── tests/
│   ├── setup.ts              # Vitest setup (mocks)
│   └── utils.test.ts         # Unit tests for utilities
│
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # SEO robots
│   └── icons/                # App icons (192px, 512px, etc.)
│
├── middleware.ts             # Route protection, auth guards
├── next.config.ts            # Next.js config (headers, images, redirects)
├── tailwind.config.ts        # Design tokens, colors, animations
├── vitest.config.ts          # Testing config
├── prettier.config.js        # Code formatting
├── package.json              # pnpm + all dependencies (latest versions)
├── pnpm-workspace.yaml       # pnpm workspace config
├── .npmrc                    # pnpm settings (shamefully-hoist)
├── .env.example              # Environment variable template
├── tsconfig.json             # TypeScript config
└── postcss.config.js         # PostCSS config
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `brand` | `#16a34a` (green) | Primary CTA, links |
| `beginner` | `#16a34a` | Beginner level |
| `intermediate` | `#2563eb` | Intermediate level |
| `advanced` | `#7c3aed` | Advanced level |
| `ink` | `#0f172a` | Body text |
| `surface-1` | `#f8fafc` | Page background |

### Typography
- **Display**: Playfair Display (headings)
- **Body**: DM Sans (UI text)
- **Mono**: JetBrains Mono (code)

---

## 🔑 Environment Variables

See `.env.example` for all variables. Key ones:

```bash
# Required for full features
AUTH_SECRET=          # NextAuth secret (generate with: openssl rand -base64 32)

# Optional — app works without these (uses JSON fallback)
MONGODB_URI=          # MongoDB Atlas connection string

# Optional payments, email, etc.
STRIPE_SECRET_KEY=
RESEND_API_KEY=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

---

## 🗄 Data Layer

PMPath uses a **dual data layer**:

1. **JSON Files** (`.data/`) — Works immediately, zero setup. All CRUD via `lib/dataStore.ts`.
2. **MongoDB** — Activates automatically when `MONGODB_URI` is set. Same interface via `lib/db.ts`.

The `lib/db.ts` service tries MongoDB first, silently falls back to JSON if unavailable.

---

## 🧪 Testing

```bash
pnpm test              # Run all tests
pnpm test:ui           # Open Vitest UI
pnpm test:coverage     # Generate coverage report
```

---

## 🚀 Deployment

### Vercel (recommended)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add MONGODB_URI, AUTH_SECRET, STRIPE_*, RESEND_*, etc.
```

### Docker
```bash
# Build
docker build -t pmpath .

# Run
docker run -p 3000:3000 -e MONGODB_URI=... pmpath
```

---

## 📋 PRD Features Completed

### Learning (§3.1)
- ✅ Beginner Path — 12 modules, videos, quizzes, PDF downloads
- ✅ Intermediate Path — risk mgmt, stakeholders, advanced Agile
- ✅ Advanced / PMP Path — PMBOK 7, EVM, mock exams
- ✅ Interactive roadmap with milestone tracking
- ✅ Adaptive quizzes with instant feedback
- ✅ Project simulation (5 phases, scored)
- ✅ Kanban board builder (drag & drop)
- ✅ Peer review system with scoring rubric
- ✅ External MOOC integration (Coursera, edX, PMI)
- ✅ Flashcard generator with spaced repetition
- ✅ Timed mock PMP exams
- ✅ Weak areas performance analytics
- ✅ Study groups (browse, join, leave)

### Events (§3.2)
- ✅ Events calendar with filters
- ✅ Event detail + RSVP
- ✅ User-submitted events with moderation
- ✅ Post-event recordings & summaries
- ✅ Event networking (match with attendees)

### Community & Features (§3.3)
- ✅ Dashboard with progress, streaks, badges
- ✅ Gamification — points, leaderboard, badges, streaks
- ✅ Community forum — threaded replies, upvoting, moderation
- ✅ Mentorship matching (AI wizard)
- ✅ Job board with alerts
- ✅ Resource library (books, podcasts, tools, templates)
- ✅ Cross-level adaptive quizzes
- ✅ Dark mode (ThemeProvider)
- ✅ Text-to-speech (TTSProvider)
- ✅ NPS survey & feedback
- ✅ Searchable PM glossary (45 terms)
- ✅ Pricing page (Free vs Premium)
- ✅ Certificates (earned + PDF export)

### Admin (§3.4)
- ✅ Admin dashboard (dark theme)
- ✅ User management + detail view
- ✅ Course management + create/edit
- ✅ Event & job moderation queue
- ✅ Community moderation
- ✅ Full analytics
- ✅ Super admin (system config, audit logs, security)

---

## 📄 License

MIT © 2025 PMPath
# pmp
