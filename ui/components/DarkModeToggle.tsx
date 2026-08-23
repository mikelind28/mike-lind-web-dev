"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a theme-neutral placeholder that matches on server & client
    return (
      <div className="outline-background relative flex h-9 w-18 items-center justify-between gap-2 rounded-full p-1 outline-2" />
    );
  }

  return (
    <button
      className="border-foreground relative flex cursor-pointer items-center justify-between gap-3 rounded-full border p-1"
      style={
        resolvedTheme === "dark"
          ? { backgroundColor: "var(--background)" }
          : { backgroundColor: "var(--foreground)" }
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      role="switch"
      aria-label="Toggle dark mode"
      aria-checked={resolvedTheme === "dark" ? true : false}
    >
      <motion.div
        className="absolute z-0 size-8 rounded-full border md:size-9"
        style={
          resolvedTheme === "dark"
            ? {
                backgroundColor: "var(--foreground)",
              }
            : {
                backgroundColor: "var(--background)",
              }
        }
        initial={false}
        animate={{
          left:
            resolvedTheme === "dark"
              ? "calc(100% - var(--spacing) * 8)"
              : "0px",
        }}
      />
      <IoSunnyOutline
        className="stroke-foreground z-1 size-6 md:size-7"
        strokeWidth={1.5}
      />
      <IoMoonOutline
        className="stroke-background z-1 size-5 md:size-6"
        strokeWidth={1.5}
      />
    </button>
  );
}
