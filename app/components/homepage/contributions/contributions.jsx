"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { contributions } from "@/utils/data/contributions";

const ContributionCard = ({ title, description, imageUrl, linkUrl, linkType = "website", date }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#1a1a2e] bg-[#0a0a23]/50 transition-all hover:border-[#00ffd5]">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={600}
          height={340}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {date && <span className="text-xs text-[#00ffd5]">{date}</span>}
        </div>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
        {linkUrl && (
          <div className="mt-4 flex items-center">
            <Link
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-[#00ffd5] hover:text-[#ff0080] transition-colors"
            >
              {linkType === "repo" ? <Github className="mr-1 h-4 w-4" /> : <ExternalLink className="mr-1 h-4 w-4" />}
              {linkType === "slides" && "View Slides"}
              {linkType === "video" && "Watch Video"}
              {linkType === "repo" && "View Code"}
              {linkType === "website" && "Learn More"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ContributionsSection() {
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
            <ContributionCard key={index} {...contribution} />
          ))}
        </div>
      </div>
    </section>
  );
}
