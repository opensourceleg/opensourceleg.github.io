import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface PageHeroProps {
  title: string | ReactNode
  description: string
  className?: string
  primaryButton?: {
    href?: string
    text: string
    icon?: ReactNode
    target?: string
    disabled?: boolean
  }
  secondaryButton?: {
    href?: string
    text: string
    icon?: ReactNode
    target?: string
    disabled?: boolean
  }
  middleButton?: {
    href?: string
    text: string
    icon?: ReactNode
    target?: string
    disabled?: boolean
  }
}

export function PageHero({ 
  title, 
  description, 
  className = "",
  primaryButton,
  middleButton,
  secondaryButton 
}: PageHeroProps) {
  return (
    <div className={`py-16 px-4 sm:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed text-balance">
          {description}
        </p>
        
        {(primaryButton || middleButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 items-center justify-center">
            {primaryButton && (
              primaryButton.disabled || !primaryButton.href ? (
                <Button
                  disabled
                  aria-disabled="true"
                  className="bg-[var(--light-green)] text-black border rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  {primaryButton.icon}
                  {primaryButton.text}
                </Button>
              ) : (
                <Button 
                  href={primaryButton.href}
                  target={primaryButton.target}
                  rel={primaryButton.target === "_blank" ? "noopener noreferrer" : undefined}
                  className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                >
                  {primaryButton.icon}
                  {primaryButton.text}
                </Button>
              )
            )}

            {middleButton && (
              middleButton.disabled || !middleButton.href ? (
                <Button
                  disabled
                  aria-disabled="true"
                  variant="outline"
                  className="text-black border-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  {middleButton.icon}
                  {middleButton.text}
                </Button>
              ) : (
                <Button
                  href={middleButton.href}
                  target={middleButton.target}
                  rel={middleButton.target === "_blank" ? "noopener noreferrer" : undefined}
                  variant="outline"
                  className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                >
                  {middleButton.icon}
                  {middleButton.text}
                </Button>
              )
            )}
            
            {secondaryButton && (
              secondaryButton.disabled || !secondaryButton.href ? (
                <Button
                  disabled
                  aria-disabled="true"
                  variant="outline"
                  className="text-black border-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  {secondaryButton.icon}
                  {secondaryButton.text}
                </Button>
              ) : (
                <Button
                  href={secondaryButton.href}
                  target={secondaryButton.target}
                  rel={secondaryButton.target === "_blank" ? "noopener noreferrer" : undefined}
                  variant="outline"
                  className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                >
                  {secondaryButton.icon}
                  {secondaryButton.text}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
} 
