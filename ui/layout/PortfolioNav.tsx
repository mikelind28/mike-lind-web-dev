"use client";

import { stickNoBills } from "@/app/fonts";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import CrosshatchDivider from "../components/CrosshatchDivider";
import { BiSolidRightArrowSquare } from "react-icons/bi";

const RotatingChevron = motion.create(FiChevronDown);

export default function PortfolioNav({
  slug,
  projects,
}: {
  slug: string;
  projects: Record<string, any>[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.nav className="bg-background z-9 border-b-4 md:border-r">
      <motion.button
        animate={{
          borderBottom: isOpen ? "2px solid var(--my-black)" : "none",
        }}
        transition={{ delay: isOpen ? 0 : 0.3, duration: 0 }}
        className="2xs:px-6 xs:px-8 bg-my-yellow text-my-black flex w-full cursor-pointer items-center justify-between gap-4 border-t px-5 pt-3 pb-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          className={`${stickNoBills.className} text-3xl font-bold tracking-[4%]`}
        >
          Portfolio
        </p>
        <RotatingChevron
          className="size-8 h-full shrink-0 stroke-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 0 : -180 }}
        />
      </motion.button>
      <div className="md:hidden">
        <CrosshatchDivider />
      </div>
      <motion.ul
        className="bg-background overflow-hidden md:sticky md:top-16 md:border-t-0"
        initial={{ height: isOpen ? "auto" : 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* wrapper helps animation */}
        <motion.div
          className="divide-y-2 md:divide-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {projects.map((item) => (
            <li key={item.id} className={"border-dotted md:border-b-2 hover:underline focus-visible:border-3! focus-visible:border-[#fe2e93]! focus-visible:z-10!"}>
              <Link
                href={`/portfolio/${item.slug}`}
                className={`${stickNoBills.className} border-l-foreground flex gap-3 ${
                  item.slug === slug
                    ? `text-my-black bg-my-yellow text-2xl font-bold md:text-3xl cursor-default`
                    : "text-xl font-normal md:text-2xl"
                }`}
                style={
                  item.slug === slug
                    ? {
                        textDecoration: "underline 0.07rem",
                        textUnderlineOffset: "0.25rem",
                        borderLeft: "4px solid var(--color-my-black)",
                        padding: "20px 16px 20px 8px",
                      }
                    : {
                        borderLeft: "1px solid var(--foreground)",
                        padding: "16px 16px 16px 24px",
                      }
                }
              >
                {item.slug === slug && (
                  <BiSolidRightArrowSquare className="size-6 shrink-0 translate-y-0.5 md:size-8" />
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </motion.div>
      </motion.ul>
      {isOpen && (
        <div className="md:hidden">
          <CrosshatchDivider />
        </div>
      )}
    </motion.nav>
  );
}
