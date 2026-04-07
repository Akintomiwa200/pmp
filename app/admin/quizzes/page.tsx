// app/admin/quizzes/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye, Clock, CheckCircle, XCircle, BarChart3 } from "lucide-react";

const QUIZZES = [
  { id:"quiz_001", title:"PM Fundamentals Check", level:"beginner", questions:5, timePerQ:20, published:true, attempts:847, avgScore:76, createdAt:"Jan 10, 2025" },
  { id:"quiz_002", title:"Agile & Scrum Assessment", level:"beginner", questions:5, timePerQ:20, published:true, attempts:623, avgScore:81, createdAt:"Jan 15, 2025" },
  { id:"quiz_003", title:"Risk Management Quiz", level:"intermediate", questions:5, timePerQ:25, published:true, attempts:412, avgScore:69, createdAt:"Feb 1, 2025" },
  { id:"quiz_004", title:"PMP Certification Practice", level:"advanced", questions:5, timePerQ:30, published:true, attempts:289, avgScore:64, createdAt:"Feb 15, 2025" },
];

const LEVEL_COLORS: Record<string, string> = { beginner:"#16a34a", intermediate:"#2563eb", advanced:"#7c3aed" };

export default function AdminQuizzesPage() {
  const [search, setSearch] = useState("");
  const filtered = QUIZZES.filter(q => q.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Quiz Management</h1>
          <p className="text-sm mt-0.5" style={{ color:"#4a6080" }}>Create and manage all quizzes. Changes apply immediately.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/quizzes/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background:"linear-gradient(135deg,#16a34a,#0d9488)" }}>
            <Plus size={15} />New Quiz
          </Link>
          <Link href="/admin/exams/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{ background:"rgba(124,58,237,.25)", color:"#a78bfa", border:"1px solid rgba(124,58,237,.3)" }}>
            <Clock size={15} />Schedule Exam
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label:"Total Quizzes", value:QUIZZES.length, color:"#22c55e" },
          { label:"Total Attempts", value:QUIZZES.reduce((a,q)=>a+q.attempts,0).toLocaleString(), color:"#60a5fa" },
          { label:"Avg Score", value:`${Math.round(QUIZZES.reduce((a,q)=>a+q.avgScore,0)/QUIZZES.length)}%`, color:"#fbbf24" },
          { label:"Published", value:QUIZZES.filter(q=>q.published).length, color:"#a78bfa" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
            <div className="text-xs mb-1" style={{ color:"#4a6080" }}>{s.label}</div>
            <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:"#4a6080" }} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search quizzes..."
          className="w-full max-w-sm pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
          style={{ background:"#0d1424", border:"1px solid #1e2a3d", color:"#e2e8f0" }} />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background:"#0d1424", border:"1px solid #1e2a3d" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom:"1px solid #1e2a3d" }}>
              {["Quiz","Level","Questions","Time/Q","Avg Score","Attempts","Status","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color:"#4a5568" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((quiz, i) => (
              <tr key={quiz.id} style={{ borderBottom: i<filtered.length-1 ? "1px solid #111827" : "none" }}
                className="hover:bg-white/[.03] transition-colors">
                <td className="px-4 py-4">
                  <div className="font-semibold text-sm text-white">{quiz.title}</div>
                  <div className="text-xs mt-0.5" style={{ color:"#4a6080" }}>Created {quiz.createdAt}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full capitalize"
                    style={{ background:LEVEL_COLORS[quiz.level]+"25", color:LEVEL_COLORS[quiz.level] }}>
                    {quiz.level}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-white">{quiz.questions}</td>
                <td className="px-4 py-4 text-sm text-white">{quiz.timePerQ}s</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background:"#1e2a3d" }}>
                      <div className="h-full rounded-full" style={{ width:`${quiz.avgScore}%`, background:quiz.avgScore>=70?"#22c55e":"#f59e0b" }} />
                    </div>
                    <span className="text-sm font-bold" style={{ color:quiz.avgScore>=70?"#22c55e":"#f59e0b" }}>{quiz.avgScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-white">{quiz.attempts.toLocaleString()}</td>
                <td className="px-4 py-4">
                  {quiz.published
                    ? <span className="flex items-center gap-1 text-xs font-bold text-green-400"><CheckCircle size={12} />Live</span>
                    : <span className="flex items-center gap-1 text-xs font-bold" style={{ color:"#4a6080" }}><XCircle size={12} />Draft</span>}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <Link href={`/quiz`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" title="Preview">
                      <Eye size={13} style={{ color:"#60a5fa" }} />
                    </Link>
                    <Link href={`/admin/quizzes/${quiz.id}`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" title="Edit">
                      <Edit2 size={13} style={{ color:"#fbbf24" }} />
                    </Link>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" title="Analytics">
                      <BarChart3 size={13} style={{ color:"#a78bfa" }} />
                    </button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-900/30 transition-colors" title="Delete">
                      <Trash2 size={13} style={{ color:"#ef4444" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
