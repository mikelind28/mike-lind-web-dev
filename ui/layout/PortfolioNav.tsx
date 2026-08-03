"use client";

import { ibmPlexMonoMedium, ibmPlexMonoSemibold } from "@/app/fonts";
import { portfolioItems } from "@/lib/portfolio-items";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const RotatingChevron = motion.create(IoChevronDown);

export default function PortfolioNav({ slug }: { slug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-y border-y-foreground sticky top-0 z-10 bg-background">
      <motion.div
        animate={{ borderBottom: isOpen ? "1px solid var(--foreground)" : "none" }}
        transition={{ delay: isOpen ? 0 : 0.3, duration: 0 }}
        className="flex justify-between items-center gap-4 px-4 py-2 border-b relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 z-0 bg-foreground mask-[url('/cross-hatch.svg')] mask-repeat mask-size-[32px_32px]" />
        <p className={`${ibmPlexMonoMedium.className} text-2xl bg-background px-1 z-1`}>Portfolio</p>
        <RotatingChevron
          className="size-6 bg-background h-full z-1"
          animate={{ rotate: isOpen ? -180 : 0 }}
        />
      </motion.div>
      <AnimatePresence>
        {isOpen && (   
          <motion.ul
            className="overflow-hidden bg-background"
            initial={{ height: 0}}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {portfolioItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className={`block py-2 tracking-[2%] border-l-foreground ${
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
                            paddingLeft: "1.5rem",
                          }
                        : {
                            borderLeft: "1px solid var(--foreground)",
                            paddingLeft: "1.25rem",
                          }
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </motion.div>
          </motion.ul>    
        )}
      </AnimatePresence>
    </nav>
  );
}
