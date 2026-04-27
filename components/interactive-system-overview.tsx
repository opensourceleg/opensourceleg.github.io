'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { 
  type ComponentUrls, 
  mermaidConfig, 
  buildDiagramWithUrls, 
  componentStyles 
} from '@/lib/hardware/interactive-system-overview';

interface InteractiveSystemOverviewProps {
  componentUrls: ComponentUrls;
}

export default function InteractiveSystemOverview({ componentUrls }: InteractiveSystemOverviewProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid with configuration from lib
    mermaid.initialize(mermaidConfig);

    const renderDiagram = async () => {
      if (mermaidRef.current) {
        try {
          // Build diagram with actual URLs using helper function
          const diagramWithUrls = buildDiagramWithUrls(componentUrls);

          const { svg } = await mermaid.render('interactive-system-overview', diagramWithUrls);
          mermaidRef.current.innerHTML = svg;

          // Add hover effects and force links to open in new tab
          const svgElement = mermaidRef.current.querySelector('svg');
          if (svgElement) {
            // Ensure all links open in a new tab
            const anchors = svgElement.querySelectorAll('a');
            anchors.forEach(anchor => {
              anchor.setAttribute('target', '_blank');
              anchor.setAttribute('rel', 'noopener noreferrer');
            });

            // Hover effects on clickable groups
            const clickableElements = svgElement.querySelectorAll('.clickable');
            clickableElements.forEach(element => {
              const htmlElement = element as HTMLElement;

              element.addEventListener('mouseenter', () => {
                htmlElement.style.opacity = '1.0';
                htmlElement.style.transform = `scale(${componentStyles.hoverScale})`;
                htmlElement.style.transition = `all ${componentStyles.transitionDuration} ${componentStyles.transitionEasing}`;
              });
              element.addEventListener('mouseleave', () => {
                htmlElement.style.opacity = '1';
                htmlElement.style.transform = 'scale(1)';
              });
            });
          }
        } catch (error) {
          console.error('Error rendering interactive system overview:', error);
        }
      }
    };

    renderDiagram();
  }, [componentUrls]);

  return (
    <div className="flex justify-center items-center w-full">
      <div 
        className="w-full max-w-6xl mx-auto"
        style={{ 
          minHeight: '500px',
          overflow: 'visible'
        }}
      >
        <div 
          ref={mermaidRef}
          className="mermaid-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
} 