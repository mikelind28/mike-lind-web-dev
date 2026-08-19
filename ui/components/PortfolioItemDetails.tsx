import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export default function PortfolioItemDetails({
  projectData,
}: {
  projectData: Record<string, any>;
}) {
  return (
    <>
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
    </>
  );
}
