import { stackSansNotch } from "@/app/fonts";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import ReduceMotionToggle from "../components/ReduceMotionToggle";

export default function Header() {
  return (
    <header className="bg-background text-foreground sticky top-0 z-10 flex w-full items-center justify-between px-2 py-2 border-b-4 sm:px-3 md:py-3">
      <ReduceMotionToggle />
      <Link href="/" className={`${stackSansNotch.className} text-[1.15rem] 2xs:text-2xl sm:text-3xl tracking-normal font-medium`}>
        mike lind | web dev
      </Link>
      <DarkModeToggle />
    </header>
  );
}
