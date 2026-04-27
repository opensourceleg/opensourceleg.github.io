import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  basePath?: string
  useSearchParams?: boolean
  onPageChange?: (page: number) => void
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPreviousPage,
  basePath = '/articles',
  useSearchParams = false,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (onPageChange) {
      return '#' // Return placeholder for callback-based pagination
    }
    if (useSearchParams) {
      return page === 1 ? basePath : `${basePath}?page=${page}`
    }
    return page === 1 ? basePath : `${basePath}/${page}`
  }

  const handlePageClick = (page: number, e?: React.MouseEvent) => {
    if (onPageChange) {
      e?.preventDefault()
      onPageChange(page)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    // Show fewer pages to prevent overflow on smaller screens
    const showPages = 3
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    const end = Math.min(totalPages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  return (
    <ShadcnPagination className="">
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          {hasPreviousPage ? (
            <PaginationPrevious 
              href={getPageUrl(currentPage - 1)} 
              onClick={(e) => handlePageClick(currentPage - 1, e)}
            />
          ) : (
            <PaginationPrevious 
              href="#" 
              className="pointer-events-none opacity-50 border border-gray-300 text-gray-400"
              aria-disabled="true"
            />
          )}
        </PaginationItem>

        {/* Show first page if not in range (more conservative on mobile) */}
        {currentPage > 2 && totalPages > 4 && (
          <>
            <PaginationItem>
              <PaginationLink 
                href={getPageUrl(1)}
                onClick={(e) => handlePageClick(1, e)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink 
              href={getPageUrl(pageNum)} 
              isActive={pageNum === currentPage}
              onClick={(e) => handlePageClick(pageNum, e)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Show last page if not in range (more conservative on mobile) */}
        {currentPage < totalPages - 1 && totalPages > 4 && (
          <>
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink 
                href={getPageUrl(totalPages)}
                onClick={(e) => handlePageClick(totalPages, e)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext 
              href={getPageUrl(currentPage + 1)} 
              onClick={(e) => handlePageClick(currentPage + 1, e)}
            />
          ) : (
            <PaginationNext 
              href="#" 
              className="pointer-events-none opacity-50 border border-gray-300 text-gray-400"
              aria-disabled="true"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
} 