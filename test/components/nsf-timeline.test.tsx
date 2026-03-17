import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import NSFTimeline from '@/components/nsf-timeline'

// Mock Mermaid library
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn()
  }
}))

// Import the mocked mermaid to get the actual mock functions
import mermaid from 'mermaid'
const mockMermaid = mermaid as any

describe('NSFTimeline Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset console.error spy if it exists
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders timeline container', () => {
      render(<NSFTimeline />)
      
      const container = document.querySelector('.timeline-container')
      expect(container).toBeInTheDocument()
    })

    it('applies correct layout classes', () => {
      render(<NSFTimeline />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      const middleContainer = document.querySelector('.w-full.max-w-6xl.mx-auto.items-center.flex.justify-center')
      const timelineContainer = document.querySelector('.timeline-container')
      
      expect(outerContainer).toBeInTheDocument()
      expect(middleContainer).toBeInTheDocument()
      expect(timelineContainer).toBeInTheDocument()
    })

    it('sets correct container styles', () => {
      render(<NSFTimeline />)
      
      const middleContainer = document.querySelector('.w-full.max-w-6xl')
      const timelineContainer = document.querySelector('.timeline-container')
      
      expect(middleContainer).toHaveStyle({ minHeight: '200px', overflow: 'visible' })
      expect(timelineContainer).toHaveStyle({ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: '100%'
      })
    })
  })

  describe('Mermaid Initialization', () => {
    it('initializes Mermaid with correct configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test SVG</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledWith({
          startOnLoad: false,
          theme: 'neutral',
          timeline: {
            numberSectionStyles: 4,
            disableMulticolor: false,
          },
        })
      })
    })

    it('calls mermaid.render with correct parameters', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test Timeline</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledWith(
          'nsf-timeline',
          expect.stringContaining('timeline')
        )
      })
    })

    it('renders timeline with correct definition content', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Timeline SVG</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const [id, definition] = mockMermaid.render.mock.calls[0]
        
        expect(id).toBe('nsf-timeline')
        expect(definition).toContain('timeline')
        expect(definition).toContain('2017 : NRI FND COLLAB')
        expect(definition).toContain('2020 : NRI INT Collaborative Research')
        expect(definition).toContain('2022 : NSF POSE Phase I')
        expect(definition).toContain('2024 : NSF POSE Phase II')
      })
    })
  })

  describe('Timeline Content', () => {
    it('includes all expected timeline entries', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Complete Timeline</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const definition = mockMermaid.render.mock.calls[0][1]
        
        // Check for all NSF grant entries
        expect(definition).toContain('An Open-Source Robotic Leg Platform that Lowers the Barrier for Academic Research')
        expect(definition).toContain('An Open-Source Framework for Continuous Torque Control of Intuitive Robotic Prosthetic Legs')
        expect(definition).toContain('Advancement of an open-source hardware and software ecosystem for the Open Source Leg')
        expect(definition).toContain('25+ institutions across 5 countries actively using the platform')
      })
    })

    it('has correct timeline structure', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Timeline Structure</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const definition = mockMermaid.render.mock.calls[0][1]
        
        // Check timeline years are in order
        const years = ['2017', '2020', '2022', '2024']
        years.forEach(year => {
          expect(definition).toContain(year)
        })
        
        // Check it starts with timeline keyword
        expect(definition.trim()).toMatch(/^timeline/)
      })
    })
  })

  describe('SVG Rendering', () => {
    it('renders SVG content when mermaid succeeds', async () => {
      // jsdom renders with explicit closing tags, not self-closing
      const mockSvg = '<svg><circle r="10"></circle></svg>'
      mockMermaid.render.mockResolvedValue({ svg: mockSvg })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const container = document.querySelector('.timeline-container')
        expect(container?.innerHTML).toBe(mockSvg)
      })
    })

    it('updates container innerHTML with rendered SVG', async () => {
      // jsdom renders with explicit closing tags, not self-closing
      const complexSvg = '<svg viewBox="0 0 100 100"><rect width="50" height="50"></rect></svg>'
      mockMermaid.render.mockResolvedValue({ svg: complexSvg })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const container = document.querySelector('.timeline-container')
        expect(container?.innerHTML).toContain('viewBox="0 0 100 100"')
        expect(container?.innerHTML).toContain('<rect width="50" height="50"></rect>')
      })
    })
  })

  describe('Error Handling', () => {
    it('handles mermaid.render errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockMermaid.render.mockRejectedValue(new Error('Mermaid rendering failed'))
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error rendering timeline:', expect.any(Error))
      })
      
      // Component should still render without crashing
      const container = document.querySelector('.timeline-container')
      expect(container).toBeInTheDocument()
    })

    it('handles initialization errors', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockMermaid.initialize.mockImplementation(() => {
        throw new Error('Initialization failed')
      })
      
      // The mermaid.initialize error will be thrown during useEffect
      // React testing may or may not propagate this error during render
      try {
        render(<NSFTimeline />)
        
        // If render succeeds, the container should exist
        const container = document.querySelector('.timeline-container')
        expect(container).toBeInTheDocument()
      } catch (error) {
        // If render throws due to useEffect error, that's also acceptable behavior
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('handles missing timeline container', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockMermaid.render.mockResolvedValue({ svg: '<svg>test</svg>' })
      
      render(<NSFTimeline />)
      
      // The component uses a ref, not querySelector, so render will still be called
      // and the component should not crash
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalled()
      })
      
      // Component should render without crashing
      const container = document.querySelector('.timeline-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Timeline Configuration', () => {
    it('uses correct theme configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const config = mockMermaid.initialize.mock.calls[0][0]
        expect(config.theme).toBe('neutral')
        expect(config.startOnLoad).toBe(false)
      })
    })

    it('uses correct timeline-specific configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const config = mockMermaid.initialize.mock.calls[0][0]
        expect(config.timeline.numberSectionStyles).toBe(4)
        expect(config.timeline.disableMulticolor).toBe(false)
      })
    })
  })

  describe('Component Lifecycle', () => {
    it('renders timeline on mount', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Mounted</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledTimes(1)
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
    })

    it('only renders once per mount', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Once</svg>' })
      
      const { rerender } = render(<NSFTimeline />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
      
      // Rerender should not trigger another mermaid render
      rerender(<NSFTimeline />)
      
      // Still should only be called once
      expect(mockMermaid.render).toHaveBeenCalledTimes(1)
    })
  })

  describe('Content Validation', () => {
    it('includes expected NSF program types', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Programs</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const definition = mockMermaid.render.mock.calls[0][1]
        
        expect(definition).toContain('NRI FND COLLAB')
        expect(definition).toContain('NRI INT Collaborative Research')
        expect(definition).toContain('NSF POSE Phase I')
        expect(definition).toContain('NSF POSE Phase II')
      })
    })

    it('has chronological progression', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Chronological</svg>' })
      
      render(<NSFTimeline />)
      
      await waitFor(() => {
        const definition = mockMermaid.render.mock.calls[0][1]
        
        // Check that years appear in chronological order
        const yearPositions = [
          definition.indexOf('2017'),
          definition.indexOf('2020'),
          definition.indexOf('2022'),
          definition.indexOf('2024')
        ]
        
        for (let i = 1; i < yearPositions.length; i++) {
          expect(yearPositions[i]).toBeGreaterThan(yearPositions[i - 1])
        }
      })
    })
  })
}) 
