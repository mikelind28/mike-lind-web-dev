"use client";

import { createContext, useContext, useEffect } from "react";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

type MotionContextType = {
  motionReduced: boolean;
  toggleMotionReduced: () => void;
};

const MotionContext = createContext<MotionContextType | undefined>(undefined);

// ---- external store: reads/writes the manual override in localStorage ----

type MotionOverride = { hasOverride: boolean; value: boolean };

function readMotionOverride(): MotionOverride {
  const manual = localStorage.getItem("motionReducedManualOverride") === "true";
  const stored = localStorage.getItem("motionReduced");
  return manual && stored !== null
    ? { hasOverride: true, value: stored === "true" }
    : { hasOverride: false, value: false };
}

// Cached snapshot object — getSnapshot must return the SAME reference
// between calls if nothing changed, or useSyncExternalStore will think
// it changed on every render and loop.
let cachedSnapshot: MotionOverride | null = null;
const listeners = new Set<() => void>();

function refreshSnapshot() {
  cachedSnapshot = readMotionOverride();
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", refreshSnapshot); // cross-tab updates
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", refreshSnapshot);
  };
}

function getSnapshot(): MotionOverride {
  if (cachedSnapshot === null) {
    cachedSnapshot = readMotionOverride(); // first client read — pulls from localStorage
  }
  return cachedSnapshot;
}

const SERVER_SNAPSHOT: MotionOverride = { hasOverride: false, value: false };

function getServerSnapshot(): MotionOverride {
  return SERVER_SNAPSHOT; // no localStorage on the server
}

function setMotionOverride(next: boolean) {
  localStorage.setItem("motionReduced", String(next));
  localStorage.setItem("motionReducedManualOverride", "true");
  refreshSnapshot(); // notify listeners in THIS tab (storage event won't)
}

// ---- provider ----

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemPrefersReduced = useReducedMotion();
  const override = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Derived during render — no effect needed for this part at all.
  const motionReduced = override.hasOverride
    ? override.value
    : !!systemPrefersReduced;

  const toggleMotionReduced = () => {
    setMotionOverride(!motionReduced);
  };

  // This one stays as a real effect: it's an imperative DOM mutation
  // (a side effect), not a setState call, so the lint rule doesn't apply.
  useEffect(() => {
    document.documentElement.dataset.motion = motionReduced
      ? "reduced"
      : "full";
  }, [motionReduced]);

  return (
    <MotionContext.Provider value={{ motionReduced, toggleMotionReduced }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const context = useContext(MotionContext);
  if (!context)
    throw new Error("useMotionPreference must be used within MotionProvider");
  return context;
}
