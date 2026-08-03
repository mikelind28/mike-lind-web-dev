import { getPortfolioItem } from "@/lib/portfolio-items";
import { notFound } from "next/navigation";
import PortfolioNav from "@/ui/layout/PortfolioNav";

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolioItem = getPortfolioItem(slug);

  if (!portfolioItem) notFound();

  return (
    <div className="flex flex-col">
      <PortfolioNav slug={slug} />
      {children}
    </div>
  );
}
