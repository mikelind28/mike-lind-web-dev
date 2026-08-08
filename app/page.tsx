import Divider from "@/ui/components/Divider";
import PortfolioPreview from "@/ui/components/PortfolioPreview";
import Intro from "@/ui/components/Intro";
import Proficiencies from "@/ui/components/Proficiencies";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 overflow-hidden py-4 text-xl">
      <Intro
        text={`I'm a full-stack web developer, specializing in front-end development and design.`}
      />
      <PortfolioPreview />
      <Proficiencies />
    </main>
  );
}
