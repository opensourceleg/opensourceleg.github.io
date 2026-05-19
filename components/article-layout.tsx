import { ReactNode } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft, Clock, User, Calendar, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Post } from '@/lib/mdx'

interface ArticleLayoutProps {
  post: Post
  children: ReactNode
}

export function ArticleLayout({ post, children }: ArticleLayoutProps) {
  const publishedDate = new Date(post.date)
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })

  return (
    <div className="min-h-screen">
      {/* Article Header - Landing page style */}
      <div className="min-h-[50vh] relative overflow-hidden">
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6 text-center pt-8 sm:pt-16">
          {/* Main headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-semibold max-w-5xl leading-tight">
            <span className="text-black">{post.title}</span>
          </h1>

          {/* Subheading */}
          {post.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl leading-relaxed px-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta information */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            {post.author && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {publishedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} ({timeAgo})
              </time>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>


          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button 
              href="/articles"
              className="bg-transparent text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> View all articles
            </Button>
            <Button
              href="#"
              rel="noopener noreferrer"
              variant="outline"
              className="bg-[var(--light-green)] text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <Share className="w-4 h-4" /> Share
            </Button>
          </div>

          <div className="w-[70%] mx-auto h-px bg-gray-900 my-12"></div>
        </main>
      </div>

      {/* Article Content */}
      <main className="px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-gray max-w-none">
            {children}
          </article>
        </div>
      </main>
    </div>
  )
} 