import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

const datasheetHref = "/downloads/OSL-DAQ.pdf"
const stepZipHref = "/downloads/OSL-DAQ-supplement.zip"

export default function ElectronicsDAQ() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero
        title={
          <>
            <span className="font-bold italic">Data Acquisition Board</span>
          </>
        }
        description="Technical overview, architecture, and connector references for the Open-Source Leg Data Acquisition board."
        primaryButton={{
          href: "#daq-overview",
          text: "View overview",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
        middleButton={{
          href: "https://available-inventions.umich.edu/product/osl-electronics",
          text: "Purchase at UM",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank",
        }}
        secondaryButton={{
          href: "/electronics#modules",
          text: "Back to electronics",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
      />

      <section id="daq-overview" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-black/10 pb-8">
            <div className="space-y-3 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900">
                DAQ <span className="font-medium italic">overview</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                The Data Acquisition Board enables high quality analog signal measurements for using the 6-channel load cell or other relevant analog signals. This is a separate circuit board that can be used with the RPi or other embedded systems via SPI communication.
                The Data Acquisition System (DAQ) integrates a 24-bit, 6-channel delta-sigma ADC (Texas Instruments ADS131M06)
                with external signal amplification and an anti-aliasing filter. A charge pump generates bipolar supply voltages
                from a single input to power bridge-based sensors. The DAQ is optimized for load cell measurements (SRI M3564F)
                for the Open-Source Leg and can also be used for high-resolution voltage measurements with bridge-based sensors.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                href="https://available-inventions.umich.edu/product/osl-electronics"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black"
              >
                Purchase at UM
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href={stepZipHref}
                download="OSL-DAQ-supplement.zip"
                variant="outline"
                className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
              >
                Download OSL DAQ STEP (ZIP)
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href={datasheetHref}
                download="OSL-DAQ.pdf"
                variant="outline"
                className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
              >
                Download datasheet
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <section aria-labelledby="daq-layout" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-2">
                <h3 id="daq-layout" className="text-2xl sm:text-3xl font-light text-gray-900">
                  DAQ board <span className="font-semibold">layout</span>
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Front view of the DAQ board.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
              <Image
                src="/downloads/DAQBoardImage.png"
                alt="Open-Source Leg DAQ board front view"
                width={1400}
                height={900}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Data Acquisition Architecture" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  ADC, timing, gain, and power specifications at a glance.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                    v
                  </span>
                </span>
            </summary>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600 text-sm sm:text-base">Core ADC and analog front-end specifications.</p>
              <div className="overflow-x-auto border border-black/10 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--light-blue)]/25">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Field</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Architecture</td><td className="px-3 py-2">Delta-Sigma</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Interface</td><td className="px-3 py-2">SPI</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Channels</td><td className="px-3 py-2">6</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Anti-aliasing cutoff (-3 dB)</td><td className="px-3 py-2">8 kHz</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Gain Stage 1 (fixed)</td><td className="px-3 py-2">Channels 1-3: 34, Channels 4-6: 151</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Gain Stage 2 (programmable)</td><td className="px-3 py-2">1-128</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Resolution</td><td className="px-3 py-2">24 bits</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Sampling rate</td><td className="px-3 py-2">250 Hz-32 kHz</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Operating voltage</td><td className="px-3 py-2">2.7 V-3.6 V</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Bipolar output</td><td className="px-3 py-2">+/-2.5 V</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Max output current</td><td className="px-3 py-2">250 mA</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Dimensions & Connectors" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Mechanical envelope and connector definitions.
                </p>
              </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                    v
                  </span>
                </span>
              </summary>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600 text-sm sm:text-base">Board dimensions, mounting hole size, and connector interfaces.</p>
                <div className="overflow-x-auto border border-black/10 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--light-green)]/30">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Field</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Length</td><td className="px-3 py-2">42 mm</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Width</td><td className="px-3 py-2">26 mm</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Mounting hole</td><td className="px-3 py-2">2.5 mm</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">SPI connector</td><td className="px-3 py-2">Molex Pico-Clasp, 6-pin</td></tr>
                    <tr className="border-t border-black/10"><td className="px-3 py-2">Loadcell connector</td><td className="px-3 py-2">Molex Pico-Blade, 14-pin</td></tr>
                  </tbody>
                </table>
                </div>
              </div>
            </details>
          </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Pinout" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  SPI and loadcell connector pin definitions.
                </p>
              </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                    v
                  </span>
                </span>
              </summary>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600 text-sm sm:text-base">
                  Pin-level connector mapping is documented in the DAQ datasheet.
                </p>
                <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
                  <Image
                    src="/electronics/interface-board/DAQ-pinout.png"
                    alt="DAQ pinout reference"
                    width={1200}
                    height={700}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </details>
          </section>

        </div>
      </section>
    </div>
  )
}

function SectionHeading({
  title,
  accent,
}: {
  title: ReactNode
  accent: "light-blue" | "light-green"
}) {
  const accentClass = accent === "light-blue" ? "text-[var(--light-blue)]" : "text-[var(--light-green)]"

  return (
    <h4 className="text-2xl sm:text-3xl font-light text-gray-900">
      <span className={`font-medium italic ${accentClass}`}>{title}</span>
    </h4>
  )
}
