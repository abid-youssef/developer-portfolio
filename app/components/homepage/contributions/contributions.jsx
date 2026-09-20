"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, X } from "lucide-react";
import { contributions } from "@/utils/data/contributions";
import BorderGlow from "../../reactbits/BorderGlow/BorderGlow";

const LinkTag = ({ linkUrl, linkType }) => (
  <Link
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="flex items-center text-sm text-[#00ffd5] hover:text-[#ff0080] transition-colors"
  >
    {linkType === "repo" ? <Github className="mr-1 h-4 w-4" /> : <ExternalLink className="mr-1 h-4 w-4" />}
    {linkType === "slides" && "View Slides"}
    {linkType === "video" && "Watch Video"}
    {linkType === "repo" && "View Code"}
    {linkType === "website" && "Learn More"}
  </Link>
);

const ContributionCard = ({ contribution, onOpen }) => {
  const { title, description, imageUrl, linkUrl, linkType = "website", date } = contribution;
  return (
    <BorderGlow
      className="group h-full cursor-pointer"
      backgroundColor="#0a0a23"
      borderRadius={12}
      colors={['#00ffd5', '#8b5cf6', '#ec4899']}
    >
      <div
        className="flex h-full flex-col overflow-hidden"
        onClick={() => onOpen(contribution)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(contribution)}
      >
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {date && <span className="shrink-0 text-xs text-[#00ffd5]">{date}</span>}
          </div>
          <p className="mt-2 flex-1 text-sm text-gray-300">{description}</p>
          {linkUrl && (
            <div className="mt-4 flex items-center">
              <LinkTag linkUrl={linkUrl} linkType={linkType} />
            </div>
          )}
        </div>
      </div>
    </BorderGlow>
  );
};

const ContributionModal = ({ contribution, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!contribution) return null;
  const { title, description, imageUrl, linkUrl, linkType = "website", date } = contribution;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
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
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={1600}
            height={1000}
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {date && <span className="shrink-0 text-xs text-[#00ffd5]">{date}</span>}
          </div>
          <p className="text-sm text-gray-300">{description}</p>
          {linkUrl && (
            <div className="mt-2 flex items-center">
              <LinkTag linkUrl={linkUrl} linkType={linkType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ContributionsSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="contributions" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      {/* Decorative background SVG */}
      <Image
        src="/section.svg"
        alt="Section background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Decorative gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Contributions
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="py-8 px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((contribution, index) => (
            <ContributionCard key={index} contribution={contribution} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ContributionModal contribution={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
