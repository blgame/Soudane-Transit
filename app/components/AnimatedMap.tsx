"use client";

import { motion } from "framer-motion";

const HUB = { x: 222, y: 235 };

const routes = [
  { x: 215, y: 148, label: "Casablanca", cpx: 218, cpy: 192, delay: 0.3 },
  { x: 310, y: 108, label: "Le Havre",   cpx: 265, cpy: 155, delay: 0.8 },
  { x: 68,  y: 158, label: "New York",   cpx: 140, cpy: 152, delay: 1.3 },
  { x: 510, y: 178, label: "Dubaï",      cpx: 368, cpy: 142, delay: 1.8 },
  { x: 275, y: 300, label: "Lagos",      cpx: 248, cpy: 268, delay: 2.3 },
];

function routePath(r: (typeof routes)[0]) {
  return `M ${HUB.x},${HUB.y} Q ${r.cpx},${r.cpy} ${r.x},${r.y}`;
}

export function AnimatedMap() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-green-900/50 shadow-[0_0_40px_rgba(11,107,58,0.25)]">
      <svg
        viewBox="0 0 680 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* ── Dark ocean background ────────────────────────── */}
        <rect width="680" height="410" fill="#061410" />

        <defs>
          <pattern id="ocean" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="1" fill="rgba(255,255,255,0.06)" />
          </pattern>
          {/* subtle vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </radialGradient>
        </defs>
        <rect width="680" height="410" fill="url(#ocean)" />

        {/* ── Continents ──────────────────────────────────── */}
        {/* Africa — Dakar is the westernmost tip at HUB */}
        <path
          d={`
            M 215,148 L 232,132 L 258,126 L 300,124 L 345,124 L 395,128
            L 435,142 L 465,152 L 548,193 L 548,210 L 535,245 L 526,268
            L 510,308 L 495,340 L 468,375 L 450,394 L 420,402
            L 392,402 L 364,392 L 338,372 L 318,344 L 302,315
            L 290,290 L 285,272 L 275,258 L 258,250 L 245,246
            L 232,242 L 222,236 L 220,220 L 218,195 L 215,165 Z
          `}
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Europe — Iberian peninsula, France, Germany, Balkans */}
        <path
          d={`
            M 258,118 L 265,105 L 278,98 L 298,96 L 318,96 L 342,94
            L 368,98 L 388,100 L 408,106 L 420,114 L 418,130
            L 408,142 L 395,150 L 378,152 L 358,148 L 345,142
            L 340,152 L 345,160 L 335,160 L 328,148 L 318,142
            L 318,152 L 310,158 L 302,148 L 296,138 L 285,132
            L 278,138 L 268,135 L 260,128 L 258,118 Z
          `}
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* UK / British Isles */}
        <path
          d="M 262,88 L 272,80 L 282,80 L 288,88 L 285,96 L 274,100 L 264,96 Z"
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.2"
        />

        {/* North America — east coast + eastern landmass */}
        <path
          d={`
            M 12,88 L 55,78 L 95,76 L 128,82 L 155,96 L 165,118
            L 162,142 L 155,162 L 145,178 L 130,188 L 110,192
            L 88,190 L 65,182 L 42,168 L 22,150 L 10,128 Z
          `}
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Florida peninsula stub */}
        <path
          d="M 148,178 L 152,192 L 148,205 L 142,198 L 140,185 L 145,178 Z"
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1"
        />

        {/* South America — partial (east coast) */}
        <path
          d={`
            M 92,228 L 115,218 L 140,220 L 162,232 L 170,255
            L 165,285 L 155,315 L 140,335 L 118,340 L 100,330
            L 88,308 L 84,278 L 86,252 Z
          `}
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Arabian Peninsula */}
        <path
          d={`
            M 476,138 L 505,130 L 538,130 L 565,142 L 574,160
            L 571,185 L 557,208 L 538,220 L 518,218 L 500,208
            L 485,192 L 474,172 Z
          `}
          fill="rgba(11,107,58,0.42)"
          stroke="rgba(20,180,80,0.65)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Iran/subcontinent hint */}
        <path
          d="M 575,145 L 618,138 L 645,148 L 648,165 L 634,175 L 616,180 L 592,172 L 578,160 Z"
          fill="rgba(11,107,58,0.35)"
          stroke="rgba(20,180,80,0.5)"
          strokeWidth="1"
        />

        {/* Vignette overlay */}
        <rect width="680" height="410" fill="url(#vignette)" />

        {/* ── Route lines ──────────────────────────────────── */}
        {routes.map((route) => (
          <motion.path
            key={route.label}
            d={routePath(route)}
            stroke="#F47B20"
            strokeWidth="1.6"
            strokeDasharray="5 4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.4, delay: route.delay, ease: "easeInOut" }}
          />
        ))}

        {/* ── Moving ship dots ─────────────────────────────── */}
        {routes.map((route) => (
          <motion.circle
            key={`ship-${route.label}`}
            r={3.5}
            fill="#F47B20"
            initial={{ opacity: 0 }}
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

        {/* ── Dakar hub dot ────────────────────────────────── */}
        <circle cx={HUB.x} cy={HUB.y} r={7} fill="#F47B20" />
        <circle cx={HUB.x} cy={HUB.y} r={3.5} fill="white" />

        {/* ── Dakar label ──────────────────────────────────── */}
        <text x={HUB.x + 13} y={HUB.y + 4} fill="white" fontSize="11.5" fontWeight="800" letterSpacing="0.07em">
          DAKAR
        </text>
        <text x={HUB.x + 13} y={HUB.y + 16} fill="rgba(255,255,255,0.5)" fontSize="8.5" fontWeight="600" letterSpacing="0.05em">
          Hub logistique
        </text>

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
              <circle cx={route.x} cy={route.y} r={4.5} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
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
