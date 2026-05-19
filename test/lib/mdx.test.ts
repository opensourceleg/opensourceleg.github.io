import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { getPostSlugs, getPostBySlug, getAllPosts, getPaginatedPosts, type Post, type PaginatedPosts } from '@/lib/mdx'

// Mock the filesystem functions
vi.mock('fs', () => {
  const mockReadFileSync = vi.fn()
  const mockReaddirSync = vi.fn()
  return {
    readFileSync: mockReadFileSync,
    readdirSync: mockReaddirSync,
    default: {
      readFileSync: mockReadFileSync,
      readdirSync: mockReaddirSync
    }
  }
})

// Mock the path module
vi.mock('path', () => {
  const mockJoin = vi.fn((...paths) => paths.join('/'))
  return {
    join: mockJoin,
    default: {
      join: mockJoin
    }
  }
})

// Mock reading-time
vi.mock('reading-time', () => ({
  default: vi.fn(() => ({ text: '2 min read' }))
}))

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn()
}))

// Import mocked modules
const mockedReadFileSync = readFileSync as any
const mockedReaddirSync = readdirSync as any
const mockedMatter = await import('gray-matter') as any

describe('MDX Library', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPostSlugs', () => {
    it('returns only MDX files from posts directory', () => {
      mockedReaddirSync.mockReturnValue([
        'post1.mdx',
        'post2.mdx',
        'README.md',
        'image.jpg',
        'post3.mdx'
      ])

      const slugs = getPostSlugs()

      expect(mockedReaddirSync).toHaveBeenCalledWith(`${process.cwd()}/posts`)
      expect(slugs).toEqual(['post1.mdx', 'post2.mdx', 'post3.mdx'])
    })

    it('returns empty array when no MDX files found', () => {
      mockedReaddirSync.mockReturnValue([
        'README.md',
        'image.jpg',
        'config.json'
      ])

      const slugs = getPostSlugs()

      expect(slugs).toEqual([])
    })

    it('handles empty directory', () => {
      mockedReaddirSync.mockReturnValue([])

      const slugs = getPostSlugs()

      expect(slugs).toEqual([])
    })
  })

  describe('getPostBySlug', () => {
    beforeEach(() => {
      mockedMatter.default.mockReturnValue({
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          excerpt: 'Test excerpt',
          author: 'Test Author',
          tags: ['test', 'mdx']
        },
        content: 'This is test content for the post.'
      })
    })

    it('parses MDX file and returns Post object', () => {
      mockedReadFileSync.mockReturnValue('---\ntitle: Test Post\n---\nContent')

      const post = getPostBySlug('test-post')

      expect(post).toEqual({
        slug: 'test-post',
        title: 'Test Post',
        date: '2023-01-01',
        excerpt: 'Test excerpt',
        author: 'Test Author',
        tags: ['test', 'mdx'],
        readingTime: '2 min read',
        content: 'This is test content for the post.'
      })

      expect(mockedReadFileSync).toHaveBeenCalledWith(`${process.cwd()}/posts/test-post.mdx`, 'utf8')
    })

    it('removes .mdx extension from slug', () => {
      mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\nContent')

      const post = getPostBySlug('test-post.mdx')

      expect(post.slug).toBe('test-post')
      expect(mockedReadFileSync).toHaveBeenCalledWith(`${process.cwd()}/posts/test-post.mdx`, 'utf8')
    })

    it('handles missing frontmatter fields with defaults', () => {
      mockedMatter.default.mockReturnValue({
        data: {
          title: 'Test Post'
        },
        content: 'Content'
      })
      mockedReadFileSync.mockReturnValue('---\ntitle: Test Post\n---\nContent')

      const post = getPostBySlug('test-post')

      expect(post.excerpt).toBe('')
      expect(post.author).toBe('')
      expect(post.tags).toEqual([])
    })

    it('handles empty frontmatter', () => {
      mockedMatter.default.mockReturnValue({
        data: {},
        content: 'Content'
      })
      mockedReadFileSync.mockReturnValue('Content')

      const post = getPostBySlug('test-post')

      expect(post.title).toBe('')
      expect(post.date).toBe('')
      expect(post.excerpt).toBe('')
      expect(post.author).toBe('')
      expect(post.tags).toEqual([])
    })

    it('calculates reading time correctly', async () => {
      const mockReadingTime = await import('reading-time') as any
      mockReadingTime.default.mockReturnValue({ text: '5 min read' })
      
      mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\nContent')

      const post = getPostBySlug('test-post')

      expect(post.readingTime).toBe('5 min read')
    })
  })

  describe('getAllPosts', () => {
    beforeEach(() => {
      mockedMatter.default.mockImplementation((content: string) => {
        if (content.includes('post1')) {
          return {
            data: { title: 'Post 1', date: '2023-01-15' },
            content: 'Content 1'
          }
        }
        if (content.includes('post2')) {
          return {
            data: { title: 'Post 2', date: '2023-01-10' },
            content: 'Content 2'
          }
        }
        if (content.includes('post3')) {
          return {
            data: { title: 'Post 3', date: '2023-01-20' },
            content: 'Content 3'
          }
        }
        return { data: {}, content: '' }
      })
    })

    it('returns all posts sorted by date (newest first)', () => {
      mockedReaddirSync.mockReturnValue(['post1.mdx', 'post2.mdx', 'post3.mdx'])
      mockedReadFileSync
        .mockReturnValueOnce('post1 content')
        .mockReturnValueOnce('post2 content')
        .mockReturnValueOnce('post3 content')

      const posts = getAllPosts()

      expect(posts).toHaveLength(3)
      expect(posts[0].title).toBe('Post 3') // newest first
      expect(posts[1].title).toBe('Post 1')
      expect(posts[2].title).toBe('Post 2') // oldest last
    })

    it('handles empty posts directory', () => {
      mockedReaddirSync.mockReturnValue([])

      const posts = getAllPosts()

      expect(posts).toEqual([])
    })

    it('handles posts with same date', () => {
      mockedReaddirSync.mockReturnValue(['post1.mdx', 'post2.mdx'])
      mockedMatter.default.mockImplementation((content: string) => {
        if (content.includes('post1')) {
          return {
            data: { title: 'Post 1', date: '2023-01-15' },
            content: 'Content 1'
          }
        }
        if (content.includes('post2')) {
          return {
            data: { title: 'Post 2', date: '2023-01-15' },
            content: 'Content 2'
          }
        }
        return { data: {}, content: '' }
      })
      mockedReadFileSync
        .mockReturnValueOnce('post1 content')
        .mockReturnValueOnce('post2 content')

      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      // Both posts have same date, order should be maintained
      expect(posts.every(post => post.date === '2023-01-15')).toBe(true)
    })
  })

  describe('getPaginatedPosts', () => {
    beforeEach(() => {
      // Setup mock for 10 posts
      mockedReaddirSync.mockReturnValue([
        'post1.mdx', 'post2.mdx', 'post3.mdx', 'post4.mdx', 'post5.mdx',
        'post6.mdx', 'post7.mdx', 'post8.mdx', 'post9.mdx', 'post10.mdx'
      ])
      
      mockedMatter.default.mockImplementation((content: string) => {
        const match = content.match(/post(\d+)/)
        const num = match ? parseInt(match[1]) : 1
        return {
          data: { 
            title: `Post ${num}`, 
            date: `2023-01-${num.toString().padStart(2, '0')}` 
          },
          content: `Content ${num}`
        }
      })

      mockedReadFileSync.mockImplementation((path: string) => {
        const match = path.match(/post(\d+)\.mdx/)
        const num = match ? match[1] : '1'
        return `post${num} content`
      })
    })

    it('returns first page with default parameters', () => {
      const result = getPaginatedPosts()

      expect(result.posts).toHaveLength(4) // default postsPerPage
      expect(result.currentPage).toBe(1)
      expect(result.totalPages).toBe(3) // 10 posts / 4 per page = 3 pages (rounded up)
      expect(result.totalPosts).toBe(10)
      expect(result.hasNextPage).toBe(true)
      expect(result.hasPreviousPage).toBe(false)
    })

    it('returns correct page with custom parameters', () => {
      const result = getPaginatedPosts(2, 3)

      expect(result.posts).toHaveLength(3)
      expect(result.currentPage).toBe(2)
      expect(result.totalPages).toBe(4) // 10 posts / 3 per page = 4 pages (rounded up)
      expect(result.hasNextPage).toBe(true)
      expect(result.hasPreviousPage).toBe(true)
    })

    it('handles last page correctly', () => {
      const result = getPaginatedPosts(3, 4)

      expect(result.posts).toHaveLength(2) // only 2 posts on last page
      expect(result.currentPage).toBe(3)
      expect(result.hasNextPage).toBe(false)
      expect(result.hasPreviousPage).toBe(true)
    })

    it('handles page number beyond total pages', () => {
      const result = getPaginatedPosts(10, 4)

      expect(result.currentPage).toBe(3) // should clamp to max page
      expect(result.posts).toHaveLength(2)
      expect(result.hasNextPage).toBe(false)
    })

    it('handles page number less than 1', () => {
      const result = getPaginatedPosts(0, 4)

      expect(result.currentPage).toBe(1) // should clamp to min page
      expect(result.hasPreviousPage).toBe(false)
    })

    it('handles negative page numbers', () => {
      const result = getPaginatedPosts(-5, 4)

      expect(result.currentPage).toBe(1) // should clamp to min page
      expect(result.hasPreviousPage).toBe(false)
    })

    it('handles single page of posts', () => {
      mockedReaddirSync.mockReturnValue(['post1.mdx', 'post2.mdx'])
      
      const result = getPaginatedPosts(1, 5)

      expect(result.posts).toHaveLength(2)
      expect(result.currentPage).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.hasNextPage).toBe(false)
      expect(result.hasPreviousPage).toBe(false)
    })

    it('handles empty posts list', () => {
      mockedReaddirSync.mockReturnValue([])

      const result = getPaginatedPosts()

      expect(result.posts).toHaveLength(0)
      expect(result.currentPage).toBe(1)
      expect(result.totalPages).toBe(0)
      expect(result.totalPosts).toBe(0)
      expect(result.hasNextPage).toBe(false)
      expect(result.hasPreviousPage).toBe(false)
    })

    it('calculates total pages correctly', () => {
      // Test various combinations
      mockedReaddirSync.mockReturnValue(new Array(7).fill(0).map((_, i) => `post${i + 1}.mdx`))

      const result1 = getPaginatedPosts(1, 3) // 7 posts, 3 per page = 3 pages
      expect(result1.totalPages).toBe(3)

      const result2 = getPaginatedPosts(1, 4) // 7 posts, 4 per page = 2 pages
      expect(result2.totalPages).toBe(2)

      const result3 = getPaginatedPosts(1, 10) // 7 posts, 10 per page = 1 page
      expect(result3.totalPages).toBe(1)
    })
  })

  describe('Type Safety', () => {
    it('Post type has correct structure', () => {
      const post: Post = {
        slug: 'test',
        title: 'Test',
        date: '2023-01-01',
        excerpt: 'Test excerpt',
        author: 'Test Author',
        tags: ['test'],
        readingTime: '2 min read',
        content: 'Content'
      }

      expect(typeof post.slug).toBe('string')
      expect(typeof post.title).toBe('string')
      expect(typeof post.date).toBe('string')
      expect(typeof post.readingTime).toBe('string')
      expect(typeof post.content).toBe('string')
      expect(Array.isArray(post.tags)).toBe(true)
    })

    it('PaginatedPosts type has correct structure', () => {
      const paginatedPosts: PaginatedPosts = {
        posts: [],
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }

      expect(Array.isArray(paginatedPosts.posts)).toBe(true)
      expect(typeof paginatedPosts.currentPage).toBe('number')
      expect(typeof paginatedPosts.totalPages).toBe('number')
      expect(typeof paginatedPosts.totalPosts).toBe('number')
      expect(typeof paginatedPosts.hasNextPage).toBe('boolean')
      expect(typeof paginatedPosts.hasPreviousPage).toBe('boolean')
    })
  })
}) 