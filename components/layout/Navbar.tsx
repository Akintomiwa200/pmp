"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Briefcase } from "lucide-react";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Learning Paths", href: "/learning-paths" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Community", href: "/community" },

];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      {/* Main Floating Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/80 text-black px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-sm shadow-xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600">
            <Briefcase className="h-4 w-4 text-black" />
          </div>
          <span className="text-lg sm:text-xl font-semibold tracking-tight text-black">
            PMPath
          </span>
        </Link>

        {/* Desktop / Large Laptop */}
        <div className="hidden xl:flex items-center py-2 gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-black/80 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Tablet / Small Laptop */}
        <div className="hidden md:flex xl:hidden items-center gap-6">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-black/80 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Desktop + Tablet */}
        <div className="hidden md:block">
          <Link
            href="/get-started"
            className="rounded-xl bg-cyan-600 px-5 lg:px-6 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile + Small Tablet */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-black"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile / Small Tablet Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-white/90 p-4 backdrop-blur-xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-black/80 transition-colors hover:bg-white/5 hover:text-black"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/get-started"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-cyan-600 px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-gradient-to-r from-green-600 to-cyan-800"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}