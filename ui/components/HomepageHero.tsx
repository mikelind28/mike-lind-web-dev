"use client";

import { useMotionPreference } from "@/app/motion-provider";
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTime,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function HeroBgText() {
  return (
    <span
      className={`handjet bg-my-black text-my-yellow border-my-black border text-3xl leading-0 break-all transition duration-1000 ease-in-out hover:font-extrabold!`}
    >
      mike lind | web dev
    </span>
  );
}

const MotionImage = motion.create(Image);

export default function HomepageHero() {
  const { motionReduced } = useMotionPreference();

  const time = useTime();
  const timeLooped = useTransform(time, (v) => v % 3000);

  const isHovered = useMotionValue(0); // 0 = not hovered, 1 = hovered
  const rotate = useMotionValue(0);
  const rotationCount = useRef(0);

  const dropShadowAnimation = useRef<AnimationPlaybackControls>(null);
  const spinAnimation = useRef<AnimationPlaybackControls>(null);

  // pulse between 4px and 16px blur normally
  const pulseBlur = useTransform(timeLooped, [0, 1500, 3000], [4, 16, 4]);

  // if hovered, force 32px; otherwise use the pulse
  const blur = useTransform(
    [pulseBlur, isHovered],
    ([pulse, hovered]: number[]) => pulse + (32 - pulse) * hovered,
  );

  const filter = useTransform(blur, (b) =>
    motionReduced
      ? "drop-shadow(0px 0px 16px var(--my-yellow))"
      : `drop-shadow(0px 0px ${b}px var(--my-yellow))`,
  );

  const handleHoverStart = () => {
    dropShadowAnimation.current?.stop();
    dropShadowAnimation.current = animate(isHovered, 1, {
      duration: motionReduced ? 0 : 1,
      ease: "easeOut",
    });

    spinAnimation.current?.stop();
    spinAnimation.current = animate(rotate, rotationCount.current + 45, {
      duration: motionReduced ? 0 : 1,
      ease: "easeInOut",
      bounce: 0.75,
      type: "spring",
      damping: 5,
      mass: 1,
    });
  };

  const handleHoverEnd = () => {
    dropShadowAnimation.current?.stop();
    dropShadowAnimation.current = animate(isHovered, 0, {
      duration: motionReduced ? 0 : 0.6,
      ease: "easeOut",
    });

    spinAnimation.current?.stop();
    spinAnimation.current = animate(rotate, rotationCount.current, {
      duration: motionReduced ? 0 : 0.5,
      ease: "easeInOut",
      bounce: 0.3,
      type: "spring",
      damping: 8,
      mass: 0.5,
    });
  };

  const handleClick = () => {
    spinAnimation.current?.stop();
    rotationCount.current += 360;
    spinAnimation.current = animate(rotate, rotationCount.current + 45, {
      duration: motionReduced ? 0 : 4,
      ease: "easeInOut",
      bounce: 0.2,
      type: "spring",
      damping: 5,
    });
  };

  return (
    <div className="group bg-my-black 2xs:h-75 border-b-my-yellow relative inline-block h-[100vw] w-screen -translate-y-8 scale-y-105 space-x-1 overflow-hidden border-b-2 select-none md:h-60">
      <MotionImage
        id="logo-img-animated"
        src="/mlwd-logo-outline.svg"
        width={1000}
        height={1000}
        alt="mike lind web dev logo"
        className="absolute inset-0 m-auto size-40 cursor-pointer"
        style={{ filter, rotate }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          scale: { duration: motionReduced ? 0 : 4, ease: "easeInOut" },
        }}
      />
      {Array.from({ length: 100 }).map((_, index) => (
        <HeroBgText key={index} />
      ))}
    </div>
  );
}
