import { describe, it, expect } from 'vitest'
import { statsPanels, type StatsPanel } from '@/lib/stats'

describe('Stats Data', () => {
  describe('statsPanels', () => {
    it('should be an array', () => {
      expect(Array.isArray(statsPanels)).toBe(true)
    })

    it('should have at least one panel', () => {
      expect(statsPanels.length).toBeGreaterThan(0)
    })

    it('should have all required properties for each panel', () => {
      statsPanels.forEach((panel, index) => {
        expect(panel).toHaveProperty('id')
        expect(panel).toHaveProperty('title')
        expect(panel).toHaveProperty('href')
        expect(panel).toHaveProperty('value')
        expect(panel).toHaveProperty('trend')
        expect(panel).toHaveProperty('trendValue')
        expect(panel).toHaveProperty('description')
      })
    })

    it('should have unique ids for each panel', () => {
      const ids = statsPanels.map(panel => panel.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid trend values', () => {
      statsPanels.forEach((panel, index) => {
        expect(['up', 'down']).toContain(panel.trend)
      })
    })

    it('should have positive values', () => {
      statsPanels.forEach((panel, index) => {
        expect(panel.value).toBeGreaterThan(0)
        expect(panel.trendValue).toBeGreaterThan(0)
      })
    })

    it('should have valid URLs for href', () => {
      statsPanels.forEach((panel, index) => {
        expect(panel.href).toMatch(/^https?:\/\//)
      })
    })

    it('should have non-empty strings for text fields', () => {
      statsPanels.forEach((panel, index) => {
        expect(panel.id).toBeTruthy()
        expect(panel.title).toBeTruthy()
        expect(panel.description).toBeTruthy()
        expect(typeof panel.id).toBe('string')
        expect(typeof panel.title).toBe('string')
        expect(typeof panel.description).toBe('string')
      })
    })

    it('should have numeric values for numbers', () => {
      statsPanels.forEach((panel, index) => {
        expect(typeof panel.value).toBe('number')
        expect(typeof panel.trendValue).toBe('number')
      })
    })
  })

  describe('StatsPanel type validation', () => {
    it('should match the expected structure', () => {
      const mockPanel: StatsPanel = {
        id: 'test-id',
        title: 'Test Title',
        href: 'https://example.com',
        value: 100,
        trend: 'up',
        trendValue: 15,
        description: 'Test description'
      }

      expect(mockPanel).toHaveProperty('id')
      expect(mockPanel).toHaveProperty('title')
      expect(mockPanel).toHaveProperty('href')
      expect(mockPanel).toHaveProperty('value')
      expect(mockPanel).toHaveProperty('trend')
      expect(mockPanel).toHaveProperty('trendValue')
      expect(mockPanel).toHaveProperty('description')
    })
  })

  describe('specific panel tests', () => {
    it('should include the OpenSourceLeg PyPI panel', () => {
      const pypiPanel = statsPanels.find(panel => panel.id === 'osl-pypi')
      expect(pypiPanel).toBeDefined()
      expect(pypiPanel?.title).toBe('opensourceleg')
      expect(pypiPanel?.href).toContain('pypi.org')
    })

    it('should include the CAD Onshape panel', () => {
      const cadPanel = statsPanels.find(panel => panel.id === 'osl-cad')
      expect(cadPanel).toBeDefined()
      expect(cadPanel?.title).toBe('CAD on Onshape')
      expect(cadPanel?.href).toContain('onshape.com')
    })

    it('should include the website panel', () => {
      const websitePanel = statsPanels.find(panel => panel.id === 'opensourceleg.org')
      expect(websitePanel).toBeDefined()
      expect(websitePanel?.title).toBe('opensourceleg.org')
      expect(websitePanel?.href).toContain('opensourceleg.org')
    })
  })
}) 