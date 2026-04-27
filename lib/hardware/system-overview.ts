export const mermaidSystemDiagram = `
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
        
        KBAT ==>|"Power<br/>33.3V"| KA
        KA -->|"Motor<br/>Torque"| KBD
        KBD --> KE
    end
    
    %% Ankle Joint System (Right)
    subgraph ANKLE_SYSTEM ["Ankle Joint"]
        direction TB
        ABAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        AA("Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy / TMotor)")
        ABD("5.44:1<br/>Belt Drive<br/>Transmission System")
        AE("Ankle Joint Encoder")
        
        ABAT ==>|"Power<br/>33.3V"| AA
        ABD --> AE
        AA -->|"Motor<br/>Torque"| ABD        
    end
    
    %% Central Output
    HUMAN("Human Subject")
    
    %% Control Connections (from center to both sides)
    KBAT ==>|"Power<br/>5V"| RPI
    RPI -->|"Motor<br/>Commands"| KA
    RPI -->|"Motor<br/>Commands"| AA
    
    %% Mechanical Output (from both sides to center)
    KBD ==>|"Joint<br/>Torque"| HUMAN
    ABD ==>|"Joint<br/>Torque"| HUMAN
    
    %% Sensor Feedback (from both sides to center)
    KE -.->|"Joint<br/>Position &<br/>Velocity"| RPI
    AE -.->|"Joint<br/>Position &<br/>Velocity"| RPI
    
    %% External Sensing
    LC("Load Cell<br/>+ DAQ")
    LC -.->|"Ground Reaction Forces &<br/>Moments"| RPI
    
    %% Optional Sensors
    AS("IMU, EMG<br/>Custom Sensors")
    AS -.->|"Sensor<br/>Data"| RPI
    
    %% Styling with rounded corners
    classDef electricalItem fill:#8594E8,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef controlItem fill:#95A5D6,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef actuationItem fill:#A6B5C5,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef transmissionItem fill:#B6C6B3,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef sensingItem fill:#C6D6A1,stroke:#1E1C19,stroke-width:1px,color:#1E1C19,rx:10,ry:10
    classDef jointSystem fill:#f0f0f0,stroke:#1E1C19,stroke-width:1px,rx:15,ry:15
    classDef humanSubject fill:#E7F77E,stroke:#1E1C19,stroke-width:1px,rx:10,ry:10
    
    class KBAT,ABAT electricalItem
    class RPI controlItem
    class KA,AA actuationItem
    class KBD,ABD transmissionItem
    class KE,AE,LC,AS sensingItem
    class HUMAN humanSubject
    class KNEE_SYSTEM,ANKLE_SYSTEM jointSystem
` 