"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";

type MotionContextType = {
  motionReduced: boolean;
  toggleMotionReduced: () => void;
};

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemPrefersReduced = useReducedMotion();
  const [motionReduced, setMotionReduced] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Follow system preference until the user manually overrides
  useEffect(() => {
    const stored = localStorage.getItem('motionReduced');
    const hasManualOverride = localStorage.getItem('motionReducedManual') === 'true';

    if (hasManualOverride && stored !== null) {
      setMotionReduced(stored === 'true');
    } else {
      setMotionReduced(!!systemPrefersReduced);
    }
    setHydrated(true);
  }, [systemPrefersReduced]);

  const toggleMotionReduced = () => {
    setMotionReduced((prev) => {
      const next = !prev;
      localStorage.setItem('motionReduced', String(next));
      localStorage.setItem('motionReducedManual', 'true'); // mark as an explicit user choice
      return next;
    });
  };

  useEffect(() => {
    if (hydrated) {
      document.documentElement.dataset.motion = motionReduced ? 'reduced' : 'full';
    }
  }, [motionReduced, hydrated]);

  return (
    <MotionContext.Provider value={{ motionReduced, toggleMotionReduced }}>
      {/* <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}> */}
        {children}
      {/* </MotionConfig> */}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const context = useContext(MotionContext);
  if (!context)
    throw new Error("useMotionPreference must be used within MotionProvider");
  return context;
}
