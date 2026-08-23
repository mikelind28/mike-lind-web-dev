"use client";

import { sixtyfour } from "@/app/fonts";
import { useMotionPreference } from "@/app/motion-provider";
import { animate } from "motion";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaForward } from "react-icons/fa";
import { IoPause, IoPlay, IoRefresh } from "react-icons/io5";
import HomepageHero from "./HomepageHero";

const delimiter = "";
const duration = 4;

function useAnimatedCursor(
  text: string,
  paused: boolean,
  complete: boolean,
  setComplete: Dispatch<SetStateAction<boolean>>,
  restarted: boolean,
  setRestarted: Dispatch<SetStateAction<boolean>>,
) {
  const [cursor, setCursor] = useState(0);
  const [remainingDuration, setRemainingDuration] = useState(duration);

  useEffect(() => {
    const from = restarted ? 0 : cursor;
    const dur = restarted ? duration : remainingDuration;

    if (restarted) {
      setCursor(0);
      setRemainingDuration(duration);
      setRestarted(false);
    }

    const controls = animate(from, text.split(delimiter).length, {
      duration: dur,
      ease: "linear",
      onUpdate(latest) {
        setCursor(Math.floor(latest));
      },
    });

    setRemainingDuration(
      duration - (from / text.split(delimiter).length) * duration,
    );

    if (paused) {
      controls.pause();
    }

    if (complete) {
      controls.complete();
    }

    controls.finished.then(() => {
      setComplete(true);
    });

    return () => controls.stop();
  }, [text, paused, complete, restarted]);

  return cursor;
}

function AnimatedText({ text }: { text: string }) {
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [restarted, setRestarted] = useState(false);

  const cursor = useAnimatedCursor(
    text,
    paused,
    complete,
    setComplete,
    restarted,
    setRestarted,
  );

  const chars = text.split(delimiter);

  return (
    <div className="bg-my-black text-my-yellow 2xs:p-5 xs:p-6 relative z-1 mx-auto flex max-w-130 flex-col gap-2 p-4 text-2xl xl:text-3xl xl:max-w-160 xl:p-8">
      <div className="-ml-1 flex items-center gap-3">
        {complete ? (
          <button
            type="button"
            onClick={() => {
              setComplete(false);
              setPaused(false);
              setRestarted(true);
            }}
            aria-label="Restart text animation"
            className="icon-button"
          >
            <IoRefresh
              style={{ height: "32px", width: "32px" }}
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play" : "Pause"}
            aria-pressed={!paused}
            className="icon-button"
          >
            {paused ? (
              <IoPlay
                style={{ height: "32px", width: "32px" }}
                aria-hidden="true"
              />
            ) : (
              <IoPause
                style={{ height: "32px", width: "32px" }}
                aria-hidden="true"
              />
            )}
          </button>
        )}
        {!complete && (
          <button
            type="button"
            onClick={() => setComplete(true)}
            aria-label="Skip to end"
            className="icon-button"
          >
            <FaForward
              style={{ height: "30px", width: "30px" }}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      <p aria-label={text}>
        {chars.map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              opacity: i < cursor ? 1 : 0,
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}

function BgTextPattern() {
  const { motionReduced } = useMotionPreference();
  return (
    <motion.div
      aria-hidden
      className={`${sixtyfour.className} bg-my-black flex flex-col items-center align-middle text-6xl leading-[75%] tracking-[-0.1rem] select-none`}
      style={{
        textBoxEdge: "cap",
        fontVariationSettings: `"BLED" 100`,
      }}
    >
      <motion.div
        className="text-my-yellow"
        animate={{ x: motionReduced ? "0px" : "817px" }}
        transition={{
          duration: motionReduced ? 0 : 40,
          repeat: motionReduced ? 0 : Infinity,
          ease: "linear",
        }}
      >
        mikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdev
      </motion.div>
      <motion.div
        className="text-my-yellow"
        animate={{ x: motionReduced ? "0px" : "-817px" }}
        transition={{
          duration: motionReduced ? 0 : 30,
          repeat: motionReduced ? 0 : Infinity,
          ease: "linear",
        }}
      >
        webdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelindwebdevmikelind
      </motion.div>
    </motion.div>
  );
}

export default function Intro({ text }: { text: string }) {
  const { motionReduced } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const xPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const maskPosition = useMotionTemplate`${xPosition}% ${xPosition}%`;

  return (
    <div className="bg-my-black py-8 xl:py-12">
      <HomepageHero />
      <div className="xl:pt-8">
        <BgTextPattern />
        <div className="2xs:px-3 xs:px-5 bg-background outline-my-black relative z-1 px-2 py-10 outline-4">
          <motion.div
            className="bg-foreground absolute inset-0 z-1 mask-[url('/patterns/cross-hatch.svg')] mask-size-[75px_75px] mask-center mask-repeat"
            style={{ maskPosition: motionReduced ? "0% 0%" : maskPosition }}
          />
          <AnimatedText text={text} />
        </div>
        <BgTextPattern />
      </div>
    </div>
  );
}
