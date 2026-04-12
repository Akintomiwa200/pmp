"use client";

import { Sparkles } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/80 p-5 text-sm text-slate-500">
      <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-200/70 text-slate-600">
        <Sparkles size={18} />
      </div>
      <p className="text-base font-semibold text-ink">{title}</p>
      {description && <p className="text-[13px] text-slate-500">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
