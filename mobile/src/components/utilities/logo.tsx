export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-md">
        <span className="text-2xl font-bold text-primary-foreground">G</span>
      </div>
      <span className="text-xl font-bold text-foreground tracking-tight">Gestão</span>
    </div>
  )
}
