'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { mermaidDiagram } from '@/lib/hardware/build-process';

export default function BuildProcessDiagram() {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid with configuration
    mermaid.initialize({
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
        fontSize: '14px'
      },
      flowchart: {
        padding: 20,
        nodeSpacing: 40,
        rankSpacing: 50,
        curve: 'basis'
      }
    });

    const renderDiagram = async () => {
      if (mermaidRef.current) {
        try {
          const { svg } = await mermaid.render('build-process-diagram', mermaidDiagram);
          mermaidRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering build process diagram:', error);
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div 
        className="w-full max-w-6xl mx-auto"
        style={{ 
          minHeight: '400px',
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