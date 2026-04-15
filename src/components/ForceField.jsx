import { useState, useMemo } from "react";
import { forces } from "../data/constants";

const MAX_W = 280;

const strengthLabel = (s) => {
  if (s === 5) return "Very Strong";
  if (s === 4) return "Strong";
  if (s === 3) return "Moderate";
  if (s === 2) return "Mild";
  return "Weak";
};

/* CSS triangle arrow head pointing toward center */
const ArrowHead = ({ direction, active }) => {
  const isRight = direction === "right";
  return (
    <div
      className="flex-shrink-0 transition-all duration-500"
      style={{
        width: 0, height: 0,
        borderTop: "14px solid transparent",
        borderBottom: "14px solid transparent",
        ...(isRight
          ? { borderLeft: `14px solid ${active ? "#2d6a4f" : "#6aab86"}` }
          : { borderRight: `14px solid ${active ? "#b5451b" : "#d4866a"}` }),
        filter: active ? `drop-shadow(${isRight ? "2px" : "-2px"} 0 6px ${isRight ? "rgba(45,106,79,0.35)" : "rgba(181,69,27,0.35)"})` : "none",
      }}
    />
  );
};

export default function ForceField() {
  const [active, setActive] = useState(null);
  const driving = useMemo(() => [...forces.driving].sort((a, b) => b.s - a.s), []);
  const restraining = useMemo(() => [...forces.restraining].sort((a, b) => b.s - a.s), []);

  const drivingTotal = driving.reduce((sum, f) => sum + f.s, 0);
  const restrainingTotal = restraining.reduce((sum, f) => sum + f.s, 0);
  const balance = drivingTotal - restrainingTotal;

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-amber-700/60 italic mb-6">Tap any force to see more</p>

      {/* Score summary */}
      <div className="flex justify-center items-center gap-3 sm:gap-6 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Driving: {drivingTotal}</span>
        </div>
        <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${balance > 0 ? "bg-emerald-100 text-emerald-700" : balance < 0 ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`}>
          {balance > 0 ? `+${balance} net driving` : balance < 0 ? `${balance} net restraining` : "balanced"}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-orange-500" />
          <span className="text-sm font-semibold text-orange-700">Restraining: {restrainingTotal}</span>
        </div>
      </div>

      {/* Mobile layout — vertical stack, full-width bars per force */}
      <div className="md:hidden space-y-6">
        {/* Driving forces */}
        <div>
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-emerald-200" />
            Driving Forces &rarr;
            <span className="h-px flex-1 bg-emerald-200" />
          </div>
          <div className="space-y-2">
            {driving.map((d, i) => {
              const key = `d${i}`;
              const isActive = active === key;
              return (
                <div key={key} onClick={() => setActive(isActive ? null : key)}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 transition-all duration-300
                    ${isActive
                      ? "bg-emerald-50 border-emerald-300 shadow-md shadow-emerald-900/10"
                      : "bg-white/70 border-emerald-100 active:bg-emerald-50/60"
                    } ${active !== null && !isActive ? "opacity-40" : ""}`}>
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className={`shrink-0 text-[11px] px-1.5 py-0.5 rounded-full font-bold
                      ${isActive ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                      {d.s}/5
                    </span>
                    <span className={`text-sm leading-snug ${isActive ? "font-bold text-emerald-900" : "text-emerald-800"}`}>
                      {d.label}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 rounded-l-md relative overflow-hidden transition-all duration-500"
                      style={{
                        width: `${(d.s / 5) * 92}%`,
                        background: isActive
                          ? "linear-gradient(to right, #40916c, #2d6a4f)"
                          : "linear-gradient(to right, #95d5b2, #6aab86)",
                      }}>
                      {d.s >= 2 && (
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/90 font-medium whitespace-nowrap">
                          {strengthLabel(d.s)}
                        </span>
                      )}
                    </div>
                    <div style={{
                      width: 0, height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: `10px solid ${isActive ? "#2d6a4f" : "#6aab86"}`,
                    }} />
                  </div>
                  {isActive && (
                    <div className="text-xs text-emerald-900 leading-relaxed bg-white/70 border border-emerald-200 rounded-lg p-3 mt-2.5">
                      {d.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center divider — proposed change */}
        <div className="flex items-center gap-3 px-4">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-400 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Proposed Reform</span>
          <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-400 rounded-full" />
        </div>

        {/* Restraining forces */}
        <div>
          <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-orange-200" />
            &larr; Barriers to Reform
            <span className="h-px flex-1 bg-orange-200" />
          </div>
          <div className="space-y-2">
            {restraining.map((r, i) => {
              const key = `r${i}`;
              const isActive = active === key;
              return (
                <div key={key} onClick={() => setActive(isActive ? null : key)}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 transition-all duration-300
                    ${isActive
                      ? "bg-orange-50 border-orange-300 shadow-md shadow-orange-900/10"
                      : "bg-white/70 border-orange-100 active:bg-orange-50/60"
                    } ${active !== null && !isActive ? "opacity-40" : ""}`}>
                  <div className="flex items-start justify-end gap-2 mb-1.5">
                    <span className={`text-sm leading-snug text-right ${isActive ? "font-bold text-orange-900" : "text-orange-700"}`}>
                      {r.label}
                    </span>
                    <span className={`shrink-0 text-[11px] px-1.5 py-0.5 rounded-full font-bold
                      ${isActive ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"}`}>
                      {r.s}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <div style={{
                      width: 0, height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderRight: `10px solid ${isActive ? "#b5451b" : "#d4866a"}`,
                    }} />
                    <div className="h-5 rounded-r-md relative overflow-hidden transition-all duration-500"
                      style={{
                        width: `${(r.s / 5) * 92}%`,
                        background: isActive
                          ? "linear-gradient(to left, #e76f51, #b5451b)"
                          : "linear-gradient(to left, #e8a88e, #d4866a)",
                      }}>
                      {r.s >= 2 && (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/90 font-medium whitespace-nowrap">
                          {strengthLabel(r.s)}
                        </span>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <div className="text-xs text-orange-900 leading-relaxed bg-white/70 border border-orange-200 rounded-lg p-3 mt-2.5">
                      {r.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop layout — tug-of-war bars meeting at the reform line */}
      <div className="hidden md:block">
        {/* Column headers */}
        <div className="grid mb-5" style={{ gridTemplateColumns: "1fr 3px 1fr" }}>
          <div className="text-center text-xs font-bold text-emerald-700 uppercase tracking-widest pb-2">Driving Forces &rarr;</div>
          <div />
          <div className="text-center text-xs font-bold text-orange-600 uppercase tracking-widest pb-2">&larr; Barriers to Reform</div>
        </div>

        {Array.from({ length: Math.max(driving.length, restraining.length) }).map((_, i) => {
          const d = driving[i];
          const r = restraining[i];
          const dKey = `d${i}`, rKey = `r${i}`;
          return (
            <div key={i} className="grid items-start mb-5" style={{ gridTemplateColumns: "1fr 3px 1fr" }}>
              {/* Driving force (left side) — arrow points right toward center */}
              {d ? (
                <div onClick={() => setActive(active === dKey ? null : dKey)}
                  className={`group flex flex-col items-end cursor-pointer pr-1 transition-all duration-300 ${active !== null && active !== dKey ? "opacity-30" : ""}`}>
                  <div className="flex items-center gap-2 justify-end w-full mb-1.5 pr-1">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium transition-all duration-300
                      ${active === dKey ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                      {d.s}/5
                    </span>
                    <span className={`text-sm text-emerald-800 text-right leading-snug transition-all duration-300 ${active === dKey ? "font-bold" : "group-hover:text-emerald-900"}`}>
                      {d.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-end w-full">
                    {/* Bar body */}
                    <div className="h-7 rounded-l-md transition-all duration-500 ease-out relative overflow-hidden"
                      style={{
                        width: (d.s / 5) * MAX_W,
                        background: active === dKey
                          ? "linear-gradient(to right, #40916c, #2d6a4f)"
                          : "linear-gradient(to right, #95d5b2, #6aab86)",
                        boxShadow: active === dKey ? "0 3px 12px rgba(45,106,79,0.35)" : "0 1px 3px rgba(45,106,79,0.1)",
                      }}>
                      {d.s >= 2 && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/80 font-medium whitespace-nowrap">
                          {strengthLabel(d.s)}
                        </span>
                      )}
                    </div>
                    {/* Arrow head pointing right → toward center */}
                    <ArrowHead direction="right" active={active === dKey} />
                  </div>
                  {active === dKey && (
                    <div className="text-sm text-emerald-900 text-left leading-relaxed bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-2 shadow-lg shadow-emerald-900/10 max-w-md ml-auto">
                      {d.desc}
                    </div>
                  )}
                </div>
              ) : <div />}

              {/* Center divider — the "proposed change" line */}
              <div className="self-stretch bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 rounded-full shadow-sm" />

              {/* Restraining force (right side) — arrow points left toward center */}
              {r ? (
                <div onClick={() => setActive(active === rKey ? null : rKey)}
                  className={`group flex flex-col items-start cursor-pointer pl-1 transition-all duration-300 ${active !== null && active !== rKey ? "opacity-30" : ""}`}>
                  <div className="flex items-center gap-2 w-full mb-1.5 pl-1">
                    <span className={`text-sm text-orange-700 leading-snug transition-all duration-300 ${active === rKey ? "font-bold" : "group-hover:text-orange-800"}`}>
                      {r.label}
                    </span>
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium transition-all duration-300
                      ${active === rKey ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"}`}>
                      {r.s}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-full">
                    {/* Arrow head pointing left ← toward center */}
                    <ArrowHead direction="left" active={active === rKey} />
                    {/* Bar body */}
                    <div className="h-7 rounded-r-md transition-all duration-500 ease-out relative overflow-hidden"
                      style={{
                        width: (r.s / 5) * MAX_W,
                        background: active === rKey
                          ? "linear-gradient(to left, #e76f51, #b5451b)"
                          : "linear-gradient(to left, #e8a88e, #d4866a)",
                        boxShadow: active === rKey ? "0 3px 12px rgba(181,69,27,0.35)" : "0 1px 3px rgba(181,69,27,0.1)",
                      }}>
                      {r.s >= 2 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/80 font-medium whitespace-nowrap">
                          {strengthLabel(r.s)}
                        </span>
                      )}
                    </div>
                  </div>
                  {active === rKey && (
                    <div className="text-sm text-orange-900 leading-relaxed bg-orange-50 border border-orange-200 rounded-xl p-4 mt-2 shadow-lg shadow-orange-900/10 max-w-md">
                      {r.desc}
                    </div>
                  )}
                </div>
              ) : <div />}
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 w-24 h-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      <p className="text-center text-sm text-amber-700/50 italic mt-4">
        Reform becomes viable when driving forces are strengthened or barriers are weakened
      </p>
    </div>
  );
}
