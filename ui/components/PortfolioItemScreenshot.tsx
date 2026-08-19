import Image from "next/image";

export default function PortfolioItemScreenshot({ img }: { img: Record<string, any> }) {
  function publicImageUrl(objectKey: string) {
    return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
  }
  
  return (
    <figure
      key={img.id}
      className="z-1 flex min-w-50 w-fit max-w-125 flex-col items-center md:items-start "
    >
      <div className="relative min-h-0 flex-1">
        <div className="screenshot-box sticky top-0 bg-clip-padding">
          <div className="absolute inset-0 rounded-xl shadow-[inset_0px_3px_6px_-2px_rgba(0,0,0,0.75)]" />
          <Image
            src={publicImageUrl(img.object_key)}
            width={img.width}
            height={img.height}
            alt={img.alt_text}
            loading="eager"
            className="border-foreground w-auto h-auto max-h-100 rounded-xl border-2 object-contain"
          />
        </div>
      </div>
      <figcaption className="bg-background xs:px-7 xs:py-5 xs:text-base mt-4 w-full min-w-50 border px-5 py-4 text-sm italic shadow-[4px_4px_var(--foreground)] sm:px-8 sm:py-6 sm:shadow-[6px_6px_var(--foreground)]">
        {img.fig_caption}
      </figcaption>
    </figure>
  );
}
