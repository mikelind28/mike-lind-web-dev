import { notFound } from "next/navigation";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import { sql } from "@/lib/db";

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
    SELECT pi.id, pi.object_key, pi.alt_text, pi.fig_caption
    FROM project_images pi
    WHERE pi.project_id = ${projectData.id}
    ORDER BY pi.object_key
  `;

  function publicImageUrl(objectKey: string) {
    return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
  }

  return (
    <main className="relative flex w-full flex-col md:border-y">
      <div className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat" />
      <div className="2xs:px-6 2xs:py-8 flex flex-col gap-2 px-4 py-6">
        <div className="bg-background z-1 grid max-w-175 grid-cols-2 grid-rows-2 border">
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

        <p className="bg-background 2xs:p-5 xs:px-8 z-1 mb-8 max-w-175 border p-4 text-lg shadow-[4px_4px_var(--foreground)]">
          {projectData.description}
        </p>

        <div className="flex flex-wrap gap-8">
          {images.map((img) => (
            <figure
              key={img.id}
              className="z-1 flex w-full flex-col items-center md:w-fit max-w-125"
            >
              <div className="relative w-full flex-1 min-h-0">
                <div className="screenshot-box sticky top-0 bg-clip-padding">
                  <div className="absolute inset-0 shadow-[inset_0px_3px_6px_-2px_rgba(0,0,0,0.75)] rounded-xl" />
                  <Image
                    src={publicImageUrl(img.object_key)}
                    width={1000}
                    height={1000}
                    alt={img.alt_text}
                    className="w-full object-contain rounded-xl"
                  />
                </div>
              </div>
              <figcaption
                className="bg-background mt-4 w-full max-w-125  border px-5 py-4 xs:px-7 xs:py-5 sm:px-8 sm:py-6 text-sm italic shadow-[4px_4px_var(--foreground)] xs:text-base sm:shadow-[6px_6px_var(--foreground)]"
              >
                {img.fig_caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
