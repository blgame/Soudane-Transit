"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Mail, MapPin, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { navItems } from "../lib/data";
import { cn } from "../lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try { setDarkMode(localStorage.getItem("darkMode") === "true"); } catch {}
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("darkMode", String(next)); } catch {}
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-slate-200/80 bg-white/95 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#07140f]/95"
          : "border-white/40 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#07140f]/95"
      )}
    >
      <div className="hidden border-b border-slate-200/70 py-2 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 md:block">
        <div className="container-shell flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-orange" />Rue du Liban x Brazza, Dakar</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-orange" />+221 33 842 78 35</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-orange" />kessotransit@yahoo.fr</span>
          </div>
          <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-brand-orange" />Lun - Sam : 08h30 - 18h00</span>
        </div>
      </div>

      <nav className="container-shell flex h-20 items-center justify-between">
        <LogoMark />

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold transition",
                pathname === item.href
                  ? "text-brand-green dark:text-brand-light"
                  : "text-slate-700 hover:text-brand-green dark:text-slate-200 dark:hover:text-brand-light"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleDark}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brand-dark transition hover:border-brand-green dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label="Basculer le thème"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            href="/cotation"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white shadow-lg shadow-brand-orange/25 transition hover:-translate-y-0.5 hover:bg-[#e96f17]"
          >
            Demander une cotation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((c) => !c)}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brand-dark dark:border-white/10 dark:bg-white/10 dark:text-white lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-200 bg-white px-4 py-5 shadow-soft dark:border-white/10 dark:bg-[#07140f] lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-brand-light dark:text-slate-200 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={toggleDark}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand-dark dark:border-white/10 dark:text-white"
                aria-label="Basculer le thème"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                href="/cotation"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white"
              >
                Demander une cotation
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
