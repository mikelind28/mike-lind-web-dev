"use client";

import { motion, useReducedMotion } from "motion/react";

const d1 =
  "M0 20.5C0 20.5 10.125 10.25 20.25 10.25C40.5 10.25 40.635 30.75 60.75 30.75C70.875 30.75 80 20.5 80 20.5";

const d2 =
  "M0 20.5C0 20.5 10.125 30.75 20.25 30.75C40.5 30.75 40.635 10.25 60.75 10.25C70.875 10.25 80 20.5 80 20.5";

export default function Divider() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      className="w-full scale-x-150 my-4"
      xmlns="http://www.w3.org/2000/svg"
      height="35"
      fill="none"
      initial={{ x: "-40px", scaleY: 0.75 }}
      animate={{
        x: shouldReduceMotion ? "40px" : "40px",
        scaleY: shouldReduceMotion ? 0.75 : 1.5,
      }}
      transition={{
        x: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
        scaleY: {
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      }}
    >
      <rect width="100%" height="100%" fill="url(#wave-pattern)" />
      <defs>
        <pattern
          id="wave-pattern"
          patternUnits="userSpaceOnUse"
          width="80"
          height="35"
        >
          <motion.path
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              d: d1,
            }}
            animate={{
              d: shouldReduceMotion ? d1 : d2,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </pattern>
      </defs>
    </motion.svg>
  );
}
