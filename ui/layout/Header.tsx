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
        mike lind | web dev
      </Link>
      <DarkModeToggle />
    </header>
  );
}
