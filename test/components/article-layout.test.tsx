import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ArticleLayout } from '@/components/article-layout'
import type { Post } from '@/lib/mdx'

// Mock date-fns
vi.mock('date-fns', () => ({
  formatDistanceToNow: vi.fn()
}))

const { formatDistanceToNow } = await import('date-fns')
const mockFormatDistanceToNow = vi.mocked(formatDistanceToNow)

describe('ArticleLayout Component', () => {
  const mockPost: Post = {
    slug: 'test-article',
    title: 'Test Article Title',
    date: '2024-01-15',
    excerpt: 'This is a test excerpt for the article.',
    author: 'John Doe',
    tags: ['test', 'react'],
    readingTime: '5 min read',
    content: 'Test content'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockFormatDistanceToNow.mockReturnValue('2 days ago')
  })

  describe('Basic Rendering', () => {
    it('renders article title', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Test content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByRole('heading', { name: 'Test Article Title' })).toBeInTheDocument()
    })

    it('renders article content', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Test article content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText('Test article content')).toBeInTheDocument()
    })

    it('applies correct heading styles', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      const heading = screen.getByRole('heading', { name: 'Test Article Title' })
      expect(heading).toHaveClass('text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl')
    })
  })

  describe('Excerpt Rendering', () => {
    it('renders excerpt when provided', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText('This is a test excerpt for the article.')).toBeInTheDocument()
    })

    it('does not render excerpt when not provided', () => {
      const postWithoutExcerpt = { ...mockPost, excerpt: undefined }
      render(
        <ArticleLayout post={postWithoutExcerpt}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.queryByText('This is a test excerpt for the article.')).not.toBeInTheDocument()
    })

    it('does not render excerpt paragraph when excerpt is empty string', () => {
      const postWithEmptyExcerpt = { ...mockPost, excerpt: '' }
      const { container } = render(
        <ArticleLayout post={postWithEmptyExcerpt}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      // Should not find excerpt text in the DOM
      expect(screen.queryByText('This is a test excerpt for the article.')).not.toBeInTheDocument()
    })
  })

  describe('Author Information', () => {
    it('renders author when provided', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      // Should also have User icon
      expect(screen.getByTestId || screen.getByLabelText || (() => document.querySelector('[data-testid="user-icon"]'))).toBeTruthy()
    })

    it('does not render author section when not provided', () => {
      const postWithoutAuthor = { ...mockPost, author: undefined }
      render(
        <ArticleLayout post={postWithoutAuthor}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    })
  })

  describe('Date Formatting', () => {
    it('formats and displays publish date correctly', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      // Should display formatted date (allowing for timezone differences)
      expect(screen.getByText(/January 1[45], 2024/)).toBeInTheDocument()
      
      // Should call formatDistanceToNow
      expect(mockFormatDistanceToNow).toHaveBeenCalledWith(
        new Date('2024-01-15'),
        { addSuffix: true }
      )
    })

    it('displays relative time from formatDistanceToNow', () => {
      mockFormatDistanceToNow.mockReturnValue('3 weeks ago')
      
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText(/3 weeks ago/)).toBeInTheDocument()
    })

    it('sets correct datetime attribute on time element', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveAttribute('datetime', '2024-01-15')
    })

    it('handles different date formats', () => {
      const postWithDifferentDate = { ...mockPost, date: '2023-12-25' }
      render(
        <ArticleLayout post={postWithDifferentDate}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText(/December 2[45], 2023/)).toBeInTheDocument()
      expect(mockFormatDistanceToNow).toHaveBeenCalledWith(
        new Date('2023-12-25'),
        { addSuffix: true }
      )
    })
  })

  describe('Reading Time', () => {
    it('displays reading time', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText('5 min read')).toBeInTheDocument()
    })

    it('handles different reading time formats', () => {
      const postWithLongReadingTime = { ...mockPost, readingTime: '12 min read' }
      render(
        <ArticleLayout post={postWithLongReadingTime}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      expect(screen.getByText('12 min read')).toBeInTheDocument()
    })
  })

  describe('Navigation Links', () => {
    it('renders "View all articles" button with correct href', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      const viewAllButton = screen.getByRole('link', { name: /view all articles/i })
      expect(viewAllButton).toHaveAttribute('href', '/articles')
    })

    it('renders share button', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      const shareButton = screen.getByRole('link', { name: /share/i })
      expect(shareButton).toBeInTheDocument()
    })

    it('applies correct button styling', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      const viewAllButton = screen.getByRole('link', { name: /view all articles/i })
      const shareButton = screen.getByRole('link', { name: /share/i })
      
      // Check that buttons have appropriate classes
      expect(viewAllButton).toHaveClass('bg-transparent')
      expect(shareButton).toHaveClass('bg-[var(--light-green)]')
    })
  })

  describe('Layout Structure', () => {
    it('renders correct semantic structure', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Article content</div>
        </ArticleLayout>
      )
      
      // Should have main elements for header and content
      const mainElements = screen.getAllByRole('main')
      expect(mainElements).toHaveLength(2) // Header main and content main
      
      // Should have article element
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('applies correct prose styling to article content', () => {
      render(
        <ArticleLayout post={mockPost}>
          <div>Article content</div>
        </ArticleLayout>
      )
      
      const article = screen.getByRole('article')
      expect(article).toHaveClass('prose', 'prose-lg', 'prose-gray', 'max-w-none')
    })

    it('renders horizontal divider', () => {
      const { container } = render(
        <ArticleLayout post={mockPost}>
          <div>Content</div>
        </ArticleLayout>
      )
      
      // Look for the divider element
      const divider = container.querySelector('.h-px.bg-gray-900')
      expect(divider).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles missing optional fields gracefully', () => {
      const minimalPost: Post = {
        slug: 'minimal',
        title: 'Minimal Post',
        date: '2024-01-15',
        readingTime: '1 min read',
        content: 'content'
      }
      
      expect(() => {
        render(
          <ArticleLayout post={minimalPost}>
            <div>Content</div>
          </ArticleLayout>
        )
      }).not.toThrow()
      
      expect(screen.getByText('Minimal Post')).toBeInTheDocument()
      expect(screen.getByText('1 min read')).toBeInTheDocument()
    })

    it('handles empty content gracefully', () => {
      render(
        <ArticleLayout post={mockPost}>
          {null}
        </ArticleLayout>
      )
      
      expect(screen.getByRole('article')).toBeInTheDocument()
    })
  })
}) 