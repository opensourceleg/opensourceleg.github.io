export interface HardwareSpec {
  property: string
  value: string
  unit?: string
}

export const hardwareSpecs: HardwareSpec[] = [
  {
    property: "Mass (Knee + Ankle, w/ batteries and electronics)",
    value: "5.4",
    unit: "kg"
  },
  {
    property: "Minimum Build Height",
    value: "451",
    unit: "mm"
  },
  {
    property: "Knee Range of Motion",
    value: "0° to 120°",
  },
  {
    property: "Ankle Range of Motion",
    value: "-30° to 30°",
  },
  {
    property: "Transmission Ratio (At the Joint)",
    value: "41.5:1",
  },
  {
    property: "Planetary Gear Reduction (Motor)",
    value: "9:1",
  },
  {
    property: "Belt Drive Reduction (External)",
    value: "4.61:1",
  },
  {
    property: "Series Elasticity",
    value: "0-600 Nm/rad (Customizable)",
  },
  {
    property: "Peak Torque (Continuous)",
    value: "~29",
    unit: "Nm"
  },
  {
    property: "Peak Torque (Instantaneous)",
    value: "~145.25",
    unit: "Nm"
  },
  {
    property: "Peak Speed",
    value: "6.13",
    unit: "rad/s"
  },
  {
    property: "Torque Constant",
    value: "0.14",
    unit: "Nm/A"
  },
  {
    property: "Bus Voltage",
    value: "33.3",
    unit: "V"
  }
]

export const specNotes = [
  "Minimum build height is measured from the ground to the top of the knee pyramid with a variflex foot.",
  "Peak instantaneous and continuous torque values are calculated based on Dephy's actuator specifications at 25A and 5A respectively.",
  "Series elasticity can be customized using spring disks with different stiffness values.",
  "Calculations utilize our latest custom actuators, which feature an improved torque constant compared to pre-2024 models (0.112 Nm/A)."
]
