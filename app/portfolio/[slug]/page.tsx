import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import PortfolioItemScreenshot from "@/ui/components/PortfolioItemScreenshot";
import PortfolioItemDetails from "@/ui/components/PortfolioItemDetails";

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await sql`
    SELECT p.id, p.name, p.description, p.site_url, p.github_url, p.slug
    FROM projects p
    WHERE p.slug = ${slug}
  `;
  if (project.length === 0) notFound();

  const [projectData] = project;

  const images = await sql`
    SELECT pi.id, pi.object_key, pi.alt_text, pi.fig_caption, pi.width, pi.height
    FROM project_images pi
    WHERE pi.project_id = ${projectData.id}
    ORDER BY pi.object_key
  `;

  return (
    <main className="relative mt-4 flex w-full flex-col pt-6 md:mt-0 md:border-b md:border-l md:pt-0">
      <div className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat" />
      <PortfolioItemDetails projectData={projectData} />
      <div className="2xs:px-6 2xs:py-8 flex flex-col gap-8 px-4 py-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:items-stretch">
          {images.map((img) => {
            return <PortfolioItemScreenshot key={img.id} img={img} />;
          })}
        </div>
      </div>
    </main>
  );
}
