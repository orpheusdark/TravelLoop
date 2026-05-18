"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  "Destinations",
  "Explore",
  "Experiences",
  "Travel Planner",
  "Community",
  "Pricing"
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-4 z-50 mx-auto w-[min(1200px,94%)] rounded-2xl border border-white/20 px-4 py-3 transition-all", scrolled ? "glass shadow-2xl" : "bg-transparent")}>
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300 text-slate-950"><Sparkles className="h-4 w-4" /></span>
          TravelLoop
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navLinks.map((item) => (
            <a key={item} href="#" className="relative text-slate-200 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cyan-300 after:transition-all hover:after:w-full">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
          <Link href="/signup"><Button variant="sunset" size="sm">Sign Up</Button></Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden rounded-xl border border-white/15 bg-slate-900/80 p-4 backdrop-blur md:hidden">
            <div className="grid gap-3 text-sm">
              {navLinks.map((item) => (
                <a key={item} href="#" className="text-slate-100">{item}</a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link href="/signup"><Button variant="sunset" size="sm">Sign Up</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
