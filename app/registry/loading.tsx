export default function RegistryLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-[4/5] animate-pulse bg-line/70" />
        <div className="flex flex-col justify-center gap-4 px-4">
          <div className="mx-auto h-3 w-40 animate-pulse bg-gold-soft/80 lg:mx-0" />
          <div className="mx-auto h-10 w-64 max-w-full animate-pulse bg-line/90 lg:mx-0" />
          <div className="mx-auto h-20 w-full max-w-md animate-pulse bg-line/60 lg:mx-0" />
        </div>
      </div>
      <div className="mt-10 h-28 animate-pulse bg-leaf/90" />
    </div>
  );
}
