import { notFound } from "next/navigation";
import { getPortfolioItem } from "@/lib/portfolio-items";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import { sql } from '@/lib/db';

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
  `
  if (project.length === 0) notFound();

  const [projectData] = project;

  const images = await sql`
    SELECT i.id, i.object_key, i.alt_text, i.fig_caption
    FROM images i
    WHERE i.project_id = ${projectData.id}
    ORDER BY i.object_key
  `

  function publicImageUrl(objectKey: string) {
    return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
  }

  return (
    <main className="relative flex flex-col md:border-y">
      <div className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat" />
      <div className="2xs:px-6 2xs:py-8 flex flex-col gap-4 px-4 py-6">
        <div className="bg-background z-1 grid grid-cols-2 grid-rows-2 border max-w-175">
          <h2 className="portfolio-item 2xs:p-5 xs:px-8 col-span-2 border-b p-3">
            {projectData.name}
          </h2>
          <Link
            href={projectData.site_url}
            target="_blank"
            className="bg-foreground text-background border-background 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 text-base font-medium underline underline-offset-2"
          >
            Full website <LuExternalLink className="shrink-0" />
          </Link>
          <Link
            href={projectData.github_url}
            target="_blank"
            className="bg-foreground text-background border-background 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 text-base font-medium underline underline-offset-2"
          >
            GitHub repository <LuExternalLink className="shrink-0" />
          </Link>
        </div>

        <p className="bg-background 2xs:p-5 xs:px-8 z-1 border p-3 text-base shadow-[4px_4px_var(--foreground)] mb-2 max-w-175">
          {projectData.description}
        </p>

        <div className="flex flex-wrap gap-6">
          {images.map((img) => (
            <figure key={img.id} className='z-1'>
              <Image
                src={publicImageUrl(img.object_key)}
                width={1000}
                height={1000}
                alt={img.alt_text}
                className="w-full rounded-xl object-contain drop-shadow-[-2px_-2px_var(--background),-2px_2px_var(--background),2px_2px_var(--background),2px_-2px_var(--background),-1px_-1px_var(--foreground),1px_-1px_var(--foreground),4px_4px_var(--foreground),-1px_1px_var(--foreground)] max-w-125"
              />
              <figcaption className='bg-background mt-4 px-2 py-1 border'>{img.fig_caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
