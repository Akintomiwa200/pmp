// app/learn/intermediate/kanban/page.tsx
"use client";
import { useState } from "react";
import { Plus, X, GripVertical, Tag, Clock, User } from "lucide-react";

type Priority = "low" | "medium" | "high";
type Card = { id: string; title: string; priority: Priority; assignee: string; dueDate: string; tags: string[] };
type Column = { id: string; title: string; color: string; cards: Card[] };

const INITIAL_COLUMNS: Column[] = [
  {
    id: "backlog", title: "Backlog", color: "bg-surface-2",
    cards: [
      { id: "c1", title: "Define project scope document", priority: "high", assignee: "Alex", dueDate: "2025-04-15", tags: ["planning"] },
      { id: "c2", title: "Identify key stakeholders", priority: "medium", assignee: "Priya", dueDate: "2025-04-10", tags: ["stakeholders"] },
      { id: "c3", title: "Create risk register template", priority: "low", assignee: "", dueDate: "", tags: ["risk"] },
    ],
  },
  {
    id: "inprogress", title: "In Progress", color: "bg-blue-50",
    cards: [
      { id: "c4", title: "Draft project charter", priority: "high", assignee: "Marcus", dueDate: "2025-04-05", tags: ["initiation", "urgent"] },
      { id: "c5", title: "Schedule kickoff meeting", priority: "medium", assignee: "Alex", dueDate: "2025-04-03", tags: ["meeting"] },
    ],
  },
  {
    id: "review", title: "In Review", color: "bg-amber-50",
    cards: [
      { id: "c6", title: "Budget estimation spreadsheet", priority: "high", assignee: "Priya", dueDate: "2025-04-01", tags: ["budget"] },
    ],
  },
  {
    id: "done", title: "Done", color: "bg-brand-50",
    cards: [
      { id: "c7", title: "Set up project tracking tool", priority: "low", assignee: "Marcus", dueDate: "2025-03-28", tags: ["tools"] },
    ],
  },
];

const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-surface-2 text-ink-muted",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  high: "bg-red-50 text-red-700 border border-red-200",
};

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [addingCard, setAddingCard] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [dragging, setDragging] = useState<{ cardId: string; fromCol: string } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const addCard = (colId: string) => {
    if (!newCardTitle.trim()) return;
    const newCard: Card = {
      id: `c${Date.now()}`,
      title: newCardTitle.trim(),
      priority: "medium",
      assignee: "",
      dueDate: "",
      tags: [],
    };
    setColumns(cols =>
      cols.map(col => col.id === colId ? { ...col, cards: [...col.cards, newCard] } : col)
    );
    setNewCardTitle("");
    setAddingCard(null);
  };

  const deleteCard = (colId: string, cardId: string) => {
    setColumns(cols =>
      cols.map(col => col.id === colId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col)
    );
  };

  const handleDragStart = (cardId: string, fromCol: string) => setDragging({ cardId, fromCol });

  const handleDrop = (toColId: string) => {
    if (!dragging) return;
    const { cardId, fromCol } = dragging;
    if (fromCol === toColId) { setDragging(null); setDragOver(null); return; }

    let movedCard: Card | undefined;
    const next = columns.map(col => {
      if (col.id === fromCol) {
        movedCard = col.cards.find(c => c.id === cardId);
        return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
      }
      return col;
    }).map(col => {
      if (col.id === toColId && movedCard) return { ...col, cards: [...col.cards, movedCard] };
      return col;
    });
    setColumns(next);
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="section-tag mb-2">🎯 Intermediate Tool</p>
          <h1 className="text-3xl font-display font-bold text-ink mb-1">Kanban Board Builder</h1>
          <p className="text-ink-muted text-sm">Drag and drop cards to manage your project workflow. Practice Agile task management.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">Share Board</button>
          <button className="btn-primary text-sm">Save Template</button>
        </div>
      </div>

      {/* WIP limits legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs text-ink-subtle">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />High Priority</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Medium Priority</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-surface-3" />Low Priority</span>
        <span className="ml-auto">💡 Tip: Drag cards between columns to update status</span>
      </div>

      {/* Board */}
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide min-h-[500px]">
        {columns.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => { e.preventDefault(); setDragOver(col.id); }}
            onDrop={() => handleDrop(col.id)}
            className={`flex-shrink-0 w-72 rounded-2xl p-3 transition-all ${col.color} ${dragOver === col.id ? "ring-2 ring-brand-400" : ""}`}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-ink">{col.title}</h3>
                <span className="w-5 h-5 rounded-full bg-white border border-surface-3 flex items-center justify-center text-[10px] font-bold text-ink-muted">
                  {col.cards.length}
                </span>
              </div>
              <button onClick={() => setAddingCard(col.id)} className="p-1 hover:bg-white/60 rounded-lg transition-colors">
                <Plus size={14} className="text-ink-muted" />
              </button>
            </div>

            {/* Cards */}
            <div className="space-y-2.5 min-h-[200px]">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, col.id)}
                  className="bg-white rounded-xl p-3.5 shadow-card cursor-grab active:cursor-grabbing hover:shadow-card-hover transition-all group"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <GripVertical size={14} className="text-ink-subtle shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-sm font-medium text-ink leading-snug flex-1">{card.title}</p>
                    <button onClick={() => deleteCard(col.id, card.id)} className="p-0.5 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all">
                      <X size={12} className="text-ink-subtle hover:text-red-500" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {card.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-surface-1 border border-surface-3 rounded-full text-ink-muted">
                        <Tag size={8} /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${PRIORITY_COLORS[card.priority]}`}>
                      {card.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      {card.dueDate && (
                        <span className="flex items-center gap-1 text-[10px] text-ink-subtle">
                          <Clock size={9} /> {new Date(card.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      )}
                      {card.assignee && (
                        <div className="w-5 h-5 rounded-full bg-brand-200 flex items-center justify-center text-[9px] font-bold text-brand-800">
                          {card.assignee.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add card form */}
              {addingCard === col.id ? (
                <div className="bg-white rounded-xl p-3 shadow-card space-y-2">
                  <textarea
                    autoFocus
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addCard(col.id); } if (e.key === "Escape") { setAddingCard(null); setNewCardTitle(""); }}}
                    className="input text-sm h-16 resize-none"
                    placeholder="Card title... (Enter to add)"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => addCard(col.id)} className="btn-primary text-xs py-1.5 px-3">Add</button>
                    <button onClick={() => { setAddingCard(null); setNewCardTitle(""); }} className="btn-ghost text-xs py-1.5 px-2">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingCard(col.id)}
                  className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs text-ink-subtle hover:bg-white/60 hover:text-ink transition-colors"
                >
                  <Plus size={13} /> Add a card
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add column */}
        <div className="flex-shrink-0 w-72">
          <button className="w-full h-12 rounded-2xl border-2 border-dashed border-surface-3 flex items-center justify-center gap-2 text-sm text-ink-muted hover:border-brand-300 hover:text-brand-600 transition-colors">
            <Plus size={16} /> Add Column
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-6 p-4 bg-white border border-surface-3 rounded-2xl flex flex-wrap gap-6 text-sm text-ink-muted">
        <span>Total cards: <strong className="text-ink">{columns.reduce((a, c) => a + c.cards.length, 0)}</strong></span>
        <span>In progress: <strong className="text-blue-600">{columns.find(c => c.id === "inprogress")?.cards.length ?? 0}</strong></span>
        <span>Completed: <strong className="text-brand-600">{columns.find(c => c.id === "done")?.cards.length ?? 0}</strong></span>
        <span className="ml-auto text-xs text-ink-subtle">💡 Save this board as a template for future projects</span>
      </div>
    </div>
  );
}
