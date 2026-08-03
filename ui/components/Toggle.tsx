"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function Toggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a theme-neutral placeholder that matches on server & client
    return (
      <div className="relative flex items-center justify-between gap-3 p-1 rounded-full outline-2 outline-foreground w-18 h-9" />
    );
  }
  
  return (
    <div
      className="relative flex items-center justify-between gap-3 p-1 rounded-full cursor-pointer outline-2 outline-foreground"
      style={resolvedTheme === 'dark' ? { backgroundColor: "var(--background)" } : { backgroundColor: "var(--foreground)" }}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      role="switch"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="size-9 rounded-full absolute z-0"
        style={resolvedTheme === 'dark' ? { backgroundColor: "var(--foreground)", border: "1px solid var(--foreground)" } : { backgroundColor: "var(--background)", border: "1px solid var(--background)" }}
        initial={false}
        animate={{ left: resolvedTheme === 'dark' ? "calc(100% - var(--spacing) * 9)" : "0px" }}
      />
      <IoSunnyOutline
        className="size-7 z-1 stroke-foreground"
        strokeWidth={1.5}
      />
      <IoMoonOutline
        className="size-6 z-1 stroke-background"
        strokeWidth={1.5}
      />
    </div>
  );
}
