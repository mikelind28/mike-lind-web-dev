import { notFound } from "next/navigation";
import { getPortfolioItem } from "@/lib/portfolio-items";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import Divider from "@/ui/components/Divider";

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const portfolioItem = getPortfolioItem(slug);

  if (!portfolioItem) notFound();

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-4 px-4 py-6">
        <hgroup className="flex flex-col gap-3">
          <h2 className="portfolio-item border-b pb-3">{portfolioItem.title}</h2>
          <p className="text-base">{portfolioItem.description}</p>
        </hgroup>
        <Link href={portfolioItem.url} target="_blank" className="inline-flex items-baseline gap-2 text-base underline underline-offset-2">
          Full website <LuExternalLink />
        </Link>
        <Link href={portfolioItem.githubUrl} target="_blank" className="inline-flex items-baseline gap-2 text-base underline underline-offset-2">
          GitHub repository <LuExternalLink />
        </Link>
      </div>
      <Divider />
    </main>
  );
}
