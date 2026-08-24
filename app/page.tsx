import PortfolioPreview from "@/ui/components/PortfolioPreview";
import Proficiencies from "@/ui/components/Proficiencies";
import { sql } from "@/lib/db";
import Intro from "@/ui/components/Intro";
import CrosshatchDivider from "@/ui/components/CrosshatchDivider";

function publicImageUrl(objectKey: string) {
  return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
}

export default async function Home() {
  const projects = await sql`
    SELECT id, name, description, slug 
    FROM projects
    ORDER BY display_order
  `;

  const proficiencies = await sql`
    SELECT id, name, object_key 
    FROM proficiencies
    ORDER BY display_order
  `;

  const proficienciesWithUrls = proficiencies.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: publicImageUrl(p.object_key),
  }));

  return (
    <main className="relative flex w-screen max-w-screen flex-col overflow-hidden text-xl md:overflow-visible xl:gap-12">
      <Intro
        text={`I'm a full-stack web developer, specializing in front-end development and design.`}
      />
      <PortfolioPreview projects={projects} />
      <CrosshatchDivider />
      <div className="bg-background my-8">
        <div className="bg-foreground h-75 w-screen mask-[url('/happy-mac.png')] mask-size-[100px_100px] mask-center" />
      </div>
      <CrosshatchDivider />
      <Proficiencies proficiencies={proficienciesWithUrls} />
    </main>
  );
}
