"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calculator, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { solutionPillars, heroImage } from "./lib/data";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden bg-brand-dark pt-32">
        <Image
          src={heroImage}
          alt="Terminal portuaire avec navire cargo et conteneurs"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041b12]/98 via-[#073822]/95 to-[#073822]/80" />
        <div className="maritime-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-gray to-transparent dark:from-[#07140f]" />

        <div className="container-shell relative z-10 grid min-h-[calc(88svh-8rem)] items-center gap-10 pb-28 lg:grid-cols-[1.03fr_0.97fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-brand-light backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-brand-orange" />
              Transit premium à Dakar
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-normal text-white sm:text-5xl lg:text-6xl">
              Vos marchandises arrivent à temps. Sans blocage. Sans mauvaise surprise.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">
              Soudane Transit gère vos opérations import/export depuis le port de Dakar — dédouanement, transport, livraison — avec plus de 20 ans d'expérience terrain.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["Mer", "Air", "Terre", "Douane"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cotation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#095a31]"
              >
                Obtenir un devis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:border-white/60"
              >
                Nos services
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="container-shell relative z-20 -mt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="grid gap-0 overflow-hidden rounded-lg bg-white shadow-premium dark:bg-[#0b1f17] lg:grid-cols-[0.8fr_1.2fr_auto]"
          >
            <div className="grid grid-cols-2 border-b border-slate-200 lg:border-b-0 lg:border-r dark:border-white/10">
              {([["Cotation", Calculator, "/cotation"], ["Support", Headphones, "#contact"]] as [string, LucideIcon, string][]).map(([label, Icon, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="flex min-h-20 flex-col items-center justify-center gap-2 px-3 text-sm font-black text-brand-dark transition hover:bg-brand-light dark:text-white dark:hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 text-brand-orange" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              {[["Origine", "Dakar Gateway"], ["Mode", "Sea · Air · Road"], ["Délai", "Réponse sous 24h"]].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-brand-gray px-4 py-3 dark:bg-white/10">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">{label}</p>
                  <p className="mt-2 text-sm font-black text-brand-dark dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/cotation"
              className="inline-flex items-center justify-center gap-2 bg-brand-green px-6 py-5 text-sm font-black text-white transition hover:bg-[#095a31]"
            >
              Démarrer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-gray py-10 dark:bg-[#07140f]">
        <div className="container-shell">
          <div className="grid gap-4 lg:grid-cols-4">
            {solutionPillars.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.article
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05, duration: 0.42 }}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-premium dark:border-white/10 dark:bg-white/10"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green to-brand-orange" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">{solution.label}</p>
                      <h2 className="mt-3 text-xl font-black text-brand-dark dark:text-white">{solution.title}</h2>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-light text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{solution.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
