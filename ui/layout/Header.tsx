import Link from "next/link";
import Toggle from "../components/Toggle";

export default function Header() {
  return (
    <header className="xs:flex-row xs:justify-around xs:p-6 flex w-full flex-col items-center gap-4 p-4 sm:justify-between">
      <Link href="/">
        <h1 className={`text-[1.5rem]`}>mike lind | web dev</h1>
      </Link>
      <Toggle />
    </header>
  );
}
