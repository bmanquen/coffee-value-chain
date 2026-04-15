import { useState } from "react";
import { scenes } from "../data/constants";

export default function Storyboard() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <p className="text-center text-sm text-amber-700/60 italic mb-5">
        Follow coffee cherry from farm gate through the coyote's hands — tap any stage
      </p>

      {/* Vertical timeline — mobile & tablet */}
      <div className="lg:hidden max-w-md md:max-w-2xl mx-auto">
        {scenes.map((s, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          const isFirst = i === 0;
          const isLast = i === scenes.length - 1;
          return (
            <div key={i} className="relative flex items-start gap-3 md:gap-4 mb-3 md:mb-4 last:mb-0">
              {/* Line above the dot — fills the top half of the row */}
              {!isFirst && (
                <div className="absolute left-[13px] md:left-[19px] top-0 h-7 md:h-[34px] w-0.5 bg-amber-400" />
              )}
              {/* Line below the dot — extends to the bottom of the row and through its margin */}
              {!isLast && (
                <div className="absolute left-[13px] md:left-[19px] top-7 md:top-[34px] -bottom-3 md:-bottom-4 w-0.5 bg-amber-400" />
              )}
              {/* Dot column — fixed height matches header so the dot centers on it */}
              <div className="shrink-0 w-7 md:w-10 h-14 md:h-[68px] flex items-center justify-center">
                <div className={`relative z-10 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "w-4 h-4 md:w-5 md:h-5 bg-amber-900 border-amber-900 shadow-lg shadow-amber-900/40"
                    : "w-3 h-3 md:w-3.5 md:h-3.5 bg-white border-amber-400"
                } ${dimmed ? "opacity-30" : ""}`} />
              </div>

              {/* Card */}
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                className={`flex-1 min-w-0 text-left rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isActive
                    ? "bg-white border-amber-400 shadow-xl shadow-amber-900/10"
                    : "bg-white/70 border-amber-200 shadow-sm active:bg-white hover:bg-white hover:border-amber-300"
                  } ${dimmed ? "opacity-30" : ""}`}>
                {/* Collapsed header */}
                <div className="flex items-center gap-3 md:gap-4 px-3.5 md:px-5 py-3 md:py-4">
                  <span className={`text-2xl md:text-3xl transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] md:text-xs text-amber-600 font-semibold uppercase tracking-wider">{s.time}</div>
                    <div className="text-sm md:text-base font-bold text-stone-900 leading-tight">{s.title}</div>
                  </div>
                  <span className={`shrink-0 inline-block rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 text-stone-900 font-bold"
                      : "bg-amber-100/80 text-amber-800"
                  }`}>
                    {s.lever}
                  </span>
                  <svg className={`shrink-0 w-4 h-4 md:w-5 md:h-5 text-amber-700 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Expanded body */}
                {isActive && (
                  <div className="px-3.5 md:px-5 pb-3.5 md:pb-5 pt-1 border-t border-amber-100">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 md:p-4 mb-2.5 md:mb-3 mt-3 md:mt-4">
                      <div className="text-xs md:text-sm font-bold text-orange-600 mb-1 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400" />
                        Conventional
                      </div>
                      <div className="text-sm md:text-base text-orange-900 leading-relaxed">{s.conv}</div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 md:p-4">
                      <div className="text-xs md:text-sm font-bold text-emerald-700 mb-1 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Sustainable
                      </div>
                      <div className="text-sm md:text-base text-emerald-900 leading-relaxed">{s.sus}</div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Horizontal timeline — desktop */}
      <div className="hidden lg:block relative overflow-x-auto pb-4">
        <div className="flex items-start" style={{ minWidth: scenes.length * 150 }}>
          {scenes.map((s, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <div key={i} className="group flex-1 flex flex-col items-center relative cursor-pointer"
                onClick={() => setActive(isActive ? null : i)}
                style={{ minWidth: 150 }}>

                {/* Icon + time above the line */}
                <div
                  className={`transition-all duration-300 text-center ${dimmed ? "opacity-30 scale-95" : "group-hover:-translate-y-1"}`}
                >
                  <div className={`text-3xl transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>{s.icon}</div>
                  <div className="text-[11px] text-amber-600 mt-1 font-medium">{s.time}</div>
                </div>

                {/* Node on the line */}
                <div className="relative w-full flex items-center justify-center my-3">
                  {/* Connector line */}
                  {i > 0 && (
                    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-l from-amber-400 to-amber-300"
                      style={{ width: "100%" }} />
                  )}
                  {i < scenes.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300"
                      style={{ width: "100%" }} />
                  )}
                  {/* Dot */}
                  <div
                    className={`relative z-10 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "w-5 h-5 bg-amber-900 border-amber-900 shadow-lg shadow-amber-900/40"
                        : "w-3.5 h-3.5 bg-white border-amber-400 group-hover:bg-amber-200 group-hover:border-amber-500 group-hover:scale-125"
                    } ${dimmed ? "opacity-30" : ""}`}
                  />
                </div>

                {/* Title + lever below the line */}
                <div
                  className={`transition-all duration-300 text-center px-1 ${dimmed ? "opacity-30 scale-95" : ""}`}
                >
                  <div className="text-sm font-bold text-stone-900 mb-1.5">
                    {s.title}
                  </div>
                  <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 text-stone-900 font-bold shadow-md shadow-amber-400/30"
                      : "bg-amber-100/80 text-amber-800 group-hover:bg-amber-200"
                  }`}>
                    {s.lever}
                  </span>
                </div>

                {/* Expanded detail card */}
                {isActive && (
                  <div className="mt-3 w-full px-1">
                    <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-3.5 text-left shadow-xl shadow-amber-900/10">
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-2.5">
                        <div className="text-xs font-bold text-orange-600 mb-1 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400" />
                          Conventional
                        </div>
                        <div className="text-sm text-orange-900 leading-relaxed">{s.conv}</div>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                        <div className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Sustainable
                        </div>
                        <div className="text-sm text-emerald-900 leading-relaxed">{s.sus}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
