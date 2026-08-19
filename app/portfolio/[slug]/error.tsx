'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='p-8 text-center flex flex-col items-center gap-8'>
      <h2 className="font-bold">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => retry()
        }
        className="bg-background 2xs:p-5 xs:px-8 border p-4 text-lg shadow-[4px_4px_var(--foreground)]"
      >
        Try again
      </button>
    </div>
  )
}
