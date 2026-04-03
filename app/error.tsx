// app/error.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("PMPath error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink mb-2">Something Went Wrong</h1>
          <p className="text-ink-muted">
            We hit an unexpected error. This has been logged and our team will look into it.
          </p>
          {error.digest && (
            <p className="text-xs text-ink-subtle mt-2 font-mono">Error ID: {error.digest}</p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCw size={15} /> Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home size={15} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
