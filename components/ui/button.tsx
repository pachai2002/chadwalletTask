import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/40 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-[#00FF88] text-black hover:bg-[#00cc6a] glow-primary-sm border border-[#00FF88]/30",
      outline: "border border-[#00FF88]/30 bg-transparent hover:bg-[#00FF88]/10 text-white hover:border-[#00FF88]/60",
      ghost: "hover:bg-[#00FF88]/10 hover:text-[#00FF88] text-white/70",
      glass: "glass hover:bg-[#00FF88]/10 text-white hover:border-[#00FF88]/20"
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-lg px-3",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10"
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
