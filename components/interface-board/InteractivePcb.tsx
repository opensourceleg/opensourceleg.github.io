"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import styles from "./interactive-pcb.module.css";

type ComponentEntry = {
  name: string;
  description: ReactNode;
  position: { top: string; left: string };
  boxArea: { top: string; left: string; width: string; height: string };
  category: string;
};

const ASSET_BASE = "/electronics/interface-board";
const categoryColor = "var(--light-blue)";

const frontComponents: Record<string, ComponentEntry> = {
  "sd-card": {
    name: "SD Card Slot",
    description: "Micro SD card slot for flashing RPi.",
    position: { top: "68%", left: "14%" },
    boxArea: { top: "49%", left: "2%", width: "25%", height: "34%" },
    category: "power",
  },
  "osl-website": {
    name: "OSL Website",
    description: "Links to the Open-Source Leg website.",
    position: { top: "71%", left: "75%" },
    boxArea: { top: "61%", left: "68%", width: "13.5%", height: "18.5%" },
    category: "power",
  },
  "cm5-connector": {
    name: "RPi CM5 Receptacle",
    description: "Connector for the RPi CM5 module.",
    position: { top: "10%", left: "47%" },
    boxArea: { top: "2%", left: "24.5%", width: "42%", height: "15%" },
    category: "main",
  },
};

const backComponents: Record<string, ComponentEntry> = {
  "i2c2": {
    name: "I2C-2",
    description: (
      <>
        <p>I2C bus 2 with Molex PicoClasp connector.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/I2C2_pinout.png`}
          alt="I2C-2 pinout"
        />
      </>
    ),
    position: { top: "9%", left: "58%" },
    boxArea: { top: "3%", left: "51%", width: "13.5%", height: "12%" },
    category: "communication",
  },
  "i2c3": {
    name: "I2C-3",
    description: (
      <>
        <p>I2C bus 3 with Molex PicoClasp connector.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/I2C3_pinout.png`}
          alt="I2C-3 pinout"
        />
      </>
    ),
    position: { top: "26%", left: "64%" },
    boxArea: { top: "20%", left: "57%", width: "13.5%", height: "12%" },
    category: "communication",
  },
  "spi": {
    name: "SPI-1",
    description: (
      <>
        <p>SPI bus with SCLK, MISO, MOSI, and three chip select lines.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/SPI1_pinout.png`}
          alt="SPI-1 pinout"
        />
      </>
    ),
    position: { top: "9%", left: "76%" },
    boxArea: { top: "0%", left: "66%", width: "20%", height: "15%" },
    category: "communication",
  },
  "uart1": {
    name: "UART-1",
    description: (
      <>
        <p>UART port 1 with Molex PicoClasp connector.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/UART1_pinout.png`}
          alt="UART-1 pinout"
        />
      </>
    ),
    position: { top: "9%", left: "41%" },
    boxArea: { top: "3%", left: "34%", width: "13.5%", height: "12%" },
    category: "communication",
  },
  "uart2": {
    name: "UART-2",
    description: (
      <>
        <p>UART port 2 with Molex PicoClasp connector.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/UART2_pinout.png`}
          alt="UART-2 pinout"
        />
      </>
    ),
    position: { top: "26%", left: "50%" },
    boxArea: { top: "20%", left: "43%", width: "14%", height: "12%" },
    category: "communication",
  },
  "can-module": {
    name: "CAN-0",
    description: (
      <>
        <p>CAN0 interface for communication over the Controller Area Network bus.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/CAN0_pinout.png`}
          alt="CAN0 pinout"
        />
      </>
    ),
    position: { top: "26%", left: "37%" },
    boxArea: { top: "20%", left: "31%", width: "11%", height: "12%" },
    category: "communication",
  },
  "power-input": {
    name: "15-42V Input",
    description: "XT30 connector for 15-42V input power from battery.",
    position: { top: "34%", left: "91%" },
    boxArea: { top: "18%", left: "73%", width: "26%", height: "31%" },
    category: "psu",
  },
  "signal-leds": {
    name: "Signal LEDs",
    description: "Status LEDs: 5V, 3V3, PWR, ACT, and programmable LED.",
    position: { top: "82%", left: "37.25%" },
    boxArea: { top: "74%", left: "33%", width: "7%", height: "24%" },
    category: "features",
  },
  "fan-port": {
    name: "Fan Port",
    description: (
      <>
        <p>Cooling fan connector (5V).</p>
        <PinoutPreview
          src={`${ASSET_BASE}/FAN_pinout.png`}
          alt="Fan port pinout"
        />
      </>
    ),
    position: { top: "93%", left: "49%" },
    boxArea: { top: "86%", left: "42%", width: "13.5%", height: "12%" },
    category: "features",
  },
  "test-pad": {
    name: "Test Pads",
    description: (
      <>
        <p>
          Test pads for 5V and 3.3V outputs{" "}
          <em>(see features section for details).</em>
        </p>
      </>
    ),
    position: { top: "64%", left: "50%" },
    boxArea: { top: "56%", left: "44%", width: "11%", height: "16%" },
    category: "features",
  },
  "rpi-boot-jumper": {
    name: "RPi Boot Jumper",
    description: (
      <>
        <p>Boot mode jumper for flashing CM5 via USB (eMMC mode).</p>
        <PinoutPreview
          src={`${ASSET_BASE}/RPIBOOT_pinout.png`}
          alt="RPi boot jumper pinout"
        />
      </>
    ),
    position: { top: "91%", left: "83.5%" },
    boxArea: { top: "83%", left: "80%", width: "7%", height: "16%" },
    category: "features",
  },
  "rpi-power-button": {
    name: "RPi Power Button",
    description: "Power on/off toggle switch for safe RPi shutdown.",
    position: { top: "92%", left: "63%" },
    boxArea: { top: "85.5%", left: "56%", width: "14%", height: "12%" },
    category: "features",
  },
  "external-switch": {
    name: "External Switch",
    description: "Port to connect an external switch to the RPi power button.",
    position: { top: "92%", left: "75%" },
    boxArea: { top: "85.5%", left: "70%", width: "10%", height: "11.5%" },
    category: "features",
  },
  "gpio-headers": {
    name: "GPIO Headers",
    description: (
      <>
        <p>6x GPIO header for prototyping and signal breakout.</p>
        <PinoutPreview
          src={`${ASSET_BASE}/J6_pinout.png`}
          alt="GPIO headers pinout"
        />
      </>
    ),
    position: { top: "9%", left: "24%" },
    boxArea: { top: "1%", left: "14%", width: "20%", height: "15%" },
    category: "features",
  },
  "imu": {
    name: "IMU",
    description: "Inertial Measurement Unit for motion and orientation sensing.",
    position: { top: "59.5%", left: "59%" },
    boxArea: { top: "53%", left: "54.5%", width: "8%", height: "12%" },
    category: "components",
  },
  "usb-c": {
    name: "USB-C Port",
    description: "USB-C data ports for high-speed data transfer between devices.",
    position: { top: "30%", left: "10%" },
    boxArea: { top: "18%", left: "1%", width: "16%", height: "58%" },
    category: "components",
  },
};

function PinoutPreview({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.pinoutButton}
        onClick={() => setIsOpen(true)}
      >
        <Image src={src} alt={alt} width={640} height={480} className={styles.pinoutImage} />
        <span className={styles.enlargeIcon} aria-hidden="true">
          +
        </span>
      </button>
      {isOpen && (
        <div
          className={styles.enlargedOverlay}
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <Image
            src={src}
            alt={alt}
            width={900}
            height={660}
            className={styles.enlargedImage}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default function InteractivePcb() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"front" | "back">("front");

  const activeComponent = selectedComponent || hoveredComponent;

  const handleComponentClick = (componentId: string, event: MouseEvent) => {
    event.stopPropagation();
    setSelectedComponent(componentId === selectedComponent ? null : componentId);
  };

  const handleComponentHover = (componentId: string) => {
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
    setHoveredComponent(componentId);
  };

  const handleComponentLeave = () => {
    setHoveredComponent(null);
  };

  const handleBackgroundClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.pcbImage) || target.classList.contains(styles.pcbContainer)) {
      setSelectedComponent(null);
    }
  };

  const getPopupPosition = (component: ComponentEntry) => {
    const boxTop = parseFloat(component.boxArea.top);
    const boxLeft = parseFloat(component.boxArea.left);
    const boxWidth = parseFloat(component.boxArea.width);
    const boxHeight = parseFloat(component.boxArea.height);
    const markerTop = parseFloat(component.position.top);
    const markerLeft = parseFloat(component.position.left);

    const position = { top: "20px", left: "20px" };

    if (markerTop > 50 && markerLeft > 50) {
      if (component.name === "RPi Boot Jumper") {
        position.top = `${Math.max(5, boxTop - 55)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      } else {
        position.top = `${Math.max(5, boxTop - 10)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      }
      return position;
    }

    if (component.name === "Fan Port" || component.name === "External Switch") {
      position.top = `${Math.max(5, boxTop - 15)}%`;
      position.left = `${Math.max(5, boxLeft - 35)}%`;
    }

    if (boxTop < 50) {
      if (component.name === "USB-C Port") {
        position.top = `${Math.max(5, boxTop - 50)}%`;
        position.left = `${Math.max(5, boxLeft - 35)}%`;
      } else {
        position.top = `${boxTop + boxHeight + 5}%`;
      }
    } else {
      position.top = `${Math.max(5, boxTop - 25)}%`;
    }

    if (boxLeft < 50) {
      position.left = `${Math.min(70, boxLeft + boxWidth + 5)}%`;
    } else {
      position.left = `${Math.max(5, boxLeft - 25)}%`;
    }

    return position;
  };

  const renderPCBView = (components: Record<string, ComponentEntry>, image: string, viewId: string) => {
    return (
      <div className={styles.pcbViewSection}>
        <div className={styles.pcbContainer} onClick={handleBackgroundClick}>
          <Image src={image} alt={`${viewId} view`} width={900} height={600} className={styles.pcbImage} />

          {Object.entries(components).map(([id, component]) => (
            <div
              key={`box-${viewId}-${id}`}
              className={`${styles.componentBox} ${
                hoveredComponent === `${viewId}-${id}` || selectedComponent === `${viewId}-${id}`
                  ? styles.componentBoxVisible
                  : ""
              }`}
              style={{
                top: component.boxArea.top,
                left: component.boxArea.left,
                width: component.boxArea.width,
                height: component.boxArea.height,
                ["--category-color" as string]: categoryColor,
              }}
            />
          ))}

          {Object.entries(components).map(([id, component]) => {
            const fullId = `${viewId}-${id}`;
            return (
              <button
                key={fullId}
                type="button"
                className={`${styles.hotspot} ${activeComponent === fullId ? styles.hotspotActive : ""}`}
                style={{
                  top: component.position.top,
                  left: component.position.left,
                  ["--category-color" as string]: categoryColor,
                }}
                onClick={(event) => handleComponentClick(fullId, event)}
                onMouseEnter={() => handleComponentHover(fullId)}
                onMouseLeave={handleComponentLeave}
                aria-label={component.name}
              >
                <span className={styles.hotspotDot} />
                <span className={styles.hotspotPulse} />
              </button>
            );
          })}

          {activeComponent && activeComponent.startsWith(viewId) && (
            <div
              className={styles.componentInfo}
              style={getPopupPosition(components[activeComponent.replace(`${viewId}-`, "")])}
            >
              <h3 style={{ color: categoryColor }}>
                {components[activeComponent.replace(`${viewId}-`, "")].name}
              </h3>
              <div className={styles.componentDescription}>
                {components[activeComponent.replace(`${viewId}-`, "")].description}
              </div>
              <span className={styles.componentCategory}>
                {components[activeComponent.replace(`${viewId}-`, "")].category.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const viewConfig =
    activeView === "front"
      ? { viewId: "front", image: `${ASSET_BASE}/pcb-front.png`, components: frontComponents }
      : { viewId: "back", image: `${ASSET_BASE}/pcb-layout.png`, components: backComponents };

  return (
    <div className={styles.interactivePcb} onClick={handleBackgroundClick}>
      <div className={styles.viewToggle}>
        <button
          type="button"
          className={`${styles.toggleButton} ${activeView === "front" ? styles.toggleActive : ""}`}
          onClick={() => {
            setSelectedComponent(null);
            setActiveView("front");
          }}
        >
          Front view
        </button>
        <button
          type="button"
          className={`${styles.toggleButton} ${activeView === "back" ? styles.toggleActive : ""}`}
          onClick={() => {
            setSelectedComponent(null);
            setActiveView("back");
          }}
        >
          Back view
        </button>
      </div>
      {renderPCBView(viewConfig.components, viewConfig.image, viewConfig.viewId)}
    </div>
  );
}
