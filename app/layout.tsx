import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import { ibmPlexMonoRegular } from "./fonts";
import { MotionConfig } from "motion/react";

export const metadata: Metadata = {
  title: "mike lind | web dev",
  description:
    "The web development portfolio of Mike Lind, a full stack web developer specializing in front end and design.",
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
        </body>
      </html>
    </MotionConfig>
  );
}
