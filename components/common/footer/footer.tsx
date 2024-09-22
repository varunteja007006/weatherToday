import { CloudMoonRain } from "lucide-react";
import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { BsRocketTakeoff } from "react-icons/bs";
import ToolTip from "../tooltip";
export default function Footer() {
  return (
    <footer className="p-6 max-w-[1400px] mx-auto font-semibold py-10 flex-col md:flex-row flex items-center gap-5 justify-between  bg-orange-500 dark:bg-blue-950">
      <div className="flex flex-wrap items-center gap-2 text-lg">
        <CloudMoonRain className="w-8 h-8" />
        weatherToday
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 text-center">
        <div>
          <ToolTip content="Github">
            <a
              href={`https://github.com/${process.env.NEXT_PUBLIC_FOOTER_LINK}`}
            >
              <FaGithub />
            </a>
          </ToolTip>
        </div>

        <div>
          <ToolTip content="LinkedIn">
            <a
              href={`https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_FOOTER_LINK}`}
            >
              <FaLinkedinIn />
            </a>
          </ToolTip>
        </div>

        <div>
          <ToolTip content="Website">
            <a
              href={`https://${process.env.NEXT_PUBLIC_FOOTER_LINK}.netlify.app/`}
            >
              <BsRocketTakeoff />
            </a>
          </ToolTip>
        </div>
      </div>
      <div>@{new Date().getFullYear()}</div>
    </footer>
  );
}
