import PortfolioPreview from "@/ui/components/PortfolioPreview";
import Intro from "@/ui/components/Intro";
import Proficiencies from "@/ui/components/Proficiencies";
import { sql } from "@/lib/db";
import { notFound } from "next/navigation";

function publicImageUrl(objectKey: string) {
  return `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.AWS_BUCKET_NAME}/${objectKey}`;
}

export default async function Home() {
  const projects = await sql`
    SELECT id, name, description, slug 
    FROM projects
    ORDER BY display_order`

  if (projects.length === 0) notFound();

  const proficiencies = await sql`
  SELECT id, name, object_key 
  FROM proficiencies
  ORDER BY display_order`

  if (proficiencies.length === 0) notFound();

  const proficienciesWithUrls = proficiencies.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: publicImageUrl(p.object_key),
  }));
  
  return (
    <main className="flex flex-col gap-10 overflow-hidden py-4 text-xl">
      <Intro
        text={`I'm a full-stack web developer, specializing in front-end development and design.`}
      />
      <PortfolioPreview projects={projects} />
      <Proficiencies proficiencies={proficienciesWithUrls} />
    </main>
  );
}
