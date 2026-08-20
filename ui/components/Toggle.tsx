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
      <div className="outline-foreground relative flex h-9 w-18 items-center justify-between gap-3 rounded-full p-1 outline-2" />
    );
  }

  return (
    <button
      className="outline-foreground relative flex cursor-pointer items-center justify-between gap-3 rounded-full p-1 outline-2 focus-visible:outline-blue-400"
      style={
        resolvedTheme === "dark"
          ? { backgroundColor: "var(--background)" }
          : { backgroundColor: "var(--foreground)" }
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      role="switch"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute z-0 size-9 rounded-full"
        style={
          resolvedTheme === "dark"
            ? {
                backgroundColor: "var(--foreground)",
                border: "1px solid var(--foreground)",
              }
            : {
                backgroundColor: "var(--background)",
                border: "1px solid var(--background)",
              }
        }
        initial={false}
        animate={{
          left:
            resolvedTheme === "dark"
              ? "calc(100% - var(--spacing) * 9)"
              : "0px",
        }}
      />
      <IoSunnyOutline
        className="stroke-foreground z-1 size-7"
        strokeWidth={1.5}
      />
      <IoMoonOutline
        className="stroke-background z-1 size-6"
        strokeWidth={1.5}
      />
    </button>
  );
}
