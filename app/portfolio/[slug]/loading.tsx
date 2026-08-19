export default function Loading() {
  return (
    <div className="relative flex w-full flex-col md:border-y">
      <div className="bg-foreground absolute inset-0 z-0 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat" />
      <div className="m-8 bg-background 2xs:p-5 xs:px-8 z-1 border p-4 text-lg shadow-[4px_4px_var(--foreground)]">
        <p>Loading...</p>
      </div>
    </div>
  );
}