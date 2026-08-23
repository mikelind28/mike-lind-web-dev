"use client";
import { useMotionPreference } from "@/app/motion-provider";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { IoPlayOutline, IoPause } from "react-icons/io5";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);

    handler(mql); // sync in case it changed between initial state and mount
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export default function ReduceMotionToggle() {
  const { motionReduced, toggleMotionReduced } = useMotionPreference();

  const isMdUp = useMediaQuery("(min-width: 768px)");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a theme-neutral placeholder that matches on server & client
    return (
      <div className="outline-background relative flex h-9 items-center justify-between rounded-full p-1 outline-2" />
    );
  }

  return (
    <button
      className="border-foreground relative flex cursor-pointer items-center justify-between gap-2 md:gap-3 rounded-full border p-1"
      style={{ backgroundColor: "var(--foreground)" }}
      onClick={toggleMotionReduced}
      role="switch"
      aria-label="Toggle site motion / animations"
    >
      <motion.div
        className="bg-background! border-foreground! absolute z-0 size-8 rounded-full border md:size-9"
        initial={false}
        animate={{
          left: motionReduced
            ? isMdUp
              ? "calc(100% - var(--spacing) * 9)"
              : "calc(100% - var(--spacing) * 8)"
            : "0px",
        }}
      />
      <IoPlayOutline
        className="z-1 size-6 md:size-7"
        style={{
          color: motionReduced ? "var(--background)" : "var(--foreground)",
        }}
        strokeWidth={1.5}
      />
      <IoPause
        className="z-1 size-6 md:size-7"
        style={{
          color: motionReduced ? "var(--foreground)" : "var(--background)",
        }}
        strokeWidth={1.5}
      />
    </button>
  );
}
