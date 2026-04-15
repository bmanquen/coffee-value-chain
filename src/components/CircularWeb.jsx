import { useState, useRef, useEffect } from "react";
import { webNodes } from "../data/constants";

const FLOW = {
  cherry: { color: "#16a34a", bg: "#dcfce7", icon: "🍒", stroke: "#22c55e" },
  money:  { color: "#d97706", bg: "#fef3c7", icon: "💰", stroke: "#f59e0b" },
  info:   { color: "#2563eb", bg: "#dbeafe", icon: "📡", stroke: "#60a5fa" },
};

const NODE_R = 46;
const CENTER_R = 52;
const LINE_W = { strong: 5, medium: 3.5, weak: 2 };

const STRENGTH_COLOR = {
  strong: { base: "#5c3a1e", glow: "#8b5e3c" },
  medium: { base: "#a07850", glow: "#c4a882" },
  weak:   { base: "#c4a882", glow: "#d9c4a8" },
};

const toRad = (deg) => ((deg - 90) * Math.PI) / 180;

const nodePos = (n, cx, cy, r) => {
  const a = toRad(n.angle);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const shrink = (x1, y1, x2, y2, padStart, padEnd) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { x1, y1, x2, y2 };
  const ux = dx / len, uy = dy / len;
  return {
    x1: x1 + ux * padStart, y1: y1 + uy * padStart,
    x2: x2 - ux * padEnd,   y2: y2 - uy * padEnd,
  };
};



const STRENGTH_BADGE = {
  strong: "bg-amber-800 text-amber-100",
  medium: "bg-amber-200 text-amber-800",
  weak:   "bg-amber-100 text-amber-600",
};

export default function CircularWeb() {
  const [active, setActive] = useState(null);
  const detailRef = useRef(null);

  const CX = 480, CY = 340, R = 280;
  const positions = webNodes.map((n) => nodePos(n, CX, CY, R));

  // Mini diagram geometry (mobile/tablet)
  const MINI_CX = 160, MINI_CY = 160, MINI_R = 110;
  const MINI_CENTER_R = 34, MINI_NODE_R = 26;
  const miniPositions = webNodes.map((n) => nodePos(n, MINI_CX, MINI_CY, MINI_R));

  const activeNode = active !== null ? webNodes[active] : null;

  const handleNodeTap = (i) => {
    setActive(active === i ? null : i);
  };

  useEffect(() => {
    if (active !== null) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [active]);

  return (
    <div>
      <p className="text-center text-sm text-amber-700/60 italic mb-3">
        Tap any actor to see what they exchange with the Coyote
      </p>

      {/* Mobile/tablet: mini hub diagram + actor card list */}
      <div className="lg:hidden max-w-xl mx-auto">
        <svg viewBox="0 0 320 320" className="w-full max-w-[340px] md:max-w-md mx-auto block mb-5">
          <defs>
            <radialGradient id="mini-bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mini-center-grad">
              <stop offset="0%" stopColor="#fffbf0" />
              <stop offset="100%" stopColor="#f5e6d0" />
            </radialGradient>
            <radialGradient id="mini-node-grad">
              <stop offset="0%" stopColor="#fffcf5" />
              <stop offset="100%" stopColor="#f5ead8" />
            </radialGradient>
            <radialGradient id="mini-node-active-grad">
              <stop offset="0%" stopColor="#5c3a1e" />
              <stop offset="100%" stopColor="#3a2210" />
            </radialGradient>
          </defs>

          {/* Background glow */}
          <circle cx={MINI_CX} cy={MINI_CY} r={MINI_R + 30} fill="url(#mini-bg-glow)" />

          {/* Spokes */}
          {webNodes.map((n, i) => {
            const p = miniPositions[i];
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            const seg = shrink(MINI_CX, MINI_CY, p.x, p.y, MINI_CENTER_R + 2, MINI_NODE_R + 2);
            const sc = STRENGTH_COLOR[n.strength];
            const w = n.strength === "strong" ? 3 : n.strength === "medium" ? 2 : 1.25;
            return (
              <line key={`mini-spoke-${i}`}
                x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                stroke={isActive ? sc.base : sc.glow}
                strokeWidth={isActive ? w + 1 : w}
                strokeLinecap="round"
                opacity={dimmed ? 0.15 : 1} />
            );
          })}

          {/* Center coyote */}
          <circle cx={MINI_CX} cy={MINI_CY} r={MINI_CENTER_R}
            fill="url(#mini-center-grad)" stroke="#5c3a1e" strokeWidth={2} />
          <text x={MINI_CX} y={MINI_CY + 9} textAnchor="middle" fontSize={30}>🤠</text>

          {/* Outer nodes */}
          {webNodes.map((n, i) => {
            const p = miniPositions[i];
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <g key={`mini-node-${i}`}
                onClick={() => handleNodeTap(i)}
                className="cursor-pointer"
                opacity={dimmed ? 0.3 : 1}>
                {isActive && (
                  <circle cx={p.x} cy={p.y} r={MINI_NODE_R + 6}
                    fill="none" stroke="#d97706" strokeWidth={1.5}
                    opacity={0.6} strokeDasharray="3,3" />
                )}
                <circle cx={p.x} cy={p.y} r={MINI_NODE_R}
                  fill={isActive ? "url(#mini-node-active-grad)" : "url(#mini-node-grad)"}
                  stroke={isActive ? "#d97706" : "#c4956a"}
                  strokeWidth={isActive ? 2 : 1.25} />
                <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={24}>{n.icon}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Desktop: full radial SVG */}
      <div className="hidden lg:block">
      <svg viewBox="0 0 960 700" className="w-full max-w-4xl block mx-auto">
        <defs>
          {/* Gradients */}
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#fef3c7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="center-grad">
            <stop offset="0%" stopColor="#fffbf0" />
            <stop offset="100%" stopColor="#f5e6d0" />
          </radialGradient>
          <radialGradient id="node-grad">
            <stop offset="0%" stopColor="#fffcf5" />
            <stop offset="100%" stopColor="#f5ead8" />
          </radialGradient>
          <radialGradient id="node-active-grad">
            <stop offset="0%" stopColor="#5c3a1e" />
            <stop offset="100%" stopColor="#3a2210" />
          </radialGradient>
          {/* Filters */}
          <filter id="center-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#5c3a1e" floodOpacity="0.25" />
          </filter>
          <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5c3a1e" floodOpacity="0.12" />
          </filter>
          <filter id="active-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#d97706" floodOpacity="0.4" />
          </filter>
          <filter id="spoke-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d97706" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx={CX} cy={CY} r={R + 60} fill="url(#bg-glow)" />

        {/* Concentric guide rings */}
        {[0.4, 0.7, 1.0].map((f, i) => (
          <circle key={i} cx={CX} cy={CY} r={R * f}
            fill="none" stroke="#d4a574" strokeWidth={0.5}
            opacity={0.08 + i * 0.04} strokeDasharray="3,8" />
        ))}


        {/* Primary spokes */}
        {webNodes.map((n, i) => {
          const p = positions[i];
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          const seg = shrink(CX, CY, p.x, p.y, CENTER_R + 10, NODE_R + 10);
          const sc = STRENGTH_COLOR[n.strength];

          return (
            <g key={`spoke-${i}`}
              opacity={dimmed ? 0.06 : 1}
              style={{ transition: "opacity 0.4s ease-out" }}>
              {/* Glow behind active spoke */}
              {isActive && (
                <line
                  x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                  stroke={sc.glow} strokeWidth={LINE_W[n.strength] + 10}
                  opacity={0.15} strokeLinecap="round"
                />
              )}
              {/* Main spoke line */}
              <line
                x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                stroke={isActive ? sc.base : sc.glow}
                strokeWidth={isActive ? LINE_W[n.strength] + 1.5 : LINE_W[n.strength]}
                strokeLinecap="round"
                filter={isActive ? "url(#spoke-glow)" : undefined}
                style={{ transition: "all 0.4s ease-out" }}
              />
            </g>
          );
        })}

        {/* Center node: Coyote */}
        <g filter="url(#center-shadow)">
          <circle cx={CX} cy={CY} r={CENTER_R + 4}
            fill="none" stroke="#d4a574" strokeWidth={1} opacity={0.3} />
          <circle cx={CX} cy={CY} r={CENTER_R}
            fill="url(#center-grad)" stroke="#5c3a1e" strokeWidth={2.5} />
          <text x={CX} y={CY - 14} textAnchor="middle" fontSize={24}>🤠</text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#2c1810" fontFamily="serif">Coyote /</text>
          <text x={CX} y={CY + 24} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#2c1810" fontFamily="serif">Collector</text>
        </g>

        {/* Outer nodes */}
        {webNodes.map((n, i) => {
          const p = positions[i];
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          const lines = n.label.split("\n");

          return (
            <g key={`node-${i}`}
              onClick={() => handleNodeTap(i)}
              className="cursor-pointer"
              opacity={dimmed ? 0.1 : 1}
              filter={isActive ? "url(#active-glow)" : "url(#node-shadow)"}
              style={{ transition: "opacity 0.4s ease-out" }}>
              {/* Active ring */}
              {isActive && (
                <circle cx={p.x} cy={p.y} r={NODE_R + 9}
                  fill="none" stroke="#d97706" strokeWidth={2}
                  opacity={0.5} strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Strength ring */}
              <circle cx={p.x} cy={p.y} r={NODE_R + 3}
                fill="none"
                stroke={STRENGTH_COLOR[n.strength].base}
                strokeWidth={n.strength === "strong" ? 2.5 : n.strength === "medium" ? 1.5 : 1}
                opacity={isActive ? 0.6 : 0.2} />
              {/* Node body */}
              <circle cx={p.x} cy={p.y} r={NODE_R}
                fill={isActive ? "url(#node-active-grad)" : "url(#node-grad)"}
                stroke={isActive ? "#d97706" : "#c4956a"}
                strokeWidth={isActive ? 2.5 : 1.5} />
              {/* Icon */}
              <text x={p.x} y={p.y - (lines.length === 1 ? 10 : 16)}
                textAnchor="middle" fontSize={20}>
                {n.icon}
              </text>
              {/* Label */}
              {lines.map((line, li) => (
                <text key={li}
                  x={p.x}
                  y={p.y + (lines.length === 1 ? 12 : 4 + li * 14)}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={11} fontWeight="700" fontFamily="serif"
                  fill={isActive ? "#fef3c7" : "#2c1810"}>
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      </div>

      {/* Detail panel — shows the selected actor's info below the web */}
      <div ref={detailRef} className="max-w-2xl mx-auto mt-5" style={{ scrollMarginTop: 16 }}>
        {activeNode ? (
          <div className="px-5 sm:px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-xl shadow-amber-900/10 text-center transition-all duration-300">
            <p className="font-bold text-amber-900 text-base sm:text-lg">
              {activeNode.icon} {activeNode.label.replace("\n", " ")} &harr; 🤠 Coyote
              <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full align-middle ${STRENGTH_BADGE[activeNode.strength]}`}>
                {activeNode.strength} link
              </span>
            </p>
            <p className="text-amber-700 italic mt-1.5 text-sm leading-relaxed">
              {activeNode.rel}
            </p>
            <div className="flex justify-center gap-2 sm:gap-3 mt-3 flex-wrap">
              {activeNode.exchanges.map((ex, ei) => (
                <span key={ei}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm"
                  style={{ backgroundColor: FLOW[ex.type].bg, color: FLOW[ex.type].color }}>
                  {FLOW[ex.type].icon} {ex.desc}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 sm:px-6 py-4 bg-white/40 rounded-2xl border border-amber-200/50 text-center text-amber-600/50 text-sm italic">
            Select an actor to see the exchange details
          </div>
        )}

        {/* Strength legend */}
        <div className="flex justify-center gap-4 mt-5 flex-wrap text-[11px] text-amber-800">
          {[["Strong", "strong"], ["Medium", "medium"], ["Weak", "weak"]].map(([label, s]) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className="inline-block rounded-full"
                style={{ width: LINE_W[s] * 2, height: LINE_W[s] * 2, backgroundColor: STRENGTH_COLOR[s].base }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
