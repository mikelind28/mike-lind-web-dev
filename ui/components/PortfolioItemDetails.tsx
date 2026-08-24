import { bigShouldersStencil } from "@/app/fonts";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export default function PortfolioItemDetails({
  projectData,
}: {
  projectData: Record<string, any>;
}) {
  return (
    <div className="bg-background z-1 grid grid-cols-2 grid-rows-[fit-content_fit-content_fit-content] outline-3 outline-my-black md:grid-cols-[1fr_3fr]">
      <h2
        className={`${bigShouldersStencil.className} xs:px-8 bg-my-yellow text-my-black col-span-2  p-6 text-5xl md:border-b-2`}
      >
        {projectData.name}
      </h2>
      <Link
        href={projectData.site_url}
        target="_blank"
        className="group outline-1 outline-my-black bg-my-black text-my-yellow border-my-yellow 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 pb-10 text-base font-medium underline underline-offset-2 md:px-5 hover:font-bold hover:tracking-[4%]"
      >
        Full website <LuExternalLink className="group-hover:scale-125 transition-transform shrink-0" />
      </Link>
      <p className="p-7 pb-10 col-span-1 row-span-2 hidden max-w-[55ch] text-lg md:block">
        {projectData.description}
      </p>
      <Link
        href={projectData.github_url}
        target="_blank"
        className="group outline-1 outline-my-black bg-my-black text-my-yellow border-my-yellow 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 pb-10 text-base font-medium underline underline-offset-2 md:px-5 hover:font-bold hover:tracking-[4%]"
      >
        GitHub repository <LuExternalLink className="group-hover:scale-125 transition-transform shrink-0" />
      </Link>
      <p className="xs:p-8 xs:pb-10 col-span-2 max-w-[55ch] p-6 pb-8 text-lg md:hidden bg-my-yellow text-my-black">
        {projectData.description}
      </p>
    </div>
  );
}
