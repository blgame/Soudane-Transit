import type { LucideIcon } from "lucide-react";
import {
  Anchor, BadgeCheck, BarChart3, Boxes, Briefcase, ClipboardCheck,
  Clock3, FileCheck2, Globe2, Headphones, Network, PackageCheck,
  Plane, ShieldCheck, Truck
} from "lucide-react";

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Cotation", href: "/cotation" },
  { label: "À propos", href: "/a-propos" },
  { label: "Carrières", href: "/carrieres" },
];

export const services: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Transit maritime", description: "Gestion portuaire, enlèvement, manifeste et coordination des expéditions conteneurisées.", icon: Anchor },
  { title: "Transit aérien", description: "Traitement accéléré des cargaisons urgentes et sensibles avec suivi documentaire précis.", icon: Plane },
  { title: "Dédouanement", description: "Déclarations, conformité, fiscalité douanière et accompagnement jusqu'à la mainlevée.", icon: FileCheck2 },
  { title: "Transport terrestre", description: "Acheminement sécurisé par camion depuis le port, l'aéroport ou l'entrepôt.", icon: Truck },
  { title: "Livraison conteneurs", description: "Planification des livraisons, restitution, suivi des délais et coordination client.", icon: PackageCheck },
  { title: "Groupage", description: "Solutions LCL souples pour optimiser les coûts et accélérer les flux internationaux.", icon: Boxes },
  { title: "Logistique internationale", description: "Pilotage import/export de bout en bout avec partenaires portuaires et agents réseau.", icon: Globe2 },
  { title: "Assistance documentaire", description: "Vérification BL, facture, liste de colisage, certificat et documents réglementaires.", icon: ClipboardCheck },
];

export const strengths = [
  { title: "Rapidité d'exécution", icon: Clock3 },
  { title: "Fiabilité documentaire", icon: ShieldCheck },
  { title: "Expertise douanière", icon: BadgeCheck },
  { title: "Disponibilité 6j/7", icon: Headphones },
  { title: "Réseau international", icon: Network },
  { title: "Transparence totale", icon: BarChart3 },
];

export const stats = [
  { value: 350, prefix: "+", label: "clients / an" },
  { value: 1000, prefix: "+", label: "dossiers traités / an" },
  { value: 20, prefix: "+", label: "ans d'expérience" },
  { value: 96, suffix: "%", label: "satisfaction client" },
];

export const solutionPillars: Array<{ title: string; label: string; description: string; icon: LucideIcon }> = [
  { title: "Ocean freight", label: "Maritime", description: "Conteneurs FCL/LCL, coordination portuaire et enlèvement.", icon: Anchor },
  { title: "Air cargo", label: "Aérien", description: "Traitement rapide des expéditions sensibles ou urgentes.", icon: Plane },
  { title: "Inland delivery", label: "Terrestre", description: "Camionnage, livraison finale et restitution conteneur.", icon: Truck },
  { title: "Customs care", label: "Douane", description: "Dossier, conformité, taxes et assistance documentaire.", icon: FileCheck2 },
];

export const testimonials = [
  { name: "Ibrahima Diallo", role: "Directeur commercial, Dakar", quote: "Grâce à Soudane Transit, notre dossier était prêt avant l'arrivée du navire. Le dédouanement s'est fait sans blocage et dans les meilleurs délais. Une équipe sérieuse qui connaît le port de Dakar." },
  { name: "Fatou Sarr", role: "Responsable import/export", quote: "Depuis que nous travaillons avec eux, nous n'avons plus eu un seul problème documentaire. Réactifs, disponibles, et toujours honnêtes sur les délais." },
  { name: "Moussa Camara", role: "Importateur, Sénégal", quote: "Ce qui m'a convaincu, c'est leur disponibilité même le samedi. On sent qu'ils prennent nos opérations au sérieux comme si c'était les leurs." },
];

export const faqs = [
  { question: "Quels documents faut-il pour une cotation ?", answer: "La facture commerciale, la liste de colisage, l'origine, la destination, le type de marchandise et le volume ou poids suffisent pour une première estimation." },
  { question: "Pouvez-vous suivre un conteneur depuis l'étranger ?", answer: "Oui. L'équipe suit le BL, le conteneur et les étapes portuaires pour informer le client avant chaque action importante." },
  { question: "Gérez-vous les livraisons hors Dakar ?", answer: "Oui, les livraisons peuvent être organisées à Dakar et vers les régions selon le type de marchandise et le planning transport." },
  { question: "Le calcul CBM remplace-t-il une cotation officielle ?", answer: "Non. Il donne une estimation utile. La cotation finale dépend du mode de transport, des frais portuaires, des taxes et des contraintes opérationnelles." },
];

export type Job = { title: string; type: string; location: string; description: string };

export const heroImage = "https://images.unsplash.com/photo-1774199102899-db6a49abb42b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=76&w=2400";
export const aerialImage = "https://images.unsplash.com/photo-1769144256227-5185141c3aca?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=76&w=1800";
