import { useState } from "react";
import { TYPE_COLORS, actions, impacts } from "../data/constants";

export default function SustainabilityMap() {
  const [activeAction, setActiveAction] = useState(null);
  const [activeImpact, setActiveImpact] = useState(null);
  const highlightedImpacts = activeAction ? actions.find(a => a.id === activeAction)?.impacts || [] : [];
  const highlightedActions = activeImpact ? actions.filter(a => a.impacts.includes(activeImpact)).map(a => a.id) : [];

  // Mobile: default to first action selected so the view isn't empty
  const mobileAction = actions.find(a => a.id === activeAction) || actions[0];
  const mobileAffected = impacts.filter(imp => mobileAction.impacts.includes(imp.id));

  return (
    <div>
      <p className="text-center text-sm mb-5 text-amber-700/60 italic">Tap an action or impact to highlight connections</p>

      {/* Mobile layout: action tabs → impacts below */}
      <div className="sm:hidden max-w-2xl mx-auto">
        {/* Action dropdown */}
        <div className="mb-5">
          <label className="block text-center text-xs font-bold uppercase tracking-widest mb-2 text-amber-900">
            Sustainability Action
          </label>
          <div className="relative">
            <select
              value={activeAction ?? actions[0].id}
              onChange={(e) => { setActiveAction(e.target.value); setActiveImpact(null); }}
              className="w-full appearance-none bg-white border border-amber-300 text-amber-900 text-sm font-semibold rounded-xl px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
              {actions.map(a => (
                <option key={a.id} value={a.id}>
                  {a.icon}  {a.label}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700"
              viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Selected action description */}
        <div className="bg-amber-900 text-amber-50 rounded-2xl px-5 py-4 mb-5 shadow-lg shadow-amber-900/20 border border-amber-800">
          <div className="text-sm font-bold flex items-center gap-2">
            <span className="text-base">{mobileAction.icon}</span>
            <span>{mobileAction.label}</span>
          </div>
          <div className="text-xs mt-1.5 opacity-90 leading-relaxed">{mobileAction.desc}</div>
        </div>

        {/* Affected impacts */}
        <div className="text-center text-xs font-bold uppercase tracking-widest mb-3 text-amber-900 flex items-center justify-center gap-2">
          <span className="h-px flex-1 bg-amber-200 max-w-[60px]" />
          Drives These Impacts
          <span className="h-px flex-1 bg-amber-200 max-w-[60px]" />
        </div>
        <div className="space-y-2.5">
          {mobileAffected.map(imp => {
            const tc = TYPE_COLORS[imp.type];
            return (
              <div key={imp.id}
                className={`rounded-xl px-4 py-3 border-l-4 ${tc.border} bg-white/80 shadow-sm`}>
                <div className={`text-[10px] uppercase tracking-widest font-bold ${tc.text} opacity-70`}>{tc.label}</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">{imp.label}</div>
                <div className="text-xs mt-1.5 text-stone-700 leading-relaxed">{imp.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop/tablet layout: two columns with bidirectional highlighting */}
      <div className="hidden sm:grid grid-cols-2 gap-4">
        <div>
          <div className="text-center text-xs font-bold uppercase tracking-widest mb-4 text-amber-900">Sustainability Actions</div>
          {actions.map(a => {
            const isActive = activeAction === a.id;
            const isHighlightedAction = highlightedActions.includes(a.id);
            const isDimmed = activeImpact && !isHighlightedAction;
            const showDesc = isActive || isHighlightedAction;
            return (
              <div key={a.id} onClick={() => { setActiveAction(isActive ? null : a.id); setActiveImpact(null); }}
                className={`group rounded-xl px-4 py-3 mb-2.5 cursor-pointer transition-all duration-300 border flex flex-col justify-center
                  ${showDesc ? "shadow-lg" : "h-14 hover:-translate-y-0.5 hover:shadow-md"}
                  ${isActive || isHighlightedAction
                    ? "bg-amber-900 text-white border-amber-800 shadow-amber-900/25"
                    : "bg-white/70 text-stone-900 border-amber-200 hover:bg-white hover:border-amber-400"
                  } ${isDimmed ? "opacity-25 scale-[0.98]" : ""}`}>
                <div className="text-sm font-bold">
                  <span className={`inline-block transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>{a.icon}</span>
                  <span className="ml-1.5">{a.label}</span>
                </div>
                {showDesc && <div className="text-xs mt-1.5 opacity-90 leading-relaxed">{a.desc}</div>}
              </div>
            );
          })}
        </div>
        <div>
          <div className="text-center text-xs font-bold uppercase tracking-widest mb-4 text-amber-900">Impacts</div>
          {impacts.map(imp => {
            const isActive = activeImpact === imp.id;
            const isHighlighted = highlightedImpacts.includes(imp.id);
            const isDimmed = activeAction && !isHighlighted;
            const showDesc = isActive || isHighlighted;
            const tc = TYPE_COLORS[imp.type];
            return (
              <div key={imp.id} onClick={() => { setActiveImpact(isActive ? null : imp.id); setActiveAction(null); }}
                className={`group rounded-xl px-4 py-3 mb-2.5 cursor-pointer transition-all duration-300 border flex flex-col justify-center
                  ${showDesc ? "shadow-lg" : "h-14 hover:-translate-y-0.5 hover:shadow-md"}
                  ${tc.border}
                  ${showDesc ? `${tc.bg} text-white shadow-lg` : "bg-white/70 text-stone-900 hover:bg-white hover:border-amber-400"}
                  ${isDimmed ? "opacity-25 scale-[0.98]" : ""}`}>
                <div className={`text-[10px] uppercase tracking-widest font-bold ${showDesc ? "opacity-80" : tc.text + " opacity-60"}`}>{tc.label}</div>
                <div className="text-sm font-bold mt-0.5">{imp.label}</div>
                {showDesc && <div className="text-xs mt-1.5 opacity-90 leading-relaxed">{imp.desc}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-5 mt-6 flex-wrap">
        {Object.entries(TYPE_COLORS).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-sm">
            <div className={`w-3.5 h-3.5 rounded-md ${v.bg} shadow-sm`} />
            <span className={`${v.text} font-medium`}>{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
