// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider, ThemeScript } from "@/components/providers/ThemeProvider";
import { TTSProvider, TTSBar } from "@/components/providers/TTSProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "PMPath — Project Management Transition App",
    template: "%s | PMPath",
  },
  description:
    "Your guided journey from aspiring professional to certified Project Manager. Structured learning paths, mentorship, events, and community.",
  keywords: [
    "project management",
    "PMP certification",
    "Agile",
    "Scrum",
    "PM career",
    "PMBOK",
    "CAPM",
    "project manager",
    "PM training",
    "project management courses",
  ],
  authors: [{ name: "PMPath" }],
  creator: "PMPath",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://pmpath.app"),
  openGraph: {
    title: "PMPath — Your PM Career Starts Here",
    description:
      "Structured learning paths, community, events, and mentorship for aspiring Project Managers. Free to start.",
    type: "website",
    locale: "en_US",
    siteName: "PMPath",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMPath — Your PM Career Starts Here",
    description: "Structured learning paths for aspiring Project Managers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="transition-colors duration-200">
        <ThemeProvider>
          <TTSProvider>
            <Navbar />
            <main className="min-h-[calc(100dvh-var(--nav-height))]">
              {children}
            </main>
            <Footer />
            <TTSBar />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  fontFamily: "var(--font-body, DM Sans, sans-serif)",
                  fontSize: "14px",
                  boxShadow: "0 4px 24px -4px rgba(0,0,0,0.12)",
                  background: "var(--color-white, #fff)",
                  color: "var(--color-ink, #0f172a)",
                },
              }}
            />
          </TTSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
