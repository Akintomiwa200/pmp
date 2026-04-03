// app/page.tsx
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Calendar, Briefcase, Star, Flame, CheckCircle2, ChevronRight, Globe, TrendingUp, Award, Zap, Shield, Clock } from "lucide-react";
import { getCourses, getEvents } from "@/lib/db";
import type { Course, PMEvent } from "@/types";
import { formatDateShort } from "@/lib/utils";

function ProgressRingMini({ pct, color }: { pct: number; color: string }) {
  const r = 16, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <div className="relative w-10 h-10">
      <svg width="40" height="40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#f1f5f9" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-ink">{pct}%</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Mesh blobs — editorial style from Image 3 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] left-[18%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, #bbf7d0, transparent 70%)" }} />
        <div className="absolute top-[5%] left-[5%] w-[350px] h-[350px] rounded-full blur-[80px] opacity-15"
          style={{ background: "radial-gradient(circle, #86efac, transparent 70%)" }} />
        <div className="absolute bottom-[5%] right-[8%] w-[450px] h-[450px] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #dbeafe, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {[[8,5],[92,5],[5,85],[90,90],[50,12],[15,50],[85,45]].map(([x,y],i) => (
          <div key={i} className="absolute opacity-15" style={{ left:`${x}%`, top:`${y}%` }}>
            <span className="text-slate-400 text-xl font-light select-none">+</span>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              <Flame size={14} className="text-brand-500" />
              12,400+ aspiring PMs · Join free today
            </div>
            <h1 className="text-6xl sm:text-7xl font-display font-bold leading-[1.04] tracking-tight text-ink">
              Building{" "}
              <em className="not-italic" style={{ background: "linear-gradient(135deg,#16a34a,#0891b2)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Confident
              </em>
              {" "}Project Managers.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-light">
              Structured paths, mentorship, and real-world tools to guide you from complete beginner to{" "}
              <strong className="font-semibold text-ink">PMP-certified professional.</strong>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg,#16a34a,#0d9488)" }}>
                Start Learning Free <ArrowRight size={18} />
              </Link>
              <Link href="/learn/beginner"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-ink border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all">
                Browse Courses
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex -space-x-2.5">
                {[["A","#16a34a"],["P","#2563eb"],["M","#7c3aed"],["J","#0891b2"],["L","#f97316"]].map(([l,c],i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm" style={{ background: c }}>{l}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                  <span className="ml-1.5 text-sm font-bold text-ink">4.9</span>
                </div>
                <p className="text-xs text-slate-400">2,400+ learner reviews</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-sm font-bold text-ink">87%</p>
                <p className="text-xs text-slate-400">land a PM role in 6 months</p>
              </div>
            </div>
          </div>

          {/* Dashboard preview card */}
          <div className="hidden lg:block relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-7 space-y-5 animate-float">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Welcome back,</p>
                  <p className="font-display font-bold text-lg text-ink">Alex Rivera 👋</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                  <Flame size={13} className="text-orange-500" />
                  <span className="text-xs font-bold text-orange-700">7 day streak</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[{p:25,l:"PM Basics",c:"#16a34a"},{p:50,l:"Agile",c:"#2563eb"},{p:75,l:"Risk",c:"#7c3aed"},{p:100,l:"Foundations",c:"#0891b2"}].map((item) => (
                  <div key={item.l} className="flex flex-col items-center gap-1.5">
                    <ProgressRingMini pct={item.p} color={item.c} />
                    <span className="text-[9px] text-slate-400 text-center">{item.l}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{v:"12",l:"Modules"},{v:"1,240",l:"Points"},{v:"#847",l:"Rank"}].map((s) => (
                  <div key={s.l} className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-bold text-ink">{s.v}</p>
                    <p className="text-[10px] text-slate-400">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-2xl border border-brand-100">
                <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink truncate">Next: Stakeholder Mapping</p>
                  <p className="text-[10px] text-slate-400">Module 4 · 25 min</p>
                </div>
                <ChevronRight size={14} className="text-brand-600 shrink-0" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white border border-slate-100 shadow-lg rounded-2xl px-3.5 py-2.5 animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="flex items-center gap-2"><span className="text-xl">🎯</span><div><p className="text-[11px] font-bold text-ink">Quiz Ace!</p><p className="text-[9px] text-slate-400">100% score</p></div></div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-slate-100 shadow-lg rounded-2xl px-3.5 py-2.5 animate-float" style={{ animationDelay: "2.4s" }}>
              <div className="flex items-center gap-2"><span className="text-xl">🏅</span><div><p className="text-[11px] font-bold text-ink">Week Warrior</p><p className="text-[9px] text-slate-400">7-day streak</p></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-t border-slate-100 bg-white/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex items-center gap-10 text-xs text-slate-400 font-medium px-8 whitespace-nowrap">
          {["PM Fundamentals","Agile & Scrum","Risk Management","PMP Certification","Stakeholder Communication","Kanban Boards","PMBOK 7","Sprint Planning","EVM Formulas","Change Management"].map(t => (
            <span key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-400" />{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="bg-ink py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[{v:"12,400+",l:"Active Learners",i:Users},{v:"5",l:"Structured Courses",i:BookOpen},{v:"87%",l:"Career Transition Rate",i:TrendingUp},{v:"200+",l:"PM Events Yearly",i:Calendar}].map((s) => (
            <div key={s.l} className="text-center">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <s.i size={20} className="text-brand-400" />
              </div>
              <p className="font-display text-3xl font-bold text-white mb-0.5">{s.v}</p>
              <p className="text-sm text-white/50">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPaths({ courses }: { courses: Course[] }) {
  const paths = [
    { level:"beginner", emoji:"🌱", title:"Beginner Path", sub:"Start from zero", desc:"No experience needed. Build the PM foundation from fundamentals to your first project simulation.", color:"#16a34a", bg:"from-green-50 to-emerald-50/80", border:"border-green-100", href:"/learn/beginner", outcomes:["PM Lifecycle & Roles","Agile vs Waterfall","Project Charter","First Simulation"] },
    { level:"intermediate", emoji:"📈", title:"Intermediate", sub:"Level up", desc:"Deepen expertise with risk management, stakeholder strategy, and advanced Agile with real case studies.", color:"#2563eb", bg:"from-blue-50 to-cyan-50/80", border:"border-blue-100", href:"/learn/intermediate", outcomes:["Risk Register","Stakeholder Maps","Kanban Builder","Resource Planning"] },
    { level:"advanced", emoji:"🏆", title:"Advanced & PMP", sub:"Get certified", desc:"Comprehensive PMP prep: 200+ practice questions, mock exams, flashcards, and PMBOK 7 mastery.", color:"#7c3aed", bg:"from-purple-50 to-pink-50/80", border:"border-purple-100", href:"/learn/advanced", outcomes:["PMBOK 7 Deep Dive","Mock PMP Exams","EVM Calculations","Study Groups"] },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 mb-4"><BookOpen size={12} />Learning Paths</p>
          <h2 className="text-5xl font-display font-bold text-ink mb-5">Find Your<br /><em className="not-italic" style={{ color:"#16a34a" }}>Starting Point.</em></h2>
          <p className="text-slate-500 max-w-lg mx-auto text-lg font-light">Every path is tailored to where you are now — not where you think you should be.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div key={path.level} className={`relative bg-gradient-to-br ${path.bg} border ${path.border} rounded-3xl p-7 space-y-5 hover:-translate-y-1 transition-all duration-300 group`}>
              <div className="flex items-start justify-between">
                <span className="text-5xl">{path.emoji}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border" style={{ background: path.color+"15", color: path.color, borderColor: path.color+"30" }}>{path.sub}</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">{path.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{path.desc}</p>
              </div>
              <ul className="space-y-2">
                {path.outcomes.map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm text-ink">
                    <CheckCircle2 size={13} style={{ color: path.color }} className="shrink-0" />{o}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-400">{courses.filter(c=>c.level===path.level).length} courses</span>
                <Link href={path.href} className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: path.color }}>
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEvents({ events }: { events: PMEvent[] }) {
  const featured = events.filter(e => e.isFeatured).slice(0, 3);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 mb-3"><Calendar size={12} />Upcoming Events</p>
            <h2 className="text-4xl font-display font-bold text-ink">Don't Miss These</h2>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-ink transition-colors">View all <ChevronRight size={15} /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((event) => (
            <div key={event._id} className="border border-slate-100 rounded-3xl p-5 hover:border-slate-200 hover:shadow-md transition-all duration-200 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${event.format==="virtual"?"bg-blue-50 text-blue-700 border-blue-200":event.format==="in_person"?"bg-green-50 text-green-700 border-green-200":"bg-purple-50 text-purple-700 border-purple-200"}`}>
                  <Globe size={9} className="inline mr-1" />
                  {event.format==="in_person"?"In Person":event.format.charAt(0).toUpperCase()+event.format.slice(1)}
                </span>
                <span className="text-xs text-slate-400">{formatDateShort(event.startDate)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1 line-clamp-2 leading-snug">{event.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{event.description}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] text-slate-400">By {event.organizer}</p>
                  <p className="text-xs font-semibold text-ink">{event.registeredCount.toLocaleString()} registered</p>
                </div>
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold px-4 py-2 rounded-xl text-white hover:-translate-y-0.5 transition-all"
                  style={{ background:"linear-gradient(135deg,#16a34a,#0d9488)" }}>
                  RSVP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { icon:BookOpen, title:"Structured Learning", desc:"3 proficiency levels with bite-sized lessons, videos, and downloadable resources.", c1:"#16a34a", c2:"bg-green-50" },
    { icon:Zap, title:"Adaptive Quizzes", desc:"AI-driven assessments that identify weak areas and personalise your study path.", c1:"#f59e0b", c2:"bg-amber-50" },
    { icon:Users, title:"Mentorship Matching", desc:"AI-paired with experienced PMs based on your goals, industry, and learning style.", c1:"#7c3aed", c2:"bg-purple-50" },
    { icon:Calendar, title:"Events & Networking", desc:"Webinars, conferences, and meetups with 200+ PM events tracked per year.", c1:"#2563eb", c2:"bg-blue-50" },
    { icon:Briefcase, title:"PM Job Board", desc:"Curated entry-level roles, internships, and freelance gigs updated daily.", c1:"#0891b2", c2:"bg-teal-50" },
    { icon:Award, title:"Certification Prep", desc:"200+ PMP practice questions, timed mock exams, and PMBOK 7 flashcards.", c1:"#e11d48", c2:"bg-rose-50" },
    { icon:Shield, title:"Progress Tracking", desc:"Gamified streaks, badges, and exportable certificates for every course.", c1:"#16a34a", c2:"bg-green-50" },
    { icon:Globe, title:"Global Community", desc:"Discussion boards segmented by level. Share wins, get unstuck, grow together.", c1:"#f97316", c2:"bg-orange-50" },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 mb-4"><Star size={12} />Platform Features</p>
          <h2 className="text-5xl font-display font-bold text-ink mb-5">Everything You Need<br /><em className="not-italic text-slate-300">to Succeed.</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl ${f.c2} flex items-center justify-center mb-4`}>
                <f.icon size={18} style={{ color: f.c1 }} />
              </div>
              <h3 className="font-semibold text-ink mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { n:"Priya S.", r:"Now PM at Stripe", t:"PMPath gave me the structure I needed. The beginner path was perfect for a career switcher like me.", a:"P" },
    { n:"Marcus J.", r:"PMP Certified, 1st attempt", t:"The mock exams and flashcards in the advanced path are the best prep I found. Passed first try!", a:"M" },
    { n:"Jordan L.", r:"PM Intern at Google", t:"The mentorship matching connected me with someone in exactly the industry I wanted. Changed everything.", a:"J" },
  ];
  return (
    <section className="py-24 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"radial-gradient(#ffffff 1px, transparent 0)", backgroundSize:"32px 32px" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Success Stories</p>
          <h2 className="text-4xl font-display font-bold text-white">Real Transitions.<br /><em className="not-italic text-brand-400">Real Results.</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(q => (
            <div key={q.n} className="p-6 rounded-3xl space-y-4" style={{ background:"#ffffff0d", border:"1px solid #ffffff15" }}>
              <div className="flex text-brand-400 gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-brand-400" />)}</div>
              <p className="text-white/80 text-sm leading-relaxed">"{q.t}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)" }}>{q.a}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{q.n}</p>
                  <p className="text-xs text-white/40">{q.r}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ background:"radial-gradient(circle,#bbf7d0,#dbeafe)" }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600"><Zap size={12} />Start Today</p>
        <h2 className="text-6xl font-display font-bold text-ink leading-tight">
          Your PM Career<br /><em className="not-italic" style={{ color:"#16a34a" }}>Starts Here.</em>
        </h2>
        <p className="text-xl text-slate-400 font-light leading-relaxed">Free forever for core content. No credit card. No excuses.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth/signup"
            className="inline-flex items-center gap-2 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all rounded-2xl"
            style={{ background:"linear-gradient(135deg,#16a34a,#0d9488)", padding:"14px 40px" }}>
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link href="/learn/beginner"
            className="inline-flex items-center gap-2 text-base font-semibold text-ink border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all rounded-2xl"
            style={{ padding:"14px 32px" }}>
            View Courses
          </Link>
        </div>
        <p className="text-sm text-slate-400">Free forever for core · Premium from $9/mo · Cancel anytime</p>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [courses, events] = await Promise.all([getCourses(), getEvents()]);
  return (
    <>
      <Hero />
      <StatsStrip />
      <LearningPaths courses={courses} />
      <FeaturedEvents events={events} />
      <FeatureGrid />
      <Testimonials />
      <CTA />
    </>
  );
}
