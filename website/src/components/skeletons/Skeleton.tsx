/** Reusable skeleton primitive — animated pulse placeholder */
export function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-[#2D2D2D]/20 ${className}`}
      aria-hidden="true"
    />
  );
}
