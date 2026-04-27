export interface BuildStep {
  step: number
  title: string
  description: string
  provider: string
  link?: string
}

export const buildSteps: BuildStep[] = [
  {
    step: 1,
    title: "Download Design Files",
    description: "Choose your configuration: knee only, ankle only, or full OSL",
    provider: "opensourceleg.org"
  },
  {
    step: 2,
    title: "Machine Shop Quotes",
    description: "Send design files to local machine shops for quotes and machining",
    provider: "Local Machine Shops"
  },
  {
    step: 3,
    title: "Order Sensors",
    description: "Pick encoders, IMU, load cell, and request quotes from vendors",
    provider: "Multiple Vendors"
  },
  {
    step: 4,
    title: "Order Actuators",
    description: "Choose from Dephy, TMotor, Moteus, or MAB Robotics actuators",
    provider: "Multiple Vendors"
  },
  {
    step: 5,
    title: "Receive All Parts",
    description: "Wait for machined parts, sensors, and actuators to arrive",
    provider: "All Vendors"
  },
  {
    step: 6,
    title: "Assembly & Setup",
    description: "Follow tutorial videos to assemble OSL and prepare for software setup",
    provider: "Your Lab"
  }
]

export const diyBenefits = [
  "Learn how the Open-Source Leg works",
  "Develop troubleshooting skills for any maintenance or repairs",
  "Contribute improvements and modifications back to the community",
  "Use any custom motors, sensors, or components you prefer",
  "Significant cost savings: $23,000 vs $55,000+"
]

export const mermaidDiagram = `
flowchart LR
    A("Download Design Files") --> B("Machine Shop<br/>Quotes & Machining")
    H("Pick Your Setup") --> C("Order Sensors<br/>[Encoders, IMU, Load Cell]")
    H --> D("Order Actuators<br/>[Dephy, TMotor, Moteus, MAB]")
    
    B --> E("All Components<br/>Received")
    C --> E
    D --> E
    I("Order Fasteners & Bearings<br/>via Bill of Materials") --> E
    
    E --> F("Watch Tutorial Videos<br/>& Assemble")
    F --> G("Complete OSL<br/>Ready for Software Setup")
    
    style A fill:#8594E8
    style B fill:#9EADCE
    style C fill:#9EADCE
    style D fill:#9EADCE
    style E fill:#CFDE99
    style F fill:#D3E393
    style G fill:#E7F77E
` 