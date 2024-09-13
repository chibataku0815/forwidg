import { cn } from "@repo/ui/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ui-animate-pulse ui-rounded-md ui-bg-slate-100 dark:ui-bg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
