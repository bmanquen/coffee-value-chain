import { useState, useEffect } from "react";
import SustainabilityMap from "./components/SustainabilityMap";
import Storyboard from "./components/Storyboard";
import ForceField from "./components/ForceField";
import CircularWeb from "./components/CircularWeb";

const TAB_STORAGE_KEY = "coffeeValueChain.tab";

export default function CoffeeValueChain() {
  const tabs = ["🗺 Sustainability Map", "🎬 Storyboard", "⚖ Force Field", "🕸 Circular Web"];
  const [tab, setTab] = useState(() => {
    const saved = parseInt(localStorage.getItem(TAB_STORAGE_KEY), 10);
    return Number.isInteger(saved) && saved >= 0 && saved < tabs.length ? saved : 0;
  });

  useEffect(() => {
    localStorage.setItem(TAB_STORAGE_KEY, String(tab));
  }, [tab]);
  return (
    <div className="font-serif bg-amber-50 min-h-screen px-3.5 py-5">
      <div className="text-center mb-8">
        <div className="text-xs tracking-[0.25em] uppercase mb-2 text-amber-700 font-medium">Collectors & Intermediaries</div>
        <h1 className="text-2xl font-bold text-stone-900 leading-tight">4 Ways to Visualize the Stage</h1>
        <div className="mx-auto mt-3 w-16 h-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>
      <nav className="flex gap-3 mb-8 flex-wrap justify-center px-2">
        {tabs.map((t, i) => {
          const isActive = tab === i;
          return (
            <button key={i} onClick={() => setTab(i)}
              className={`group relative px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out
                ${isActive
                  ? "bg-amber-900 text-amber-50 shadow-lg shadow-amber-900/30 scale-105 border border-amber-700"
                  : "bg-white/70 text-amber-900 border border-amber-200 hover:bg-white hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5"
                }`}>
              <span className={`inline-block transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                {t.split(" ")[0]}
              </span>
              <span className="ml-1.5">{t.split(" ").slice(1).join(" ")}</span>
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
      {tab === 0 && <SustainabilityMap />}
      {tab === 1 && <Storyboard />}
      {tab === 2 && <ForceField />}
      {tab === 3 && <CircularWeb />}
    </div>
  );
}
