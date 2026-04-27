import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PageHero } from '@/components/page-hero'

// Mock the Button component from shadcn/ui
vi.mock('@/components/ui/button', () => ({
  Button: ({ href, target, rel, className, children, variant, ...props }: any) => (
    <a 
      href={href} 
      target={target} 
      rel={rel} 
      className={className}
      data-variant={variant}
      {...props}
    >
      {children}
    </a>
  )
}))

describe('PageHero Component', () => {
  const mockProps = {
    title: 'Test Hero Title',
    description: 'This is a test description for the hero section.'
  }

  describe('Basic Rendering', () => {
    it('renders title and description', () => {
      render(<PageHero {...mockProps} />)
      
      expect(screen.getByRole('heading', { name: 'Test Hero Title' })).toBeInTheDocument()
      expect(screen.getByText('This is a test description for the hero section.')).toBeInTheDocument()
    })

    it('applies correct heading styles', () => {
      render(<PageHero {...mockProps} />)
      
      const heading = screen.getByRole('heading', { name: 'Test Hero Title' })
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl', 'font-light')
    })

    it('applies correct description styles', () => {
      render(<PageHero {...mockProps} />)
      
      const description = screen.getByText('This is a test description for the hero section.')
      expect(description).toHaveClass('text-lg', 'md:text-xl', 'text-black/70')
    })

    it('renders with custom className', () => {
      const { container } = render(
        <PageHero {...mockProps} className="custom-class" />
      )
      
      const heroDiv = container.firstChild as HTMLElement
      expect(heroDiv).toHaveClass('custom-class')
    })
  })

  describe('Title Rendering', () => {
    it('renders string title correctly', () => {
      render(<PageHero {...mockProps} title="String Title" />)
      
      expect(screen.getByRole('heading', { name: 'String Title' })).toBeInTheDocument()
    })

    it('renders ReactNode title correctly', () => {
      const reactNodeTitle = (
        <span>
          Complex <strong>Title</strong> with <em>markup</em>
        </span>
      )
      
      render(<PageHero {...mockProps} title={reactNodeTitle} />)
      
      // Use more flexible text matching for split text
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Complex Title with markup')
      expect(heading.querySelector('strong')).toHaveTextContent('Title')
      expect(heading.querySelector('em')).toHaveTextContent('markup')
    })
  })

  describe('Button Rendering - No Buttons', () => {
    it('does not render buttons section when no buttons provided', () => {
      const { container } = render(<PageHero {...mockProps} />)
      
      // Should not find the button container div
      const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(buttonContainer).toBeNull()
    })
  })

  describe('Primary Button', () => {
    it('renders primary button with basic props', () => {
      const primaryButton = {
        href: '/primary-link',
        text: 'Primary Action'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'Primary Action' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('href', '/primary-link')
    })

    it('applies correct primary button styling', () => {
      const primaryButton = {
        href: '/test',
        text: 'Test Button'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'Test Button' })
      expect(button).toHaveClass('bg-[var(--light-green)]', 'text-black')
    })

    it('renders primary button with icon', () => {
      const mockIcon = <span data-testid="test-icon">🚀</span>
      const primaryButton = {
        href: '/test',
        text: 'With Icon',
        icon: mockIcon
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('With Icon')).toBeInTheDocument()
    })

    it('handles external links with target="_blank"', () => {
      const primaryButton = {
        href: 'https://external.com',
        text: 'External Link',
        target: '_blank'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'External Link' })
      expect(button).toHaveAttribute('target', '_blank')
      expect(button).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('does not add rel attribute for internal links', () => {
      const primaryButton = {
        href: '/internal',
        text: 'Internal Link'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'Internal Link' })
      expect(button).not.toHaveAttribute('rel')
    })
  })

  describe('Secondary Button', () => {
    it('renders secondary button with correct variant', () => {
      const secondaryButton = {
        href: '/secondary',
        text: 'Secondary Action'
      }
      
      render(<PageHero {...mockProps} secondaryButton={secondaryButton} />)
      
      const button = screen.getByRole('link', { name: 'Secondary Action' })
      expect(button).toHaveAttribute('data-variant', 'outline')
    })

    it('applies correct secondary button styling', () => {
      const secondaryButton = {
        href: '/test',
        text: 'Secondary Button'
      }
      
      render(<PageHero {...mockProps} secondaryButton={secondaryButton} />)
      
      const button = screen.getByRole('link', { name: 'Secondary Button' })
      expect(button).toHaveClass('text-black', 'border-black')
    })

    it('handles external secondary button correctly', () => {
      const secondaryButton = {
        href: 'https://external.com',
        text: 'External Secondary',
        target: '_blank'
      }
      
      render(<PageHero {...mockProps} secondaryButton={secondaryButton} />)
      
      const button = screen.getByRole('link', { name: 'External Secondary' })
      expect(button).toHaveAttribute('target', '_blank')
      expect(button).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Both Buttons', () => {
    it('renders both buttons when provided', () => {
      const primaryButton = {
        href: '/primary',
        text: 'Primary'
      }
      const secondaryButton = {
        href: '/secondary',
        text: 'Secondary'
      }
      
      render(
        <PageHero 
          {...mockProps} 
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        />
      )
      
      expect(screen.getByRole('link', { name: 'Primary' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Secondary' })).toBeInTheDocument()
    })

    it('renders buttons in correct order (primary first)', () => {
      const primaryButton = {
        href: '/primary',
        text: 'Primary Button'
      }
      const secondaryButton = {
        href: '/secondary', 
        text: 'Secondary Button'
      }
      
      const { container } = render(
        <PageHero 
          {...mockProps} 
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        />
      )
      
      const buttons = container.querySelectorAll('a')
      expect(buttons[0]).toHaveTextContent('Primary Button')
      expect(buttons[1]).toHaveTextContent('Secondary Button')
    })

    it('applies responsive flex layout to button container', () => {
      const primaryButton = { href: '/primary', text: 'Primary' }
      const { container } = render(
        <PageHero {...mockProps} primaryButton={primaryButton} />
      )
      
      const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(buttonContainer).toBeInTheDocument()
      expect(buttonContainer).toHaveClass('gap-3', 'sm:gap-4', 'mt-8')
    })
  })

  describe('Button Edge Cases', () => {
    it('renders only primary button when secondary is not provided', () => {
      const primaryButton = {
        href: '/only-primary',
        text: 'Only Primary'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      expect(screen.getByRole('link', { name: 'Only Primary' })).toBeInTheDocument()
      expect(screen.queryByText('Secondary')).not.toBeInTheDocument()
    })

    it('renders only secondary button when primary is not provided', () => {
      const secondaryButton = {
        href: '/only-secondary',
        text: 'Only Secondary'
      }
      
      render(<PageHero {...mockProps} secondaryButton={secondaryButton} />)
      
      expect(screen.getByRole('link', { name: 'Only Secondary' })).toBeInTheDocument()
      expect(screen.queryByText('Primary')).not.toBeInTheDocument()
    })

    it('handles missing target attribute gracefully', () => {
      const primaryButton = {
        href: 'https://external.com',
        text: 'No Target Specified'
        // target not specified
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'No Target Specified' })
      expect(button).not.toHaveAttribute('target')
      expect(button).not.toHaveAttribute('rel')
    })

    it('handles empty icon gracefully', () => {
      const primaryButton = {
        href: '/test',
        text: 'No Icon',
        icon: null
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const button = screen.getByRole('link', { name: 'No Icon' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('No Icon')
    })
  })

  describe('Layout and Responsiveness', () => {
    it('applies correct container classes', () => {
      const { container } = render(<PageHero {...mockProps} />)
      
      const outerDiv = container.firstChild as HTMLElement
      const innerDiv = outerDiv.firstChild as HTMLElement
      
      expect(outerDiv).toHaveClass('py-16', 'px-4', 'sm:px-6')
      expect(innerDiv).toHaveClass('max-w-6xl', 'mx-auto', 'text-center')
    })

    it('merges custom className with default classes', () => {
      const { container } = render(
        <PageHero {...mockProps} className="bg-red-500 custom-padding" />
      )
      
      const outerDiv = container.firstChild as HTMLElement
      expect(outerDiv).toHaveClass('py-16', 'px-4', 'sm:px-6') // default classes
      expect(outerDiv).toHaveClass('bg-red-500', 'custom-padding') // custom classes
    })
  })

  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      render(<PageHero {...mockProps} />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('provides accessible link names', () => {
      const primaryButton = {
        href: '/accessible-link',
        text: 'Accessible Button Text'
      }
      
      render(<PageHero {...mockProps} primaryButton={primaryButton} />)
      
      const link = screen.getByRole('link', { name: 'Accessible Button Text' })
      expect(link).toBeInTheDocument()
    })

    it('sets correct rel attributes for external links', () => {
      const buttons = [
        {
          href: 'https://external1.com',
          text: 'External 1',
          target: '_blank'
        },
        {
          href: 'https://external2.com', 
          text: 'External 2',
          target: '_blank'
        }
      ]
      
      render(
        <PageHero 
          {...mockProps} 
          primaryButton={buttons[0]}
          secondaryButton={buttons[1]}
        />
      )
      
      const link1 = screen.getByRole('link', { name: 'External 1' })
      const link2 = screen.getByRole('link', { name: 'External 2' })
      
      expect(link1).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link2).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
}) 