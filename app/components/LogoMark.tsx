import Link from "next/link";

export function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Soudane Transit">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-brand-green text-sm font-black text-white shadow-lg shadow-brand-green/20">
        ST
        <span className="absolute bottom-0 right-0 h-3 w-6 bg-brand-orange" />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-black text-brand-dark dark:text-white">Soudane</span>
        <span className="block text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">Transit</span>
      </span>
    </Link>
  );
}
