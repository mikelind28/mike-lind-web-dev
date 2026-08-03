import Link from "next/link";
import Toggle from "../components/Toggle";

export default function Header() {
  return (
    <header className="flex flex-col items-center w-full p-4 gap-4">
      <Link href="/">
        <h1 className={`text-[1.5rem]`}>mike lind | web dev</h1>
      </Link>
      <Toggle />
    </header>
  );
}
