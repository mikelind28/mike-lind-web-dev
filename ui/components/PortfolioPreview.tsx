"use client";

import { useReducedMotion, motion } from "motion/react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import BGFireworks from "./BGFireworks";
import { useMotionPreference } from "@/app/motion-provider";

function PortfolioPreviewItem({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const { motionReduced } = useMotionPreference();

  return (
    <Link
      href={`/portfolio/${path}`}
      className="group bg-my-yellow text-my-black w-full max-w-120 border sm:max-w-130 shadow-[4px_4px_var(--foreground)]"
    >
      <hgroup className="xs:p-4 flex flex-col gap-3 p-3">
        <div className="border-b-my-black flex items-center justify-between gap-4 border-b border-dashed pb-2">
          <h3 className="text-2xl font-medium group-hover:underline group-hover:underline-offset-2 sm:text-3xl">
            {title}
          </h3>
          <IoChevronForward className="group-hover:animate-side-bounce size-7 shrink-0" />
        </div>
        <p className="text-lg leading-relaxed">{description}</p>
      </hgroup>
      <div className="bg-background border-t-foreground overflow-hidden border-t">
        <motion.div
          className="bg-foreground h-3 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat group-hover:scale-150 group-hover:transition-transform group-hover:duration-1500"
          initial={{ scale: motionReduced ? 1 : 2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: motionReduced ? 0 : 1.5, ease: "easeOut" }}
        />
      </div>
    </Link>
  );
}

export default function PortfolioPreview({
  projects,
}: {
  projects: Record<string, any>[];
}) {
  return (
    <div className="py-8 relative flex flex-col md:flex-row overflow-hidden">
      <BGFireworks count={10} />
      <section className="xs:gap-5 mx-auto flex w-fit flex-col items-center gap-5 px-3 py-7">
        <h2 className="home-page">
          Port-
          <br />
          folio
        </h2>
        {projects.length > 0 &&
          projects.map((item) => (
            <PortfolioPreviewItem
              key={item.id}
              path={`/${item.slug}`}
              title={item.name}
              description={item.description}
            />
          ))}
      </section>
    </div>
  );
}
