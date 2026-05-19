import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMDXComponents } from '@/components/mdx-components'
import type { MDXComponents } from 'mdx/types'

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className, style, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      className={className}
      style={style}
      {...props} 
    />
  )
}))

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  )
}))

describe('useMDXComponents', () => {
  let components: MDXComponents

  beforeEach(() => {
    components = useMDXComponents({})
  })

  describe('Heading Components', () => {
    it('renders h1 with correct styling', () => {
      const H1 = components.h1! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<H1>Test Heading 1</H1>)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'mb-8', 'mt-12', 'text-gray-900')
      expect(heading).toHaveTextContent('Test Heading 1')
    })

    it('renders h2 with correct styling', () => {
      const H2 = components.h2! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<H2>Test Heading 2</H2>)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold', 'mb-6', 'mt-10', 'text-gray-900')
      expect(heading).toHaveTextContent('Test Heading 2')
    })

    it('renders h3 with correct styling', () => {
      const H3 = components.h3! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<H3>Test Heading 3</H3>)
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveClass('text-xl', 'md:text-2xl', 'font-semibold', 'mb-4', 'mt-8', 'text-gray-900')
      expect(heading).toHaveTextContent('Test Heading 3')
    })

    it('renders h4 with correct styling', () => {
      const H4 = components.h4! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<H4>Test Heading 4</H4>)
      
      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toHaveClass('text-lg', 'md:text-xl', 'font-semibold', 'mb-4', 'mt-6', 'text-gray-900')
      expect(heading).toHaveTextContent('Test Heading 4')
    })

    it('preserves heading hierarchy with correct levels', () => {
      const H1 = components.h1! as React.ComponentType<React.PropsWithChildren<{}>>
      const H2 = components.h2! as React.ComponentType<React.PropsWithChildren<{}>>
      const H3 = components.h3! as React.ComponentType<React.PropsWithChildren<{}>>
      const H4 = components.h4! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <div>
          <H1>Level 1</H1>
          <H2>Level 2</H2>
          <H3>Level 3</H3>
          <H4>Level 4</H4>
        </div>
      )
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Level 1')
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Level 2')
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Level 3')
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Level 4')
    })
  })

  describe('Text Components', () => {
    it('renders paragraphs with correct styling', () => {
      const P = components.p! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<P>Test paragraph content</P>)
      
      const paragraph = screen.getByText('Test paragraph content')
      expect(paragraph).toHaveClass('mb-6', 'text-gray-700', 'leading-relaxed', 'text-base', 'md:text-lg')
    })

    it('renders inline code with correct styling', () => {
      const Code = components.code! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<Code>inline code</Code>)
      
      const code = screen.getByText('inline code')
      expect(code).toHaveClass('px-2', 'py-1', 'rounded', 'text-sm', 'font-mono', 'text-white', 'bg-[var(--black)]')
    })

    it('renders code blocks with correct styling', () => {
      const Pre = components.pre! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<Pre>console.log('test')</Pre>)
      
      const pre = screen.getByText('console.log(\'test\')')
      expect(pre).toHaveClass('bg-[var(--black)]', 'text-white', 'p-6', 'rounded-lg', 'mb-6', 'overflow-x-auto')
    })

    it('renders blockquotes with correct styling', () => {
      const Blockquote = components.blockquote! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<Blockquote>This is a quote</Blockquote>)
      
      const blockquote = screen.getByText('This is a quote')
      expect(blockquote).toHaveClass(
        'border-l-4', 'border-[var(--light-blue)]', 'pl-6', 'mb-6', 
        'italic', 'text-gray-700', 'bg-gray-50', 'py-4', 'rounded-r-lg'
      )
    })
  })

  describe('List Components', () => {
    it('renders unordered lists with correct styling', () => {
      const Ul = components.ul! as React.ComponentType<React.PropsWithChildren<{}>>
      const Li = components.li! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <Ul>
          <Li>Item 1</Li>
          <Li>Item 2</Li>
        </Ul>
      )
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('mb-6', 'ml-6', 'space-y-2', 'text-gray-700')
    })

    it('renders ordered lists with correct styling', () => {
      const Ol = components.ol! as React.ComponentType<React.PropsWithChildren<{}>>
      const Li = components.li! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <Ol>
          <Li>First item</Li>
          <Li>Second item</Li>
        </Ol>
      )
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('mb-6', 'ml-6', 'space-y-2', 'list-decimal', 'text-gray-700')
    })

    it('renders list items with correct styling', () => {
      const Li = components.li! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<Li>List item content</Li>)
      
      const listItem = screen.getByText('List item content')
      expect(listItem).toHaveClass('text-base', 'md:text-lg', 'leading-relaxed')
    })
  })

  describe('Link Components', () => {
    it('renders links with href and correct styling', () => {
      const A = components.a! as React.ComponentType<React.PropsWithChildren<{ href?: string }>>
      render(<A href="/test-link">Test Link</A>)
      
      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toHaveAttribute('href', '/test-link')
      expect(link).toHaveClass(
        'text-[var(--light-blue)]', 'hover:text-[var(--light-green)]', 
        'underline', 'underline-offset-2', 'font-medium'
      )
    })

    it('handles missing href with fallback', () => {
      const A = components.a! as React.ComponentType<React.PropsWithChildren<{ href?: string }>>
      render(<A href={undefined}>Link without href</A>)
      
      const link = screen.getByRole('link', { name: 'Link without href' })
      expect(link).toHaveAttribute('href', '#')
    })

    it('handles null href with fallback', () => {
      const A = components.a! as React.ComponentType<React.PropsWithChildren<{ href?: string | null }>>
      render(<A href={null}>Link with null href</A>)
      
      const link = screen.getByRole('link', { name: 'Link with null href' })
      expect(link).toHaveAttribute('href', '#')
    })

    it('preserves valid href values', () => {
      const A = components.a! as React.ComponentType<React.PropsWithChildren<{ href?: string }>>
      const testCases = [
        '/internal-link',
        'https://external.com',
        'mailto:test@example.com',
        '#anchor-link'
      ]
      
      testCases.forEach((href, index) => {
        render(<A href={href}>Link {index}</A>)
        const link = screen.getByRole('link', { name: `Link ${index}` })
        expect(link).toHaveAttribute('href', href)
      })
    })
  })

  describe('Image Components', () => {
    it('renders images with responsive design', () => {
      const Img = components.img! as React.ComponentType<React.PropsWithChildren<{ src?: string; alt?: string }>>
      render(<Img src="/test-image.jpg" alt="Test image" />)
      
      const image = screen.getByRole('img', { name: 'Test image' })
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('alt', 'Test image')
      expect(image).toHaveAttribute('width', '800')
      expect(image).toHaveAttribute('height', '400')
      expect(image).toHaveClass('rounded-lg', 'mb-6', 'shadow-lg')
    })

    it('handles missing alt text with fallback', () => {
      const Img = components.img! as React.ComponentType<React.PropsWithChildren<{ src?: string; alt?: string }>>
      render(<Img src="/test.jpg" />)
      
      // Image with empty alt becomes presentation role, so use querySelector instead
      const image = document.querySelector('img')
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('src', '/test.jpg')
    })

    it('applies responsive styling', () => {
      const Img = components.img! as React.ComponentType<React.PropsWithChildren<{ src?: string; alt?: string }>>
      render(<Img src="/responsive.jpg" alt="Responsive image" />)
      
      const image = screen.getByRole('img', { name: 'Responsive image' })
      expect(image).toHaveStyle({
        width: '100%',
        height: 'auto'
      })
    })

    it('preserves other image props', () => {
      const Img = components.img! as React.ComponentType<React.PropsWithChildren<{ src?: string; alt?: string; title?: string; loading?: string }>>
      render(
        <Img 
          src="/test.jpg" 
          alt="Test" 
          title="Image title"
          loading="lazy"
        />
      )
      
      const image = screen.getByRole('img', { name: 'Test' })
      expect(image).toHaveAttribute('title', 'Image title')
      expect(image).toHaveAttribute('loading', 'lazy')
    })
  })

  describe('Table Components', () => {
    it('renders tables with responsive wrapper', () => {
      const Table = components.table! as React.ComponentType<React.PropsWithChildren<{}>>
      const Th = components.th! as React.ComponentType<React.PropsWithChildren<{}>>
      const Td = components.td! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <Table>
          <thead>
            <tr>
              <Th>Header 1</Th>
              <Th>Header 2</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Cell 1</Td>
              <Td>Cell 2</Td>
            </tr>
          </tbody>
        </Table>
      )
      
      const table = screen.getByRole('table')
      const wrapper = table.parentElement
      
      expect(wrapper).toHaveClass('overflow-x-auto', 'mb-6')
      expect(table).toHaveClass('min-w-full', 'border', 'border-gray-200', 'rounded-lg')
    })

    it('renders table headers with correct styling', () => {
      const Th = components.th! as React.ComponentType<React.PropsWithChildren<{}>>
      render(
        <table>
          <thead>
            <tr>
              <Th>Test Header</Th>
            </tr>
          </thead>
        </table>
      )
      
      const header = screen.getByRole('columnheader', { name: 'Test Header' })
      expect(header).toHaveClass(
        'border', 'border-gray-200', 'bg-gray-50', 'px-4', 'py-3', 
        'text-left', 'font-semibold', 'text-gray-900'
      )
    })

    it('renders table cells with correct styling', () => {
      const Td = components.td! as React.ComponentType<React.PropsWithChildren<{}>>
      render(
        <table>
          <tbody>
            <tr>
              <Td>Test Cell</Td>
            </tr>
          </tbody>
        </table>
      )
      
      const cell = screen.getByRole('cell', { name: 'Test Cell' })
      expect(cell).toHaveClass('border', 'border-gray-200', 'px-4', 'py-3', 'text-gray-700')
    })
  })

  describe('Other Components', () => {
    it('renders horizontal rules with correct styling', () => {
      const Hr = components.hr! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<Hr />)
      
      const hr = document.querySelector('hr')
      expect(hr).toHaveClass('my-8', 'border-gray-300')
    })

    it('handles horizontal rule without content', () => {
      const Hr = components.hr! as React.ComponentType<React.PropsWithChildren<{}>>
      expect(() => render(<Hr />)).not.toThrow()
      
      const hr = document.querySelector('hr')
      expect(hr).toBeInTheDocument()
    })
  })

  describe('Component Merging', () => {
    it('merges with provided components', () => {
      const customComponents = {
        h1: ({ children }: any) => <h1 className="custom-h1">{children}</h1>,
        custom: ({ children }: any) => <div className="custom-component">{children}</div>
      }
      
      const mergedComponents = useMDXComponents(customComponents)
      
      // Custom h1 should override the default
      const CustomH1 = mergedComponents.h1! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<CustomH1>Custom Heading</CustomH1>)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('custom-h1')
      expect(heading).not.toHaveClass('text-3xl') // Should not have default classes
    })

    it('preserves default components when not overridden', () => {
      const customComponents = {
        h1: ({ children }: any) => <h1 className="custom-h1">{children}</h1>
      }
      
      const mergedComponents = useMDXComponents(customComponents)
      
      // h2 should still use default implementation
      const H2 = mergedComponents.h2! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<H2>Default H2</H2>)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-semibold')
    })

    it('adds new custom components', () => {
      const customComponents = {
        customBlock: ({ children }: any) => <div className="custom-block">{children}</div>
      }
      
      const mergedComponents = useMDXComponents(customComponents)
      
      expect(mergedComponents.customBlock).toBeDefined()
      
      const CustomBlock = mergedComponents.customBlock! as React.ComponentType<React.PropsWithChildren<{}>>
      render(<CustomBlock>Custom content</CustomBlock>)
      
      const block = screen.getByText('Custom content')
      expect(block).toHaveClass('custom-block')
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive text sizes consistently', () => {
      const H1 = components.h1! as React.ComponentType<React.PropsWithChildren<{}>>
      const H2 = components.h2! as React.ComponentType<React.PropsWithChildren<{}>>
      const P = components.p! as React.ComponentType<React.PropsWithChildren<{}>>
      const Li = components.li! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <div>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <P>Paragraph</P>
          <Li>List item</Li>
        </div>
      )
      
      // Check that responsive classes are consistently applied
      expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-3xl', 'md:text-4xl')
      expect(screen.getByRole('heading', { level: 2 })).toHaveClass('text-2xl', 'md:text-3xl')
      expect(screen.getByText('Paragraph')).toHaveClass('text-base', 'md:text-lg')
      expect(screen.getByText('List item')).toHaveClass('text-base', 'md:text-lg')
    })

    it('uses consistent spacing patterns', () => {
      const H1 = components.h1! as React.ComponentType<React.PropsWithChildren<{}>>
      const H2 = components.h2! as React.ComponentType<React.PropsWithChildren<{}>>
      const P = components.p! as React.ComponentType<React.PropsWithChildren<{}>>
      
      render(
        <div>
          <H1>Title</H1>
          <H2>Subtitle</H2>
          <P>Content</P>
        </div>
      )
      
      // Check consistent margin/padding patterns
      expect(screen.getByRole('heading', { level: 1 })).toHaveClass('mb-8', 'mt-12')
      expect(screen.getByRole('heading', { level: 2 })).toHaveClass('mb-6', 'mt-10')
      expect(screen.getByText('Content')).toHaveClass('mb-6')
    })
  })
}) 