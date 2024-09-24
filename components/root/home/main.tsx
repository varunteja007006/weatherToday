import React from "react";
import SearchBox from "./search-box";
import WeatherComp from "./weather";
import TempGraph from "../graphs/temp-graph";

export default function Main() {
  return (
    <div className="max-w-[1400px] dark:bg-blue-950 bg-orange-500 px-6 py-4 w-full min-h-screen dark:border-l-violet-950 dark:border-r-violet-950  ">
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
          <WeatherComp />
          <div className="space-y-2">
            <SearchBox />
            <TempGraph />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
