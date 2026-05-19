'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Timeline definition for NSF grants
const timelineDefinition = `
timeline    
    2017 : NRI FND COLLAB
         : An Open-Source Robotic Leg Platform that Lowers the Barrier for Academic Research
         
    2020 : NRI INT Collaborative Research
         : An Open-Source Framework for Continuous Torque Control of Intuitive Robotic Prosthetic Legs
         
    2022 : NSF POSE Phase I
         : Advancement of an open-source hardware and software ecosystem for the Open Source Leg
         
    2024 : NSF POSE Phase II
         : 25+ institutions across 5 countries actively using the platform
`;

// Mermaid configuration for the timeline
const timelineConfig = {
  startOnLoad: false,
  theme: 'neutral' as const,
  timeline: {
    numberSectionStyles: 4,
    disableMulticolor: false,
  },
};

export default function NSFTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Mermaid with configuration
    if (!timelineConfig) {
      console.error('timelineConfig is not available');
      return;
    }
    mermaid.initialize(timelineConfig);

    const renderTimeline = async () => {
      if (timelineRef.current) {
        try {
          const { svg } = await mermaid.render('nsf-timeline', timelineDefinition);
          timelineRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering timeline:', error);
        }
      }
    };

    renderTimeline();
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div 
        className="w-full max-w-6xl mx-auto items-center flex justify-center"
        style={{ 
          minHeight: '200px',
          overflow: 'visible'
        }}
      >
        <div 
          ref={timelineRef}
          className="timeline-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
} 