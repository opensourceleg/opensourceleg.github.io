import Link from 'next/link'
import { Search, ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Navigation */}
        <Button 
          href="/articles"
          variant="outline"
          className="mb-8 group bg-transparent text-black border border-black hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Button>

        {/* Main Content */}
        <div className="text-center py-16">
          <div className="mb-8">
            <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The article you&apos;re looking for doesn&apos;t exist or may have been moved. 
              Let&apos;s get you back to discovering great content from our community.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              href="/articles"
              className="bg-[var(--light-blue)] text-white border border-black hover:text-black hover:bg-[var(--light-green)] rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse All Articles
            </Button>
            
            <Button 
              href="/"
              variant="outline"
              className="bg-transparent text-black border border-black hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
            >
              Back to Home
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you can do:
            </h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Check the article URL for typos</li>
              <li>• Browse our <Link href="/articles" className="text-[var(--light-blue)] hover:underline">articles page</Link> to find what you&apos;re looking for</li>
              <li>• Visit our <Link href="https://opensourceleg.discourse.group/" target="_blank" className="text-[var(--light-blue)] hover:underline">community forum</Link> for discussions</li>
              <li>• Contribute your own article by following our <Link href="https://github.com/neurobionics/opensourceleg" target="_blank" className="text-[var(--light-blue)] hover:underline">contribution guidelines</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 