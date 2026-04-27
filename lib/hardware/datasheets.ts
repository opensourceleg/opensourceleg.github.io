export interface Datasheet {
  id: string;
  componentName: string;
  description: string;
  downloadUrl: string;
}

export const datasheets: Datasheet[] = [
  {
    id: "dephy-gui-software",
    componentName: "Dephy GUI Software",
    description: "Graphical user interface software for Dephy Actpack configuration and control",
    downloadUrl: "https://drive.google.com/file/d/15aRB56zuI6JPtnIwAWYebwWG-SGUE_D6/view?usp=sharing"
  },
  {
    id: "dephy-gui-manual",
    componentName: "Dephy GUI User Manual",
    description: "Comprehensive user manual for the Dephy GUI software interface",
    downloadUrl: "https://drive.google.com/file/d/1L_Cag9FOgcvtiGYg6kuz8IC3_eUBUrd7/view?usp=sharing"
  },
  {
    id: "dephy-actpack",
    componentName: "Dephy Actpack 4.1 (9:1 Geared Actuator)",
    description: "High-performance geared actuator with on-board controller",
    downloadUrl: "https://drive.google.com/file/d/1k99Pfd8xSigBUOtTD9PhqQm5TaQjvgVz/view?usp=sharing"
  },
  {
    id: "dephy-battery",
    componentName: "Dephy BA30 Battery",
    description: "High-capacity lithium-ion battery pack with built-in safety features",
    downloadUrl: "https://drive.google.com/file/d/181BlHhPBlqGU9A98OiT9Ouy-lpzshioZ/view?usp=sharing"
  },
  {
    id: "dephy-battery-dock",
    componentName: "Dephy Smart Battery Dock for BA30 Battery",
    description: "Smart charging and management dock for BA30 battery system",
    downloadUrl: "https://drive.google.com/file/d/1VnnyKE-UO7f48TQolkhjxz7axTnmYvL6/view?usp=sharing"
  },
  {
    id: "as5048-encoder",
    componentName: "AS5048A/AS5048B Magnetic Rotary Encoder",
    description: "Magnetic rotary encoder with 14-bit resolution",
    downloadUrl: "https://www.mouser.com/datasheet/2/588/AS5048_DS000298_4_00-2324531.pdf"
  },
  {
    id: "ft-load-cell",
    componentName: "6 Axis F/T Load Cell",
    description: "Six-axis force/torque sensor",
    downloadUrl: "https://www.srisensor.com/uploads/M3564F3.pdf"
  }
];

 