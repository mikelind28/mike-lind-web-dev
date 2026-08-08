export type PortfolioItemType = {
  slug: string;
  url: string;
  githubUrl: string;
  title: string;
  description: string;
  images?: {
    imgSrc: string;
    alt: string;
  }[];
}

export const portfolioItems: PortfolioItemType[] = [
  {
    slug: "back-to-the-shelf-again",
    url: "https://back-to-the-shelf-again.vercel.app",
    githubUrl: "https://github.com/mikelind28/back-to-the-shelf-again",
    title: "Back to the Shelf Again",
    description:
      "A Wisconsin-based pop-up book shop selling gently-used romance novels.",
  },
  {
    slug: "mycookbook",
    url: "",
    githubUrl: "",
    title: "myCookBook",
    description:
      "Plan your weekly meals. Put the ingredients directly onto your grocery list.",
  },
  {
    slug: "animation-experimentation",
    url: "https://animation-experimentation.netlify.app/",
    githubUrl: "https://github.com/mikelind28/animation-experimentation",
    title: "Animation Experimentation",
    description: "Playing with Framer animations.",
  },
  {
    slug: "virtual-fretboard",
    url: "https://app.netlify.com/projects/guitar-chords-and-scales/overview",
    githubUrl: "https://github.com/mikelind28/guitar-chords-and-scales",
    title: "Virtual Fretboard",
    description:
      "A virtual fretboard that highlights the notes in common chords and scales.",
  },
  {
    slug: "my-number-array",
    url: "https://my-number-array.netlify.app/",
    githubUrl: "https://github.com/mikelind28/my-number-array",
    title: "myNumberArray",
    description:
      "Learn about common JavaScript array methods by creating and manipulating your very own number array.",
  },
  {
    slug: "window-doc-nav-api",
    url: "https://window-doc-nav.netlify.app/",
    githubUrl: "https://github.com/mikelind28/window-doc-nav-api",
    title: "Window, Document, and Navigator Web APIs",
    description:
      "An interactive dashboard exploring common web APIs, including the Window interface, the Document interface, and the Navigator interface.",
    images: [
      { imgSrc: '/images/window-doc-nav/screenshot-1.webp', alt: 'alt' }, 
      { imgSrc: '/images/window-doc-nav/screenshot-2.webp', alt: 'alt' },
      { imgSrc: '/images/window-doc-nav/screenshot-3.webp', alt: 'alt' },
      { imgSrc: '/images/window-doc-nav/screenshot-4.webp', alt: 'alt' },
      { imgSrc: '/images/window-doc-nav/screenshot-5.webp', alt: 'alt' },
      { imgSrc: '/images/window-doc-nav/screenshot-6.webp', alt: 'alt' },
    ]
  },
];

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}
