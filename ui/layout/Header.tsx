import { stackSansNotch } from "@/app/fonts";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import ReduceMotionToggle from "../components/ReduceMotionToggle";

export default function Header() {
  return (
    <header className="bg-background text-foreground sticky top-0 z-10 flex w-full items-center justify-between border-b-4 px-2 py-2 sm:px-3 md:py-3">
      <ReduceMotionToggle />
      <Link
        href="/"
        className={`${stackSansNotch.className} 2xs:text-2xl text-[1.15rem] font-medium tracking-normal sm:text-3xl`}
      >
        <div className="2xs:hidden bg-foreground mx-auto size-12 mask-[url('/mlwd-logo-bw.svg')] mask-size-[48px_48px] mask-center mask-no-repeat" />
        <div className="2xs:block bg-foreground xs:h-6 mx-auto hidden aspect-4569/409 h-5.5 max-w-95 mask-[url('/mlwd-logo-and-text.svg')] mask-size-[100%_100%] mask-center mask-no-repeat sm:h-7 xl:h-8" />
      </Link>
      <DarkModeToggle />
    </header>
  );
}
