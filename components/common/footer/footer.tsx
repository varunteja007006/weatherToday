import { CloudMoonRain } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="p-6 max-w-[1400px] mx-auto font-semibold py-10 flex-col md:flex-row flex items-center gap-5 justify-between  bg-orange-500 dark:bg-blue-950">
      <div className="flex flex-wrap items-center gap-2 text-lg">
        <CloudMoonRain className="w-8 h-8" />
        weatherToday
      </div>
      <div className="flex flex-col lg:flex-row gap-4 text-center">
        <div>
          <a href="https://github.com/varunteja007006">Github</a>
        </div>

        <div>
          <a href="https://www.linkedin.com/in/varunteja007006">LinkedIn</a>
        </div>

        <div>
          <a href="https://varunteja007006.netlify.app/">Website</a>
        </div>
      </div>
      <div>@{new Date().getFullYear()}</div>
    </footer>
  );
}
