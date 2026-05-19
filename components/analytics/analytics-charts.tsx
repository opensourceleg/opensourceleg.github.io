'use client'

import { 
  Treemap, 
  ResponsiveContainer
} from 'recharts'
import { KeywordData, FundingData, CountryData, ResearchLabData } from '@/lib/research/research-analytics'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'



// Add CSS for forcing black text
const treemapTextStyle = `
  .treemap-text {
    fill: #000000 !important;
    color: #000000 !important;
    stroke: none !important;
  }
`

const TREEMAP_COLORS = [
  '#8594E8ff', '#8B9AE2ff', '#91A0DCff', '#96A5D5ff', '#9CABCFff', '#A2B1C9ff',
  '#A8B7C3ff', '#ADBDBCff', '#B3C3B6ff', '#B9C8B0ff', '#BFCEAAff', '#C4D4A3ff',
  '#CADA9Dff', '#D0E097ff', '#D6E691ff', '#DBEB8Aff', '#E1F184ff', '#E7F77E',  
]

interface TreemapDataItem {
  name: string
  displayName: string
  size: number
  percentage: number
  fill: string
}

interface CountryTreemapDataItem {
  name: string
  size: number
  percentage: number
  fill: string
}

interface TreemapProps {
  data: KeywordData[] | FundingData[] | ResearchLabData[]
  title: string
  height?: number
  isFundingData?: boolean
}

export function TreemapChart({ data, height = 400, isFundingData = false }: Omit<TreemapProps, 'title'>) {
  const treemapData = data.map((item, index) => ({
    name: item.name,
    displayName: item.name,
    size: item.value,
    percentage: item.percentage,
    fill: TREEMAP_COLORS[index % TREEMAP_COLORS.length]
  }))

  return (
    <div className="bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: treemapTextStyle }} />
      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          isAnimationActive={false}
          content={({ depth, x, y, width, height, index, payload, name }) => {
            if (depth !== 1) return <g />
            
            // Calculate font sizes based on rectangle size with better scaling
            const tileArea = width * height
            const scaleFactor = Math.sqrt(tileArea) / 100 // More aggressive scaling based on area
            
            // For funding data, be more conservative with font size to allow better text fitting
            // Better scaling for more consistent appearance across different tile sizes
            const maxFontSize = isFundingData ? 11 : 14
            const minFontSize = isFundingData ? 8 : 8
            const titleFontSize = Math.max(Math.min(width / 14, height / 7, maxFontSize, scaleFactor * 6), minFontSize)
            const valueFontSize = Math.max(Math.min(width / 16, height / 9, 9, scaleFactor * 5), 7)
            
            // Enhanced text wrapping function with better accuracy
            const wrapText = (text: string, maxWidth: number, fontSize: number) => {
              // Create a more accurate way to measure text width
              // This is a better approximation for common fonts
              const getTextWidth = (str: string, fontSizePx: number) => {
                // Average character widths for common characters in Inter font
                const avgCharWidth = fontSizePx * 0.48 // More accurate for Inter font
                return str.length * avgCharWidth
              }
              
              const words = text.split(' ')
              const lines: string[] = []
              let currentLine = ''
              const availableWidth = maxWidth - (isFundingData ? 20 : 16) // Account for padding
              
              for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word
                const testWidth = getTextWidth(testLine, fontSize)
                
                if (testWidth <= availableWidth) {
                  currentLine = testLine
                } else {
                  if (currentLine) {
                    lines.push(currentLine)
                    currentLine = word
                  } else {
                    // Handle very long single words
                    if (getTextWidth(word, fontSize) > availableWidth) {
                      // Try to fit as much as possible, then truncate
                      let truncated = word
                      while (getTextWidth(truncated + '...', fontSize) > availableWidth && truncated.length > 3) {
                        truncated = truncated.slice(0, -1)
                      }
                      lines.push(truncated + (truncated.length < word.length ? '...' : ''))
                      currentLine = ''
                    } else {
                      currentLine = word
                    }
                  }
                }
              }
              
              if (currentLine) {
                lines.push(currentLine)
              }
              
              // Smart line limiting based on tile height
              const estimatedLineHeight = fontSize + 4
              const maxPossibleLines = Math.floor((tileHeight - 20) / estimatedLineHeight)
              const idealMaxLines = isFundingData ? 5 : 3
              const actualMaxLines = Math.min(idealMaxLines, Math.max(1, maxPossibleLines))
              
              return lines.slice(0, actualMaxLines)
            }
            
            // Add padding around each tile
            const tilePadding = 4
            const tileX = x + tilePadding
            const tileY = y + tilePadding
            const tileWidth = width - (tilePadding * 2)
            const tileHeight = height - (tilePadding * 2)
            
            // Only show text if rectangle is large enough (adjusted for better readability)
            // More generous thresholds for funding data since names are typically longer
            const textThreshold = isFundingData ? { width: 45, height: 30, area: 1200 } : { width: 55, height: 30, area: 2000 }
            const valueThreshold = isFundingData ? { width: 65, height: 50, area: 3000 } : { width: 80, height: 50, area: 4000 }
            
            const showText = tileWidth > textThreshold.width && tileHeight > textThreshold.height && tileArea > textThreshold.area
            const showValue = tileWidth > valueThreshold.width && tileHeight > valueThreshold.height && tileArea > valueThreshold.area
            
            // Wrap the title text
            const displayText = (payload as TreemapDataItem)?.displayName || name || ''
            const availableWidth = tileWidth - (isFundingData ? 16 : 12) // Extra padding for funding data
            const titleLines = showText ? wrapText(displayText, availableWidth, titleFontSize) : []
            const lineHeight = titleFontSize + 4 // Better line height for readability
            
            // Better vertical centering calculation
            const textBlockHeight = titleLines.length * lineHeight - 4 // Remove extra padding from last line
            const valueHeight = showValue ? valueFontSize + 6 : 0
            const totalContentHeight = textBlockHeight + valueHeight
            const startY = tileY + (tileHeight - totalContentHeight) / 2 + titleFontSize
            
            return (
              <g>
                <rect
                  x={tileX}
                  y={tileY}
                  width={tileWidth}
                  height={tileHeight}
                  rx={8}
                  ry={8}
                  style={{
                    fill: (payload as TreemapDataItem)?.fill || TREEMAP_COLORS[index % TREEMAP_COLORS.length],
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeOpacity: 1,
                  }}
                />
                
                {/* Clipping path to prevent text overflow - disabled for funding data to prevent clipping */}
                {!isFundingData && (
                  <defs>
                    <clipPath id={`clip-${x}-${y}`}>
                      <rect x={tileX + 1} y={tileY + 1} width={tileWidth - 2} height={tileHeight - 2} rx={7} ry={7} />
                    </clipPath>
                  </defs>
                )}
                
                <g clipPath={!isFundingData ? `url(#clip-${x}-${y})` : undefined}>
                  {/* Render title lines */}
                  {titleLines.map((line, i) => (
                    <text
                      key={i}
                      x={tileX + tileWidth / 2}
                      y={startY + i * lineHeight}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={titleFontSize}
                      fontWeight="400"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {line}
                    </text>
                  ))}
                  
                  {/* Render value */}
                  {showValue && (
                    <text
                      x={tileX + tileWidth / 2}
                      y={startY + textBlockHeight + valueFontSize + 2}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={valueFontSize}
                      opacity={0.9}
                      fontWeight="400"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {(payload as TreemapDataItem)?.size}
                    </text>
                  )}
                </g>
              </g>
            )
          }}
        />
      </ResponsiveContainer>
    </div>
  )
}

interface CountryTreemapProps {
  data: CountryData[]
  title: string
  height?: number
}

export function CountryTreemapChart({ data, height = 400 }: Omit<CountryTreemapProps, 'title'>) {
  const treemapData = data.map((item, index) => ({
    name: item.country,
    size: item.value,
    percentage: item.percentage,
    fill: TREEMAP_COLORS[index % TREEMAP_COLORS.length]
  }))

  return (
    <div className="bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: treemapTextStyle }} />
      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={treemapData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          isAnimationActive={false}
          content={({ depth, x, y, width, height, index, payload, name }) => {
            if (depth !== 1) return <g />
            
            const tileArea = width * height
            const scaleFactor = Math.sqrt(tileArea) / 100 // More aggressive scaling based on area
            const titleFontSize = Math.max(Math.min(width / 10, height / 5, 14, scaleFactor * 10), 8)
            const valueFontSize = Math.max(Math.min(width / 12, height / 6, 12, scaleFactor * 8), 7)
            
            // Text wrapping function
            const wrapText = (text: string, maxWidth: number, fontSize: number) => {
              const words = text.split(' ')
              const lines: string[] = []
              let currentLine = ''
              
              const charWidth = fontSize * 0.6
              const maxCharsPerLine = Math.floor(maxWidth / charWidth)
              
              for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word
                if (testLine.length <= maxCharsPerLine) {
                  currentLine = testLine
                } else {
                  if (currentLine) {
                    lines.push(currentLine)
                    currentLine = word
                  } else {
                    lines.push(word.substring(0, maxCharsPerLine - 3) + '...')
                    currentLine = ''
                  }
                }
              }
              if (currentLine) {
                lines.push(currentLine)
              }
              
              return lines.slice(0, 3)
            }
            
            // Add padding around each tile
            const tilePadding = 4
            const tileX = x + tilePadding
            const tileY = y + tilePadding
            const tileWidth = width - (tilePadding * 2)
            const tileHeight = height - (tilePadding * 2)
            
            const showText = tileWidth > 55 && tileHeight > 30 && tileArea > 2000
            const showValue = tileWidth > 80 && tileHeight > 50 && tileArea > 4000
            
            const titleLines = showText ? wrapText(name || '', tileWidth - 10, titleFontSize) : []
            const lineHeight = titleFontSize + 2
            const totalTextHeight = titleLines.length * lineHeight + (showValue ? valueFontSize + 5 : 0)
            const startY = tileY + (tileHeight - totalTextHeight) / 2 + titleFontSize
            
            return (
              <g>
                <rect
                  x={tileX}
                  y={tileY}
                  width={tileWidth}
                  height={tileHeight}
                  rx={8}
                  ry={8}
                  style={{
                    fill: (payload as CountryTreemapDataItem)?.fill || TREEMAP_COLORS[index % TREEMAP_COLORS.length],
                    stroke: '#000',
                    strokeWidth: 1,
                    strokeOpacity: 1,
                  }}
                />
                
                <defs>
                  <clipPath id={`clip-country-${x}-${y}`}>
                    <rect x={tileX + 2} y={tileY + 2} width={tileWidth - 4} height={tileHeight - 4} rx={5} ry={5} />
                  </clipPath>
                </defs>
                
                <g clipPath={`url(#clip-country-${x}-${y})`}>
                  {titleLines.map((line, i) => (
                    <text
                      key={i}
                      x={tileX + tileWidth / 2}
                      y={startY + i * lineHeight}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={titleFontSize}
                      fontWeight="300"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {line}
                    </text>
                  ))}
                  
                  {showValue && (
                    <text
                      x={tileX + tileWidth / 2}
                      y={startY + titleLines.length * lineHeight + valueFontSize + 5}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize={valueFontSize}
                      opacity={0.9}
                      fontWeight="300"
                      fontFamily="var(--font-inter), Inter, system-ui, -apple-system, sans-serif"
                      className="treemap-text"
                    >
                      {(payload as CountryTreemapDataItem)?.size}
                    </text>
                  )}
                </g>
              </g>
            )
          }}
        />
      </ResponsiveContainer>
    </div>
  )
}


interface SummaryStatsProps {
  analytics: {
    totalPublications: number
    totalCitations: number
    funding: Array<{ name: string; value: number; percentage: number }>
    countries: Array<{ country: string; value: number; percentage: number }>
  }
}

export function SummaryStats({ analytics }: SummaryStatsProps) {
  const stats = [
    { 
      id: 'publications',
      title: 'Total Publications', 
      value: analytics.totalPublications, 
      description: 'Research papers citing or using the Open-Source Leg platform'
    },
    { 
      id: 'citations',
      title: 'Total Citations', 
      value: analytics.totalCitations, 
      description: 'Combined citation count across all publications'
    },
    { 
      id: 'funding',
      title: 'Top Funding Source', 
      value: analytics.funding[0]?.name || 'N/A',
      description: `${analytics.funding[0]?.value || 0} publications (${analytics.funding[0]?.percentage.toFixed(1) || 0}% of funded research)`
    },
    { 
      id: 'country',
      title: 'Leading Country', 
      value: analytics.countries[0]?.country || 'N/A',
      description: `${analytics.countries[0]?.value || 0} publications (${analytics.countries[0]?.percentage.toFixed(1) || 0}% of all citations)`
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
      {stats.map((stat) => {
        const isNumeric = typeof stat.value === 'number'
        
        return (
          <Card key={stat.id} className="@container/card bg-[var(--black)] text-white border-gray-700 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-300 text-sm">{stat.title}</CardDescription>
              <CardTitle className={`py-1 sm:py-2 font-bold text-[var(--white)] ${
                isNumeric 
                  ? 'text-2xl sm:text-3xl tabular-nums @[250px]/card:text-4xl' 
                  : 'text-lg sm:text-xl @[250px]/card:text-2xl'
              }`}>
                {isNumeric ? stat.value.toLocaleString() : stat.value}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
              <div className="text-gray-400 text-xs leading-relaxed">
                {stat.description}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
} 