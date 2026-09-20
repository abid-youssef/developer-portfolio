"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
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

const badgeLabel = (achievement) => achievement.label || `${ordinal(achievement.place)} Place`;
const badgeColors = (achievement) => PLACE_COLORS[achievement.place] || DEFAULT_COLORS;

const wins = ctfAchievements.filter((a) => a.place === 1).length;
const topPlacements = ctfAchievements.filter((a) => a.place && a.place <= 3).length;
const totalCTFs = ctfAchievements.length;

export const ctfStats = { wins, topPlacements, totalCTFs };

export const CTFShowcaseCard = ({ onOpen }) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <BorderGlow className="group h-full cursor-pointer" backgroundColor="#0a0a23" borderRadius={12} colors={["#facc15", "#8b5cf6", "#16f2b3"]}>
        <div
          className="flex h-full flex-col overflow-hidden"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={ctfAchievements[0].imageUrl}
              alt="CTF competitions"
              width={600}
              height={340}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4">
              <motion.div
                className="flex items-center gap-2 text-white"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-bold">Browse all {totalCTFs} CTFs</span>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-bold text-white">CTF Competitions</h3>
            <p className="mt-2 flex-1 text-sm text-gray-300">
              Competitive CTF record across Tunisia and internationally, from local qualifiers to a regional championship final.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-yellow-400/10 px-2.5 py-1 font-semibold text-yellow-400">{wins} wins</span>
              <span className="rounded-full bg-violet-400/10 px-2.5 py-1 font-semibold text-violet-300">{topPlacements}+ top placements</span>
              <span className="rounded-full bg-[#16f2b3]/10 px-2.5 py-1 font-semibold text-[#16f2b3]">{totalCTFs} CTFs played</span>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
};

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export const CTFGalleryModal = ({ open, onClose }) => {
  const [[index, direction], setSlide] = useState([0, 0]);

  const go = (dir) => setSlide(([i]) => [(i + dir + totalCTFs) % totalCTFs, dir]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const achievement = ctfAchievements[index];
  const colors = badgeColors(achievement);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a23] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-3">
          <h3 className="text-base font-bold text-white sm:text-lg">CTF Competitions</h3>
          <div className="flex flex-wrap justify-end gap-2 text-xs">
            <span className="rounded-full bg-yellow-400/10 px-2.5 py-1 font-semibold text-yellow-400">{wins} wins</span>
            <span className="rounded-full bg-violet-400/10 px-2.5 py-1 font-semibold text-violet-300">{topPlacements}+ top placements</span>
          </div>
        </div>

        <div className="relative max-h-[50vh] w-full overflow-hidden bg-black">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={achievement.imageUrl}
                alt={achievement.event}
                width={1600}
                height={1000}
                className="h-auto max-h-[50vh] w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-xl font-bold text-white">{achievement.event}</h4>
            <span
              className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-black"
              style={{ backgroundColor: colors[0] }}
            >
              <Trophy className="h-3.5 w-3.5" />
              {badgeLabel(achievement)}
            </span>
          </div>
          <p className="text-sm text-gray-400">{achievement.organizer} · {achievement.year}</p>
          {achievement.stat && <p className="text-sm text-gray-300">{achievement.stat}</p>}
          <p className="mt-2 text-xs text-gray-500">{index + 1} / {totalCTFs}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
