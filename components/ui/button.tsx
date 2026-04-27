import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
  href?: string
  target?: string
  rel?: string
}

export function buttonVariants({
  variant = "default",
  size = "default",
}: {
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
} = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
      "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
    },
    {
      "h-9 px-4 py-2": size === "default",
      "h-8 rounded-md px-3 text-xs": size === "sm",
      "h-10 rounded-md px-8": size === "lg",
      "h-9 w-9": size === "icon",
    }
  )
}

type ButtonOrLinkProps = ButtonProps & 
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  )

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonOrLinkProps>(
  ({ className, variant = "default", size = "default", href, ...props }, ref) => {
    const baseClasses = cn(buttonVariants({ variant, size }), className)

    if (href) {
      return (
        <a
          href={href}
          className={baseClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      )
    }

    return (
      <button
        className={baseClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 