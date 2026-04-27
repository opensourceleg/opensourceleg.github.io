'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ResearchAnalytics } from '@/lib/research/research-analytics'
import { TreemapChart, CountryTreemapChart, SummaryStats } from './analytics-charts'



interface AnalyticsDashboardProps {
  analytics: ResearchAnalytics
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const [firstChart, setFirstChart] = useState<'geographic' | 'labs'>('labs')
  const [secondChart, setSecondChart] = useState<'topics' | 'funding'>('funding')
  const [isFirstTransitioning, setIsFirstTransitioning] = useState(false)
  const [isSecondTransitioning, setIsSecondTransitioning] = useState(false)

  const handleFirstChartToggle = () => {
    setIsFirstTransitioning(true)
    setTimeout(() => {
      setFirstChart(firstChart === 'geographic' ? 'labs' : 'geographic')
      setIsFirstTransitioning(false)
    }, 150)
  }

  const handleSecondChartToggle = () => {
    setIsSecondTransitioning(true)
    setTimeout(() => {
      setSecondChart(secondChart === 'topics' ? 'funding' : 'topics')
      setIsSecondTransitioning(false)
    }, 150)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
          <span className="font-bold italic">Research</span> Analytics
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          Key insights and trends within the Open-Source Leg research community.
        </p>
      </div>

      {/* Summary Statistics */}
      <SummaryStats analytics={analytics} />

      <div className="space-y-16">
        {/* First Section: Text Left, Chart Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center my-12">
          {/* Text Content */}
          <div className="lg:col-span-1 flex flex-col justify-between mx-auto min-h-[400px] py-12">
            <div className={`transition-all duration-300 ease-in-out ${isFirstTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
                {firstChart === 'geographic' ? (
                  <span className="font-light">Research Reach</span>
                ) : (
                  <span className="font-light">Research Labs</span>
                )}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {firstChart === 'geographic' ? (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.countries[0]?.country}</span> leads the global research community with <span className="font-semibold text-gray-900">{analytics.countries[0]?.value} publications</span> ({analytics.countries[0]?.percentage.toFixed(1)}% of total).
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900 text-balance">{analytics.researchLabs[0]?.name}</span> et al. have published <span className="font-semibold text-gray-900">{analytics.researchLabs[0]?.value}</span> articles that cite the Open-Source Leg platform ({analytics.researchLabs[0]?.percentage.toFixed(1)}% of all citations).
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleFirstChartToggle}
              className="cursor-pointer bg-[var(--black)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200 flex items-center gap-2 mt-6"
            >
              {firstChart === 'geographic' ? 'Show Research Labs' : 'Show Geographic Data'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Chart */}
          <div className={`lg:col-span-2 p-4 transition-opacity duration-300 ease-in-out ${isFirstTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {firstChart === 'geographic' ? (
              <CountryTreemapChart 
                data={analytics.countries} 
                height={400}
              />
            ) : (
              <TreemapChart 
                data={analytics.researchLabs} 
                height={400}
              />
            )}
          </div>
        </div>

        {/* Second Section: Chart Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center my-12">
          {/* Chart */}
          <div className={`lg:col-span-2 p-4 transition-opacity duration-300 ease-in-out ${isSecondTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {secondChart === 'topics' ? (
              <TreemapChart 
                data={analytics.keywords} 
                height={400}
              />
            ) : (
              <TreemapChart 
                data={analytics.funding} 
                height={400}
                isFundingData={true}
              />
            )}
          </div>

          {/* Text Content */}
          <div className="lg:col-span-1 flex flex-col justify-between mx-auto min-h-[400px] py-12">
            <div className={`transition-all duration-300 ease-in-out ${isSecondTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
                {secondChart === 'topics' ? (
                  <span className="font-light">Research Topics</span>
                ) : (
                  <span className="font-light">Funding Sources</span>
                )}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {secondChart === 'topics' ? (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.keywords[0]?.name}</span> emerges as the most prominent research area with <span className="font-semibold text-gray-900">{analytics.keywords[0]?.value} publications</span> ({analytics.keywords[0]?.percentage.toFixed(1)}% of total research).
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{analytics.funding[0]?.name || 'N/A'}</span> leads research funding with <span className="font-semibold text-gray-900">{analytics.funding[0]?.value} supported publications</span> ({analytics.funding[0]?.percentage.toFixed(1)}% of funded research).
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleSecondChartToggle}
              className="cursor-pointer bg-[var(--black)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200 flex items-center gap-2 mt-6"
            >
              {secondChart === 'topics' ? 'Show Funding Agencies' : 'Show Research Topics'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 