"use client";
import { useEffect } from "react";
import { createSwapy } from "@/lib/swapy";
import WeatherComp from "./weather";
import SearchBox from "./search-box";
import TempGraph from "../graphs/temp-graph";

const DEFAULT = {
  "1": "a",
  "3": "c",
  "4": "d",
};

function A() {
  return (
    <div className="item a" data-swapy-item="a">
      <WeatherComp />
    </div>
  );
}

function C() {
  return (
    <div className="item c" data-swapy-item="c">
      <SearchBox />
    </div>
  );
}

function D() {
  return (
    <div className="item d" data-swapy-item="d">
      <TempGraph />
    </div>
  );
}

function getItemById(itemId: "a" | "c" | "d" | null) {
  switch (itemId) {
    case "a":
      return <A />;
    case "c":
      return <C />;
    case "d":
      return <D />;
  }
}

export default function Swapy() {
  const slotItems: Record<string, "a" | "c" | "d" | null> =
    window?.localStorage !== undefined && localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;

  useEffect(() => {
    const container = document.querySelector(".container")!;

    const swapy = createSwapy(container, {
      swapMode: "hover",
      continuousMode: false,
    });

    swapy.onSwap(({ data }) => {
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div className="container grid grid-cols-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
        <div data-swapy-slot="1">{getItemById(slotItems["1"])}</div>
        <div className="space-y-2">
          <div data-swapy-slot="3">{getItemById(slotItems["3"])}</div>
          <div data-swapy-slot="4">{getItemById(slotItems["4"])}</div>
        </div>
      </div>
    </div>
  );
}
