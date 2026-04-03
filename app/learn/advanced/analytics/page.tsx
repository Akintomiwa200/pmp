// app/learn/advanced/analytics/page.tsx
"use client";
import Link from "next/link";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Target, ChevronRight, Zap } from "lucide-react";

// Simulated quiz performance data across knowledge areas
const KNOWLEDGE_AREAS = [
  { area: "Integration Management", score: 82, attempts: 14, trend: "up", questions: 28 },
  { area: "Scope Management", score: 91, attempts: 10, trend: "up", questions: 22 },
  { area: "Schedule Management", score: 74, attempts: 16, trend: "up", questions: 30 },
  { area: "Cost & EVM", score: 58, attempts: 18, trend: "down", questions: 35 },
  { area: "Quality Management", score: 88, attempts: 8, trend: "stable", questions: 18 },
  { area: "Resource Management", score: 65, attempts: 12, trend: "up", questions: 24 },
  { area: "Communications", score: 93, attempts: 6, trend: "up", questions: 14 },
  { area: "Risk Management", score: 72, attempts: 20, trend: "up", questions: 32 },
  { area: "Procurement", score: 48, attempts: 10, trend: "down", questions: 20 },
  { area: "Stakeholder Engagement", score: 79, attempts: 8, trend: "stable", questions: 16 },
  { area: "Agile / Hybrid", score: 85, attempts: 14, trend: "up", questions: 26 },
];

const QUIZ_HISTORY = [
  { date: "Mar 28", quiz: "EVM Practice Set", score: 62, total: 20, passed: false },
  { date: "Mar 26", quiz: "Risk Management Q&A", score: 76, total: 15, passed: true },
  { date: "Mar 24", quiz: "Mock Exam 1", score: 71, total: 50, passed: false },
  { date: "Mar 20", quiz: "Integration Management", score: 85, total: 12, passed: true },
  { date: "Mar 18", quiz: "Procurement Basics", score: 52, total: 10, passed: false },
  { date: "Mar 15", quiz: "Agile Concepts", score: 90, total: 10, passed: true },
];

const avg = Math.round(KNOWLEDGE_AREAS.reduce((a, k) => a + k.score, 0) / KNOWLEDGE_AREAS.length);
const weak = KNOWLEDGE_AREAS.filter((k) => k.score < 70).sort((a, b) => a.score - b.score);
const strong = KNOWLEDGE_AREAS.filter((k) => k.score >= 85).sort((a, b) => b.score - a.score);

function ScoreBar({ score, label, trend }: { score: number; label: string; trend: string }) {
  const color = score >= 80 ? "#16a34a" : score >= 70 ? "#2563eb" : score >= 60 ? "#f59e0b" : "#ef4444";
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const trendColor = trend === "up" ? "text-brand-600" : trend === "down" ? "text-red-500" : "text-ink-subtle";
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-surface-2 last:border-0">
      <div className="w-44 text-xs font-medium text-ink truncate shrink-0">{label}</div>
      <div className="flex-1 h-2.5 bg-surface-2 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
      </div>
      <div className="flex items-center gap-1.5 shrink-0 w-20 text-right">
        <span className="text-sm font-bold text-ink">{score}%</span>
        <span className={`text-xs font-bold ${trendColor}`}>{trendIcon}</span>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="section-tag mb-3"><BarChart3 size={12} />Performance Analytics</p>
          <h1 className="text-4xl font-display font-bold text-ink mb-2">Your Weak Areas Dashboard</h1>
          <p className="text-ink-muted">Personalised insights based on your quiz and exam performance.</p>
        </div>
        <Link href="/learn/advanced/mockexam" className="btn-primary text-sm">
          Take Mock Exam <ChevronRight size={15} />
        </Link>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Score", value: `${avg}%`, sub: "Across all domains", color: "text-brand-600 bg-brand-50", good: avg >= 75 },
          { label: "Weak Areas", value: weak.length, sub: "Below 70% threshold", color: "text-red-600 bg-red-50", good: weak.length === 0 },
          { label: "Total Quiz Attempts", value: KNOWLEDGE_AREAS.reduce((a, k) => a + k.attempts, 0), sub: "Questions answered", color: "text-blue-600 bg-blue-50", good: true },
          { label: "PMP Readiness", value: avg >= 75 ? "Ready!" : `${avg}%/75%`, sub: "Target: 75% pass mark", color: avg >= 75 ? "text-brand-600 bg-brand-50" : "text-amber-600 bg-amber-50", good: avg >= 75 },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-5">
            <div className={`text-2xl font-display font-bold mb-1 ${kpi.color.split(" ")[0]}`}>{kpi.value}</div>
            <p className="text-xs font-semibold text-ink">{kpi.label}</p>
            <p className="text-xs text-ink-subtle mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weak areas priority list */}
        <div className="lg:col-span-1 space-y-4">
          {/* Weak */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-red-500" />
              <h2 className="font-semibold text-ink">Priority Focus</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 ml-auto">{weak.length} areas</span>
            </div>
            {weak.length === 0 ? (
              <p className="text-sm text-ink-muted text-center py-4">🎉 No weak areas! You're on track.</p>
            ) : (
              <div className="space-y-3">
                {weak.map((area) => (
                  <div key={area.area} className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-ink">{area.area}</p>
                      <span className="text-sm font-bold text-red-600">{area.score}%</span>
                    </div>
                    <div className="h-1.5 bg-red-100 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${area.score}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-ink-subtle">{area.attempts} attempts · {area.questions} questions</span>
                      <Link href="/learn/advanced" className="text-[10px] text-red-600 font-semibold hover:underline">Study →</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-brand-500" />
              <h2 className="font-semibold text-ink">Your Strengths</h2>
            </div>
            <div className="space-y-2">
              {strong.map((area) => (
                <div key={area.area} className="flex items-center gap-2 p-2 bg-brand-50 rounded-xl">
                  <CheckCircle2 size={13} className="text-brand-500 shrink-0" />
                  <span className="text-xs text-ink flex-1">{area.area}</span>
                  <span className="text-xs font-bold text-brand-600">{area.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All domains chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink">All Knowledge Domains</h2>
            <div className="flex gap-3 text-xs text-ink-subtle">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500" />≥80%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />70–79%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />60–69%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />&lt;60%</span>
            </div>
          </div>
          <div>
            {KNOWLEDGE_AREAS.map((ka) => (
              <ScoreBar key={ka.area} score={ka.score} label={ka.area} trend={ka.trend} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-surface-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-1 flex items-center justify-center">
                <TrendingUp size={16} className="text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Overall Average</p>
                <p className="text-xs text-ink-subtle">Across all 11 domains</p>
              </div>
            </div>
            <span className={`text-2xl font-display font-bold ${avg >= 75 ? "text-brand-600" : avg >= 65 ? "text-amber-600" : "text-red-500"}`}>
              {avg}%
            </span>
          </div>
        </div>
      </div>

      {/* Quiz history */}
      <div className="card p-6">
        <h2 className="font-semibold text-ink mb-5">Recent Quiz History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-3">
                <th className="text-left pb-3 text-xs font-semibold text-ink-subtle uppercase tracking-wide">Date</th>
                <th className="text-left pb-3 text-xs font-semibold text-ink-subtle uppercase tracking-wide">Quiz</th>
                <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase tracking-wide">Score</th>
                <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase tracking-wide">Questions</th>
                <th className="text-right pb-3 text-xs font-semibold text-ink-subtle uppercase tracking-wide">Result</th>
              </tr>
            </thead>
            <tbody>
              {QUIZ_HISTORY.map((item) => (
                <tr key={item.date + item.quiz} className="border-b border-surface-2 last:border-0">
                  <td className="py-3 text-sm text-ink-subtle">{item.date}</td>
                  <td className="py-3 text-sm font-medium text-ink">{item.quiz}</td>
                  <td className="py-3 text-right">
                    <span className={`text-sm font-bold ${item.score >= 75 ? "text-brand-600" : item.score >= 65 ? "text-amber-600" : "text-red-500"}`}>
                      {item.score}%
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm text-ink-subtle">{item.total}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.passed ? "bg-brand-50 text-brand-700 border border-brand-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                      {item.passed ? "PASSED" : "RETRY"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-6 bg-advanced-light border-advanced/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-advanced" />
          <h2 className="font-semibold text-ink">AI Study Recommendations</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Focus on Procurement Management", desc: "Your lowest score (48%). Review contract types, seller selection, and procurement planning.", urgent: true },
            { title: "Drill EVM Formulas Daily", desc: "Cost & EVM at 58% — use flashcards for CPI, SPI, EAC, ETC until they're automatic.", urgent: true },
            { title: "Resource Management Boost", desc: "65% — review resource levelling vs crashing and the RAM chart.", urgent: false },
            { title: "Schedule Mock Exam 2", desc: "You're at 71% overall. One more mock exam after targeted study should push you past 75%.", urgent: false },
          ].map((rec) => (
            <div key={rec.title} className={`p-4 rounded-xl border ${rec.urgent ? "bg-red-50 border-red-100" : "bg-white border-surface-3"}`}>
              <div className="flex items-start gap-2">
                {rec.urgent && <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />}
                <div>
                  <p className="text-sm font-semibold text-ink">{rec.title}</p>
                  <p className="text-xs text-ink-muted mt-1">{rec.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
