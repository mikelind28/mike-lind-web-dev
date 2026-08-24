"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();
  return (
    <div className="flex flex-col items-center gap-8 p-8 text-center">
      <h2 className="font-bold">Couldn&apos;t find &quot;{path}&quot;.</h2>
      <Link
        href="/"
        className="bg-background 2xs:p-5 xs:px-8 border p-4 text-lg shadow-[4px_4px_var(--foreground)]"
      >
        Return home
      </Link>
    </div>
  );
}
