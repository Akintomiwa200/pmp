// app/page.tsx
"use client";


import Link from "next/link";
import { 
  ArrowRight, BookOpen, Users, Calendar, Briefcase, Star, 
  CheckCircle2, ChevronRight, Globe, TrendingUp, Award, 
  Zap, Shield, Sparkles, Trophy,FileText,
} from "lucide-react";
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";

// Static data - no database calls
const staticCourses = [
  { _id: "1", level: "beginner", title: "PM Fundamentals" },
  { _id: "2", level: "beginner", title: "Project Lifecycle" },
  { _id: "3", level: "beginner", title: "Agile Basics" },
  { _id: "4", level: "intermediate", title: "Risk Management" },
  { _id: "5", level: "intermediate", title: "Stakeholder Communication" },
  { _id: "6", level: "intermediate", title: "Kanban & Scrum" },
  { _id: "7", level: "intermediate", title: "Resource Planning" },
  { _id: "8", level: "advanced", title: "PMP Exam Prep" },
  { _id: "9", level: "advanced", title: "PMBOK 7 Mastery" },
];

const staticEvents = [
  {
    _id: "1",
    title: "PM Career Transition Workshop",
    description: "Learn how to successfully transition into a project management career from any background.",
    startDate: new Date("2024-12-15"),
    format: "virtual",
    organizer: "PMI Chapter",
    registeredCount: 245,
    isFeatured: true,
    registrationUrl: "#"
  },
  {
    _id: "2",
    title: "Agile & Scrum Masterclass",
    description: "Deep dive into Agile methodologies and Scrum framework with hands-on exercises.",
    startDate: new Date("2024-12-20"),
    format: "virtual",
    organizer: "Agile Experts",
    registeredCount: 189,
    isFeatured: true,
    registrationUrl: "#"
  },
  {
    _id: "3",
    title: "PMP Certification Bootcamp",
    description: "Intensive 3-day bootcamp to prepare you for the PMP certification exam.",
    startDate: new Date("2025-01-10"),
    format: "hybrid",
    organizer: "PM Mastery",
    registeredCount: 156,
    isFeatured: true,
    registrationUrl: "#"
  }
];

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function ProgressRingMini({ pct, color }: { pct: number; color: string }) {
  const r = 16, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <div className="relative w-10 h-10">
      <svg width="40" height="40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#f1f5f9" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-900">{pct}%</span>
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Green grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      
      {/* Subtle color splashes */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-[120px]" />
        <div className="absolute right-20 top-40 h-60 w-60 rounded-full bg-cyan-100/30 blur-[100px]" />
        <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-green-100/30 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-20">
        {/* Center Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            <Sparkles size={14} className="text-green-600" />
            12,400+ aspiring PMs · Start learning today
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Building{" "}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
              Confident
            </span>{" "}
            Project Managers.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
            Structured paths, mentorship, and real-world tools to guide you
            from complete beginner to{" "}
            <span className="font-semibold text-gray-900">
              PMP-certified professional.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/learn/beginner"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-cyan-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-green-200/50 transition hover:scale-[1.02] hover:shadow-xl"
            >
              Start Learning Now <ArrowRight size={18} />
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50/50 hover:text-green-700"
            >
              Explore Courses
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="flex -space-x-2">
              {["A", "P", "M", "J", "L"].map((l, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-green-500 to-cyan-500 text-xs font-bold text-white shadow-md"
                >
                  {l}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-900">4.9</span>
              </div>
              <p className="text-xs text-gray-500">2,400+ learner reviews</p>
            </div>

            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <div>
              <p className="text-sm font-bold text-gray-900">87%</p>
              <p className="text-xs text-gray-500">
                land a PM role in 6 months
              </p>
            </div>
          </div>
        </div>

        
          {/* Product showcase card */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-700 via-green-500 to-cyan-400 p-10 pb-8">
              <div className="relative my-5 text-center">
                 <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    Wall of Love
                </div>
                <h2 className="text-4xl w-96 mx-auto my-2 text-white text-center font-bold">
                  Powering the world's most productive teams
                </h2>
              </div>


            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* App window */}
            <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
              
              {/* Title bar */}
              <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="mx-auto text-xs font-medium text-gray-500">PMPath Learning Hub</span>
              </div>

              <div className="flex h-96">
                {/* Sidebar */}
                <div className="w-48 shrink-0 bg-[#1e1f2e] p-3">
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">Channels</p>
                  {["pm-foundations", "agile-scrum", "stakeholder-maps", "pmp-mock-exams"].map((ch, i) => (
                    <div key={ch} className={`flex items-center gap-1.5 rounded px-2 py-1 text-[13px] ${i === 0 ? "bg-white/10 text-white font-medium" : "text-white/50"}`}>
                      <span className="opacity-60">#</span> {ch}
                    </div>
                  ))}
                  <p className="mb-2 mt-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">Direct Messages</p>
                  {[["Coach Sarah", true], ["Study Group", true], ["Alex M.", false]].map(([name, online]) => (
                    <div key={name} className="flex items-center gap-2 px-2 py-1">
                      <div className={`h-2 w-2 rounded-full ${online ? "bg-green-400" : "bg-gray-500"}`} />
                      <span className="text-[13px] text-white/60">{name}</span>
                    </div>
                  ))}
                </div>

                {/* Chat area */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                    <span className="text-sm font-semibold text-gray-900"># pm-foundations</span>
                    <span className="text-xs text-gray-400">4 learners</span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-3">
                    {[
                      { init: "SS", color: "bg-indigo-600", name: "Coach Sarah", time: "10:02 AM", msg: "Module 2 is live — Stakeholder Mapping with the power-interest matrix. Start when ready!" },
                      { init: "AM", color: "bg-sky-500", name: "Alex M.", time: "10:04 AM", msg: "Done the exercise — mapped 6 stakeholders for my mock project.", file: "stakeholder-matrix-draft.pdf" },
                      { init: "NJ", color: "bg-emerald-500", name: "Nina J.", time: "10:08 AM", msg: "PMP mock exam scores attached. Let me know if we need another session!" },
                    ].map(({ init, color, name, time, msg, file }) => (
                      <div key={name} className="flex gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color} text-[11px] font-bold text-white`}>{init}</div>
                        <div>
                          <div className="mb-1 flex items-baseline gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">{name}</span>
                            <span className="text-[11px] text-gray-400">{time}</span>
                          </div>
                          <p className="text-[13px] leading-relaxed text-gray-700">{msg}</p>
                          {file && (
                            <div className="mt-1.5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
                              <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-white">
                                <FileText size={10} />
                              </div>
                              <span className="text-[12px] text-gray-600">{file}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 px-4 py-2.5">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-400">
                      Message #pm-foundations...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer logos */}
            <div className="relative mt-5 text-center">
              <p className="mb-3 text-[11px] text-white/50">Our learners come from</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["KPMG", "Deloitte", "Shell", "MTN", "Access Bank", "GTB", "UBA"].map((co) => (
                  <div key={co} className="rounded-md border border-white/20 bg-white/15 px-3 py-1 text-[12px] font-semibold text-white/85">
                    {co}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 



function StatsStrip() {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const partners = [Users, BookOpen, TrendingUp, Calendar, Briefcase, Globe]; // Icons as placeholders

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-10">
          Our Trusted Partners
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center space-x-12 overflow-x-auto scrollbar-hide"
        >
          {partners.map((Icon, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm"
            >
              <Icon size={32} className="text-gray-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



function LearningPaths() {
  const paths = [
    { 
      level:"beginner", 
      emoji:"🌱", 
      title:"Beginner Path", 
      sub:"Start from zero", 
      desc:"No experience needed. Build the PM foundation from fundamentals to your first project simulation.",
      color:"#16a34a", 
      bg:"from-green-50 to-emerald-50/80", 
      border:"border-green-100", 
      href:"/learn/beginner", 
      outcomes:["PM Lifecycle & Roles","Agile vs Waterfall","Project Charter","First Simulation"],
      courses: 3
    },
    { 
      level:"intermediate", 
      emoji:"📈", 
      title:"Intermediate", 
      sub:"Level up", 
      desc:"Deepen expertise with risk management, stakeholder strategy, and advanced Agile with real case studies.",
      color:"#2563eb", 
      bg:"from-blue-50 to-cyan-50/80", 
      border:"border-blue-100", 
      href:"/learn/intermediate", 
      outcomes:["Risk Register","Stakeholder Maps","Kanban Builder","Resource Planning"],
      courses: 4
    },
    { 
      level:"advanced", 
      emoji:"🏆", 
      title:"Advanced & PMP", 
      sub:"Get certified", 
      desc:"Comprehensive PMP prep: 200+ practice questions, mock exams, flashcards, and PMBOK 7 mastery.",
      color:"#7c3aed", 
      bg:"from-purple-50 to-pink-50/80", 
      border:"border-purple-100", 
      href:"/learn/advanced", 
      outcomes:["PMBOK 7 Deep Dive","Mock PMP Exams","EVM Calculations","Study Groups"],
      courses: 2
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
            <BookOpen size={14} />
            Learning Paths
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5">
            Find Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
              Starting Point
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Every path is tailored to where you are now — not where you think you should be.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {paths.map((path) => (
            <Link 
              href={path.href} 
              key={path.level} 
              className={`relative bg-gradient-to-br ${path.bg} border ${path.border} rounded-3xl p-7 space-y-5 hover:-translate-y-2 transition-all duration-300 group cursor-pointer block`}
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl group-hover:scale-110 transition-transform">{path.emoji}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-white/60" style={{ color: path.color, borderColor: path.color+"30" }}>
                  {path.sub}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{path.desc}</p>
              </div>
              <ul className="space-y-2">
                {path.outcomes.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-gray-900">
                    <CheckCircle2 size={13} style={{ color: path.color }} className="shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-400">{path.courses} courses available</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Central Explore Button */}
        <div className="text-center">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Explore All Paths <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}



function FeaturedEvents() {
  const featured = staticEvents.filter(e => e.isFeatured).slice(0, 3);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
              <Calendar size={14} />
              Upcoming Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Join the{" "}
              <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors group">
            View all events 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((event) => (
            <div key={event._id} className="border border-gray-200 rounded-2xl p-6 hover:border-green-200 hover:shadow-lg transition-all duration-200 space-y-4 group bg-white">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  event.format === "virtual" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : event.format === "in_person" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-purple-50 text-purple-700 border border-purple-200"
                }`}>
                  <Globe size={10} className="inline mr-1" />
                  {event.format === "in_person" ? "In Person" : event.format.charAt(0).toUpperCase() + event.format.slice(1)}
                </span>
                <span className="text-sm text-gray-500 font-medium">{formatDateShort(event.startDate)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs text-gray-400 mb-1">By {event.organizer}</p>
                  <p className="text-sm font-semibold text-gray-900">{event.registeredCount.toLocaleString()}+ attending</p>
                </div>
                <a 
                  href={event.registrationUrl} 
                  className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-green-600 to-cyan-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Register
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/events" className="inline-flex items-center gap-2 text-green-600 font-medium">
            View all events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}


function FeatureGrid() {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      {/* subtle green/cyan grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-50 text-cyan-700 text-xs font-medium tracking-widest px-6 py-2 rounded-full border border-emerald-100 mb-6">
            FEATURES
          </div>

          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-4">
            The PM learning stack
          </h2>

          <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            Everything you need to transition into project management with confidence.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1 */}
          <div className="bg-cyan-800 rounded-3xl border border-emerald-500/20 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-5 text-white">
                  Focus on learning,
                  <br />
                  not searching
                </h3>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Eliminate confusion with structured paths, curated resources,
                  simulations, and guided progress built specifically for PM career transitions.
                </p>

                <button className="bg-cyan-800 hover:bg-cyan-500 transition-all duration-200 text-white font-medium px-8 py-3.5 rounded-2xl text-sm">
                  Start learning free
                </button>
              </div>

              {/* Right preview */}
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-cyan-500/10 shadow-xl">
                <div className="bg-slate-900 px-5 py-3 flex items-center gap-2 border-b border-cyan-500/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {["PM", "AG", "QA"].map((user) => (
                    <div key={user} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-cyan-600 rounded-2xl flex items-center justify-center text-sm font-bold text-white">
                        {user}
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-cyan-800 rounded-3xl border border-emerald-500/20 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
             

              <div className="space-y-4">
                {[
                  "Project simulations",
                  "Agile board practice",
                  "Stakeholder scenarios",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-slate-900 rounded-2xl px-6 py-5 flex items-center gap-4 border border-cyan-500/10"
                  >
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-lg text-cyan-300">
                      ✓
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

               <div>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-5 text-white">
                  Practice with real
                  <br />
                  PM workflows
                </h3>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Work through simulations, stakeholder exercises, Agile boards,
                  and PMP prep environments designed to mirror real PM teams.
                </p>

                <button className="border border-cyan-500 hover:bg-cyan-500/10 transition-all text-cyan-400 font-medium px-8 py-3.5 rounded-2xl text-sm">
                  Explore simulations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { 
      name: "Priya S.", 
      role: "PM at Stripe", 
      text: "PMPath gave me the structure I needed. The beginner path was perfect for a career switcher like me.", 
      avatar: "P",
      color: "#16a34a"
    },
    { 
      name: "Marcus J.", 
      role: "PMP Certified", 
      text: "The mock exams and flashcards in the advanced path are the best prep I found. Passed first try!", 
      avatar: "M",
      color: "#2563eb"
    },
    { 
      name: "Jordan L.", 
      role: "PM at Google", 
      text: "The mentorship matching connected me with someone in exactly the industry I wanted. Changed everything.", 
      avatar: "J",
      color: "#7c3aed"
    },
  ];
  
  return (
    <section className="py-24 bg-cyan-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            <Trophy size={14} className="text-green-400" />
            Success Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5">
            Real Transitions.{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Join thousands of successful PMs who launched their careers with PMPath.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(q => (
            <div key={q.name} className="p-7 rounded-2xl space-y-4 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="flex text-amber-400 gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <p className="text-white/90 text-base leading-relaxed">"{q.text}"</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${q.color}, #0d9488)` }}>
                  {q.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{q.name}</p>
                  <p className="text-sm text-white/50">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-green-100 via-cyan-100 to-purple-100" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <Zap size={14} />
          Start Your Journey Today
        </div>
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          Your PM Career{" "}
          <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
            Starts Here
          </span>
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Free forever for core content. No credit card required. Start learning in minutes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/learn/beginner"
            className="inline-flex items-center gap-2 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all rounded-2xl px-10 py-4 bg-gradient-to-r from-green-600 to-cyan-600"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link 
            href="/learn"
            className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 border-2 border-gray-200 hover:border-green-300 bg-white hover:bg-gray-50 transition-all rounded-2xl px-8 py-4"
          >
            Browse All Courses
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          ✓ Free forever for core · ✓ Premium from $9/mo · ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <LearningPaths />
        <FeaturedEvents />
        <FeatureGrid />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}