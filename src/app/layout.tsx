import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeScript } from "@/components/providers/theme-script";
import { AuthListener } from "@/components/layout/auth-listener";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Page Studio",
    template: "%s · Page Studio",
  },
  description:
    "Load, edit, preview and publish schema-driven landing pages with immutable, versioned releases.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets the theme class before paint to avoid a flash (no-JS safe). */}
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background font-sans">
        {/* AAA 2.4.1 — bypass blocks: keyboard users jump straight to content. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Suspense fallback={null}>
          <AuthListener />
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
