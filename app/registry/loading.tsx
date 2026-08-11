export default function RegistryLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
      <div className="mx-auto h-4 w-40 animate-pulse bg-line/80" />
      <div className="mx-auto mt-6 h-10 w-72 max-w-full animate-pulse bg-line/80" />
      <div className="mx-auto mt-6 h-16 w-full max-w-xl animate-pulse bg-line/60" />
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[4/5] animate-pulse bg-line/70" />
            <div className="h-3 w-20 animate-pulse bg-line/70" />
            <div className="h-6 w-3/4 animate-pulse bg-line/70" />
            <div className="h-12 w-full animate-pulse bg-line/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
