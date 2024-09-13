import * as React from "react"

import { cn } from "@repo/ui/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ui-flex ui-h-10 ui-w-full ui-rounded-md ui-border ui-border-slate-200 ui-bg-white ui-px-3 ui-py-2 ui-text-sm ui-ring-offset-white file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium placeholder:ui-text-slate-500 focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-slate-950 focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 dark:ui-border-slate-800 dark:ui-bg-slate-950 dark:ui-ring-offset-slate-950 dark:placeholder:ui-text-slate-400 dark:focus-visible:ui-ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
