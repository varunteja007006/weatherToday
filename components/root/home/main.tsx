import React from "react";
import SearchBox from "./search-box";
import WeatherComp from "./weather";

export default function Main() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-2">
          <div>
            <WeatherComp />{" "}
          </div>
          <div>
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  );
}
