import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SystemOverviewDiagram from '@/components/system-overview-diagram'

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

describe('SystemOverviewDiagram Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the main container structure', () => {
      render(<SystemOverviewDiagram />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      const middleContainer = document.querySelector('.w-full.max-w-6xl.mx-auto')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(outerContainer).toBeInTheDocument()
      expect(middleContainer).toBeInTheDocument()
      expect(mermaidContainer).toBeInTheDocument()
    })

    it('has correct container styling', () => {
      render(<SystemOverviewDiagram />)
      
      const middleContainer = document.querySelector('.w-full.max-w-6xl')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(middleContainer).toHaveStyle({ 
        minHeight: '500px',
        overflow: 'visible'
      })
      expect(mermaidContainer).toHaveStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      })
    })

    it('uses max-w-6xl for larger diagrams', () => {
      render(<SystemOverviewDiagram />)
      
      const middleContainer = document.querySelector('.max-w-6xl')
      expect(middleContainer).toBeInTheDocument()
    })
  })

  describe('Mermaid Integration', () => {
    it('initializes Mermaid with correct configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledWith({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            background: '#ffffff',
            primaryColor: '#8594E8',
            primaryTextColor: '#1E1C19',
            primaryBorderColor: '#1E1C19',
            lineColor: '#1E1C19',
            secondaryColor: '#CADA9D',
            tertiaryColor: '#f9f9f9',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            edgeLabelBackground: '#F2F5CF'
          },
          block: {
            padding: 20,
            useMaxWidth: true
          },
          flowchart: {
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 60,
            curve: 'basis'
          }
        })
      })
    })

    it('renders system diagram with correct definition', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>System Diagram</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledWith(
          'system-overview-diagram',
          expect.stringContaining('flowchart TD')
        )
        
        const [id, definition] = mockMermaid.render.mock.calls[0]
        expect(id).toBe('system-overview-diagram')
        expect(definition).toContain('Raspberry Pi')
      })
    })

    it('updates container with SVG content', async () => {
      const testSvg = '<svg><rect width="100" height="100"></rect></svg>'
      mockMermaid.render.mockResolvedValue({ svg: testSvg })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe(testSvg)
      })
    })

    it('handles complex SVG with multiple system components', async () => {
      const complexSvg = '<svg viewBox="0 0 800 600"><g><rect id="rpi"/><rect id="knee"/><rect id="ankle"/></g></svg>'
      mockMermaid.render.mockResolvedValue({ svg: complexSvg })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toContain('viewBox="0 0 800 600"')
        expect(container?.innerHTML).toContain('id="rpi"')
        expect(container?.innerHTML).toContain('id="knee"')
        expect(container?.innerHTML).toContain('id="ankle"')
      })
    })
  })

  describe('Error Handling', () => {
    it('handles mermaid.render errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockMermaid.render.mockRejectedValue(new Error('Rendering failed'))
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error rendering system overview diagram:', expect.any(Error))
      })
      
      const container = document.querySelector('.mermaid-container')
      expect(container).toBeInTheDocument()
    })

    it('handles empty SVG content gracefully', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toBe('')
      })
      
      expect(document.querySelector('.mermaid-container')).toBeInTheDocument()
    })

    it('handles malformed SVG content gracefully', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg><invalid-tag></svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toContain('<invalid-tag>')
      })
      
      expect(document.querySelector('.mermaid-container')).toBeInTheDocument()
    })
  })

  describe('Diagram Content Validation', () => {
    it('validates flowchart diagram definition format', async () => {
      const systemData = await import('@/lib/hardware/system-overview')
      
      expect(systemData.mermaidSystemDiagram).toContain('flowchart TD')
      expect(systemData.mermaidSystemDiagram).toContain('Raspberry Pi')
    })

    it('validates system components are present', async () => {
      const systemData = await import('@/lib/hardware/system-overview')
      const diagram = systemData.mermaidSystemDiagram
      
      // Central control
      expect(diagram).toContain('Raspberry Pi')
      
      // Joint systems
      expect(diagram).toContain('Knee Joint')
      expect(diagram).toContain('ANKLE_SYSTEM ["Ankle Joint"]')
      
      // Power components
      expect(diagram).toContain('LiPo 9S')
      expect(diagram).toContain('Battery Pack')
      
      // Actuators
      expect(diagram).toContain('Actuator')
      expect(diagram).toContain('Motor + 9:1 Gearbox')
      
      // Transmission
      expect(diagram).toContain('Belt Drive')
      expect(diagram).toContain('Transmission System')
      
      // Human interface
      expect(diagram).toContain('Human Subject')
    })

    it('validates system connections are defined', async () => {
      const systemData = await import('@/lib/hardware/system-overview')
      const diagram = systemData.mermaidSystemDiagram
      
      // Power connections
      expect(diagram).toContain('Power<br/>33.3V')
      expect(diagram).toContain('Power<br/>5V')
      
      // Motor connections
      expect(diagram).toContain('Motor<br/>Commands')
      expect(diagram).toContain('Motor<br/>Torque')
      
      // Data connections
      expect(diagram).toContain('Joint<br/>Position &<br/>Velocity')
      expect(diagram).toContain('Joint<br/>Torque')
    })

    it('validates system styling classes are defined', async () => {
      const systemData = await import('@/lib/hardware/system-overview')
      const diagram = systemData.mermaidSystemDiagram
      
      // Component styling classes
      expect(diagram).toContain('classDef electricalItem')
      expect(diagram).toContain('classDef controlItem')
      expect(diagram).toContain('classDef actuationItem')
      expect(diagram).toContain('classDef transmissionItem')
      expect(diagram).toContain('classDef sensingItem')
      expect(diagram).toContain('classDef humanSubject')
    })
  })

  describe('Component Lifecycle', () => {
    it('calls mermaid functions in correct order', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledBefore(mockMermaid.render as any)
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
    })

    it('renders diagram only once per mount', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Once</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
      
      // Re-rendering should not trigger another render
      expect(mockMermaid.render).toHaveBeenCalledTimes(1)
    })

    it('initializes mermaid only once per render', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Init Once</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.initialize).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Container Behavior', () => {
    it('maintains proper container hierarchy', () => {
      render(<SystemOverviewDiagram />)
      
      const outerContainer = document.querySelector('.flex.justify-center.items-center.w-full')
      const middleContainer = document.querySelector('.w-full.max-w-6xl')
      const mermaidContainer = document.querySelector('.mermaid-container')
      
      expect(outerContainer?.contains(middleContainer)).toBe(true)
      expect(middleContainer?.contains(mermaidContainer)).toBe(true)
    })

    it('handles container resizing gracefully', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg width="100%" height="auto">Responsive</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const container = document.querySelector('.mermaid-container')
        expect(container?.innerHTML).toContain('width="100%"')
        expect(container?.innerHTML).toContain('height="auto"')
      })
    })
  })

  describe('Mermaid Configuration', () => {
    it('uses correct theme configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Theme Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const config = mockMermaid.initialize.mock.calls[0][0]
        expect(config.theme).toBe('base')
        expect(config.startOnLoad).toBe(false)
        expect(config.themeVariables.primaryColor).toBe('#8594E8')
        expect(config.themeVariables.fontFamily).toBe('Inter, system-ui, sans-serif')
      })
    })

    it('uses correct flowchart configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Flowchart Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const config = mockMermaid.initialize.mock.calls[0][0]
        expect(config.flowchart.padding).toBe(20)
        expect(config.flowchart.nodeSpacing).toBe(50)
        expect(config.flowchart.rankSpacing).toBe(60)
        expect(config.flowchart.curve).toBe('basis')
      })
    })

    it('uses correct block configuration', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Block Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const config = mockMermaid.initialize.mock.calls[0][0]
        expect(config.block.padding).toBe(20)
        expect(config.block.useMaxWidth).toBe(true)
      })
    })
  })

  describe('Performance Considerations', () => {
    it('renders diagram only once per mount', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>Performance Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(1)
      })
    })

    it('uses unique diagram ID', async () => {
      mockMermaid.render.mockResolvedValue({ svg: '<svg>ID Test</svg>' })
      
      render(<SystemOverviewDiagram />)
      
      await waitFor(() => {
        const [id] = mockMermaid.render.mock.calls[0]
        expect(id).toBe('system-overview-diagram')
      })
    })
  })
}) 