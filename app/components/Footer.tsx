import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { navItems } from "../lib/data";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#052c1d] pt-16 text-white">
      <div className="container-shell grid gap-10 pb-12 lg:grid-cols-[1fr_0.8fr_1.1fr]">
        <div>
          <LogoMark />
          <p className="mt-5 max-w-sm leading-8 text-white/70">
            Transit, dédouanement et logistique internationale pour les entreprises import/export basées au Sénégal et à l'international.
          </p>
          <div className="mt-6">
            <a
              href="mailto:kessotransit@yahoo.fr"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 transition hover:border-brand-orange hover:text-white"
            >
              <Mail className="h-4 w-4 text-brand-orange" />
              kessotransit@yahoo.fr
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-brand-orange">Liens rapides</h3>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-white/70 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-brand-orange">Contact</h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
            <span className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-orange" />Rue du Liban x Brazza, Dakar</span>
            <span className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-orange" />+221 33 842 78 35</span>
            <span className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-orange" />kessotransit@yahoo.fr</span>
            <span className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-brand-orange" />Lun - Sam : 08h30 - 18h00</span>
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
  );
}
