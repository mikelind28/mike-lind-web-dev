import LogoBW from "@/ui/components/LogoBW";

export default function LoadingSpinningLogo() {
  return (
    <div className="m-8 h-full w-full flex flex-col items-center justify-center gap-4">
      <p className="text-center align-middle text-3xl">
        Loading...
      </p>
      <div className="spinning-logo">
        <LogoBW />
      </div>
    </div>
  );
}