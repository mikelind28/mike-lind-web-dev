"use client";

import { animate } from "motion";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaForward } from "react-icons/fa";
import { IoPause, IoPlay, IoRefresh } from "react-icons/io5";

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
    <div className="bg-foreground text-background 2xs:p-5 xs:p-6 relative z-1 mx-auto flex max-w-110 flex-col gap-2 p-4">
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

export default function Intro({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const xPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const maskPosition = useMotionTemplate`${xPosition}% ${xPosition}%`;

  return (
    <div className="2xs:px-3 xs:px-5 relative border-y px-2 py-10">
      <motion.div
        className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[75px_75px] mask-center mask-repeat"
        style={{ maskPosition: shouldReduceMotion ? "0% 0%" : maskPosition }}
      />
      <AnimatedText text={text} />
    </div>
  );
}
