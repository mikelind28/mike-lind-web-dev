import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import { ibmPlexMonoRegular } from "./fonts";
import { MotionConfig } from "motion/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
    metadataBase: new URL('https://mike-lind-dev.com'),
    title: {
      template: "mike lind | web dev – %s",
      default: "mike lind | web dev",
    },
    description:
      "The web development portfolio of Mike Lind, a Minnesota-based full-stack web developer specializing in front end and design.",
    openGraph: {
      title: "mike lind | web dev",
      description: "The web development portfolio of Mike Lind, a Minnesota-based full-stack web developer specializing in front end and design.",
      url: "https://mike-lind-dev.com",
      images: [{ url: "/mlwd-logo-color.svg", width: 1200, height: 1200, type: 'image/svg+xml', alt: 'The mike lind web dev logo.' }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "mike lind | web dev",
      description: "The web development portfolio of Mike Lind, a Minnesota-based full-stack web developer specializing in front end and design.",
      images: ["/mlwd-logo-color.svg"],
    },
    alternates: {
      canonical: "https://www.mike-lind-dev.com",
    },
    authors: [{ name: 'Mike Lind', url: 'https://mike-lind-dev.com' }],
    creator: "Mike Lind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionConfig reducedMotion="user">
      <html lang="en" suppressHydrationWarning className={`h-full antialiased`}>
        <body
          className={`${ibmPlexMonoRegular.className} bg-background text-foreground grid min-h-full grid-rows-[auto_1fr_auto] tracking-[2%]`}
        >
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </MotionConfig>
  );
}
