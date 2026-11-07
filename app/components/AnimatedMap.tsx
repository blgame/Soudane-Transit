"use client";

import { motion } from "framer-motion";

const HUB = { x: 222, y: 238 };

const routes = [
  { x: 215, y: 150, label: "Casablanca",  cpx: 218, cpy: 194, delay: 0.3 },
  { x: 310, y: 110, label: "Le Havre",    cpx: 267, cpy: 156, delay: 0.8 },
  { x: 68,  y: 162, label: "New York",    cpx: 140, cpy: 155, delay: 1.3 },
  { x: 530, y: 180, label: "Dubaï",       cpx: 382, cpy: 145, delay: 1.8 },
  { x: 275, y: 300, label: "Lagos",       cpx: 248, cpy: 269, delay: 2.3 },
];

function routePath(r: (typeof routes)[0]) {
  return `M ${HUB.x},${HUB.y} Q ${r.cpx},${r.cpy} ${r.x},${r.y}`;
}

export function AnimatedMap() {
  return (
    <svg
      viewBox="0 0 680 410"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="ocean" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>

      {/* Ocean grid */}
      <rect width="680" height="410" fill="url(#ocean)" />

      {/* ── Continents ──────────────────────────────────────── */}

      {/* Africa */}
      <path
        d="M 222,238 L 215,150 L 286,126 L 392,131 L 450,152 L 544,196 L 528,266 L 488,355 L 438,393 L 392,400 L 348,386 L 308,335 L 288,280 L 274,241 Z"
        fill="rgba(11,107,58,0.2)"
        stroke="rgba(11,107,58,0.55)"
        strokeWidth="1.2"
      />

      {/* Europe */}
      <path
        d="M 263,116 L 300,101 L 344,96 L 395,101 L 420,116 L 414,137 L 395,152 L 360,157 L 330,147 L 300,152 L 273,142 Z"
        fill="rgba(11,107,58,0.2)"
        stroke="rgba(11,107,58,0.55)"
        strokeWidth="1.2"
      />

      {/* North America (east) */}
      <path
        d="M 10,91 L 102,84 L 143,104 L 156,131 L 150,161 L 128,181 L 96,181 L 64,171 L 33,153 L 13,133 Z"
        fill="rgba(11,107,58,0.2)"
        stroke="rgba(11,107,58,0.55)"
        strokeWidth="1.2"
      />

      {/* Arabian Peninsula */}
      <path
        d="M 497,136 L 562,134 L 592,152 L 594,179 L 573,209 L 547,219 L 527,209 L 507,192 L 493,170 Z"
        fill="rgba(11,107,58,0.2)"
        stroke="rgba(11,107,58,0.55)"
        strokeWidth="1.2"
      />

      {/* South America (partial) */}
      <path
        d="M 92,228 L 136,218 L 163,234 L 168,270 L 156,308 L 134,326 L 106,321 L 91,300 L 88,264 Z"
        fill="rgba(11,107,58,0.2)"
        stroke="rgba(11,107,58,0.55)"
        strokeWidth="1.2"
      />

      {/* ── Route lines ─────────────────────────────────────── */}
      {routes.map((route) => (
        <motion.path
          key={route.label}
          d={routePath(route)}
          stroke="#F47B20"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ duration: 1.3, delay: route.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Moving ship dots ────────────────────────────────── */}
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

      {/* ── Dakar pulse rings ───────────────────────────────── */}
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

      {/* ── Dakar hub dot ───────────────────────────────────── */}
      <circle cx={HUB.x} cy={HUB.y} r={7} fill="#F47B20" />
      <circle cx={HUB.x} cy={HUB.y} r={3.5} fill="white" />

      {/* ── Dakar label ─────────────────────────────────────── */}
      <text x={HUB.x + 13} y={HUB.y + 4} fill="white" fontSize="11.5" fontWeight="800" letterSpacing="0.07em">
        DAKAR
      </text>
      <text x={HUB.x + 13} y={HUB.y + 16} fill="rgba(255,255,255,0.55)" fontSize="8.5" fontWeight="600" letterSpacing="0.05em">
        Hub logistique
      </text>

      {/* ── Destination labels ──────────────────────────────── */}
      {routes.map((route) => {
        const isLeft = route.x < HUB.x;
        return (
          <motion.g
            key={`dest-${route.label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: route.delay + 1.2, duration: 0.5 }}
          >
            <circle cx={route.x} cy={route.y} r={4.5} fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1" />
            <circle cx={route.x} cy={route.y} r={2} fill="white" />
            <text
              x={isLeft ? route.x - 8 : route.x + 8}
              y={route.y - 7}
              fill="rgba(255,255,255,0.85)"
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
  );
}
