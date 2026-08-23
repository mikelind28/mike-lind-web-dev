export default function CrosshatchDivider() {
  return (
    <div className="bg-background my-4">
      <div
        className="bg-foreground h-3 mask-[url('/patterns/cross-hatch.svg')] mask-size-[50px_50px] mask-center mask-repeat"
      />
    </div>
  )
}