export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {/* Top progress bar */}
      <div className="h-0.5 w-full bg-[var(--border)] overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-accent via-purple-500 to-accent rounded-full animate-[shimmer_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
