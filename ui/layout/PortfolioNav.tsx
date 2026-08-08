"use client";

import { ibmPlexMonoMedium, ibmPlexMonoSemibold } from "@/app/fonts";
import { portfolioItems } from "@/lib/portfolio-items";
import { motion, useScroll } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const RotatingChevron = motion.create(IoChevronDown);

export default function PortfolioNav({ slug }: { slug: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="bg-background z-10 border-t border-b-2 md:border-r">
      <motion.button
        animate={{
          borderBottom: isOpen ? "1px solid var(--foreground)" : "none",
        }}
        transition={{ delay: isOpen ? 0 : 0.3, duration: 0 }}
        className="2xs:px-6 xs:px-8 2xs:py-3 bg-background sticky top-0 flex cursor-pointer items-center justify-between gap-4 px-5 py-2 md:hidden w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={`${ibmPlexMonoMedium.className} text-2xl`}>Portfolio</p>
        <RotatingChevron
          className="size-6 h-full"
          initial={{ rotate: -180 }}
          animate={{ rotate: isOpen ? -180 : 0 }}
        />
      </motion.button>
      <motion.ul
        className="bg-background overflow-hidden border-t md:border-t-0"
        initial={{ height: isOpen ? "auto" : 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="2xs:p-6 2xs:pl-5 xs:px-7 p-4 pl-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {portfolioItems.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/portfolio/${item.slug}`}
                className={`border-l-foreground block py-2 ${
                  item.slug === slug
                    ? `${ibmPlexMonoSemibold.className} text-xl`
                    : "text-lg"
                }`}
                style={
                  item.slug === slug
                    ? {
                        textDecoration: "underline 0.07rem",
                        textUnderlineOffset: "0.25rem",
                        borderLeft: "4px solid var(--foreground)",
                        paddingLeft: "1.25rem",
                      }
                    : {
                        borderLeft: "1px solid var(--foreground)",
                        paddingLeft: "1.5rem",
                      }
                }
              >
                {item.title}
              </Link>
            </li>
          ))}
        </motion.div>
      </motion.ul>
    </nav>
  );
}
