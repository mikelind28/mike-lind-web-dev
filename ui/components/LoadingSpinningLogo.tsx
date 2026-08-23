import LogoBW from "@/ui/components/LogoBW";

export default function LoadingSpinningLogo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <p className="text-center align-middle text-3xl">Loading...</p>
      <div className="spinning-logo">
        <LogoBW />
      </div>
    </div>
  );
}
