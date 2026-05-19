import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LatestArticleStrip } from '@/components/latest-article-strip'
import { getAllPosts } from '@/lib/mdx'

// Mock the MDX utilities
const mockPosts = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    date: '2024-01-15',
    excerpt: 'Test excerpt 1',
    author: 'Test Author',
    tags: ['test'],
    readingTime: '5 min read',
    content: 'Test content 1'
  },
  {
    slug: 'test-post-2', 
    title: 'Test Post 2',
    date: '2024-01-10',
    excerpt: 'Test excerpt 2',
    author: 'Test Author 2',
    tags: ['test'],
    readingTime: '3 min read',
    content: 'Test content 2'
  }
]

vi.mock('@/lib/mdx', () => ({
  getAllPosts: vi.fn()
}))

describe('LatestArticleStrip Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the latest article when posts exist', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    render(<LatestArticleStrip />)
    
    // Check for latest article title (first post in array)
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    
    // Check for reading time
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    
    // Check for "LATEST" indicator
    expect(screen.getByText('LATEST')).toBeInTheDocument()
  })

  it('renders empty container when no posts exist', () => {
    vi.mocked(getAllPosts).mockReturnValue([])
    
    const { container } = render(<LatestArticleStrip />)
    
    // Should render a container with the correct styling but no content
    const stripContainer = container.firstChild as HTMLElement
    expect(stripContainer).toBeInTheDocument()
    expect(stripContainer).toHaveClass('bg-[var(--light-blue)]')
    expect(stripContainer).toHaveClass('border-b')
    
    // Should not have any article content
    expect(screen.queryByText('LATEST')).not.toBeInTheDocument()
    expect(screen.queryByText('View all articles')).not.toBeInTheDocument()
  })

  it('creates correct link to the latest article', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    render(<LatestArticleStrip />)
    
    const link = screen.getByRole('link', { name: /test post 1/i })
    expect(link).toHaveAttribute('href', '/articles/test-post-1')
  })

  it('renders the "View all articles" link', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    render(<LatestArticleStrip />)
    
    const viewAllLink = screen.getByRole('link', { name: /view all articles/i })
    expect(viewAllLink).toHaveAttribute('href', '/articles')
  })

  it('displays the pulsing indicator', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    const { container } = render(<LatestArticleStrip />)
    
    const indicator = container.querySelector('.animate-pulse')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('bg-[var(--light-green)]')
  })

  it('renders with correct styling classes', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    const { container } = render(<LatestArticleStrip />)
    
    const stripContainer = container.firstChild as HTMLElement
    expect(stripContainer).toHaveClass('bg-[var(--light-blue)]')
  })

  it('displays Clock icon with reading time', () => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    
    render(<LatestArticleStrip />)
    
    // The Clock icon should be present (we can't easily test the icon itself due to SVG)
    // but we can test that the reading time text is present
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('handles single post correctly', () => {
    const singlePost = [mockPosts[0]]
    vi.mocked(getAllPosts).mockReturnValue(singlePost)
    
    render(<LatestArticleStrip />)
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument()
  })
}) 