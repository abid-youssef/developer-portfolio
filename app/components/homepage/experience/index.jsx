'use client';

// @flow strict
import dynamic from 'next/dynamic'
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), {
  ssr: false,
});
import BorderGlow from "../../reactbits/BorderGlow/BorderGlow";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(experience => (
                  <BorderGlow
                    key={experience.id}
                    backgroundColor="#101123"
                    borderRadius={12}
                    colors={experience.colors}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-x-4 mb-4">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-inset"
                          style={{
                            backgroundColor: `${experience.colors[0]}1f`,
                            '--tw-ring-color': `${experience.colors[0]}55`,
                          }}
                        >
                          {experience.logo ? (
                            <Image
                              src={experience.logo}
                              alt={`${experience.company} logo`}
                              width={28}
                              height={28}
                              className="h-7 w-7 object-contain"
                            />
                          ) : (
                            <BsPersonWorkspace size={20} style={{ color: experience.colors[0] }} />
                          )}
                        </div>
                        <p className="text-sm sm:text-base font-medium text-white">
                          {experience.company}
                        </p>
                      </div>

                      <ul className="flex flex-col gap-3 border-l border-white/10 pl-4">
                        {experience.roles.map((role, index) => (
                          <li key={index} className="relative">
                            <span
                              className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full"
                              style={{ backgroundColor: experience.colors[0] }}
                            />
                            <p className="text-base sm:text-lg font-medium uppercase leading-snug">
                              {role.title}
                            </p>
                            <p className="text-xs sm:text-sm" style={{ color: experience.colors[0] }}>
                              {role.duration}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BorderGlow>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;