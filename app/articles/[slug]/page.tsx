import React from 'react'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArticleLayout } from '@/components/article-layout'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { useMDXComponents } from '@/components/mdx-components'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article Not Found'
    }
  }

  return {
    title: `${post.title} | Open-Source Leg`,
    description: post.excerpt || `Read ${post.title} on the Open-Source Leg community blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // Note: params is a Promise in Next.js 15, but we need to handle it synchronously for React hooks
  // This will be resolved by Next.js before the component renders
  const slug = React.use(params).slug
  let post
  
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  if (!post) {
    notFound()
  }

  const mdxComponents = useMDXComponents({})

  return (
    <ArticleLayout post={post}>
      <MDXRemote 
        source={post.content} 
        components={mdxComponents}
      />
    </ArticleLayout>
  )
} 