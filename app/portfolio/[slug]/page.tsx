import { notFound } from "next/navigation";
import { getPortfolioItem } from "@/lib/portfolio-items";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import Divider from "@/ui/components/Divider";
import Image from "next/image";

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const portfolioItem = getPortfolioItem(slug);

  if (!portfolioItem) notFound();

  return (
    <main className="relative flex flex-col md:border-y">
      <div className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat" />
      <div className="2xs:px-6 2xs:py-8 flex flex-col gap-4 px-4 py-6">
        <div className="bg-background z-1 grid grid-cols-2 grid-rows-2 border max-w-175">
          <h2 className="portfolio-item 2xs:p-5 xs:px-8 col-span-2 border-b p-3">
            {portfolioItem.title}
          </h2>
          <Link
            href={portfolioItem.url}
            target="_blank"
            className="bg-foreground text-background border-background 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 text-base font-medium underline underline-offset-2"
          >
            Full website <LuExternalLink className="shrink-0" />
          </Link>
          <Link
            href={portfolioItem.githubUrl}
            target="_blank"
            className="bg-foreground text-background border-background 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 text-base font-medium underline underline-offset-2"
          >
            GitHub repository <LuExternalLink className="shrink-0" />
          </Link>
        </div>

        <p className="bg-background 2xs:p-5 xs:px-8 z-1 border p-3 text-base shadow-[4px_4px_var(--foreground)] mb-2 max-w-175">
          {portfolioItem.description}
        </p>

        <div className="flex flex-wrap gap-6">
          {portfolioItem.images?.map((img) => (
            <Image
              key={img.imgSrc}
              src={img.imgSrc}
              width={1000}
              height={1000}
              alt={img.alt}
              className="z-1 w-full rounded-xl object-contain drop-shadow-[-2px_-2px_var(--background),-2px_2px_var(--background),2px_2px_var(--background),2px_-2px_var(--background),-1px_-1px_var(--foreground),1px_-1px_var(--foreground),4px_4px_var(--foreground),-1px_1px_var(--foreground)] max-w-125"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
