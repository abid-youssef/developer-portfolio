// @flow strict

import { skillCategories } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Cloud, Code2, ShieldCheck } from "lucide-react";

const CATEGORY_ICONS = {
  shield: ShieldCheck,
  cloud: Cloud,
  code: Code2,
};

const MARQUEE_DIRECTION = {
  shield: "left",
  code: "right",
  cloud: "left",
};

const SkillChip = ({ skill }) => (
  <div className="w-32 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-2 sm:m-3 rounded-lg group relative hover:scale-[1.12] cursor-pointer">
    <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] shadow-none group-hover:border-violet-500 transition-all duration-500">
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <div className="h-7 sm:h-8">
          <Image
            src={skillsImage(skill)?.src}
            alt={skill}
            width={32}
            height={32}
            className="h-full w-auto rounded-lg"
          />
        </div>
        <p className="text-white text-xs sm:text-sm whitespace-nowrap">{skill}</p>
      </div>
    </div>
  </div>
);

const SkillRow = ({ category }) => {
  const Icon = CATEGORY_ICONS[category.icon] || Code2;
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2 px-4 sm:px-6">
        <Icon className="h-4 w-4 text-[#16f2b3]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          {category.category}
        </span>
      </div>
      <Marquee
        gradient={false}
        speed={45}
        pauseOnHover={true}
        pauseOnClick={true}
        delay={0}
        play={true}
        direction={MARQUEE_DIRECTION[category.icon] || "left"}
      >
        {category.items.map((skill) => (
          <SkillChip key={skill} skill={skill} />
        ))}
      </Marquee>
    </div>
  );
};

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Skills
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="my-8 flex flex-col gap-8">
        {skillCategories.map((category) => (
          <SkillRow key={category.category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
