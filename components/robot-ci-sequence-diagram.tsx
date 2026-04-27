'use client';

import { useEffect, useRef } from 'react';

export default function RobotCISequenceDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#95A5D6',
            primaryTextColor: '#1E1C19',
            primaryBorderColor: '#1E1C19',
            lineColor: '#1E1C19',
            sectionBkgColor: '#f0f0f0',
            altSectionBkgColor: '#ffffff',
            gridColor: '#e9ecef',
            c0: '#E7F77E',
            c1: '#95A5D6',
            c2: '#A6B5C5',
            c3: '#B6C6B3',
            c4: '#C6D6A1',
            c5: '#8594E8',
            cScale0: '#E7F77E',
            cScale1: '#95A5D6',
            cScale2: '#A6B5C5',
            cScale3: '#B6C6B3',
            cScale4: '#C6D6A1',
            actorBkg: '#95A5D6',
            actorBorder: '#1E1C19',
            actorTextColor: '#1E1C19',
            actorLineColor: '#1E1C19',
            signalColor: '#1E1C19',
            signalTextColor: '#1E1C19',
            messageLine0Color: '#1E1C19',
            messageLine1Color: '#1E1C19',
            messageText0Color: '#1E1C19',
            messageText1Color: '#1E1C19',
            messageTextBkgColor: '#f0f0f0',
            messageTextBorderColor: '#1E1C19',
            loopTextColor: '#1E1C19',
            loopTextBkgColor: '#f0f0f0',
            loopTextBorderColor: '#1E1C19',
            activationBkgColor: '#C6D6A1',
            activationBorderColor: '#1E1C19',
            sequenceNumberColor: '#1E1C19',
            sequenceNumberBkgColor: '#f0f0f0',
            labelBoxBkgColor: '#f0f0f0',
            labelBoxBorderColor: '#1E1C19',
            labelTextColor: '#1E1C19',
            noteTextColor: '#1E1C19',
            noteBkgColor: '#C6D6A1',
            noteBorderColor: '#1E1C19',
          }
        });

        const diagramDefinition = `
sequenceDiagram
    participant R as User
    participant G as GitHub Repository
    participant GA as GitHub Actions
    participant RPi as Raspberry Pi
    participant E as Email Service
    participant VS as VSCode, Cursor, etc

    Note over R,VS: Robot CI Workflow

    R->>G: 1. Fork/clone robot-ci repository
    R->>G: 2. Configure secrets (WiFi, SMTP, etc.)
    R->>G: 3. Customize packages & settings
    
    R->>GA: 4. Trigger build workflow
    Note over GA: Building custom OS image...
    GA->>GA: 5. Download base OS (Raspbian/Ubuntu)
    GA->>GA: 6. Install packages & configure services
    GA->>GA: 7. Setup users & network settings
    GA->>G: 8. Upload image as artifact
    
    R->>G: 9. Download built image
    R->>RPi: 10. Flash image to SD card & boot
    
    Note over RPi: First boot setup...
    RPi->>RPi: 11. Connect to configured networks
    RPi->>E: 12. Send IP address notification
    E->>R: 13. Email with Pi IP address
    
    R->>VS: 14. Connect via Remote SSH
    VS->>RPi: 15. Establish SSH connection
    Note over R,RPi: Ready for remote development!
        `;

        if (diagramRef.current) {
          const { svg } = await mermaid.render('robot-ci-sequence', diagramDefinition);
          diagramRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<p class="text-gray-500 text-center">Diagram could not be loaded</p>';
        }
      }
    };

    loadMermaid();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-transparent">
        <div 
          ref={diagramRef} 
          className="flex justify-center items-center min-h-[400px]"
          style={{ fontSize: '14px' }}
        >
          <p className="text-gray-500">Loading diagram...</p>
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center italic">
          Sequence diagram demonstrating the complete workflow from repository setup to establishing a remote development connection.
        </p>
      </div>
    </div>
  );
}