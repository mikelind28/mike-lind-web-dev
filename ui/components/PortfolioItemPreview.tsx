import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

export default function PortfolioItemPreview({
  path,
  title,
  description
}: {
  path: string;
  title: string;
  description: string;
}) {
  return (
    <hgroup className="flex flex-col gap-3">
      <Link href={`/portfolio/${path}`}>
        <div className="flex justify-between items-center gap-4 border-b border-b-foreground border-dashed pb-2">
          <h3 className="text-xl tracking-[2%]">{title}</h3>
          <IoChevronForward className="size-7" />
        </div>
      </Link>
      <p className="text-[0.875rem] leading-relaxed">{description}</p>
    </hgroup>
  );
}
