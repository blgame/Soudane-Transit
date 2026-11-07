"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Route } from "lucide-react";
import { SectionIntro } from "../components/SectionIntro";
import { cn } from "../lib/utils";

export default function CotationPage() {
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [cbm, setCbm] = useState({ length: "120", width: "80", height: "100", quantity: "6" });

  const cbmValue = useMemo(() => {
    const l = Number(cbm.length) || 0, w = Number(cbm.width) || 0, h = Number(cbm.height) || 0, q = Number(cbm.quantity) || 0;
    return (l * w * h * q) / 1_000_000;
  }, [cbm]);

  const freightEstimate = useMemo(() => {
    if (!cbmValue) return 0;
    return Math.max(250, Math.round(cbmValue * 145 + 180));
  }, [cbmValue]);

  const handleQuoteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]));
    setQuoteStatus("sending");
    setQuoteMessage("Envoi de votre demande en cours...");
    try {
      const response = await fetch("/api/cotation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { message?: string };
      if (response.ok) {
        setQuoteStatus("success");
        setQuoteMessage(result.message || "Votre demande de cotation a été envoyée.");
        form.reset();
      } else {
        setQuoteStatus("error");
        setQuoteMessage("Envoyez votre demande directement à kessotransit@yahoo.fr ou appelez le +221 33 842 78 35.");
      }
    } catch {
      setQuoteStatus("error");
      setQuoteMessage("Envoyez votre demande directement à kessotransit@yahoo.fr ou appelez le +221 33 842 78 35.");
    }
  };

  return (
    <main className="min-h-screen bg-brand-gray pt-36 dark:bg-[#07140f]">
      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionIntro
              eyebrow="Demande de cotation"
              title="Obtenez votre estimation en moins de 24h."
              copy="Remplissez le formulaire ci-contre. Notre équipe analyse votre opération et vous recontacte rapidement avec une proposition adaptée à votre marchandise, votre destination et vos délais."
            />

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              onSubmit={handleQuoteSubmit}
              className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-white/10 sm:grid-cols-2"
            >
              {[
                { label: "Nom", name: "nom", placeholder: "Votre nom", type: "text" },
                { label: "Société", name: "societe", placeholder: "Nom de la société", type: "text" },
                { label: "Téléphone", name: "telephone", placeholder: "+221 ...", type: "tel" },
                { label: "Email", name: "email", placeholder: "email@exemple.com", type: "email" },
                { label: "Type de marchandise", name: "typeMarchandise", placeholder: "Textile, machines, alimentaire...", type: "text" },
                { label: "Origine", name: "origine", placeholder: "Ville / pays d'origine", type: "text" },
                { label: "Destination", name: "destination", placeholder: "Dakar / région / pays", type: "text" },
                { label: "Volume / Poids", name: "volumePoids", placeholder: "Ex: 12 CBM / 2400 kg", type: "text" },
              ].map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">{field.label}</span>
                  <input className="field" name={field.name} placeholder={field.placeholder} required={field.name !== "societe"} type={field.type} />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Type de conteneur</span>
                <select className="field" name="typeConteneur" required>
                  <option>20 pieds</option>
                  <option>40 pieds</option>
                  <option>40 pieds HC</option>
                  <option>Groupage / LCL</option>
                  <option>Fret aérien</option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Message</span>
                <textarea className="field min-h-32 resize-y" name="message" placeholder="Décrivez votre besoin, les délais et les contraintes de livraison." />
              </label>

              <button
                type="submit"
                disabled={quoteStatus === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-sm font-black text-white shadow-lg shadow-brand-orange/25 transition hover:-translate-y-0.5 hover:bg-[#e96f17] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:w-fit"
              >
                {quoteStatus === "sending" ? "Envoi en cours..." : "Recevoir ma cotation"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {quoteMessage ? (
                <p aria-live="polite" className={cn("rounded-lg px-4 py-3 text-sm font-bold sm:col-span-2",
                  quoteStatus === "success" ? "bg-brand-light text-brand-green" :
                  quoteStatus === "error" ? "bg-orange-50 text-[#9a4a10] dark:bg-brand-orange/15 dark:text-brand-orange" :
                  "bg-white text-slate-600 dark:bg-white/10 dark:text-slate-200")}>
                  {quoteMessage}
                </p>
              ) : null}
            </motion.form>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionIntro
                eyebrow="Outils logistiques"
                title="Calculez votre CBM et estimez rapidement votre fret."
                copy="Des outils simples pour préparer une première discussion commerciale avec des volumes plus précis."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[["Longueur (cm)", "length"], ["Largeur (cm)", "width"], ["Hauteur (cm)", "height"], ["Nombre de colis", "quantity"]].map(([label, key]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">{label}</span>
                    <input
                      className="field"
                      inputMode="decimal"
                      value={cbm[key as keyof typeof cbm]}
                      onChange={(e) => setCbm((c) => ({ ...c, [key]: e.target.value }))}
                    />
                  </label>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <div className="rounded-lg bg-brand-dark p-6 text-white shadow-premium">
                <Calculator className="h-8 w-8 text-brand-orange" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white/60">Volume CBM</p>
                <p className="mt-3 text-4xl font-black">{cbmValue.toFixed(2)}</p>
                <p className="mt-2 text-sm text-white/70">mètres cubes estimés</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-premium dark:bg-white/10">
                <Route className="h-8 w-8 text-brand-green dark:text-brand-light" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Estimation fret</p>
                <p className="mt-3 text-4xl font-black text-brand-dark dark:text-white">${freightEstimate.toLocaleString("fr-FR")}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Base indicative hors taxes et frais portuaires</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
