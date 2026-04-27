import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Clock, User, Search, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPaginatedPosts, getAllPosts } from '@/lib/mdx'
import { Pagination } from '@/components/pagination'
import { PageHero } from '@/components/page-hero'

type Props = {
  params: Promise<{ page?: string[] }>
}

// Generate static params for all possible pagination pages
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const postsPerPage = 4
  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  
  const params = []
  
  // Generate params for page 1 (base route)
  params.push({ page: undefined })
  
  // Generate params for pages 2, 3, 4, etc.
  for (let i = 2; i <= Math.max(1, totalPages); i++) {
    params.push({ page: [i.toString()] })
  }
  
  return params
}

export default async function ArticlesPage({ params }: Props) {
  const resolvedParams = await params
  const pageParam = resolvedParams.page?.[0]
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1
  
  const { posts, totalPages, currentPage: validatedPage, hasNextPage, hasPreviousPage } = getPaginatedPosts(currentPage, 4)

  return (
    <div className="min-h-screen pt-12">
      {/* Hero Section */}
      <PageHero 
        title={
          <>
            Community{" "}
            <span className="font-bold italic">Articles</span>
          </>
        }
        description="            Have insights about prosthetics, robotics, or the Open-Source Leg platform? Contribute your knowledge to help the community grow."
        primaryButton={{
          href: "https://github.com/opensourceleg/opensourceleg.org",
          target: "_blank",
          text: "Contribute",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        secondaryButton={{
          href: "https://opensourceleg.discourse.group/",
          text: "Join Discussions",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank"
        }}
      />    

      {/* Articles Grid */}
      <div className="py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Pagination - Top */}
          {posts.length > 0 && totalPages > 1 && (
            <Pagination 
              currentPage={validatedPage}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              basePath="/articles/page"
            />
          )}

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-600 mb-4">No articles yet</h3>
              <p className="text-gray-500 mb-8">
                Be the first to contribute! Add your MDX file to the posts directory.
              </p>
              <Button
                href="https://github.com/neurobionics/opensourceleg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--light-blue)] text-white border-2 border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Contribute on GitHub
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 mb-12">
              {posts.map((post) => {
                const publishedDate = new Date(post.date)
                const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })
                
                return (
                  <Link key={post.slug} href={`/articles/${post.slug}`} className="group block">
                    <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-200 border-black hover:border-[var(--light-blue)] cursor-pointer flex flex-col">
                      <CardHeader className="flex-grow">
                        <CardTitle className="text-xl font-bold transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        
                        {post.excerpt && (
                          <CardDescription className="text-gray-600 line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {timeAgo}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 