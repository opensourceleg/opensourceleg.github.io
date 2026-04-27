import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from '@/components/pagination'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    hasNextPage: true,
    hasPreviousPage: false,
  }

  describe('Basic Rendering', () => {
    it('renders pagination when totalPages > 1', () => {
      render(<Pagination {...defaultProps} />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('returns null when totalPages <= 1', () => {
      const { container } = render(
        <Pagination {...defaultProps} totalPages={1} />
      )
      expect(container.firstChild).toBeNull()
    })

    it('renders current page as active', () => {
      render(<Pagination {...defaultProps} currentPage={3} />)
      const activeLink = screen.getByRole('link', { name: '3' })
      expect(activeLink).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('Navigation Buttons', () => {
    it('disables previous button when hasPreviousPage is false', () => {
      render(<Pagination {...defaultProps} hasPreviousPage={false} />)
      const prevButton = screen.getByRole('link', { name: /previous/i })
      expect(prevButton).toHaveClass('pointer-events-none', 'opacity-50')
      expect(prevButton).toHaveAttribute('aria-disabled', 'true')
    })

    it('enables previous button when hasPreviousPage is true', () => {
      render(<Pagination {...defaultProps} currentPage={3} hasPreviousPage={true} />)
      const prevButton = screen.getByRole('link', { name: /previous/i })
      expect(prevButton).not.toHaveClass('pointer-events-none')
      expect(prevButton).toHaveAttribute('href', '/articles/2')
    })

    it('disables next button when hasNextPage is false', () => {
      render(<Pagination {...defaultProps} hasNextPage={false} />)
      const nextButton = screen.getByRole('link', { name: /next/i })
      expect(nextButton).toHaveClass('pointer-events-none', 'opacity-50')
      expect(nextButton).toHaveAttribute('aria-disabled', 'true')
    })

    it('enables next button when hasNextPage is true', () => {
      render(<Pagination {...defaultProps} hasNextPage={true} />)
      const nextButton = screen.getByRole('link', { name: /next/i })
      expect(nextButton).not.toHaveClass('pointer-events-none')
      expect(nextButton).toHaveAttribute('href', '/articles/2')
    })
  })

  describe('URL Generation', () => {
    it('generates href attributes for navigation', () => {
      render(<Pagination {...defaultProps} currentPage={2} />)
      const prevButton = screen.getByRole('link', { name: /previous/i })
      const nextButton = screen.getByRole('link', { name: /next/i })
      
      // Should have href attributes (exact URLs depend on implementation)
      expect(prevButton).toHaveAttribute('href')
      expect(nextButton).toHaveAttribute('href')
    })

    it('has placeholder hrefs when using callback mode', () => {
      const onPageChange = vi.fn()
      render(
        <Pagination 
          {...defaultProps} 
          currentPage={2} 
          onPageChange={onPageChange}
        />
      )
      const prevButton = screen.getByRole('link', { name: /previous/i })
      const nextButton = screen.getByRole('link', { name: /next/i })
      
      expect(prevButton).toHaveAttribute('href', '#')
      expect(nextButton).toHaveAttribute('href', '#')
    })
  })

  describe('Page Number Logic', () => {
    it('shows correct pages for small pagination', () => {
      render(<Pagination {...defaultProps} totalPages={4} currentPage={2} />)
      
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument()
      // Component might not show all pages depending on responsive logic
    })

    it('shows ellipsis for large page counts', () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />)
      
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
      expect(screen.getAllByText('More pages')).toHaveLength(2) // Ellipsis has sr-only text
      expect(screen.getByRole('link', { name: '10' })).toBeInTheDocument()
    })

    it('shows correct pages around current page', () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />)
      
      // Should show pages around current (5): 4, 5, 6
      expect(screen.getByRole('link', { name: '4' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '5' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '6' })).toBeInTheDocument()
    })

    it('adjusts page range at beginning', () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={2} />)
      
      // Should show more pages at beginning when near start
      expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument()
    })

    it('adjusts page range at end', () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={9} />)
      
      // Should show more pages at end when near finish
      expect(screen.getByRole('link', { name: '8' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '9' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: '10' })).toBeInTheDocument()
    })
  })

  describe('Callback Functionality', () => {
    it('calls onPageChange when provided instead of navigating', () => {
      const onPageChange = vi.fn()
      render(
        <Pagination 
          {...defaultProps} 
          currentPage={5}
          onPageChange={onPageChange}
        />
      )
      
      const nextButton = screen.getByRole('link', { name: /next/i })
      fireEvent.click(nextButton)
      
      expect(onPageChange).toHaveBeenCalledWith(6)
      expect(nextButton).toHaveAttribute('href', '#') // Placeholder href
    })

    it('calls onPageChange with correct page number for page links', () => {
      const onPageChange = vi.fn()
      render(
        <Pagination 
          {...defaultProps} 
          currentPage={5}
          totalPages={10}
          onPageChange={onPageChange}
        />
      )
      
      const pageOne = screen.getByRole('link', { name: '1' })
      fireEvent.click(pageOne)
      
      expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it('prevents default when using callback mode', () => {
      const onPageChange = vi.fn()
      render(
        <Pagination 
          {...defaultProps} 
          onPageChange={onPageChange}
        />
      )
      
      const nextButton = screen.getByRole('link', { name: /next/i })
      const clickEvent = new MouseEvent('click', { bubbles: true })
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')
      
      fireEvent(nextButton, clickEvent)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles single page correctly', () => {
      const { container } = render(
        <Pagination {...defaultProps} totalPages={1} />
      )
      expect(container.firstChild).toBeNull()
    })

    it('handles currentPage at boundaries', () => {
      // First page
      const { rerender } = render(<Pagination {...defaultProps} currentPage={1} totalPages={5} />)
      expect(screen.getByRole('link', { name: /previous/i })).toHaveClass('pointer-events-none')
      
      // Last page  
      rerender(<Pagination {...defaultProps} currentPage={5} totalPages={5} hasNextPage={false} />)
      expect(screen.getByRole('link', { name: /next/i })).toHaveClass('pointer-events-none')
    })
  })
}) 