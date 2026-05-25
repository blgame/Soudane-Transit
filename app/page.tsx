"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Calculator,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Network,
  PackageCheck,
  Phone,
  Plane,
  Route,
  Search,
  ShieldCheck,
  Sun,
  Truck,
  UserRoundCheck,
  Warehouse,
  X
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1774199102899-db6a49abb42b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=76&w=2400";
const aerialImage =
  "https://images.unsplash.com/photo-1769144256227-5185141c3aca?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=76&w=1800";
const terminalImage =
  "https://images.unsplash.com/photo-1773126378915-793b5c48fb38?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=76&w=1600";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Cotation", href: "#cotation" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" }
];

const services: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Transit maritime",
    description:
      "Gestion portuaire, enlèvement, manifeste et coordination des expéditions conteneurisées.",
    icon: Anchor
  },
  {
    title: "Transit aérien",
    description:
      "Traitement accéléré des cargaisons urgentes et sensibles avec suivi documentaire précis.",
    icon: Plane
  },
  {
    title: "Dédouanement",
    description:
      "Déclarations, conformité, fiscalité douanière et accompagnement jusqu'à la mainlevée.",
    icon: FileCheck2
  },
  {
    title: "Transport terrestre",
    description:
      "Acheminement sécurisé par camion depuis le port, l'aéroport ou l'entrepôt.",
    icon: Truck
  },
  {
    title: "Livraison conteneurs",
    description:
      "Planification des livraisons, restitution, suivi des délais et coordination client.",
    icon: PackageCheck
  },
  {
    title: "Groupage",
    description:
      "Solutions LCL souples pour optimiser les coûts et accélérer les flux internationaux.",
    icon: Boxes
  },
  {
    title: "Logistique internationale",
    description:
      "Pilotage import/export de bout en bout avec partenaires portuaires et agents réseau.",
    icon: Globe2
  },
  {
    title: "Assistance documentaire",
    description:
      "Vérification BL, facture, liste de colisage, certificat et documents réglementaires.",
    icon: ClipboardCheck
  }
];

const strengths = [
  { title: "Rapidité", icon: Clock3 },
  { title: "Fiabilité", icon: ShieldCheck },
  { title: "Expertise douanière", icon: BadgeCheck },
  { title: "Suivi en temps réel", icon: BarChart3 },
  { title: "Réseau international", icon: Network },
  { title: "Service client réactif", icon: Headphones }
];

const stats = [
  { value: 350, prefix: "+", label: "clients / an" },
  { value: 1000, prefix: "+", label: "dossiers traités / an" },
  { value: 20, prefix: "+", label: "ans d'expérience" },
  { value: 96, suffix: "%", label: "satisfaction client" }
];

const solutionPillars: Array<{
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Ocean freight",
    label: "Maritime",
    description: "Conteneurs FCL/LCL, coordination portuaire et enlèvement.",
    icon: Anchor
  },
  {
    title: "Air cargo",
    label: "Aérien",
    description: "Traitement rapide des expéditions sensibles ou urgentes.",
    icon: Plane
  },
  {
    title: "Inland delivery",
    label: "Terrestre",
    description: "Camionnage, livraison finale et restitution conteneur.",
    icon: Truck
  },
  {
    title: "Customs care",
    label: "Douane",
    description: "Dossier, conformité, taxes et assistance documentaire.",
    icon: FileCheck2
  }
];

const routeSignals = [
  "Port de Dakar",
  "Douane",
  "Camionnage",
  "Livraison finale"
];

const trackingSteps = [
  "En transit",
  "Arrivé au port",
  "En dédouanement",
  "Livré"
];

const testimonials = [
  {
    name: "Awa Diop",
    role: "Importatrice textile",
    quote:
      "Soudane Transit nous accompagne avec une grande rigueur. Les délais sont clairs et le suivi est toujours disponible."
  },
  {
    name: "Mamadou Fall",
    role: "Responsable achats",
    quote:
      "Le dédouanement de nos conteneurs est devenu beaucoup plus fluide. L'équipe anticipe les documents sensibles."
  },
  {
    name: "Claire Bernard",
    role: "Export manager",
    quote:
      "Une qualité de service très professionnelle pour coordonner nos flux entre l'Europe, Dakar et la sous-région."
  }
];

const blogPosts = [
  {
    title: "Préparer un dossier import sans blocage",
    tag: "Douane",
    excerpt:
      "Les pièces clés à vérifier avant l'arrivée du navire pour éviter les frais d'immobilisation."
  },
  {
    title: "Comprendre le CBM en fret maritime",
    tag: "Fret",
    excerpt:
      "Volume, poids taxable et groupage : les repères simples pour mieux anticiper votre cotation."
  },
  {
    title: "Port de Dakar : mieux planifier la livraison",
    tag: "Transport",
    excerpt:
      "Comment synchroniser mainlevée, camionnage et restitution conteneur avec plus de visibilité."
  }
];

const faqs = [
  {
    question: "Quels documents faut-il pour une cotation ?",
    answer:
      "La facture commerciale, la liste de colisage, l'origine, la destination, le type de marchandise et le volume ou poids suffisent pour une première estimation."
  },
  {
    question: "Pouvez-vous suivre un conteneur depuis l'étranger ?",
    answer:
      "Oui. L'équipe suit le BL, le conteneur et les étapes portuaires pour informer le client avant chaque action importante."
  },
  {
    question: "Gérez-vous les livraisons hors Dakar ?",
    answer:
      "Oui, les livraisons peuvent être organisées à Dakar et vers les régions selon le type de marchandise et le planning transport."
  },
  {
    question: "Le calcul CBM remplace-t-il une cotation officielle ?",
    answer:
      "Non. Il donne une estimation utile. La cotation finale dépend du mode de transport, des frais portuaires, des taxes et des contraintes opérationnelles."
  }
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AnimatedStat({
  value,
  prefix,
  suffix,
  label
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-lg bg-white p-5 shadow-soft dark:bg-white/10">
      <div className="text-3xl font-black text-brand-green dark:text-brand-light">
        {prefix}
        {count.toLocaleString("fr-FR")}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </p>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

function LogoMark() {
  return (
    <a href="#accueil" className="flex items-center gap-3" aria-label="Soudane Transit">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-brand-green text-sm font-black text-white shadow-lg shadow-brand-green/20">
        ST
        <span className="absolute bottom-0 right-0 h-3 w-6 bg-brand-orange" />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-black text-brand-dark dark:text-white">
          Soudane
        </span>
        <span className="block text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
          Transit
        </span>
      </span>
    </a>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tracking, setTracking] = useState({
    bl: "",
    container: "",
    searched: false,
    activeStep: 1
  });
  const [quoteStatus, setQuoteStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [cbm, setCbm] = useState({
    length: "120",
    width: "80",
    height: "100",
    quantity: "6"
  });
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const cbmValue = useMemo(() => {
    const length = Number(cbm.length) || 0;
    const width = Number(cbm.width) || 0;
    const height = Number(cbm.height) || 0;
    const quantity = Number(cbm.quantity) || 0;

    return (length * width * height * quantity) / 1_000_000;
  }, [cbm]);

  const freightEstimate = useMemo(() => {
    if (!cbmValue) {
      return 0;
    }

    return Math.max(250, Math.round(cbmValue * 145 + 180));
  }, [cbmValue]);

  const handleTracking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const seed = `${tracking.bl}${tracking.container}`.replace(/\s/g, "").length;

    setTracking((current) => ({
      ...current,
      searched: true,
      activeStep: seed ? seed % trackingSteps.length : 2
    }));
  };

  const handleQuoteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );

    setQuoteStatus("sending");
    setQuoteMessage("Envoi de votre demande en cours...");

    try {
      const response = await fetch("/api/cotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as {
        message?: string;
        fallbackMailto?: string;
      };

      if (response.ok) {
        setQuoteStatus("success");
        setQuoteMessage(
          result.message || "Votre demande de cotation a été envoyée."
        );
        form.reset();
        return;
      }

      if (result.fallbackMailto) {
        window.location.href = result.fallbackMailto;
        setQuoteStatus("error");
        setQuoteMessage(
          "L'email automatique doit être configuré. Un email prérempli vient d'être ouvert pour l'envoi manuel."
        );
        return;
      }

      setQuoteStatus("error");
      setQuoteMessage(
        result.message || "Impossible d'envoyer la demande pour le moment."
      );
    } catch {
      setQuoteStatus("error");
      setQuoteMessage(
        "Une erreur réseau empêche l'envoi. Merci de réessayer dans un instant."
      );
    }
  };

  return (
    <main className="overflow-hidden bg-brand-gray text-slate-950 transition dark:bg-[#07140f] dark:text-white">
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
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                Rue du Liban x Brazza, Dakar
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-orange" />
                +221 33 842 78 35
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-orange" />
                kessotransit@yahoo.fr
              </span>
            </div>
            <span className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-brand-orange" />
              Lun - Sam : 08h30 - 18h00
            </span>
          </div>
        </div>

        <nav className="container-shell flex h-20 items-center justify-between">
          <LogoMark />

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-slate-700 transition hover:text-brand-green dark:text-slate-200 dark:hover:text-brand-light"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-brand-dark transition hover:border-brand-green dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Basculer le thème"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="#cotation"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white shadow-lg shadow-brand-orange/25 transition hover:-translate-y-0.5 hover:bg-[#e96f17]"
            >
              Demander une cotation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-brand-light dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDarkMode((current) => !current)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand-dark dark:border-white/10 dark:text-white"
                  aria-label="Basculer le thème"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <a
                  href="#cotation"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white"
                >
                  Demander une cotation
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </motion.header>

      <section id="accueil" className="relative overflow-hidden bg-brand-dark pt-32">
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
              Soudane Transit — Votre partenaire de confiance en transit et
              logistique internationale.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">
              Des solutions rapides, sécurisées et professionnelles pour vos
              opérations import/export.
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
              <a
                href="#cotation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#095a31]"
              >
                Obtenir un devis
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-lg border border-white/20 bg-white/95 shadow-2xl shadow-black/30 dark:bg-[#0b1f17]/95"
          >
            <div className="border-b border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">
                    Soudane Control Tower
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-brand-dark dark:text-white">
                    Visibilité import/export
                  </h2>
                </div>
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-black text-brand-green">
                  Live
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["ETA", "48h", "Port de Dakar"],
                  ["BL", "126", "Vérifiés"],
                  ["SLA", "98%", "Satisfaction"]
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-200 bg-brand-gray p-4 dark:border-white/10 dark:bg-white/10"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                      {label}
                    </p>
                    <p className="mt-3 text-3xl font-black text-brand-dark dark:text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand-green dark:text-brand-light">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-brand-dark p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">
                      Corridor opérationnel
                    </p>
                    <p className="mt-2 text-lg font-black">
                      Navire · Port · Douane · Livraison
                    </p>
                  </div>
                  <Globe2 className="h-8 w-8 text-brand-light" />
                </div>
                <div className="route-line mt-6 h-1.5 rounded-full" />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {routeSignals.map((signal, index) => (
                    <div key={signal}>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-black text-brand-green">
                        {index + 1}
                      </span>
                      <p className="mt-2 text-xs font-bold leading-5 text-white/75">
                        {signal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

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
            <div className="grid grid-cols-3 border-b border-slate-200 lg:border-b-0 lg:border-r dark:border-white/10">
              {[
                ["Cotation", Calculator],
                ["Support", Headphones]
              ].map(([label, Icon]) => {
                const ActionIcon = Icon as LucideIcon;
                const href =
                  label === "Cotation"
                      ? "#cotation"
                      : "#contact";

                return (
                  <a
                    key={label as string}
                    href={href}
                    className="flex min-h-20 flex-col items-center justify-center gap-2 px-3 text-sm font-black text-brand-dark transition hover:bg-brand-light dark:text-white dark:hover:bg-white/10"
                  >
                    <ActionIcon className="h-5 w-5 text-brand-orange" />
                    {label as string}
                  </a>
                );
              })}
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              {[
                ["Origine", "Dakar Gateway"],
                ["Mode", "Sea · Air · Road"],
                ["Délai", "Réponse sous 24h"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-brand-gray px-4 py-3 dark:bg-white/10">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-black text-brand-dark dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#cotation"
              className="inline-flex items-center justify-center gap-2 bg-brand-green px-6 py-5 text-sm font-black text-white transition hover:bg-[#095a31]"
            >
              Démarrer
              <ArrowRight className="h-4 w-4" />
            </a>
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
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">
                        {solution.label}
                      </p>
                      <h2 className="mt-3 text-xl font-black text-brand-dark dark:text-white">
                        {solution.title}
                      </h2>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-light text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {solution.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-24">
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
                  <h3 className="mt-5 text-lg font-black text-brand-dark dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apropos" className="bg-white py-20 dark:bg-white/[0.03] sm:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative min-h-[480px] overflow-hidden rounded-lg shadow-premium"
          >
            <Image
              src={aerialImage}
              alt="Vue aérienne de conteneurs dans un terminal portuaire"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-orange">
                Dakar hub
              </p>
              <p className="mt-2 text-2xl font-black">
                Coordination portuaire, douane et transport.
              </p>
            </div>
          </motion.div>

          <div>
            <SectionIntro
              eyebrow="Pourquoi nous choisir"
              title="La rigueur d'un transitaire local, la vision d'un partenaire international."
              copy="Nous combinons expertise douanière, réactivité opérationnelle et suivi structuré pour sécuriser chaque étape de vos flux import/export."
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
                    <span className="text-sm font-black text-brand-dark dark:text-white">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section suivi conteneur supprimée */}
      {false && <section id="suivi" className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow="Suivi conteneur"
              title="Un tableau de bord clair pour suivre vos opérations."
              copy="Saisissez un numéro BL ou un numéro de conteneur pour visualiser un statut simulé et la progression logistique."
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-white/10"
            >
              <form onSubmit={handleTracking} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                    Numéro BL
                  </span>
                  <input
                    className="field"
                    placeholder="Ex: BL-DKR-2048"
                    value={tracking.bl}
                    onChange={(event) =>
                      setTracking((current) => ({ ...current, bl: event.target.value }))
                    }
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                    Numéro conteneur
                  </span>
                  <input
                    className="field"
                    placeholder="Ex: MSDU1234567"
                    value={tracking.container}
                    onChange={(event) =>
                      setTracking((current) => ({
                        ...current,
                        container: event.target.value
                      }))
                    }
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-sm font-black text-white transition hover:bg-[#095a31] md:mt-8"
                >
                  <Search className="h-4 w-4" />
                  Suivre
                </button>
              </form>

              <div className="mt-8 rounded-lg bg-brand-gray p-5 dark:bg-black/20">
                <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 dark:border-white/10 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">
                      Statut simulé
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-brand-dark dark:text-white">
                      {tracking.searched
                        ? trackingSteps[tracking.activeStep]
                        : "En attente de recherche"}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-brand-green dark:bg-white/10 dark:text-brand-light">
                    Port de Dakar
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {trackingSteps.map((step, index) => {
                    const complete = tracking.searched && index <= tracking.activeStep;

                    return (
                      <div key={step} className="relative">
                        <div
                          className={cn(
                            "grid h-11 w-11 place-items-center rounded-full border-2 transition",
                            complete
                              ? "border-brand-green bg-brand-green text-white"
                              : "border-slate-300 bg-white text-slate-400 dark:border-white/20 dark:bg-white/10"
                          )}
                        >
                          {complete ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-black">{index + 1}</span>
                          )}
                        </div>
                        <p
                          className={cn(
                            "mt-3 text-sm font-black",
                            complete
                              ? "text-brand-dark dark:text-white"
                              : "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>}

      <section id="cotation" className="bg-white py-20 dark:bg-white/[0.03] sm:py-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionIntro
              eyebrow="Formulaire de cotation"
              title="Recevez une proposition claire pour votre opération."
              copy="Transmettez les informations essentielles. L'équipe Soudane Transit vous recontacte avec une estimation adaptée à votre flux."
            />

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              onSubmit={handleQuoteSubmit}
              className="grid gap-4 rounded-lg border border-slate-200 bg-brand-gray p-5 shadow-premium dark:border-white/10 dark:bg-white/10 sm:grid-cols-2"
            >
              {[
                { label: "Nom", name: "nom", placeholder: "Votre nom", type: "text" },
                {
                  label: "Société",
                  name: "societe",
                  placeholder: "Nom de la société",
                  type: "text"
                },
                { label: "Téléphone", name: "telephone", placeholder: "+221 ...", type: "tel" },
                {
                  label: "Email",
                  name: "email",
                  placeholder: "email@exemple.com",
                  type: "email"
                },
                {
                  label: "Type de marchandise",
                  name: "typeMarchandise",
                  placeholder: "Textile, machines, alimentaire...",
                  type: "text"
                },
                {
                  label: "Origine",
                  name: "origine",
                  placeholder: "Ville / pays d'origine",
                  type: "text"
                },
                {
                  label: "Destination",
                  name: "destination",
                  placeholder: "Dakar / région / pays",
                  type: "text"
                },
                {
                  label: "Volume / Poids",
                  name: "volumePoids",
                  placeholder: "Ex: 12 CBM / 2400 kg",
                  type: "text"
                }
              ].map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                    {field.label}
                  </span>
                  <input
                    className="field"
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.name !== "societe"}
                    type={field.type}
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Type de conteneur
                </span>
                <select className="field" name="typeConteneur" required>
                  <option>20 pieds</option>
                  <option>40 pieds</option>
                  <option>40 pieds HC</option>
                  <option>Groupage / LCL</option>
                  <option>Fret aérien</option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Message
                </span>
                <textarea
                  className="field min-h-32 resize-y"
                  name="message"
                  placeholder="Décrivez votre besoin, les délais et les contraintes de livraison."
                />
              </label>

              <button
                type="submit"
                disabled={quoteStatus === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-sm font-black text-white shadow-lg shadow-brand-orange/25 transition hover:-translate-y-0.5 hover:bg-[#e96f17] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:w-fit"
              >
                {quoteStatus === "sending"
                  ? "Envoi en cours..."
                  : "Recevoir ma cotation"}
                <ArrowRight className="h-4 w-4" />
              </button>
              {quoteMessage ? (
                <p
                  aria-live="polite"
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-bold sm:col-span-2",
                    quoteStatus === "success"
                      ? "bg-brand-light text-brand-green"
                      : quoteStatus === "error"
                        ? "bg-orange-50 text-[#9a4a10] dark:bg-brand-orange/15 dark:text-brand-orange"
                        : "bg-white text-slate-600 dark:bg-white/10 dark:text-slate-200"
                  )}
                >
                  {quoteMessage}
                </p>
              ) : null}
            </motion.form>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionIntro
                eyebrow="Outils logistiques"
                title="Calculez votre CBM et estimez rapidement votre fret."
                copy="Des outils simples pour préparer une première discussion commerciale avec des volumes plus précis."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Longueur (cm)", "length"],
                  ["Largeur (cm)", "width"],
                  ["Hauteur (cm)", "height"],
                  ["Nombre de colis", "quantity"]
                ].map(([label, key]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                      {label}
                    </span>
                    <input
                      className="field"
                      inputMode="decimal"
                      value={cbm[key as keyof typeof cbm]}
                      onChange={(event) =>
                        setCbm((current) => ({
                          ...current,
                          [key]: event.target.value
                        }))
                      }
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
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white/60">
                  Volume CBM
                </p>
                <p className="mt-3 text-4xl font-black">
                  {cbmValue.toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-white/70">mètres cubes estimés</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-premium dark:bg-white/10">
                <Route className="h-8 w-8 text-brand-green dark:text-brand-light" />
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Estimation fret
                </p>
                <p className="mt-3 text-4xl font-black text-brand-dark dark:text-white">
                  ${freightEstimate.toLocaleString("fr-FR")}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Base indicative hors taxes et frais portuaires
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-white py-20 dark:bg-white/[0.03] sm:py-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionIntro
              eyebrow="Témoignages"
              title="Des clients qui recherchent de la visibilité et de la sérénité."
              copy="Le transit demande de la précision. Nos clients nous choisissent pour la qualité du suivi et la tenue des engagements."
            />

            <div className="rounded-lg border border-slate-200 bg-brand-gray p-6 shadow-premium dark:border-white/10 dark:bg-white/10">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-2xl font-black leading-10 text-brand-dark dark:text-white">
                  “{testimonials[activeTestimonial].quote}”
                </p>
                <div className="mt-8 flex items-center justify-between gap-5">
                  <div>
                    <p className="font-black text-brand-green dark:text-brand-light">
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.name}
                        type="button"
                        onClick={() => setActiveTestimonial(index)}
                        className={cn(
                          "h-2.5 rounded-full transition-all",
                          activeTestimonial === index
                            ? "w-8 bg-brand-orange"
                            : "w-2.5 bg-slate-300 dark:bg-white/20"
                        )}
                        aria-label={`Afficher le témoignage ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-1">
          <div>
            <SectionIntro
              eyebrow="FAQ"
              title="Les réponses utiles avant de lancer votre opération."
              copy="Une base claire pour préparer votre dossier et accélérer le traitement commercial."
            />
            <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/10">
              {faqs.map((faq, index) => (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="block w-full px-5 py-5 text-left"
                >
                  <span className="flex items-center justify-between gap-5">
                    <span className="font-black text-brand-dark dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-brand-orange transition",
                        openFaq === index && "rotate-180"
                      )}
                    />
                  </span>
                  {openFaq === index ? (
                    <span className="mt-3 block text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      <footer id="contact" className="bg-[#052c1d] pt-16 text-white">
        <div className="container-shell grid gap-10 pb-12 lg:grid-cols-[1fr_0.8fr_1.1fr]">
          <div>
            <LogoMark />
            <p className="mt-5 max-w-sm leading-8 text-white/70">
              Transit, dédouanement et logistique internationale pour les
              entreprises import/export basées au Sénégal et à l'international.
            </p>
            <div className="mt-6 flex gap-3">
              {["in", "f", "x"].map((social) => (
                <a
                  key={social}
                  href="#accueil"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-sm font-black text-white transition hover:border-brand-orange hover:bg-brand-orange"
                  aria-label={`Réseau social ${social}`}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-brand-orange">
              Liens rapides
            </h3>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-brand-orange">
              Contact
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-orange" />
                Rue du Liban x Brazza, Dakar
              </span>
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-orange" />
                +221 33 842 78 35
              </span>
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-orange" />
                kessotransit@yahoo.fr
              </span>
              <span className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-brand-orange" />
                Lun - Sam : 08h30 - 18h00
              </span>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Carte Rue du Liban x Brazza Dakar"
                src="https://www.google.com/maps?q=14.679868126807259,-17.43824723559809&z=17&output=embed"
                className="h-48 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="container-shell flex flex-col justify-between gap-3 text-sm font-semibold text-white/60 sm:flex-row">
            <span>© 2026 Soudane Transit. Tous droits réservés.</span>
            <span>Transit maritime · aérien · douane · transport</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
