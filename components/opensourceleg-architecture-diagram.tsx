"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function OpenSourceLegArchitectureDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (diagramRef.current) {
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f0f9ff',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#3b82f6',
            lineColor: '#1E1C19',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#f9fafb',
            background: '#ffffff',
            mainBkg: '#ffffff',
            secondBkg: '#f8fafc',
            tertiaryBkg: '#f1f5f9',
            nodeBorder: '#1E1C19',
            clusterBorder: '#d1d5db',
            defaultLinkColor: '#6b7280',
            titleColor: '#111827',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#374151',
            fontSize: '16px',
          },
        });

        const diagramDefinition = `classDiagram
    class OpenSourceLeg {
        +tag string
        +actuators dict~string, ActuatorBase~
        +sensors dict~string, SensorBase~
        +update()
        +home()
        +start()
        +stop()
        +knee ActuatorBase
        +ankle ActuatorBase
        +loadcell SensorBase
    }
    
    class ActuatorBase {
        <<abstract>>
        +tag string
        +gear_ratio float
        +frequency int
        +mode CONTROL_MODES
        +motor_constants MOTOR_CONSTANTS
        +is_homed bool
        +is_offline bool
        +start()
        +stop()
        +update()
        +set_control_mode()
        +set_motor_voltage()
        +set_motor_current()
        +set_motor_position()
        +set_motor_torque()
        +set_output_torque()
        +set_current_gains()
        +set_position_gains()
        +set_impedance_gains()
        +home()
        +motor_position float
        +motor_velocity float
        +motor_voltage float
        +motor_current float
        +motor_torque float
        +output_position float
        +output_velocity float
        +case_temperature float
        +winding_temperature float
    }
    
    class SensorBase {
        <<abstract>>
        +tag string
        +is_offline bool
        +is_streaming bool
        +data Any
        +start()
        +stop()
        +update()
    }
    
    class DephyActuator {
        +port string
        +baud_rate int
        +firmware_version string
        +gear_ratio float
        +frequency int
        +debug_level int
        +dephy_log bool
        +stop_motor_on_disconnect bool
        +set_position_gains()
        +set_current_gains()
        +set_impedance_gains()
        +set_motor_impedance()
        +set_output_impedance()
        +battery_voltage float
        +battery_current float
        +output_torque float
        +motor_encoder_counts int
        +motor_acceleration float
        +accelx float
        +accely float
        +accelz float
        +gyrox float
        +gyroy float
        +gyroz float
        +thermal_scaling_factor float
        +genvars ndarray
    }
    
    class TMotorMITCANActuator {
        +motor_type string
        +motor_ID int
        +gear_ratio float
        +frequency int
        +max_mosfett_temp float
        +output_position float
        +output_velocity float
        +output_acceleration float
        +output_torque float
        +motor_position float
        +motor_velocity float
        +motor_acceleration float
        +motor_torque float
        +set_output_position()
        +set_output_velocity()
        +set_output_torque()
        +set_motor_position()
        +set_motor_velocity()
        +set_motor_torque()
        +set_velocity_gains()
        +power_on()
        +power_off()
        +check_can_connection()
    }
    
    class CustomActuator {
        +custom_property string
        +custom_method()
        +implement_control_mode()
        +custom_calibration()
    }
    
    class AS5048B {
        +tag string
        +bus string
        +A1_adr_pin bool
        +A2_adr_pin bool
        +zero_position int
        +enable_diagnostics bool
        +position float
        +velocity float
        +abs_ang float
        +counts int
        +encoder_map Polynomial
        +set_zero_position()
        +set_encoder_map()
        +diag_compH bool
        +diag_compL bool
        +diag_COF bool
        +diag_OCF bool
    }
    
    class DephyLoadcellAmplifier {
        +tag string
        +amp_gain float
        +exc float
        +bus int
        +i2c_address int
        +calibration_matrix ndarray
        +enable_diagnostics bool
        +fx float
        +fy float
        +fz float
        +mx float
        +my float
        +mz float
        +is_calibrated bool
        +calibrate()
        +reset()
        +check_data()
    }
    
    class CustomSensor {
        +custom_property string
        +custom_data_type string
        +custom_method()
        +process_custom_data()
    }
    
    OpenSourceLeg o-- ActuatorBase : contains
    OpenSourceLeg o-- SensorBase : contains
    
    ActuatorBase <|-- DephyActuator
    ActuatorBase <|-- TMotorMITCANActuator
    ActuatorBase <|-- CustomActuator
    
    SensorBase <|-- AS5048B
    SensorBase <|-- DephyLoadcellAmplifier
    SensorBase <|-- CustomSensor
    
    note for OpenSourceLeg "Robot class supporting multiple actuators and sensors<br/>with properties for common joint access"
    note for ActuatorBase "Abstract base with control mode management<br/>and safety features like thermal monitoring"
    note for SensorBase "Abstract base for all sensor types<br/>with streaming and calibration support"`;

        try {
          // Clear the container
          diagramRef.current.innerHTML = '';
          
          // Render the diagram
          const { svg } = await mermaid.render('opensourceleg-class-diagram', diagramDefinition);
          diagramRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          diagramRef.current.innerHTML = `<p class="text-red-500">Error rendering diagram: ${error}</p>`;
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="w-full bg-transparent">
      <div 
        ref={diagramRef} 
        className="w-full overflow-x-auto flex justify-center"
        style={{ minHeight: '600px' }}
      />
      <p className="text-xs text-gray-600 mt-4 text-center italic">
        Class diagram demonstrating the architecture and extensibility of the opensourceleg library.
        </p>
    </div>
  );
} 