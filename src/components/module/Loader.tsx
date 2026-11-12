// Lightweight CSS loader (replaces the react-loader-spinner ThreeDots visual).
// Same API: <Loader /> with no props.
function Loader() {
  return (
    <span role="status" aria-live="polite" className="inline-flex min-h-11 items-center gap-1.5 px-2">
      <span className="sr-only">در حال بارگذاری…</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-accent motion-safe:animate-pulse"
          style={{ animationDelay: `${i * 160}ms` }}
          aria-hidden
        />
      ))}
    </span>
  );
}

export default Loader;
