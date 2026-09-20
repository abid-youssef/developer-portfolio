// @flow strict
import Link from 'next/link';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import { personalData } from "@/utils/data/personal-data";

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href={personalData.github}
              target="_blank"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={22} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={22} />
            </Link>
            <Link
              href={personalData.facebook}
              target="_blank"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300"
            >
              <FaFacebook size={22} />
            </Link>
            <Link
              href={personalData.medium}
              target="_blank"
              className="transition-all text-gray-400 hover:text-pink-500 hover:scale-125 duration-300"
            >
              <SiMedium size={22} />
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Footer;
