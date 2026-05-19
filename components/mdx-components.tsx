import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading components with proper styling
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-12 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 mt-10 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-8 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold mb-4 mt-6 text-gray-900">
        {children}
      </h4>
    ),
    
    // Paragraph styling
    p: ({ children }) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-base md:text-lg">
        {children}
      </p>
    ),
    
    // List styling
    ul: ({ children }) => (
      <ul className="mb-6 ml-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-6 space-y-2 list-decimal text-gray-700">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">
        {children}
      </li>
    ),
    
    // Code blocks
    code: ({ children }) => (
      <code className="px-2 py-1 rounded text-sm font-mono text-white bg-[var(--black)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[var(--black)] text-white p-6 rounded-lg mb-6 overflow-x-auto">
        {children}
      </pre>
    ),
    
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--light-blue)] pl-6 mb-6 italic text-gray-700 bg-gray-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    
    // Links
    a: ({ href, children }) => (
      <Link 
        href={href || '#'} 
        className="text-[var(--light-blue)] hover:text-[var(--light-green)] underline underline-offset-2 font-medium"
      >
        {children}
      </Link>
    ),
    
    // Images with responsive design
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        className="rounded-lg mb-6 shadow-lg"
        width={800}
        height={400}
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt={props.alt || ''}
      />
    ),
    
    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-gray-300" />
    ),
    
    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-200 rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-200 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-200 px-4 py-3 text-gray-700">
        {children}
      </td>
    ),
    
    ...components,
  }
} 