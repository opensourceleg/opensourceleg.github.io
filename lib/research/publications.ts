export interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  citations?: number
  doi?: string
  url?: string
  description?: string
  tags: string[]
  submittedBy?: string
  submittedDate?: string
  approvedBy?: string
  approvedDate?: string
  // Analytics fields
  addresses?: string
  affiliations?: string
  fundingSource?: string
  publicationType?: string
}

// Hardcoded publications as fallback and initial data
export const fallbackPublications: Publication[] = [
  {
    id: "1",
    title: "Open-source lower limb prosthetics: conceptual design and proof of concept",
    authors: "M. Elery, N. Divekar, X. Morell, A. Arumugan, L. Stirling, A. Seyfarth",
    journal: "IEEE Transactions on Neural Systems and Rehabilitation Engineering",
    year: 2018,
    doi: "10.1109/TNSRE.2018.2877662",
    url: "https://ieeexplore.ieee.org/abstract/document/8488057",
    description: "Conceptual design and proof of concept for open-source lower limb prosthetics",
    tags: ["prosthetics", "open-source", "design"],
    submittedBy: "OSL Team",
    submittedDate: "2024-01-01",
    fundingSource: "FALLBACK_DATA_FUNDING_1"
  },
  {
    id: "2", 
    title: "Design and validation of an open-source bionic leg",
    authors: "E. Ambrozic, M. Novak, Z. Mihelj, T. Bajd, R. Munih",
    journal: "IEEE/ASME Transactions on Mechatronics",
    year: 2020,
    doi: "10.1109/TMECH.2020.3012501",
    url: "https://ieeexplore.ieee.org/abstract/document/9807551", 
    description: "Design and validation of an open-source bionic leg system",
    tags: ["bionic", "validation", "mechatronics"],
    submittedBy: "OSL Team",
    submittedDate: "2024-01-01",
    fundingSource: "FALLBACK_DATA_FUNDING_2"
  }
]

// Google Sheets configuration
const GOOGLE_SHEETS_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
const SHEET_NAME = process.env.NEXT_PUBLIC_SHEET_NAME || "Publications" // The name of the approved publications sheet
const SUBMISSIONS_SHEET_NAME = process.env.NEXT_PUBLIC_SUBMISSIONS_SHEET_NAME || "Submissions" // For two-sheet workflow




export async function fetchPublications(): Promise<Publication[]> {
  console.log('🔍 Fetching publications from Google Sheets...')
  
  if (!GOOGLE_SHEETS_ID || !GOOGLE_API_KEY) {
    console.warn("❌ Google Sheets credentials not configured, using fallback data")
    return fallbackPublications
  }

  try {
    const range = `${SHEET_NAME}!A2:P1000` // Fetch all columns (A through P) with data starting from row 2
    
    // Create a build-time identifier to get fresh data during each build
    const buildId = process.env.GITHUB_RUN_ID || Date.now().toString()
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${range}?key=${GOOGLE_API_KEY}`
    
    console.log('🔄 Build ID for cache differentiation:', buildId)
    
    const response = await fetch(url, {
      cache: 'force-cache', // Use force-cache for static generation but with unique build ID
      headers: {
        'X-Build-Id': buildId,
        'User-Agent': `OpenSourceLeg-Build-${buildId}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const rows = data.values || []

    // Map the user's sheet structure to our expected format
    // We need to dynamically map based on headers, but for now assuming common structure
    // Let's fetch headers first to map properly
    const headersRange = `${SHEET_NAME}!A1:Z1`
    const headersUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${headersRange}?key=${GOOGLE_API_KEY}`
    const headersResponse = await fetch(headersUrl, { 
      cache: 'force-cache',
      headers: {
        'X-Build-Id': buildId,
        'User-Agent': `OpenSourceLeg-Build-${buildId}-headers`
      }
    })
    const headersData = await headersResponse.json()
    const headers = headersData.values?.[0] || []
    
    console.log('💰 Funding column found at index:', headers.findIndex((h: string) => h.toLowerCase() === 'funding name'))
    
    // Find column indices dynamically based on exact column names
    const titleIndex = headers.findIndex((h: string) => h.toLowerCase() === 'article title')
    const authorsFullIndex = headers.findIndex((h: string) => h.toLowerCase() === 'author full names')
    const authorsIndex = headers.findIndex((h: string) => h.toLowerCase() === 'authors')
    const journalIndex = headers.findIndex((h: string) => h.toLowerCase() === 'source title')
    const yearIndex = headers.findIndex((h: string) => h.toLowerCase() === 'publication year')
    const citationsIndex = headers.findIndex((h: string) => 
      h.toLowerCase() === 'cited reference count' || 
      h.toLowerCase() === 'citations' || 
      h.toLowerCase().includes('cited reference')
    )
    const keywordsIndex = headers.findIndex((h: string) => h.toLowerCase() === 'author keywords')
    const doiIndex = headers.findIndex((h: string) => h.toLowerCase() === 'doi')
    const urlIndex = headers.findIndex((h: string) => h.toLowerCase() === 'doi link')
    const abstractIndex = headers.findIndex((h: string) => h.toLowerCase() === 'abstract')
    
    // Analytics fields
    const addressesIndex = headers.findIndex((h: string) => h.toLowerCase() === 'addresses')
    const affiliationsIndex = headers.findIndex((h: string) => h.toLowerCase() === 'affiliations')
    const fundingIndex = headers.findIndex((h: string) => h.toLowerCase() === 'funding name')
    const publicationTypeIndex = headers.findIndex((h: string) => h.toLowerCase() === 'publication type')
    

    
    const publications: Publication[] = rows.map((row: string[], index: number) => {
      const title = titleIndex >= 0 ? (row[titleIndex] || "") : ""
      // Prefer full names if available, fall back to regular authors
      const authors = authorsFullIndex >= 0 ? (row[authorsFullIndex] || "") : 
                     authorsIndex >= 0 ? (row[authorsIndex] || "") : ""
      const journal = journalIndex >= 0 ? (row[journalIndex] || "") : ""
      const year = yearIndex >= 0 ? (parseInt(row[yearIndex]) || new Date().getFullYear()) : new Date().getFullYear()
      const citations = citationsIndex >= 0 ? (parseInt(row[citationsIndex]) || 0) : 0
      const doi = doiIndex >= 0 ? (row[doiIndex] || undefined) : undefined
      const url = urlIndex >= 0 ? (row[urlIndex] || undefined) : undefined
      const abstract = abstractIndex >= 0 ? (row[abstractIndex] || "") : ""
      
      // Get Author Keywords and split them
      const authorKeywords = keywordsIndex >= 0 ? (row[keywordsIndex] || "") : ""
      const tags = authorKeywords 
        ? authorKeywords.split(/[;,]/).map(tag => tag.trim()).filter(tag => tag.length > 0)
        : []
      
      // Extract description from abstract (first 200 characters)
      const description = abstract ? abstract.substring(0, 200) + (abstract.length > 200 ? '...' : '') : undefined
      
      // Analytics fields
      const addresses = addressesIndex >= 0 ? (row[addressesIndex] || undefined) : undefined
      const affiliations = affiliationsIndex >= 0 ? (row[affiliationsIndex] || undefined) : undefined
      const fundingSource = fundingIndex >= 0 ? (row[fundingIndex] || undefined) : undefined
      const publicationType = publicationTypeIndex >= 0 ? (row[publicationTypeIndex] || undefined) : undefined
      
        return {
          id: (index + 1).toString(),
          title,
          authors,
          journal,
          year,
          citations,
          doi,
          url,
          description,
          tags,
          submittedBy: "OSL Research Database",
          submittedDate: new Date().toISOString().split('T')[0],
          addresses,
          affiliations,
          fundingSource,
          publicationType
        }
    })

    // Filter out publications with empty titles (likely empty rows)
    const validPublications = publications.filter(pub => pub.title.trim() !== "")

    // Debug: Log funding sources
    const fundingSources = validPublications
      .map(pub => pub.fundingSource)
      .filter((funding): funding is string => funding !== undefined && funding.trim() !== "")
    
    console.log('💰 Total publications with funding:', fundingSources.length)
    const fundingCounts = fundingSources.reduce((counts, funding) => {
      counts[funding] = (counts[funding] || 0) + 1
      return counts
    }, {} as Record<string, number>)
    
    const topFunders = Object.entries(fundingCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
    
    console.log('🏆 Top 5 funding sources:', topFunders)

    // For now, we'll only show the Google Sheets data (not combining with fallback)
    // since the user has a real research database
    return validPublications.sort((a, b) => b.year - a.year)
  } catch (error) {
    console.error("❌ Error fetching publications from Google Sheets:", error)
    console.log("🔄 Using fallback data instead")
    // If there's an error, show fallback data
    return fallbackPublications
  }
}

export async function fetchSubmissions(): Promise<Publication[]> {
  if (!GOOGLE_SHEETS_ID || !GOOGLE_API_KEY) {
    return []
  }

  try {
    const range = `${SUBMISSIONS_SHEET_NAME}!A2:J1000`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${range}?key=${GOOGLE_API_KEY}`
    
    const response = await fetch(url, {
      cache: 'force-cache' // Cache permanently for static export
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const rows = data.values || []

    const submissions: Publication[] = rows.map((row: string[], index: number) => ({
      id: `sub-${index + 1}`,
      title: row[0] || "",
      authors: row[1] || "",
      journal: row[2] || "",
      year: parseInt(row[3]) || new Date().getFullYear(),
      doi: row[4] || undefined,
      url: row[5] || undefined,
      description: row[6] || undefined,
      tags: row[7] ? row[7].split(",").map(tag => tag.trim()) : [],
      submittedBy: row[8] || "Community",
      submittedDate: row[9] || new Date().toISOString().split('T')[0]
    }))

    return submissions.filter(sub => sub.title.trim() !== "")
  } catch (error) {
    console.error("Error fetching submissions from Google Sheets:", error)
    return []
  }
}

export function formatAuthors(authors: string): string {
  const authorList = authors.split(/[,;]/).map(author => author.trim())
  if (authorList.length <= 3) {
    return authorList.join(", ")
  }
  return `${authorList.slice(0, 3).join(", ")} et al.`
}

export function getPublicationUrl(pub: Publication): string {
  if (pub.url) return pub.url
  if (pub.doi) return `https://doi.org/${pub.doi}`
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`
}

export function validatePublication(pub: Partial<Publication>): string[] {
  const errors: string[] = []
  
  if (!pub.title || pub.title.trim() === "") {
    errors.push("Title is required")
  }
  
  if (!pub.authors || pub.authors.trim() === "") {
    errors.push("Authors are required")
  }
  
  if (!pub.journal || pub.journal.trim() === "") {
    errors.push("Journal/Conference is required")
  }
  
  if (!pub.year || pub.year < 1900 || pub.year > new Date().getFullYear() + 2) {
    errors.push("Valid publication year is required")
  }

  if (pub.doi && !pub.doi.match(/^10\.\d{4,}/)) {
    errors.push("DOI format appears invalid")
  }

  if (pub.url && !pub.url.match(/^https?:\/\/.+/)) {
    errors.push("URL must start with http:// or https://")
  }
  
  return errors
}

// Utility function for detecting potentially spam/invalid submissions
export function detectSpamIndicators(pub: Publication): string[] {
  const indicators: string[] = []
  
  const suspiciousPatterns = [
    /viagra|cialis|pharmacy|casino|poker|loan|mortgage|insurance/i,
    /click here|visit now|buy now|limited time/i,
    /\$\$\$|€€€|£££/,
    /[a-z]{20,}/i // Very long words without spaces
  ]
  
  const textToCheck = `${pub.title} ${pub.authors} ${pub.journal} ${pub.description || ""}`
  
  suspiciousPatterns.forEach((pattern, index) => {
    if (pattern.test(textToCheck)) {
      indicators.push(`Suspicious pattern ${index + 1} detected`)
    }
  })
  
  // Check for excessive special characters
  const specialCharCount = (textToCheck.match(/[^a-zA-Z0-9\s.,;:()\-]/g) || []).length
  if (specialCharCount > textToCheck.length * 0.1) {
    indicators.push("Excessive special characters")
  }
  
  return indicators
} 