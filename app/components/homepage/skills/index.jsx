"use client";

// @flow strict

import { skillCategories } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { motion } from "motion/react";
import { Cloud, Code2, ShieldCheck, TerminalSquare } from "lucide-react";
import BorderGlow from "../../reactbits/BorderGlow/BorderGlow";

const CATEGORY_ICONS = {
  shield: ShieldCheck,
  terminal: TerminalSquare,
  cloud: Cloud,
  code: Code2,
};

const CATEGORY_COLORS = {
  shield: ["#ff0080", "#8b5cf6", "#16f2b3"],
  terminal: ["#16f2b3", "#00ffd5", "#8b5cf6"],
  cloud: ["#00ffd5", "#8b5cf6", "#ff0080"],
  code: ["#8b5cf6", "#ff0080", "#16f2b3"],
};

const SkillPill = ({ skill }) => {
  const icon = skillsImage(skill);
  return (
    <span className="flex items-center gap-2 rounded-full border border-[#1f223c] bg-[#0d1224] px-3 py-1.5 text-xs text-gray-200 transition-colors duration-300 hover:border-violet-500 sm:text-sm">
      {icon ? (
        <Image src={icon.src} alt="" width={16} height={16} className="h-4 w-4 shrink-0" />
      ) : (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#16f2b3]" />
      )}
      {skill}
    </span>
  );
};

const SkillCategoryCard = ({ category, index }) => {
  const Icon = CATEGORY_ICONS[category.icon] || Code2;
  const colors = CATEGORY_COLORS[category.icon] || ["#16f2b3", "#8b5cf6", "#00ffd5"];
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 2) * 0.1 }}
    >
      <BorderGlow className="h-full" backgroundColor="#0a0a23" borderRadius={12} colors={colors}>
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-[#16f2b3]" />
            <h3 className="text-lg font-bold text-white">{category.category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.items.map((skill) => (
              <SkillPill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </BorderGlow>
    </motion.div>
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

      <div className="px-4 py-8 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
