import { bigShouldersStencil } from "@/app/fonts";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export default function PortfolioItemDetails({
  projectData,
}: {
  projectData: Record<string, any>;
}) {
  return (
    <div className="bg-my-yellow outline-my-black z-1 grid grid-cols-2 grid-rows-[fit-content_fit-content_fit-content] outline-3 md:grid-cols-[1fr_3fr]">
      <h2
        className={`${bigShouldersStencil.className} xs:px-8 bg-my-yellow text-my-black col-span-2 p-6 text-5xl md:border-b-2`}
      >
        {projectData.name}
      </h2>
      <Link
        href={projectData.site_url}
        target="_blank"
        className="group outline-my-black bg-my-black text-my-yellow border-my-yellow 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 pb-10 text-base font-medium underline underline-offset-2 outline-1 hover:font-bold hover:tracking-[4%] md:px-5 focus-visible:outline-3 focus-visible:outline-[#fe2e93] focus-visible:z-10"
      >
        Full website{" "}
        <LuExternalLink className="shrink-0 transition-transform group-hover:scale-125" />
      </Link>
      <p className="col-span-1 row-span-2 text-my-black hidden max-w-[55ch] p-7 pb-10 text-lg md:block">
        {projectData.description}
      </p>
      <Link
        href={projectData.github_url}
        target="_blank"
        className="group outline-my-black bg-my-black text-my-yellow border-my-yellow 2xs:p-5 xs:px-8 flex items-baseline justify-between gap-2 border p-3 pb-10 text-base font-medium underline underline-offset-2 outline-1 hover:font-bold hover:tracking-[4%] md:px-5 focus-visible:outline-3 focus-visible:outline-[#fe2e93] focus-visible:z-10"
      >
        GitHub repository{" "}
        <LuExternalLink className="shrink-0 transition-transform group-hover:scale-125" />
      </Link>
      <p className="xs:p-8 xs:pb-10 text-my-black col-span-2 max-w-[55ch] p-6 pb-8 text-lg md:hidden">
        {projectData.description}
      </p>
    </div>
  );
}
