// app/jobs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { 
  Briefcase, MapPin, DollarSign, Clock, ExternalLink, Wifi, Building, Bell, Search, ChevronRight, Star 
} from "lucide-react";
import { getJobs } from "@/lib/db";
import { formatDate, truncate } from "@/lib/utils";
import type { Job } from "@/types";
import JobAlertForm from "@/components/ui/JobAlertForm";

export const metadata: Metadata = { title: "PM Job Board" };

const LEVEL_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  intern:  { label: "Internship", color: "text-teal-700",    bg: "bg-teal-50 dark:bg-teal-950/30",    border: "border-teal-200 dark:border-teal-800" },
  entry:   { label: "Entry Level", color: "text-brand-700",  bg: "bg-brand-50 dark:bg-brand-950/30",  border: "border-brand-200 dark:border-brand-800" },
  mid:     { label: "Mid Level",  color: "text-blue-700",    bg: "bg-blue-50 dark:bg-blue-950/30",    border: "border-blue-200 dark:border-blue-800" },
  senior:  { label: "Senior",     color: "text-purple-700",  bg: "bg-purple-50 dark:bg-purple-950/30",border: "border-purple-200 dark:border-purple-800" },
  lead:    { label: "Lead/Head",  color: "text-red-700",     bg: "bg-red-50 dark:bg-red-950/30",      border: "border-red-200 dark:border-red-800" },
};

const TYPE_LABELS: Record<string, string> = { 
  full_time: "Full-time", part_time: "Part-time", contract: "Contract", internship: "Internship", freelance: "Freelance" 
};

function JobCard({ job }: { job: Job }) {
  const lc = LEVEL_CONFIG[job.level] ?? LEVEL_CONFIG.entry;
  const salaryStr = job.salary.min && job.salary.max
    ? `${job.salary.currency === "GBP" ? "£" : "$"}${Math.round(job.salary.min / 1000)}k–${Math.round(job.salary.max / 1000)}k`
    : job.salary.min === job.salary.max
    ? `$${job.salary.min}/hr`
    : null;

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700 p-5 space-y-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-1 dark:bg-slate-700 border border-surface-3 dark:border-slate-600 flex items-center justify-center text-2xl shrink-0">
          {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain" /> : <Building size={20} className="text-ink-subtle" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-ink dark:text-slate-100 leading-tight">{job.title}</h3>
              <p className="text-sm text-ink-muted mt-0.5">{job.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {job.isFeatured && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                  <Star size={8} />Featured
                </span>
              )}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lc.color} ${lc.bg} ${lc.border}`}>
                {lc.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">{truncate(job.description, 140)}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5">
          {job.isRemote ? <Wifi size={11} className="text-blue-500" /> : <MapPin size={11} />}
          {job.isRemote ? "Remote" : job.location}
        </span>
        {salaryStr && <span className="flex items-center gap-1.5"><DollarSign size={11} />{salaryStr}</span>}
        <span className="flex items-center gap-1.5"><Clock size={11} />{TYPE_LABELS[job.type] ?? job.type}</span>
        <span className="flex items-center gap-1.5"><Clock size={11} />Posted {formatDate(job.postedAt)}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.slice(0, 4).map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 bg-surface-1 dark:bg-slate-700 border border-surface-3 dark:border-slate-600 rounded-full text-ink-muted">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-surface-2 dark:border-slate-700">
        <Link href={`/jobs/${job._id}`} className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1">
          View Details <ChevronRight size={13} />
        </Link>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
          className="btn-primary text-xs py-1.5 px-4 gap-1.5">
          Apply <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

export default async function JobsPage() {
  const jobs = await getJobs();

  const remoteJobs = jobs.filter(j => j.isRemote);
  const featuredJobs = jobs.filter(j => j.isFeatured);
  const entryJobs = jobs.filter(j => j.level === "entry" || j.level === "intern");

  const levels = ["All", "Intern", "Entry", "Mid", "Senior", "Lead"];
  const types = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Freelance"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-tag mb-3"><Briefcase size={12} />Job Board</p>
        <h1 className="text-4xl font-display font-bold text-ink dark:text-slate-100 mb-2">PM Job Board</h1>
        <p className="text-ink-muted max-w-xl">
          Curated entry-level PM roles, internships, and freelance gigs updated daily.
          Set job alerts and never miss the right opportunity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Listings", value: jobs.length, icon: Briefcase, color: "text-brand-600 bg-brand-50 dark:bg-brand-950/30" },
          { label: "Remote Jobs", value: remoteJobs.length, icon: Wifi, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
          { label: "Entry Level", value: entryJobs.length, icon: Star, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
          { label: "Featured", value: featuredJobs.length, icon: Bell, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30" },
        ].map(s => (
          <div key={s.label} className="card dark:bg-slate-800 dark:border-slate-700 p-4">
            <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center mb-2`}>
              <s.icon size={16} />
            </div>
            <p className="text-xl font-display font-bold text-ink dark:text-slate-100">{s.value}</p>
            <p className="text-xs text-ink-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Job Alert Banner */}
      <div className="card dark:bg-slate-800 dark:border-slate-700 p-5 mb-8 bg-gradient-to-r from-brand-50 to-emerald-50 dark:from-brand-950/20 dark:to-emerald-950/20 border-brand-100 dark:border-brand-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
              <Bell size={18} className="text-brand-600" />
            </div>
            <div>
              <h3 className="font-semibold text-ink dark:text-slate-100">Get Job Alerts</h3>
              <p className="text-xs text-ink-muted">Be first to hear about new PM roles matching your level and preferences.</p>
            </div>
          </div>
          <div className="flex-1 sm:max-w-xs w-full">
            <JobAlertForm />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <aside className="lg:col-span-1 space-y-5">
          {/* ...Sidebar filters remain the same... */}
        </aside>

        {/* Job listings */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-muted">{jobs.length} jobs found</p>
            <select className="input max-w-[160px] text-sm py-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
              <option>Most Recent</option>
              <option>Featured First</option>
              <option>Salary: High to Low</option>
              <option>Entry Level First</option>
            </select>
          </div>

          {/* Featured */}
          {featuredJobs.length > 0 && (
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">⭐ Featured Listings</p>
              {featuredJobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          )}

          {/* All jobs */}
          <div>
            {featuredJobs.length > 0 && <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider mb-3 mt-4">All Listings</p>}
            <div className="space-y-4">
              {jobs.filter(j => !j.isFeatured).map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </div>

          {/* Career tip */}
          <div className="card dark:bg-slate-800 dark:border-slate-700 p-5 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
            <h3 className="font-semibold text-ink dark:text-slate-100 mb-2 text-sm">💡 Career Tip</h3>
            <p className="text-sm text-ink-muted mb-3">
              Complete the PM Fundamentals course and project simulation before applying for entry-level roles. Hiring managers notice structured preparation.
            </p>
            <Link href="/learn/beginner" className="text-sm text-brand-600 font-semibold hover:underline flex items-center gap-1">
              Start the course <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}