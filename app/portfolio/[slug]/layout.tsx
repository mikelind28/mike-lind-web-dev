import { notFound } from "next/navigation";
import PortfolioNav from "@/ui/layout/PortfolioNav";
import { sql } from '@/lib/db';

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await sql`
    SELECT id, name, slug 
    FROM projects
    ORDER BY display_order`

  if (!projects) notFound();

  return (
    <div className="flex flex-col md:flex-row">
      <PortfolioNav slug={slug} projects={projects} />
      {children}
    </div>
  );
}
