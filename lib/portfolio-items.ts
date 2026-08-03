export const portfolioItems = [
  { slug: "back-to-the-shelf-again", url: "https://back-to-the-shelf-again.vercel.app", githubUrl: "https://github.com/mikelind28/back-to-the-shelf-again", title: "Back to the Shelf Again", description: "A Wisconsin-based pop-up book shop selling gently-used romance novels." },
  { slug: "mycookbook", url: "", githubUrl: "", title: "myCookBook", description: "Plan your weekly meals. Put the ingredients directly onto your grocery list." },
  { slug: "animation-experimentation", url: "", githubUrl: "", title: "Animation Experimentation", description: "Playing with Framer animations." },
  { slug: "virtual-fretboard", url: "", githubUrl: "", title: "Virtual Fretboard", description: "A virtual fretboard that highlights the notes in common chords and scales." }
] as const;

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}