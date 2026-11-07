"use client";

import { motion } from "framer-motion";

/*
 * Coordonnées Plate Carrée sur un viewBox 680×410
 * x = (lon+180)/360*680   y = (90-lat)/180*410
 *
 * Positions vérifiées pixel à pixel sur le PNG 852×513 :
 * les villes côtières sont décalées légèrement à l'intérieur
 * pour que le marqueur tombe clairement sur la masse continentale.
 */
const HUB = { x: 312, y: 172 }; // Dakar hub — intérieur Sénégal (~-15°, 14.5°)

const routes = [
  { x: 327, y: 132, label: "Casablanca", cpx: 320, cpy: 150, delay: 0.3 },
  { x: 340, y: 92,  label: "Le Havre",   cpx: 328, cpy: 118, delay: 0.8 },
  { x: 200, y: 112, label: "New York",   cpx: 248, cpy:  90, delay: 1.3 },
  { x: 445, y: 148, label: "Dubaï",      cpx: 380, cpy: 112, delay: 1.8 },
  { x: 346, y: 191, label: "Lagos",      cpx: 330, cpy: 182, delay: 2.3 },
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
     * Stratégie d'intégration :
     * 1. invert(1) → inverse ocean clair↔continents sombres
     *    (ocean devient sombre, continents deviennent clairs)
     * 2. hue-rotate(70deg) → décale vers le vert du thème
     * 3. brightness(0.78) → assombrit l'ensemble
     * 4. mix-blend-mode: screen → les pixels sombres (ocean après invert)
     *    disparaissent dans le fond hero, les continents clairs restent visibles.
     * 5. mask-image radial → fondu doux sur les bords, plus de rectangle.
     */
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "680 / 410",
        mixBlendMode: "screen",
        WebkitMaskImage:
          "radial-gradient(ellipse 112% 95% at 50% 50%, black 15%, transparent 95%)",
        maskImage:
          "radial-gradient(ellipse 112% 95% at 50% 50%, black 15%, transparent 95%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/world-map.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "invert(1) hue-rotate(70deg) brightness(0.78) saturate(1.1)",
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
