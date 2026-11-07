"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionIntro } from "../components/SectionIntro";
import { AnimatedStat } from "../components/AnimatedStat";
import { strengths, stats, testimonials, faqs, aerialImage } from "../lib/data";
import { cn } from "../lib/utils";

export default function AProposPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((c) => (c + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-brand-gray pt-36 dark:bg-[#07140f]">
      <section className="bg-white py-16 dark:bg-white/[0.03] sm:py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[480px] overflow-hidden rounded-lg shadow-premium"
          >
            <Image src={aerialImage} alt="Vue aérienne de conteneurs dans un terminal portuaire" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-orange">Dakar hub</p>
              <p className="mt-2 text-2xl font-black">Coordination portuaire, douane et transport.</p>
            </div>
          </motion.div>

          <div>
            <SectionIntro
              eyebrow="Pourquoi nous choisir"
              title="20 ans d'expérience terrain. Zéro compromis sur vos délais."
              copy="Fondée par des professionnels du transit, Soudane Transit maîtrise chaque étape : du manifeste portuaire à la livraison finale. Nous connaissons les rouages du Port de Dakar, les exigences douanières et les délais réels — pour vous éviter les mauvaises surprises."
            />

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-brand-gray p-4 dark:border-white/10 dark:bg-white/10"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-orange dark:bg-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-black text-brand-dark dark:text-white">{item.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {stats.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionIntro
              eyebrow="Ils nous font confiance"
              title="Ce que nos clients disent après leur première opération."
              copy="La vraie différence, c'est ce qu'on dit de nous quand tout s'est bien passé. Fiabilité, réactivité et respect des délais — ce sont nos engagements au quotidien."
            />

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-premium dark:border-white/10 dark:bg-white/10">
              <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                <p className="text-2xl font-black leading-10 text-brand-dark dark:text-white">"{testimonials[activeTestimonial].quote}"</p>
                <div className="mt-8 flex items-center justify-between gap-5">
                  <div>
                    <p className="font-black text-brand-green dark:text-brand-light">{testimonials[activeTestimonial].name}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="flex gap-2">
                    {testimonials.map((t, i) => (
                      <button key={t.name} type="button" onClick={() => setActiveTestimonial(i)}
                        className={cn("h-2.5 rounded-full transition-all", activeTestimonial === i ? "w-8 bg-brand-orange" : "w-2.5 bg-slate-300 dark:bg-white/20")}
                        aria-label={`Afficher le témoignage ${i + 1}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-white/[0.03] sm:py-20">
        <div className="container-shell">
          <SectionIntro
            eyebrow="FAQ"
            title="Les réponses utiles avant de lancer votre opération."
            copy="Une base claire pour préparer votre dossier et accélérer le traitement commercial."
          />
          <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-brand-gray dark:divide-white/10 dark:border-white/10 dark:bg-white/10">
            {faqs.map((faq, index) => (
              <button key={faq.question} type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="block w-full px-5 py-5 text-left">
                <span className="flex items-center justify-between gap-5">
                  <span className="font-black text-brand-dark dark:text-white">{faq.question}</span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-brand-orange transition", openFaq === index && "rotate-180")} />
                </span>
                {openFaq === index ? <span className="mt-3 block text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</span> : null}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
