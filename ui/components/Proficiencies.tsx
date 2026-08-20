"use client";

import { stagger } from "motion";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// check window width to conditionally apply animations below
function useIsBelowMd() {
  const [isBelowMd, setIsBelowMd] = useState(false); // SSR-safe default

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 767px)");
    setIsBelowMd(mediaQueryList.matches); // sync actual value on mount (client only)

    const handler = (e: MediaQueryListEvent) => setIsBelowMd(e.matches);
    mediaQueryList.addEventListener("change", handler);

    return () => mediaQueryList.removeEventListener("change", handler);
  }, []);

  return isBelowMd;
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.25 } },
};

function ProficiencyListItem({
  name,
  imgSrc,
}: {
  name: string;
  imgSrc?: string;
}) {
  const liRef = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll({
    target: liRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [1, 1.4, 1]);
  const letterSpacing = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [4, 10, 4],
  );

  const breakpointSm = useIsBelowMd();

  const responsiveScale = useTransform(() => (breakpointSm ? scale.get() : 1));
  const responsiveLetterSpacing = useTransform(() =>
    breakpointSm ? letterSpacing.get() : 4,
  );
  const responsiveLetterSpacingPercent = useMotionTemplate`${responsiveLetterSpacing}%`;

  return (
    <motion.li
      className="bg-background w-full max-w-110 md:w-fit"
      style={{ boxShadow: "4px 4px var(--foreground)" }}
      ref={liRef}
      variants={item}
    >
      <div className="bg-background z-1 flex h-12.5 items-center gap-3 border px-3 py-2">
        {imgSrc && (
          <motion.div
            className="relative h-8 w-8 rounded-sm"
            style={{ scale: responsiveScale }}
          >
            <Image
              src={imgSrc}
              fill={true}
              sizes="50px"
              loading="lazy"
              className="rounded-xs object-contain p-1 drop-shadow-[0px_2px_1px_rgba(0,0,0,0.8)]"
              alt={`${name} logo`}
            />
          </motion.div>
        )}
        <motion.p
          className="leading-5! font-medium"
          style={{ letterSpacing: responsiveLetterSpacingPercent }}
        >
          {name}
        </motion.p>
      </div>
    </motion.li>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.1),
    },
  },
};

export default function Proficiencies({
  proficiencies,
}: {
  proficiencies: Record<string, any>[];
}) {
  const ulRef = useRef<HTMLUListElement>(null);

  return (
    <section className="2xs:px-4 bg-background relative z-1 flex flex-col items-center gap-4 px-3 md:gap-6 md:px-8">
      <h2 className="home-page">Proficiencies</h2>
      <motion.ul
        ref={ulRef}
        variants={container}
        initial="hidden"
        whileInView="show"
        className="flex w-full flex-col items-center gap-2 md:flex-row md:flex-wrap"
      >
        {proficiencies.length > 0 &&
          proficiencies.map((item) => (
            <ProficiencyListItem
              key={item.id}
              name={item.name}
              imgSrc={item.imageUrl}
            />
          ))}
        <ProficiencyListItem
          key={"...and more to come..."}
          name={"...and more to come..."}
        />
      </motion.ul>
    </section>
  );
}
