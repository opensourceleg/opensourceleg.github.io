import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { ArrowDown, Activity, Gauge, ShieldCheck, Plug, Clock, ArrowUpRight, Sparkles, Cable } from "lucide-react";

export default function ElectronicsDAQ() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Electronics{" "}
            <span className="font-bold italic">DAQ</span>
          </>
        }
        description="Capture synchronized sensor data with a board designed for the Open-Source Leg platform."
        primaryButton={{
          href: "#features",
        text: "See key features",
        icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
      }}
      secondaryButton={{
        href: "/electronics/documentation",
        text: "Back to documentation",
        icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
      }}
    />

      {/* Feature Highlights */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              Focused on{" "}
              <span className="font-medium italic">clean data</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From connectors to sampling, the DAQ is tuned for prosthetic research workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--black)] text-white rounded-2xl p-6 shadow-2xl border border-black space-y-3">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5" />
                <p className="text-lg font-semibold">Synchronized capture</p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                High-rate acquisition for torque, angle, and inertial signals with shared timing so your datasets stay aligned.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-black space-y-3">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-[var(--light-blue)]" />
                <p className="text-lg font-semibold text-gray-900">Wide sensor support</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Condition and read joint encoders, load cells, IMUs, and foot sensors without custom breakout hardware.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-black space-y-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--light-green)]" />
                <p className="text-lg font-semibold text-gray-900">Lab or field ready</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Locking connectors, strain relief, and clear labeling reduce wiring faults when you take the leg outside the lab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600">
                <Cable className="w-4 h-4" />
                <span className="font-semibold">Connections</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">What you&apos;ll hook up</h3>
              <p className="text-gray-600 leading-relaxed">
                Each connector is mapped to the sensing and actuation needs of the Open-Source Leg, keeping cabling predictable.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Plug className="w-4 h-4 mt-0.5" />
                  <span>Encoder and potentiometer inputs for knee and ankle joints</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gauge className="w-4 h-4 mt-0.5" />
                  <span>Load cell channels for torque and force sensing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-4 h-4 mt-0.5" />
                  <span>IMU headers for orientation and acceleration data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 mt-0.5" />
                  <span>Auxiliary inputs for future sensors and experiments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-black rounded-2xl shadow-2xl p-6 space-y-5">
              <h4 className="text-xl font-semibold text-gray-900">Plays well with</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="border border-black rounded-xl p-4 bg-[var(--light-green)]/30">
                  <p className="text-sm font-semibold text-gray-900">Hardware</p>
                  <p className="text-sm text-gray-700 mt-1">Mechanical stack pre-wired for the DAQ pinout.</p>
                  <Button
                    href="/hardware"
                    variant="outline"
                    className="mt-3 text-black border-black hover:bg-[var(--light-blue)] hover:text-black w-full"
                  >
                    See hardware
                  </Button>
                </div>
                <div className="border border-black rounded-xl p-4 bg-[var(--light-blue)]/30">
                  <p className="text-sm font-semibold text-gray-900">Software</p>
                  <p className="text-sm text-gray-700 mt-1">Python SDK hooks for streaming, logging, and visualization.</p>
                  <Button
                    href="/software"
                    variant="outline"
                    className="mt-3 text-black border-black hover:bg-[var(--light-green)] hover:text-black w-full"
                  >
                    See software
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Start with the DAQ today; driver and logging examples will roll out alongside tutorials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Option */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[var(--black)] text-white border-2 border-black rounded-3xl p-10 sm:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl text-white">
                <span className="relative font-medium italic">
                  Purchase
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C60 6 140 6 198 8"
                      stroke="var(--light-blue)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Option
              </h3>
              <p className="text-white/90 leading-relaxed max-w-3xl">
                Ready to purchase a DAQ? Orders are handled through the University of Michigan marketplace. Purchases are
                treated as donations to the Open-Source Leg project, helping fund new hardware, software, and community
                support.
              </p>
            </div>
            <Button
              href="https://available-inventions.umich.edu/product/osl-electronics"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--light-blue)] text-black border hover:bg-[var(--light-green)] hover:text-black px-6 py-4 text-base sm:text-lg flex items-center justify-center gap-2"
            >
              Purchase DAQ
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Downloads & Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-3xl sm:text-4xl font-light text-gray-900">
              Downloads{" "}
              <span className="font-medium italic">& support</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Firmware, wiring diagrams, and example notebooks are on the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="font-semibold">DAQ Specification</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Complete DAQ PDF</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Full specification, pinout diagrams, and electrical schematics for the Open-Source Leg DAQ board.
                </p>
              </div>
              <Button
                href="/downloads/OSL-DAQ.pdf"
                download="OSL-DAQ.pdf"
                className="mt-4 bg-[var(--light-blue)] text-black border border-black hover:bg-[var(--light-green)] w-full"
              >
                Download PDF
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="font-semibold">DAQ Supplement</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Supplementary Docs</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Additional reference materials, calibration curves, and assembly notes for the DAQ board.
                </p>
              </div>
              <Button
                href="/downloads/OSL-DAQ-supplement.zip"
                download="OSL-DAQ-supplement.zip"
                className="mt-4 bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] w-full"
              >
                Download Supplement (ZIP)
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--light-green)]" />
                  <h4 className="text-xl font-semibold text-gray-900">Community support</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ask wiring questions, propose features, or share logs with other researchers.
                </p>
              </div>
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black w-full"
              >
                Visit the forum
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[var(--light-blue)]" />
                  <h4 className="text-xl font-semibold text-gray-900">Tutorials</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Guided setup for DAQ bring-up, calibration, and logging will land soon.
                </p>
              </div>
              <Button
                href="/electronics/tutorials"
                variant="outline"
                className="mt-4 text-black border-black hover:bg-[var(--light-green)] hover:text-black w-full"
              >
                View roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



