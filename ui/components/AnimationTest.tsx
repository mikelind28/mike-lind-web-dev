"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type GridItemConfig = {
  id: number;
  duration: number; // seconds
  xCoorPercent: number;
  yCoorPercent: number;
  size: number;
};

function randomSize() {
  return Math.floor(Math.random() * 50 + 10);
}

function randomDuration() {
  return Math.random() * 3 + 0.5;
}

function randomPercentage() {
  return Math.floor(Math.random() * 100);
}

let nextId = 0;
function createGridItemConfig(): GridItemConfig {
  return {
    id: nextId++,
    duration: randomDuration(),
    xCoorPercent: randomPercentage(),
    yCoorPercent: randomPercentage(),
    size: randomSize(),
  };
}

const frameOne = [14, 15, 20, 21];
const frameTwo = [8, 9, 13, 16, 19, 22, 26, 27];
const frameThree = [2, 3, 7, 10, 12, 17, 18, 23, 25, 28, 32, 33];
const frameFour = [1, 4, 6, 11, 24, 29, 31, 34];
const frameFive = [0, 5, 30, 35];

const frames = [frameOne, frameTwo, frameThree, frameFour, frameFive];

function colorFor(index: number, frame: number[]) {
  return frame.includes(index) ? "var(--foreground)" : "var(--background)";
}

function GridItem({ index, duration }: { index: number; duration: number }) {
  const [c1, c2, c3, c4, c5] = frames.map((frame) => colorFor(index, frame));

  const values = [c1, c1, c2, c2, c3, c3, c4, c4, c5, c5];
  const times = [0, 0.2, 0.2, 0.4, 0.4, 0.6, 0.6, 0.8, 0.8, 1];

  return (
    <motion.div
      animate={{ backgroundColor: values }}
      transition={{
        duration: duration,
        times,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function Grid() {
  const [config, setConfig] = useState<GridItemConfig | null>(null);

  useEffect(() => {
    // first randomization happens client-side only, after mount
    setConfig(createGridItemConfig());
  }, []);

  useEffect(() => {
    if (!config) return;
    const timeout = setTimeout(
      () => setConfig(createGridItemConfig()),
      config.duration * 1000,
    );
    return () => clearTimeout(timeout);
  }, [config]);

  if (!config) {
    // deterministic placeholder — identical on server and client
    return null;
  }


  return (
    <div
      className="fixed -z-1 h-screen w-screen"
      style={{
        top: `${config.yCoorPercent}%`,
        left: `${config.xCoorPercent}%`,
      }}
    >
      <div
        key={config.id}
        className="bg-background grid grid-cols-6 grid-rows-6 gap-px"
        style={{ width: config.size, height: config.size }}
      >
        {Array.from({ length: 36 }).map((_item, index) => (
          <GridItem key={index} index={index} duration={config.duration} />
        ))}
      </div>
    </div>
  );
}

export default function AnimationTest() {
  return (
    <>
      {Array.from({ length: 10 }).map((_item, index) => (
        <Grid key={index} />
      ))}
    </>
  );
}
