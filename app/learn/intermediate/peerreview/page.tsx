// app/learn/intermediate/peerreview/page.tsx
"use client";
import { useState } from "react";
import { Users, Upload, CheckCircle2, Star, MessageSquare, Clock, FileText, Award } from "lucide-react";

const SUBMISSIONS = [
  {
    id: "sub_001",
    title: "Risk Register for E-Commerce Platform Migration",
    author: "Priya Sharma",
    avatar: "P",
    submittedAt: "2 days ago",
    status: "awaiting_review",
    reviewCount: 1,
    maxReviews: 3,
    type: "Risk Register",
    excerpt: "Comprehensive risk register for a 6-month platform migration project with 42 identified risks across technical, operational, and business dimensions...",
  },
  {
    id: "sub_002",
    title: "Stakeholder Communication Plan - Healthcare App Launch",
    author: "Alex Rivera",
    avatar: "A",
    submittedAt: "5 days ago",
    status: "reviewed",
    reviewCount: 3,
    maxReviews: 3,
    type: "Communication Plan",
    excerpt: "A structured communication plan for launching a new patient-facing app, identifying 12 key stakeholder groups and their communication cadence...",
    avgRating: 4.2,
  },
  {
    id: "sub_003",
    title: "Sprint Planning for Agile Team of 8",
    author: "Jordan Lee",
    avatar: "J",
    submittedAt: "1 week ago",
    status: "awaiting_review",
    reviewCount: 0,
    maxReviews: 3,
    type: "Sprint Plan",
    excerpt: "Sprint plan for a cross-functional team of 8, including backlog refinement, velocity estimation, and capacity planning for a 2-week sprint...",
  },
];

const RUBRIC = [
  { criterion: "Completeness", desc: "Does the submission cover all required elements?", maxScore: 5 },
  { criterion: "Accuracy", desc: "Are PM concepts correctly applied?", maxScore: 5 },
  { criterion: "Clarity", desc: "Is it well-structured and easy to understand?", maxScore: 5 },
  { criterion: "Practicality", desc: "Would this work in a real project context?", maxScore: 5 },
];

export default function PeerReviewPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "submit" | "review">("browse");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleScore = (criterion: string, score: number) => {
    setScores((prev) => ({ ...prev, [criterion]: score }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxTotal = RUBRIC.reduce((a, r) => a + r.maxScore, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="section-tag mb-3"><Users size={12} />Intermediate Feature</p>
        <h1 className="text-4xl font-display font-bold text-ink mb-2">Peer Review System</h1>
        <p className="text-ink-muted max-w-xl">
          Submit your project plans and documents for structured feedback from peers. Review others' work to deepen your own understanding.
        </p>
      </div>

      {/* How it works banner */}
      <div className="card p-5 mb-6 bg-intermediate-light border-intermediate/20">
        <h2 className="font-semibold text-ink mb-3">How Peer Review Works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "1", icon: Upload, title: "Submit Your Work", desc: "Upload a project plan, risk register, communication plan, or other PM deliverable." },
            { step: "2", icon: Users, title: "Receive Reviews", desc: "3 peers review your work using a structured rubric. Earn +100 pts per review received." },
            { step: "3", icon: Award, title: "Give Reviews Too", desc: "Review others to earn +50 pts each. You must give 2 reviews to unlock receiving reviews." },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-intermediate text-white flex items-center justify-center text-xs font-bold shrink-0">{item.step}</div>
              <div>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-ink-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-3 mb-6 gap-1">
        {(["browse", "submit", "review"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-intermediate-dark border-intermediate" : "text-ink-muted border-transparent hover:text-ink"}`}>
            {tab === "browse" ? "Browse Submissions" : tab === "submit" ? "Submit Work" : "Give Review"}
          </button>
        ))}
      </div>

      {/* Browse tab */}
      {activeTab === "browse" && (
        <div className="space-y-4">
          {SUBMISSIONS.map((sub) => (
            <div key={sub.id} className="card-hover p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-sm font-bold shrink-0">{sub.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink mb-0.5">{sub.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-ink-subtle">
                      <span>{sub.author}</span>
                      <span>·</span>
                      <Clock size={10} />
                      <span>{sub.submittedAt}</span>
                      <span>·</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">{sub.type}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sub.status === "reviewed" ? "bg-brand-50 text-brand-700 border border-brand-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                    {sub.status === "reviewed" ? "Reviewed ✓" : "Needs Review"}
                  </span>
                  {sub.avgRating && (
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-ink">{sub.avgRating}/5</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-ink-muted">{sub.excerpt}</p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-subtle">Reviews</span>
                    <span className="font-medium text-ink">{sub.reviewCount}/{sub.maxReviews}</span>
                  </div>
                  <div className="w-32 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-intermediate rounded-full" style={{ width: `${(sub.reviewCount / sub.maxReviews) * 100}%` }} />
                  </div>
                </div>
                {sub.status !== "reviewed" && (
                  <button onClick={() => { setSelectedSubmission(sub.id); setActiveTab("review"); }}
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#2563eb", color: "white" }}>
                    <MessageSquare size={13} className="inline mr-1" /> Review This
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit tab */}
      {activeTab === "submit" && (
        <div className="card p-6 space-y-5 max-w-2xl">
          <h2 className="font-display font-bold text-xl text-ink">Submit Your Work</h2>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Document Title</label>
            <input className="input" placeholder="e.g. Risk Register for Project X" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Document Type</label>
            <select className="input">
              <option>Risk Register</option>
              <option>Communication Plan</option>
              <option>Project Charter</option>
              <option>Sprint Plan</option>
              <option>Stakeholder Map</option>
              <option>Other PM Document</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
            <textarea className="input h-24 resize-none" placeholder="Briefly describe your project context and what you'd like reviewers to focus on..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Upload Document</label>
            <div className="border-2 border-dashed border-surface-3 rounded-xl p-8 text-center hover:border-intermediate/40 transition-colors cursor-pointer">
              <Upload size={24} className="text-ink-subtle mx-auto mb-2" />
              <p className="text-sm text-ink-muted">Drag & drop or click to upload</p>
              <p className="text-xs text-ink-subtle mt-1">PDF, DOCX, XLSX up to 10MB</p>
            </div>
          </div>
          <p className="text-xs text-ink-muted flex items-center gap-1.5">
            <CheckCircle2 size={11} className="text-brand-500" />
            You need to give 2 reviews before your submission receives reviews.
          </p>
          <button className="btn-primary" style={{ background: "#2563eb" }}>
            <FileText size={15} /> Submit for Review
          </button>
        </div>
      )}

      {/* Review tab */}
      {activeTab === "review" && !submitted && (
        <div className="card p-6 space-y-6 max-w-2xl">
          <div>
            <h2 className="font-display font-bold text-xl text-ink mb-1">Review Submission</h2>
            <p className="text-sm text-ink-muted">Risk Register for E-Commerce Platform Migration</p>
          </div>

          <div className="p-4 bg-surface-1 rounded-xl border border-surface-2">
            <p className="text-xs font-bold text-ink-subtle uppercase tracking-wide mb-2">Submission Preview</p>
            <p className="text-sm text-ink-muted">Comprehensive risk register for a 6-month platform migration project with 42 identified risks across technical, operational, and business dimensions. Includes probability/impact matrix and response strategies...</p>
            <button className="text-xs text-blue-600 font-medium mt-2 hover:underline">View full document →</button>
          </div>

          {/* Scoring rubric */}
          <div>
            <p className="text-sm font-semibold text-ink mb-4">Score this submission</p>
            <div className="space-y-5">
              {RUBRIC.map((item) => (
                <div key={item.criterion}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-ink">{item.criterion}</p>
                      <p className="text-xs text-ink-subtle">{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-ink">{scores[item.criterion] ?? 0}/{item.maxScore}</span>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: item.maxScore }, (_, i) => i + 1).map((score) => (
                      <button
                        key={score}
                        onClick={() => handleScore(item.criterion, score)}
                        className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${scores[item.criterion] >= score ? "text-white shadow-sm" : "bg-surface-1 border border-surface-3 text-ink-muted hover:border-blue-300"}`}
                        style={scores[item.criterion] >= score ? { background: "#2563eb" } : {}}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score summary */}
          {Object.keys(scores).length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
              <span className="text-sm text-intermediate-dark font-medium">Total Score</span>
              <span className="text-xl font-bold text-intermediate-dark">{totalScore}/{maxTotal}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Written Feedback <span className="text-ink-subtle font-normal">(required)</span></label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="input h-28 resize-none text-sm" placeholder="What did they do well? What could be improved? Be specific and constructive..." />
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(scores).length < RUBRIC.length || feedback.length < 20}
            className="btn-primary w-full justify-center disabled:opacity-50"
            style={{ background: "#2563eb" }}
          >
            <CheckCircle2 size={15} /> Submit Review (+50 pts)
          </button>
        </div>
      )}

      {activeTab === "review" && submitted && (
        <div className="text-center py-12 space-y-4">
          <div className="w-20 h-20 bg-brand-50 border-4 border-brand-200 rounded-full flex items-center justify-center mx-auto text-4xl">🎉</div>
          <h2 className="text-2xl font-display font-bold text-ink">Review Submitted!</h2>
          <p className="text-ink-muted">You earned +50 points. The author will receive your feedback shortly.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setActiveTab("browse"); setSubmitted(false); setScores({}); setFeedback(""); }} className="btn-primary" style={{ background: "#2563eb" }}>
              Review Another
            </button>
            <button onClick={() => setActiveTab("submit")} className="btn-secondary">Submit Your Own</button>
          </div>
        </div>
      )}
    </div>
  );
}
