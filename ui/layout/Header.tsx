import Link from "next/link";
import Toggle from "../components/Toggle";
import LogoBW from "../components/LogoBW";

export default function Header() {
  return (
    <header className="bg-background xs:flex-row xs:justify-around xs:p-6 relative z-1 flex w-full flex-col items-center gap-4 py-4 sm:justify-between">
      <Link
        href="/"
        className="xs:flex-row xs:gap-8 flex w-full flex-col items-center gap-4"
      >
        <LogoBW />
        <h1 className="text-2xl">mike lind | web dev</h1>
      </Link>
      <Toggle />
    </header>
  );
}
