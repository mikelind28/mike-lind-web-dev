"use client";

import { motion } from "motion/react";
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
    <li className="group bg-my-yellow text-my-black w-full border shadow-[4px_4px_var(--foreground)]">
      <Link href={`/portfolio/${path}`}>
        <hgroup className="xs:p-4 flex flex-col gap-3 p-3 lg:px-6 lg:py-5">
          <div className="border-b-my-black flex items-center justify-between gap-4 border-b border-dashed pb-2">
            <h3 className="text-2xl font-medium group-hover:underline group-hover:underline-offset-2 sm:text-3xl">
              {title}
            </h3>
            <IoChevronForward className="group-hover:animate-side-bounce size-7 shrink-0" />
          </div>
          <p className="text-lg xl:text-xl leading-relaxed">{description}</p>
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
    </li>
  );
}

export default function PortfolioPreview({
  projects,
}: {
  projects: Record<string, any>[];
}) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <BGFireworks count={10} />
      </div>
      <section className="mx-auto w-full md:items-start max-w-120 px-3 py-15 sm:max-w-130 md:flex md:gap-12 md:max-w-170 lg:max-w-200">
        <h2 className="home-page md:sticky md:top-20">
          Port-
          <br />
          folio
        </h2>

        <ul className="flex w-full flex-col items-center gap-5">
          {projects.length > 0 &&
            projects.map((item) => (
              <PortfolioPreviewItem
                key={item.id}
                path={`/${item.slug}`}
                title={item.name}
                description={item.description}
              />
            ))}
        </ul>
      </section>
    </div>
  );
}
