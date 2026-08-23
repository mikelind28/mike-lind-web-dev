import {
  Big_Shoulders_Stencil,
  Handjet,
  IBM_Plex_Mono,
  Ojuju,
  Pixelify_Sans,
  Sixtyfour,
  Stack_Sans_Notch,
  Stick_No_Bills,
  Teko,
  Tektur,
  Tourney,
  Winky_Rough,
} from "next/font/google";

export const ibmPlexMonoRegular = IBM_Plex_Mono({
  fallback: ["mono"],
  weight: "400",
  subsets: ["latin"],
});

export const ibmPlexMonoMedium = IBM_Plex_Mono({
  fallback: ["mono"],
  weight: "500",
  subsets: ["latin"],
});

export const ibmPlexMonoSemibold = IBM_Plex_Mono({
  fallback: ["mono"],
  weight: "600",
  subsets: ["latin"],
});

export const sixtyfour = Sixtyfour({
  fallback: ["mono"],
  axes: ["BLED"],
});

// LOGO FONTS
export const bigShouldersStencil = Big_Shoulders_Stencil({
  fallback: ["mono"],
  variable: "--font-big-shoulders-stencil",
  axes: ["opsz"],
});

export const handjet = Handjet({
  fallback: ["mono"],
  variable: "--font-handjet",
  axes: ["ELGR", "ELSH"],
});

export const teko = Teko({
  fallback: ["mono"],
  variable: "--font-teko",
});

export const ojuju = Ojuju({
  fallback: ["mono"],
  variable: "--font-ojuju",
});

export const pixelifySans = Pixelify_Sans({
  fallback: ["mono"],
  variable: "--font-pixelify-sans",
});

export const stackSansNotch = Stack_Sans_Notch({
  fallback: ["mono"],
  variable: "--font-stack-sans-notch",
});

export const stickNoBills = Stick_No_Bills({
  fallback: ["mono"],
  variable: "--font-stick-no-bills",
});

export const tektur = Tektur({
  fallback: ["mono"],
  variable: "--font-tektur",
  axes: ["wdth"],
});

export const tourney = Tourney({
  fallback: ["mono"],
  variable: "--font-tourney",
  style: "italic",
  axes: ["wdth"],
});

export const winkyRough = Winky_Rough({
  fallback: ["mono"],
  style: "italic",
  variable: "--font-winky-rough",
});

export const fontVariables = `${bigShouldersStencil.variable} ${handjet.variable} ${ojuju.variable} ${pixelifySans.variable} ${stackSansNotch.variable} ${stickNoBills.variable} ${teko.variable} ${tektur.variable} ${tourney.variable} ${winkyRough.variable}`;
