import React from "react";
import { ThemeToggle } from "../theme-toogle";

export default function Navbar() {
  return (
    <header className="px-6 py-4 flex items-center justify-between">
      Nav
      <ThemeToggle />
    </header>
  );
}
