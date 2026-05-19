"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatAuthors, getPublicationUrl, type Publication } from "@/lib/research/publications"
import { ExternalLink, X, Search } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/pagination"
import Fuse from 'fuse.js'

interface ResearchPageClientProps {
  publications: Publication[]
}

const PUBLICATIONS_PER_PAGE = 10
const TOP_KEYWORDS_COUNT = 5

type SortOption = 'year-desc' | 'year-asc' | 'citations-desc' | 'citations-asc'

export function ResearchPageClient({ publications }: ResearchPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('year-desc')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(publications, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'authors', weight: 0.3 },
        { name: 'journal', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.2, // 0.0 = exact match, 1.0 = match anything
      distance: 100, // how far to search
      minMatchCharLength: 2, // minimum character length to trigger search
      ignoreLocation: true, // ignore where in the string the match is found
      includeScore: false,
      shouldSort: false // we handle sorting separately
    })
  }, [publications])
  
  // Calculate top keywords
  const topKeywords = useMemo(() => {
    const keywordCounts = new Map<string, number>()
    
    publications.forEach(pub => {
      pub.tags?.forEach(tag => {
        const cleanTag = tag.trim().toLowerCase()
        if (cleanTag) {
          keywordCounts.set(cleanTag, (keywordCounts.get(cleanTag) || 0) + 1)
        }
      })
    })
    
    return Array.from(keywordCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, TOP_KEYWORDS_COUNT)
      .map(([keyword]) => keyword)
  }, [publications])
  
  // Filter and sort publications
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publications
    
    // Apply fuzzy search filter
    if (searchTerm.trim()) {
      const searchResults = fuse.search(searchTerm.trim())
      filtered = searchResults.map(result => result.item)
    }
    
    // Apply keyword filter
    if (activeFilter) {
      filtered = filtered.filter(pub => 
        pub.tags?.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      )
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return (b.year || 0) - (a.year || 0)
        case 'year-asc':
          return (a.year || 0) - (b.year || 0)
        case 'citations-desc':
          return (b.citations || 0) - (a.citations || 0)
        case 'citations-asc':
          return (a.citations || 0) - (b.citations || 0)
        default:
          return 0
      }
    })
    
    return sorted
  }, [publications, activeFilter, sortBy, searchTerm, fuse])
  
  // Calculate pagination for filtered results
  const totalPublications = filteredAndSortedPublications.length
  const totalPages = Math.ceil(totalPublications / PUBLICATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * PUBLICATIONS_PER_PAGE
  const endIndex = startIndex + PUBLICATIONS_PER_PAGE
  const currentPublications = filteredAndSortedPublications.slice(startIndex, endIndex)
  
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFilterChange = (keyword: string) => {
    setActiveFilter(keyword === activeFilter ? null : keyword)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when search changes
  }

  // Create a custom pagination component that mimics the URL-based one but uses state
  const PaginationWrapper = () => {
    if (totalPages <= 1) return null

    return (
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          basePath=""
          useSearchParams={false}
          onPageChange={goToPage}
        />
      </div>
    )
  }

  return (
    <>
      {/* Filters, Search, and Sort */}
      <div className="mt-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Keyword Filters */}
          {topKeywords.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-center font-light italic text-black/70">Filter By Top {TOP_KEYWORDS_COUNT} Keywords</span>
              <div className="flex flex-wrap gap-2">
                {topKeywords.map((keyword) => (
                  <Button
                    key={keyword}
                    size="sm"
                    variant={activeFilter === keyword ? "default" : "outline"}
                    onClick={() => handleFilterChange(keyword)}
                    className={`text-xs cursor-pointer ${
                      activeFilter === keyword 
                        ? "bg-[var(--light-blue)] text-white border-black hover:bg-[var(--light-blue)]" 
                        : "bg-white text-black border-black hover:bg-[var(--light-green)] hover:text-black"
                    }`}
                  >
                    {keyword}
                    {activeFilter === keyword && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex flex-col gap-2 min-w-0 flex-1 max-w-md">
            <span className="text-sm text-center font-light italic text-black/70">Search</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, author, journal, or keyword..."
                className="w-full text-sm bg-white border border-black rounded-md pl-10 pr-4 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col gap-2">
            <span className="text-sm italic text-center font-light text-black/70">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="text-sm bg-white border border-black rounded-md px-3 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black transition-colors cursor-pointer"
            >
              <option value="year-desc">Year ↓</option>
              <option value="year-asc">Year ↑</option>
              <option value="citations-desc">Citations ↓</option>
              <option value="citations-asc">Citations ↑</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publications Table */}
      <Card className="border-black mt-8">
        <CardContent>
          {totalPublications === 0 ? (
            // No Results State
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Search className="h-8 w-8 text-black/70 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
                                 <p className="text-sm text-gray-600 mb-4">
                   {searchTerm ? (
                     <>No results match your search for <strong>&ldquo;{searchTerm}&rdquo;</strong></>
                   ) : activeFilter ? (
                     <>No publications found with the keyword <strong>&ldquo;{activeFilter}&rdquo;</strong></>
                   ) : (
                     'Try adjusting your search or filter criteria'
                   )}
                 </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {activeFilter && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFilterChange(activeFilter)}
                      className="bg-white text-black border-black hover:bg-[var(--light-green)] hover:text-black"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove filter
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Results Table
            <div className="rounded-md border border-black/40">
              <Table>
                <TableHeader>
                  <TableRow className="border-black/40">
                    <TableHead className="w-[30%] text-gray-900 font-semibold">Title & Authors</TableHead>
                    <TableHead className="w-[20%] text-gray-900 font-semibold">Journal/Conference</TableHead>
                    <TableHead className="w-[10%] text-gray-900 font-semibold">Citations</TableHead>
                    <TableHead className="w-[8%] text-gray-900 font-semibold">Year</TableHead>
                    <TableHead className="w-[25%] text-gray-900 font-semibold">Keywords</TableHead>
                    <TableHead className="w-[7%] text-gray-900 font-semibold">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPublications.map((publication) => (
                    <TableRow key={publication.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm leading-tight text-gray-900">
                            {publication.title || "NO TITLE"}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {formatAuthors(publication.authors) || "NO AUTHORS"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">{publication.journal || "NO JOURNAL"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900 text-center">
                          {publication.citations !== undefined ? publication.citations : "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{publication.year || "NO YEAR"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(publication.tags || []).slice(0, 4).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-[var(--white)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-white">
                              {tag}
                            </Badge>
                          ))}
                          {(!publication.tags || publication.tags.length === 0) && (
                            <span className="text-xs text-gray-400">NO KEYWORDS</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={getPublicationUrl(publication)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="ghost" className="hover:bg-[var(--light-green)] border border-black cursor-pointer">
                            <ExternalLink className="h-4 w-4 text-black" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Simple Contribution CTA */}
          <div className="mt-6 text-center p-4 bg-[var(--light-blue)] rounded-lg">
            <p className="text-sm text-white mb-3">
              Would you like to add a publication to our database?
            </p>
            <Link
              href={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[var(--white)] text-black border-2 border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Add Publication
            </Link>
          </div>

          {/* Pagination */}
          <PaginationWrapper />

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalPublications)} of {totalPublications} publications
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
} 