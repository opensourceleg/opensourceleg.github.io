import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock, Sparkles } from "lucide-react";

export default function Electronics() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Open-Source Leg{" "}
            <span className="font-bold italic">Electronics</span>
          </>
        }
        description="RPi breakout, signal conditioning, sensing, and control-ready electronics that complement the Open-Source Leg hardware and software stacks."
        primaryButton={{
          href: "#modules",
          text: "Explore Electronics",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        middleButton={{
          href: "https://available-inventions.umich.edu/product/osl-electronics",
          text: "Purchase at UM",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank"
        }}
        secondaryButton={{
          text: "Tutorials (coming soon)",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
          disabled: true
        }}
      />

      {/* Electronics Video Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <video 
            className="w-full rounded-2xl shadow-2xl border-2 border-black"
            autoPlay
            muted
            loop
            preload="metadata"
          >
            <source src="/videos/opensourceleg-software.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-base text-gray-600 leading-relaxed text-justify">
            The electronics component of the Open-Source Leg ecosystem provides plug-and-play functionality to fully leverage the project. Our flagship embedded system is an interface board that breaks out the functionality of the Raspberry Pi Compute Module 5 in a convenient, compact, low-cost form factor. The RPi CM is smaller and lower cost than the full-size Raspberry Pi, but requires an interface circuit board to enable electrical connections. Our RPi CM interface board snaps onto the RPi Compute Module and provides separate connections for IMU sensing, power management, data storage, CAN, and more. When used with Robot-CI, the OSL Python SDK, and the OSL hardware, researchers can spend their time where it is needed—doing the research.
          </p>
        </div>
      </section>

      {/* Board Documentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="modules">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              Available{" "}
              <span className="font-medium italic">boards</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start with the DAQ board today. More boards will appear here as they roll out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
            <div className="bg-[var(--black)] border border-black rounded-2xl p-6 shadow-2xl flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Data Acquisition</h3>
                <p className="text-white/80 leading-relaxed">
                  A Data Acquisition System (DAQ) to collect multi-axis load cell data for the Open Source Leg, a robotic prosthetic hardware and software platform.
                </p>
                <br />
                <br />
                <br />
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-white">
                  <Image
                    src="/downloads/DAQ - Front.png"
                    alt="Open-Source Leg DAQ board"
                    width={1200}
                    height={700}
                    className="h-auto w-auto max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  href="/electronics/daq"
                  className="w-full sm:w-auto bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  View DAQ details
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-[var(--black)] border border-black rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">RPi CM5 Interface</h3>
                <p className="text-white/80 leading-relaxed">
                  The Interface Board is a carrier board for the Raspberry Pi Compute Module 5 (RPi CM5) that provides power input, safety, and standardized I/O connectors for fast, consistent integration across the Open-Source Leg stack.
                </p>
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-white">
                  <Image
                    src="/downloads/Interface Board - Front.png"
                    alt="Interface board front view"
                    width={1200}
                    height={700}
                    className="h-auto w-auto max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  href="/electronics/interface-board"
                  className="w-full sm:w-auto bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  View interface details
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white border border-dashed border-black/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Future electronics</h3>
                <p className="text-gray-700 leading-relaxed">
                  Expansion boards for specific sensing, actuators, and more applications
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 text-[var(--light-blue)]" />
                    <span>Planned docs for drivers, power, and expansion boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 mt-0.5 text-[var(--light-green)]" />
                    <span>Over time, new boards and functionality will be released, driven by the OSL community</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  disabled
                  variant="outline"
                  className="w-full sm:w-auto text-black border-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  Coming soon
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

