import Divider from "@/ui/components/Divider";
import PortfolioItemPreview from "@/ui/components/PortfolioItemPreview";
import { portfolioItems } from "@/lib/portfolio-items";
import CrosshatchBg from "@/ui/components/CrosshatchBg";

export default function Home() {
  return (
    <main className="py-4 text-xl tracking-normal flex flex-col gap-8  overflow-hidden">
      <CrosshatchBg text="I'm a full-stack web developer, specializing in front-end development and design." />
      {/* <Divider /> */}
      <section className="flex flex-col gap-8 px-2">
        <h2 className="home-page">Portfolio</h2>
        {portfolioItems.map((item) => (
          <PortfolioItemPreview
            key={item.slug}
            path={`/${item.slug}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
      <Divider />
    </main>
  );
}
