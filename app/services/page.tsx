"use client";

import { motion } from "framer-motion";
import { services } from "../lib/data";
import { SectionIntro } from "../components/SectionIntro";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-gray pt-36 dark:bg-[#07140f]">
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Nos services"
            title="Une chaîne logistique complète, pilotée avec précision."
            copy="Soudane Transit structure vos opérations maritimes, aériennes, douanières et terrestres avec une approche fiable, transparente et orientée performance."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.04, duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:border-brand-green/30 hover:shadow-premium dark:border-white/10 dark:bg-white/10"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-light text-brand-green transition group-hover:bg-brand-orange group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-brand-dark dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
