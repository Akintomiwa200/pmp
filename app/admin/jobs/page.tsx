// app/admin/jobs/page.tsx
import type { Metadata } from "next";
import { Briefcase, Plus, Search, CheckCircle2, XCircle, Eye, Edit2, Trash2, Wifi } from "lucide-react";

export const metadata: Metadata = { title: "Manage Jobs | Admin" };

const JOBS = [
  { id: "job_001", title: "Junior Project Manager", company: "TechFlow Inc.", location: "SF, CA (Hybrid)", level: "entry", type: "full_time", salary: "$70k–$95k", posted: "Mar 20", expires: "Apr 20", status: "approved", isRemote: false, isFeatured: true },
  { id: "job_002", title: "Project Coordinator (Remote)", company: "GlobalOps Partners", location: "Remote", level: "entry", type: "full_time", salary: "$55k–$75k", posted: "Mar 22", expires: "Apr 22", status: "approved", isRemote: true, isFeatured: true },
  { id: "job_003", title: "Senior PM - Digital Transformation", company: "Meridian Financial", location: "London, UK", level: "senior", type: "full_time", salary: "£85k–£120k", posted: "Mar 18", expires: "Apr 18", status: "approved", isRemote: false, isFeatured: false },
  { id: "job_004", title: "PM Internship - Summer 2025", company: "Innovate Startup Hub", location: "Austin, TX", level: "intern", type: "internship", salary: "$20–$25/hr", posted: "Mar 25", expires: "Apr 30", status: "approved", isRemote: false, isFeatured: true },
  { id: "job_pending_1", title: "Product Manager (Growth)", company: "ScaleUp Co.", location: "NYC (Remote)", level: "mid", type: "full_time", salary: "$120k–$160k", posted: "Mar 28", expires: "Apr 28", status: "pending", isRemote: true, isFeatured: false },
  { id: "job_pending_2", title: "Freelance PM - 3-month contract", company: "BizOps LLC", location: "Remote", level: "mid", type: "freelance", salary: "$75–$100/hr", posted: "Mar 28", expires: "Apr 14", status: "pending", isRemote: true, isFeatured: false },
  { id: "job_expired", title: "Junior PM (Expired)", company: "OldCo", location: "Chicago", level: "entry", type: "full_time", salary: "$65k–$80k", posted: "Feb 1", expires: "Mar 1", status: "expired", isRemote: false, isFeatured: false },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  approved: { bg: "#22c55e18", color: "#22c55e" },
  pending: { bg: "#f59e0b18", color: "#f59e0b" },
  expired: { bg: "#4a506818", color: "#4a5068" },
  rejected: { bg: "#ef444418", color: "#ef4444" },
};
const LEVEL_COLOR: Record<string, string> = { intern: "#22c55e", entry: "#3b82f6", mid: "#f59e0b", senior: "#a855f7", lead: "#ef4444" };

export default function AdminJobsPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Jobs</h1>
          <p className="text-sm" style={{ color: "#4a6080" }}>7 listings · 2 pending approval</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "#22c55e", color: "white" }}>
          <Plus size={14} /> Add Job
        </button>
      </div>

      {/* Pending notice */}
      <div className="p-4 rounded-2xl flex items-center justify-between" style={{ background: "#f59e0b10", border: "1px solid #f59e0b30" }}>
        <p className="text-sm" style={{ color: "#f59e0b" }}>⚠ 2 job listings are waiting for review</p>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ background: "#f59e0b20", color: "#f59e0b" }}>Review Now</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4a6080" }} />
          <input placeholder="Search jobs..." className="pl-9 pr-4 py-2 text-xs rounded-xl w-56 focus:outline-none" style={{ background: "#0d1424", border: "1px solid #1e2a3d", color: "#94a3b8" }} />
        </div>
        {["All","Pending","Entry","Senior","Remote","Featured"].map((f, i) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{
            background: i === 0 ? "#22c55e" : "#0d1424",
            color: i === 0 ? "white" : "#6b8aad",
            border: "1px solid " + (i === 0 ? "#22c55e" : "#1e2a3d")
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1424", border: "1px solid #1e2a3d" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#111827", borderBottom: "1px solid #1e2a3d" }}>
              {["Job","Company","Level","Salary","Posted","Status","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: "#4a5568" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JOBS.map((job) => {
              const ss = STATUS_STYLES[job.status];
              return (
                <tr key={job.id} style={{ borderBottom: "1px solid #111827" }}>
                  <td className="px-4 py-3 max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">{job.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {job.isRemote && <span className="flex items-center gap-0.5 text-[9px]" style={{ color: "#3b82f6" }}><Wifi size={8} />Remote</span>}
                          {job.isFeatured && <span className="text-[9px]" style={{ color: "#f59e0b" }}>⭐</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-white">{job.company}</p>
                    <p className="text-[10px]" style={{ color: "#4a5568" }}>{job.location}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold capitalize" style={{ color: LEVEL_COLOR[job.level] || "#94a3b8" }}>{job.level}</span>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs" style={{ color: "#94a3b8" }}>{job.salary}</span></td>
                  <td className="px-4 py-3"><span className="text-[10px]" style={{ color: "#4a5568" }}>{job.posted}</span></td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: ss.bg, color: ss.color }}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {job.status === "pending" ? (
                        <>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><CheckCircle2 size={11} style={{ color: "#22c55e" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><XCircle size={11} style={{ color: "#ef4444" }} /></button>
                        </>
                      ) : (
                        <>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#3b82f618" }}><Eye size={11} style={{ color: "#60a5fa" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#22c55e18" }}><Edit2 size={11} style={{ color: "#22c55e" }} /></button>
                          <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#ef444418" }}><Trash2 size={11} style={{ color: "#ef4444" }} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
