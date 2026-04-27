'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { YearlyPublicationData } from '@/lib/research/research-analytics'

interface PublicationsByYearChartProps {
  data: YearlyPublicationData[]
}

export function PublicationsByYearChart({ data }: PublicationsByYearChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart 
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis 
            dataKey="year" 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Year', position: 'insideBottom', dy: 15, fill: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.7)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            label={{ value: 'Citations', angle: -90, position: 'insideLeft', dx: -10, fill: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--black)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--white)'
            }}
            labelStyle={{ fontWeight: 'bold' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Bar dataKey="count" name="Citations" fill="var(--white)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 