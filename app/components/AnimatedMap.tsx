"use client";

import { motion } from "framer-motion";

/*
 * Coordonnées Plate Carrée sur un viewBox 680×410
 * x = (lon+180)/360*680   y = (90-lat)/180*410
 */
const HUB = { x: 307, y: 172 }; // Dakar (-17.4°, 14.7°)

const routes = [
  { x: 326, y: 129, label: "Casablanca", cpx: 318, cpy: 148, delay: 0.3 },
  { x: 340, y: 92,  label: "Le Havre",   cpx: 326, cpy: 118, delay: 0.8 },
  { x: 200, y: 112, label: "New York",   cpx: 248, cpy:  95, delay: 1.3 },
  { x: 445, y: 148, label: "Dubaï",      cpx: 378, cpy: 115, delay: 1.8 },
  { x: 346, y: 191, label: "Lagos",      cpx: 328, cpy: 181, delay: 2.3 },
];

function routePath(r: (typeof routes)[0]) {
  return `M ${HUB.x},${HUB.y} Q ${r.cpx},${r.cpy} ${r.x},${r.y}`;
}

export function AnimatedMap() {
  return (
    /*
     * aspect-ratio garantit une hauteur même si le parent n'en a pas.
     * Le masque radial crée un fondu doux sur les bords.
     */
    /*
     * mix-blend-mode: screen → les pixels sombres (océan) deviennent transparents,
     * seuls les continents clairs et les routes orangées restent visibles.
     * Plus de rectangle noir visible sur le fond hero.
     */
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "680 / 410",
        mixBlendMode: "screen",
        /* Fondu progressif sur les bords */
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 78% at 52% 50%, black 20%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 85% 78% at 52% 50%, black 20%, transparent 82%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/world-map.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "hue-rotate(270deg) saturate(1.1) brightness(0.75) contrast(1.2)",
        }}
      />

      {/* SVG d'animations par-dessus la carte */}
      <svg
        viewBox="0 0 680 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* ── Route lines ──────────────────────────────────── */}
        {routes.map((route) => (
          <motion.path
            key={route.label}
            d={routePath(route)}
            stroke="#F47B20"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.4, delay: route.delay, ease: "easeInOut" }}
          />
        ))}

        {/* ── Moving ship dots ─────────────────────────────── */}
        {routes.map((route) => (
          <motion.circle
            key={`ship-${route.label}`}
            cx={HUB.x}
            cy={HUB.y}
            r={3.5}
            fill="#F47B20"
            animate={{
              cx: [HUB.x, route.cpx, route.x, route.x],
              cy: [HUB.y, route.cpy, route.y, route.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              delay: route.delay + 1.6,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "linear",
            }}
          />
        ))}

        {/* ── Dakar pulse rings ────────────────────────────── */}
        {[0, 0.65, 1.3].map((d) => (
          <motion.circle
            key={d}
            cx={HUB.x}
            cy={HUB.y}
            fill="none"
            stroke="#F47B20"
            strokeWidth="1.5"
            initial={{ r: 7, opacity: 0.9 }}
            animate={{ r: 34, opacity: 0 }}
            transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* ── Dakar hub ────────────────────────────────────── */}
        <circle cx={HUB.x} cy={HUB.y} r={7} fill="#F47B20" />
        <circle cx={HUB.x} cy={HUB.y} r={3.5} fill="white" />
        <text x={HUB.x + 12} y={HUB.y + 4} fill="white" fontSize="11" fontWeight="800" letterSpacing="0.07em">DAKAR</text>
        <text x={HUB.x + 12} y={HUB.y + 15} fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="600" letterSpacing="0.05em">Hub logistique</text>

        {/* ── Destination labels ───────────────────────────── */}
        {routes.map((route) => {
          const isLeft = route.x < HUB.x;
          return (
            <motion.g
              key={`dest-${route.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: route.delay + 1.2, duration: 0.5 }}
            >
              <circle cx={route.x} cy={route.y} r={4.5} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
              <circle cx={route.x} cy={route.y} r={2} fill="white" />
              <text
                x={isLeft ? route.x - 8 : route.x + 8}
                y={route.y - 7}
                fill="rgba(255,255,255,0.9)"
                fontSize="9.5"
                fontWeight="700"
                textAnchor={isLeft ? "end" : "start"}
                letterSpacing="0.04em"
              >
                {route.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
