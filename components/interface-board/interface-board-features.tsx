"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Power,
  Lightbulb,
  Sparkles,
  Radar,
  Database,
  Clock,
  Beaker,
} from "lucide-react";

type Feature = {
  id: string;
  title: string;
  // `React.ReactNode` is used for the icon to avoid issues locating the global JSX namespace
  icon: React.ReactNode;
  description: React.ReactNode;
};

const features: Feature[] = [
  {
    id: "shutdown",
    title: "Safe RPi shutdown",
    icon: <Power className="w-4 h-4" />,
    description: "Pushbutton to safely shut down and power on the Pi.",
  },
  {
    id: "status-leds",
    title: "Status LEDs",
    icon: <Lightbulb className="w-4 h-4" />,
    description: (
      <ul className="space-y-1 text-sm text-gray-700">
        <li>
          <strong>5V:</strong> Indicates power on the 5V rail.
        </li>
        <li>
          <strong>3V3:</strong> Indicates power on the 3.3V rail.
        </li>
        <li>
          <strong>PWR:</strong> The CM5 is receiving sufficient power and is turned on.
        </li>
        <li>
          <strong>ACT:</strong> The flashing green light indicates the CM5 is running and/or accessing the OS.
        </li>
      </ul>
    ),
  },
  {
    id: "rgb-led",
    title: "Programmable RGB LED",
    icon: <Sparkles className="w-4 h-4" />,
    description: (
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <strong>Part Number:</strong> WS2812B-2020
        </div>
        <div>
          <strong>Protocol:</strong> Single-wire SPI (GPIO 14)
        </div>
      </div>
    ),
  },
  {
    id: "imu",
    title: "IMU",
    icon: <Radar className="w-4 h-4" />,
    description: (
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <strong>Part Number:</strong> BHI260AP
        </div>
        <div>
          <strong>Protocol:</strong> SPI (SPI-0, CS-1)
        </div>
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white p-3">
          <Image
            src="/electronics/interface-board/IMU_sensing_axes.png"
            alt="IMU Sensing Axes Orientation"
            width={560}
            height={320}
            className="w-full h-auto rounded-xl"
          />
          <p className="mt-2 text-xs text-gray-500">
            Image source: <a href="https://www.bosch-sensortec.com/products/smart-sensor-systems/bhi260ap/" target="_blank" rel="noopener noreferrer" className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]">Bosch Sensortec BHI260AP Datasheet</a>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "sd-card",
    title: "SD Card Slot",
    icon: <Database className="w-4 h-4" />,
    description: 'To be used with CM5 "lite" module (version of CM5 without onboard storage).',
  },
  {
    id: "rtc",
    title: "Real-time clock",
    icon: <Clock className="w-4 h-4" />,
    description: "Enables RTC on-board the CM5.",
  },
  {
    id: "test-points",
    title: "Test points",
    icon: <Beaker className="w-4 h-4" />,
    description: (
      <ul className="space-y-1 text-sm text-gray-700">
        <li>TP1: 3.3V rail</li>
        <li>TP2: 5V rail</li>
        <li>Use GND on J3 when measuring voltages.</li>
      </ul>
    ),
  },
];

export default function InterfaceBoardFeatures() {
  const [selected, setSelected] = useState(features[0]);

  return (
    <section className="rounded-3xl border border-black/10 bg-[var(--light-blue)]/10 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="lg:w-1/2 space-y-3">
          <div className="grid sm:grid-cols-2 gap-2">
            {features.map((feature) => {
              const isActive = selected.id === feature.id;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setSelected(feature)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "border-black bg-white text-gray-900 shadow-sm"
                      : "border-black/10 bg-white/70 text-gray-700 hover:bg-white"
                  }`}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--light-green)] text-black">
                    {feature.icon}
                  </span>
                  <span className="font-medium">{feature.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:w-1/2 bg-white rounded-2xl border border-black/10 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-gray-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)] text-white">
              {selected.icon}
            </span>
            <h5 className="text-lg font-semibold">{selected.title}</h5>
          </div>
          <div className="text-sm text-gray-700">{selected.description}</div>
        </div>
      </div>
    </section>
  );
}
