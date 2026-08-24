"use client";

import { handjet } from "@/app/fonts";
import { useMotionPreference } from "@/app/motion-provider";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export default function ScrollToTopButton() {
  const { motionReduced } = useMotionPreference();
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: motionReduced ? "instant" : "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      className={`${handjet.className} bg-foreground text-background border-background outline-foreground mx-auto mb-8 flex animate-bounce items-center gap-2 rounded-full border px-4 py-1 text-lg outline`}
    >
      Back to top <IoArrowUpCircleOutline />
    </button>
  );
}
