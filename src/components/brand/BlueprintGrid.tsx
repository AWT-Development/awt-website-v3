export function BlueprintGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "5rem 5rem",
        maskImage:
          "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
      }}
    />
  );
}
