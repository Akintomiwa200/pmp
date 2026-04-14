// app/about/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  BookOpen,
  Award,
  Globe,
  Heart,
  ArrowRight,
  CheckCircle2,
  Zap,
  Sparkles,
  BarChart3,
  Calendar,
} from "lucide-react";
import MarketingShell from "@/components/layout/MarketingShell";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-28">
        {/* Hero Section with Image */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-cyan-50/50 text-sm font-medium text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-950/30 dark:text-cyan-300">
              <Heart size={14} className="text-cyan-600" />
              Built for aspiring PMs, by career switchers
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Your Path to{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                Project Management
              </span>{" "}
              Starts Here
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              PMPath was born from real struggle. When our founders tried to break into PM,
              resources were scattered, expensive, or impractical. We built what we wished existed.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start Free <ArrowRight size={18} />
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Take Assessment <Sparkles size={18} />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
              alt="Nigerian project manager working on strategic planning"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
          </motion.div>
        </motion.section>

        {/* Mission + Stats */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Democratising PM Education
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Project management offers six-figure salaries and global opportunities — yet access
              remains uneven. We're changing that with structured learning, real-world tools, and
              a community that's walked your path.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Free core content — always accessible",
                "Structured paths that deliver results",
                "Mentorship from active practitioners",
                "Supportive, collaborative community",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-cyan-600 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            {[
              { value: "12,400+", label: "Active Learners", icon: Users, color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300" },
              { value: "87%", label: "Career Transition Rate", icon: Target, color: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300" },
              { value: "5", label: "Comprehensive Courses", icon: BookOpen, color: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" },
              { value: "200+", label: "Events Tracked Yearly", icon: Globe, color: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-900/50 rounded-xl p-5 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Our Story Card */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 mb-3">
              Our Story
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              From Frustrated Learners to Platform Builders
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                In 2024, two marketing professionals trying to break into PM spent months piecing
                together resources from YouTube, Reddit, and scattered blogs. They paid for expensive
                courses that barely mentioned real PM workflows.
              </p>
              <p>
                What they needed was a single, structured place — one that started from zero,
                escalated intelligently, included PMP prep, and connected them with people who'd
                already made the jump.
              </p>
              <p className="font-semibold text-gray-900 dark:text-white pt-2">
                PMPath is that place. And it's free to start — because financial barriers shouldn't
                determine who gets to build a great PM career.
              </p>
            </div>
          </div>
        </motion.section>

        {/* What We Offer */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 mb-3">
              Platform Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need in One Place
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BookOpen, title: "3 Learning Paths", desc: "Beginner → Intermediate → Advanced/PMP. Each level builds progressively.", color: "bg-cyan-50 text-cyan-700" },
              { icon: Zap, title: "Adaptive Quizzes", desc: "Smart quizzes identify weak areas and personalize your learning journey.", color: "bg-amber-50 text-amber-700" },
              { icon: BarChart3, title: "Visual Roadmap", desc: "Track your progress and know exactly what's next on your PM journey.", color: "bg-emerald-50 text-emerald-700" },
              { icon: Users, title: "AI Mentorship Matching", desc: "Connect with experienced PM mentors based on your goals and industry.", color: "bg-purple-50 text-purple-700" },
              { icon: Calendar, title: "Events Calendar", desc: "200+ PM events yearly — webinars, conferences, and study groups.", color: "bg-blue-50 text-blue-700" },
              { icon: Award, title: "Verifiable Certificates", desc: "Earn shareable certificates for completed courses, ready for LinkedIn.", color: "bg-rose-50 text-rose-700" },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900/30 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 mb-3">
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { emoji: "🌱", title: "Accessibility First", desc: "Core learning is free forever. Financial circumstances shouldn't determine career potential." },
              { emoji: "🎯", title: "Practical Over Theoretical", desc: "Real-world examples, case studies, and hands-on simulations — not just theory." },
              { emoji: "🤝", title: "Community Over Competition", desc: "PM is collaborative. Our community helps each other succeed, period." },
              { emoji: "📈", title: "Continuous Improvement", desc: "We constantly refine based on NPS, surveys, and completion data. What doesn't work gets fixed." },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900/30 rounded-xl p-6 border border-gray-100 dark:border-gray-800 flex gap-4"
              >
                <span className="text-3xl">{value.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{value.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 py-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Ready to Start Your PM Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg mx-auto">
            Join 12,400+ learners building their PM careers with PMPath. Free to start, structured to succeed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Take the Assessment <Sparkles size={18} />
            </Link>
          </div>
        </motion.section>
      </div>
    </MarketingShell>
  );
}