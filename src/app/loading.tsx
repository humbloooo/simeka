export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber text-navy font-heading font-bold text-xl animate-pulse">
          SH
        </div>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-amber animate-bounce [animation-delay:0ms]" />
          <div className="h-2 w-2 rounded-full bg-amber animate-bounce [animation-delay:150ms]" />
          <div className="h-2 w-2 rounded-full bg-amber animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
