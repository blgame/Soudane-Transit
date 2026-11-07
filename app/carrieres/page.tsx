"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { SectionIntro } from "../components/SectionIntro";
import { cn } from "../lib/utils";
import type { Job } from "../lib/data";
import jobsRaw from "../../data/jobs.json";

const jobs = jobsRaw as unknown as Job[];

export default function CarrieresPage() {
  const [appStatus, setAppStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [appMessage, setAppMessage] = useState("");

  const handleAppSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setAppStatus("sending");
    setAppMessage("Envoi en cours...");
    try {
      const response = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: fd.get("nom"),
          telephone: fd.get("telephone"),
          email: fd.get("email"),
          poste: fd.get("poste") || "Non renseigné",
          message: fd.get("message") || "Non renseigné",
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (response.ok) {
        setAppStatus("success");
        setAppMessage(result.message || "Candidature envoyée avec succès. Nous reviendrons vers vous rapidement.");
        form.reset();
      } else {
        setAppStatus("error");
        setAppMessage("Envoi échoué. Contactez-nous à kessotransit@yahoo.fr ou au +221 33 842 78 35.");
      }
    } catch {
      setAppStatus("error");
      setAppMessage("Envoi échoué. Contactez-nous à kessotransit@yahoo.fr ou au +221 33 842 78 35.");
    }
  };

  return (
    <main className="min-h-screen bg-brand-gray pt-36 dark:bg-[#07140f]">
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Rejoignez-nous"
                title="Construisez votre carrière dans le transit international."
                copy="Soudane Transit recrute des professionnels motivés, rigoureux et passionnés par la logistique. Rejoignez une équipe expérimentée au cœur du Port de Dakar."
              />

              <form
                onSubmit={handleAppSubmit}
                className="mt-8 rounded-lg border border-brand-green/30 bg-brand-light p-6 dark:bg-brand-green/10"
              >
                <Briefcase className="h-7 w-7 text-brand-green dark:text-brand-light" />
                <p className="mt-4 text-sm font-black text-brand-dark dark:text-white">Candidature spontanée</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Votre profil ne correspond pas exactement à une offre ? Remplissez ce formulaire — nous étudions toutes les candidatures sérieuses.
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    { label: "Nom complet", name: "nom", type: "text", placeholder: "Votre nom" },
                    { label: "Téléphone", name: "telephone", type: "tel", placeholder: "+221 ..." },
                    { label: "Email", name: "email", type: "email", placeholder: "email@exemple.com" },
                    { label: "Poste visé (optionnel)", name: "poste", type: "text", placeholder: "Ex : Agent de transit" },
                  ].map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-1 block text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">{field.label}</span>
                      <input className="field" name={field.name} type={field.type} placeholder={field.placeholder} required={field.name !== "poste"} />
                    </label>
                  ))}
                  <label className="block">
                    <span className="mb-1 block text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Message / Présentation</span>
                    <textarea className="field min-h-24 resize-y" name="message" placeholder="Présentez-vous brièvement et décrivez votre expérience." />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={appStatus === "sending"}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white shadow-lg shadow-brand-green/20 transition hover:-translate-y-0.5 hover:bg-[#095a31] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {appStatus === "sending" ? "Envoi en cours..." : "Envoyer ma candidature"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {appMessage ? (
                  <p aria-live="polite" className={cn("mt-3 rounded-lg px-4 py-3 text-sm font-bold",
                    appStatus === "success" ? "bg-white text-brand-green dark:bg-brand-green/20" : "bg-orange-50 text-[#9a4a10] dark:bg-brand-orange/15 dark:text-brand-orange")}>
                    {appMessage}
                  </p>
                ) : null}
              </form>
            </div>

            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Offres d'emploi</p>
              {jobs.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/20 dark:bg-white/5">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-gray shadow-soft dark:bg-white/10">
                    <Briefcase className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                  </span>
                  <p className="font-black text-brand-dark dark:text-white">Aucune offre en cours</p>
                  <p className="max-w-xs text-sm leading-7 text-slate-500 dark:text-slate-400">
                    Revenez bientôt — les prochaines opportunités seront publiées ici.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5">
                  {jobs.map((job, index) => (
                    <motion.article
                      key={job.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: index * 0.06, duration: 0.42 }}
                      className="group rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:border-brand-green/40 hover:shadow-premium dark:border-white/10 dark:bg-white/10"
                    >
                      <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-gray text-brand-green shadow-soft transition group-hover:bg-brand-green group-hover:text-white dark:bg-white/10">
                          <Briefcase className="h-6 w-6" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-black text-brand-dark dark:text-white">{job.title}</h3>
                            <span className="rounded-full bg-brand-orange/15 px-3 py-0.5 text-xs font-black text-brand-orange">{job.type}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">{job.location}</span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{job.description}</p>
                          <a
                            href={`mailto:kessotransit@yahoo.fr?subject=Candidature%20%E2%80%94%20${encodeURIComponent(job.title)}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-green transition hover:text-[#095a31] dark:text-brand-light"
                          >
                            Postuler <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
