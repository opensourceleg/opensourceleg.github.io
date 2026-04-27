// Interactive System Overview Configuration and Content

export interface ComponentUrls {
  battery: string;
  raspberryPi: string;
  actuator: string;
  beltDrive: string;
  encoder: string;
  loadCell: string;
  sensors: string;
}

// Default component URLs (to be replaced with actual Google Drive folder links)
export const defaultComponentUrls: ComponentUrls = {
  battery: "https://drive.google.com/drive/folders/1aiRPKrbr-BSm-Nrmsc4J3gnLb-L811e3?usp=drive_link",
  raspberryPi: "https://www.mouser.com/ProductDetail/Raspberry-Pi/SC1112?qs=HoCaDK9Nz5c86n0i5EQ%2FPA%3D%3D",
  actuator: "https://drive.google.com/drive/folders/1aiRPKrbr-BSm-Nrmsc4J3gnLb-L811e3?usp=drive_link",
  beltDrive: "https://drive.google.com/drive/folders/1inqqjWO22BNM2bU8uPVI3usGM4lP8mI7?usp=drive_link",
  encoder: "https://mou.sr/3KWjNxm",
  loadCell: "https://drive.google.com/drive/folders/1BPO1_veFyFO8lNE8cSrc46x8wOkowUB-?usp=drive_link",
  sensors: "#"
};

// Interactive version without connection labels and with clickable components
export const interactiveSystemDiagram = `
flowchart TD
    %% Central Control
    RPI("Raspberry Pi<br/>(CM / Jetson Nano)")
    
    %% Knee Joint System (Left)
    subgraph KNEE_SYSTEM ["Knee Joint"]
        direction TB
        KBAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        KA("Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy / TMotor)")
        KBD("5.44:1<br/>Belt Drive<br/>Transmission System")
        KE("Knee Joint Encoder")
        
        KBAT ==> KA
        KA --> KBD
        KBD --> KE
    end
    
    %% Ankle Joint System (Right)
    subgraph ANKLE_SYSTEM ["Ankle Joint"]
        direction TB
        ABAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        AA("Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy / TMotor)")
        ABD("5.44:1<br/>Belt Drive<br/>Transmission System")
        AE("Ankle Joint Encoder")
        
        ABAT ==> AA
        ABD --> AE
        AA --> ABD        
    end
       
    %% Control Connections (from center to both sides)
    KBAT ==> RPI
    RPI --> KA
    RPI --> AA
       
    %% Sensor Feedback (from both sides to center)
    KE -.-> RPI
    AE -.-> RPI
    
    %% External Sensing
    LC("Load Cell<br/>+ DAQ")
    LC -.-> RPI
    
    %% Optional Sensors
    AS("IMU, EMG<br/>Custom Sensors")
    AS -.-> RPI
    
    %% Styling with rounded corners and clickable indicators
    classDef electricalItem fill:#8594E8,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef controlItem fill:#95A5D6,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef actuationItem fill:#A6B5C5,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef transmissionItem fill:#B6C6B3,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef sensingItem fill:#C6D6A1,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef jointSystem fill:#f0f0f0,stroke:#1E1C19,stroke-width:1px,rx:15,ry:15
    classDef humanSubject fill:#E7F77E,stroke:#1E1C19,stroke-width:1px,rx:10,ry:10
    classDef clickable cursor:pointer,stroke:#1E1C19,stroke-width:1px
    
    class KBAT,ABAT electricalItem
    class RPI controlItem
    class KA,AA actuationItem
    class KBD,ABD transmissionItem
    class KE,AE,LC,AS sensingItem
    class HUMAN humanSubject
    class KNEE_SYSTEM,ANKLE_SYSTEM jointSystem
    
    %% Add clickable class to make components interactive
    class KBAT,ABAT,RPI,KA,AA,KBD,ABD,KE,AE,LC,AS clickable
    
    %% Click events for components (placeholders - will be replaced with actual URLs)
    click KBAT "javascript:void(0)" "Battery Pack Information"
    click ABAT "javascript:void(0)" "Battery Pack Information"
    click RPI "javascript:void(0)" "Raspberry Pi Information"
    click KA "javascript:void(0)" "Knee Actuator Information"
    click AA "javascript:void(0)" "Ankle Actuator Information"
    click KBD "javascript:void(0)" "Belt Drive Information"
    click ABD "javascript:void(0)" "Belt Drive Information"
    click KE "javascript:void(0)" "Encoder Information"
    click AE "javascript:void(0)" "Encoder Information"
    click LC "javascript:void(0)" "Load Cell Information"
    click AS "javascript:void(0)" "Sensor Information"
`;

// Mermaid configuration for interactive system overview
export const mermaidConfig = {
  startOnLoad: false,
  theme: 'base' as const,
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
    edgeLabelBackground: 'transparent'
  },
  block: {
    padding: 20,
    useMaxWidth: true
  },
  flowchart: {
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 60,
    curve: 'basis' as const
  }
};

// Helper function to replace placeholder URLs with actual component URLs
export function buildDiagramWithUrls(componentUrls: ComponentUrls): string {
  return interactiveSystemDiagram
    .replace(/click KBAT "javascript:void\(0\)"/g, `click KBAT "${componentUrls.battery}"`)
    .replace(/click ABAT "javascript:void\(0\)"/g, `click ABAT "${componentUrls.battery}"`)
    .replace(/click RPI "javascript:void\(0\)"/g, `click RPI "${componentUrls.raspberryPi}"`)
    .replace(/click KA "javascript:void\(0\)"/g, `click KA "${componentUrls.actuator}"`)
    .replace(/click AA "javascript:void\(0\)"/g, `click AA "${componentUrls.actuator}"`)
    .replace(/click KBD "javascript:void\(0\)"/g, `click KBD "${componentUrls.beltDrive}"`)
    .replace(/click ABD "javascript:void\(0\)"/g, `click ABD "${componentUrls.beltDrive}"`)
    .replace(/click KE "javascript:void\(0\)"/g, `click KE "${componentUrls.encoder}"`)
    .replace(/click AE "javascript:void\(0\)"/g, `click AE "${componentUrls.encoder}"`)
    .replace(/click LC "javascript:void\(0\)"/g, `click LC "${componentUrls.loadCell}"`)
}

// Component styling configuration
export const componentStyles = {
  hoverScale: 1.2,
  transitionDuration: '0.2s',
  transitionEasing: 'ease'
}; 