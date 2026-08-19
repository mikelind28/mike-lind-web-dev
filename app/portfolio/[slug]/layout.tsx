import { notFound } from "next/navigation";
import PortfolioNav from "@/ui/layout/PortfolioNav";
import { sql } from "@/lib/db";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await sql`SELECT name FROM projects WHERE slug = ${slug}`;

  if (project.length === 0) {
    notFound();
  }

  return {
    title: `${project[0].name}`,
  };
}

// TODO: loading indicators for projects
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
    ORDER BY display_order`;

  if (projects.length === 0) notFound();

  return (
    <div className="flex flex-col md:flex-row">
      <PortfolioNav slug={slug} projects={projects} />
      {children}
    </div>
  );
}
