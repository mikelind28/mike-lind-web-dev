import Image from "next/image";

export default function PortfolioItemScreenshot({
  img,
}: {
  img: Record<string, any>;
}) {
  function publicImageUrl(objectKey: string) {
    return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
  }

  return (
    <figure
      key={img.id}
      className="z-1 flex max-w-100 md:max-w-120 lg:max-w-100 min-w-50 flex-col items-center gap-2 md:items-start h-fit"
    >
      <div className="bg-background border-background min-h-0 flex-1 rounded-2xl border-8 bg-clip-padding shadow-[4px_4px_0px_2px_var(--foreground)] outline-3  sticky top-20">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl rounded-b-none shadow-[inset_0px_3px_6px_-1px_rgba(0,0,0,0.75)]"/>
          <Image
            src={publicImageUrl(img.object_key)}
            width={img.width}
            height={img.height}
            alt={img.alt_text}
            loading="eager"
            className="border-foreground h-auto w-full rounded-xl rounded-b-none border-2 object-contain z-1"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxNDBmMDAiLz48L3N2Zz4="
          />
        </div>
        <figcaption className="xs:px-7 xs:py-5 w-full min-w-50 px-5 pt-4 pb-8 italic sm:px-8 sm:py-6 brightness-110 bg-background rounded-b-xl border border-t-0">
          {img.fig_caption}
        </figcaption>
      </div>
    </figure>
  );
}
