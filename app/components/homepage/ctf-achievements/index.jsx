"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Trophy, X } from "lucide-react";
import { ctfAchievements } from "@/utils/data/ctf-achievements";
import BorderGlow from "../../reactbits/BorderGlow/BorderGlow";

const PLACE_COLORS = {
  1: ["#facc15", "#fde68a", "#f59e0b"],
  2: ["#cbd5e1", "#e2e8f0", "#94a3b8"],
  3: ["#f97316", "#fb923c", "#c2410c"],
};
const DEFAULT_COLORS = ["#16f2b3", "#8b5cf6", "#00ffd5"];

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

const AchievementCard = ({ achievement, onOpen }) => {
  const colors = PLACE_COLORS[achievement.place] || DEFAULT_COLORS;
  return (
    <div className="w-[280px] shrink-0 snap-start sm:w-[320px]">
      <BorderGlow className="h-full cursor-pointer" backgroundColor="#0a0a23" borderRadius={12} colors={colors}>
        <div
          className="flex h-full flex-col overflow-hidden"
          onClick={() => onOpen(achievement)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(achievement)}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={achievement.imageUrl}
              alt={achievement.event}
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-black shadow"
              style={{ backgroundColor: colors[0] }}
            >
              <Trophy className="h-3.5 w-3.5" />
              {ordinal(achievement.place)}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-white sm:text-base">{achievement.event}</h3>
              <span className="shrink-0 text-xs" style={{ color: colors[0] }}>{achievement.year}</span>
            </div>
            <p className="text-xs text-gray-400">{achievement.organizer}</p>
            {achievement.stat && <p className="mt-1 text-xs text-gray-300">{achievement.stat}</p>}
          </div>
        </div>
      </BorderGlow>
    </div>
  );
};

const AchievementModal = ({ achievement, onClose }) => {
  useEffect(() => {
    if (!achievement) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [achievement, onClose]);

  if (!achievement) return null;
  const colors = PLACE_COLORS[achievement.place] || DEFAULT_COLORS;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a23] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative max-h-[60vh] w-full overflow-auto bg-black">
          <Image
            src={achievement.imageUrl}
            alt={achievement.event}
            width={1600}
            height={1000}
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-white">{achievement.event}</h3>
            <span
              className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-black"
              style={{ backgroundColor: colors[0] }}
            >
              <Trophy className="h-3.5 w-3.5" />
              {ordinal(achievement.place)} Place
            </span>
          </div>
          <p className="text-sm text-gray-400">{achievement.organizer} · {achievement.year}</p>
          {achievement.stat && <p className="text-sm text-gray-300">{achievement.stat}</p>}
        </div>
      </div>
    </div>
  );
};

export default function CTFAchievementsSection() {
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="ctf-achievements" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Section background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            CTFs & Competitions
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="relative px-4 py-4 md:px-6 lg:px-12">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ctfAchievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} onOpen={setSelected} />
          ))}
        </div>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <AchievementModal achievement={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
