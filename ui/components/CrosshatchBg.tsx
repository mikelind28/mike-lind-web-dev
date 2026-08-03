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

function useAnimatedText(
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
      // Tweak the animation here
      duration: dur,
      ease: "linear",
      // Over the course of "duration" seconds, the cursor will move from cursor to the length of the text, one character at a time.
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

  return text.split(delimiter).slice(0, cursor).join(delimiter);
}

function AnimatedText({ text }: { text: string }) {
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [restarted, setRestarted] = useState(false);

  const animatedText = useAnimatedText(text, paused, complete, setComplete, restarted, setRestarted);

  return (
    <div className="flex flex-col gap-2 relative bg-foreground text-background p-4 z-1">
      <div className="flex items-center gap-3 -ml-1">
        {complete 
          ? <IoRefresh
              onClick={() => {
                setComplete(false);
                setPaused(false);
                setRestarted(true);
              }} 
              style={{ height: "32px", width: "32px" }} 
            />
          : paused 
            ? <IoPlay
                onClick={() => setPaused(false)}
                style={{ height: "32px", width: "32px" }}
              />
            : <IoPause
                onClick={() => setPaused(true)}
                style={{ height: "32px", width: "32px" }}
              />
        }
        {!complete && 
          <FaForward 
            style={{ height: "30px", width: "30px" }} 
            onClick={() => setComplete(true)} 
          />
        }
      </div>
      <p>{animatedText}</p>
    </div>
  );
}

export default function CrosshatchBg({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const xPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const maskPosition = useMotionTemplate`${xPosition}% ${xPosition}%`;

  return (
    <div className="relative px-2 py-10 border-y">
      <motion.div
        className="absolute inset-0 z-0 bg-foreground mask-[url('/cross-hatch.svg')] mask-repeat mask-size-[75px_75px]"
        style={{ maskPosition: shouldReduceMotion ? "0% 0%" : maskPosition }}
      />
      <AnimatedText text={text} />
    </div>
  );
}
