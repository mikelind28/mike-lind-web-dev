"use client";

import { useReducedMotion, motion } from "motion/react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

function PortfolioPreviewItem({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio/${path}`}
      className="group bg-background text-foreground w-full max-w-110 border"
    >
      <hgroup className="flex flex-col gap-3 p-3">
        <div className="border-b-foreground flex items-center justify-between gap-4 border-b border-dashed pb-2">
          <h3 className="text-2xl font-medium group-hover:underline group-hover:underline-offset-2">
            {title}
          </h3>
          <IoChevronForward className="group-hover:animate-side-bounce size-7 shrink-0" />
        </div>
        <p className="text-base leading-relaxed">{description}</p>
      </hgroup>
      <div className="bg-background border-t-foreground overflow-hidden border-t">
        <motion.div
          className="bg-foreground h-3 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat group-hover:scale-150 group-hover:transition-transform group-hover:duration-1500"
          initial={{ scale: shouldReduceMotion ? 1 : 2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </Link>
  );
}

export default function PortfolioPreview({ projects }: { projects: Record<string, any>[] }) {
  return (
    <section className="relative z-1  w-fit mx-auto flex flex-col items-center gap-4 px-3 md:gap-6">
      <h2 className="home-page bg-background">Portfolio</h2>
      {projects.length > 0 && projects.map((item) => (
        <PortfolioPreviewItem
          key={item.id}
          path={`/${item.slug}`}
          title={item.name}
          description={item.description}
        />
      ))}
    </section>
  );
}
