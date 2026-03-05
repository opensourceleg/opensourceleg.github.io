import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { ArrowDown, Cpu, Activity, Plug, Sparkles, ArrowUpRight, Clock, BookOpen } from "lucide-react";

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
        description="Signal conditioning, sensing, and control-ready electronics that complement the Open-Source Leg hardware and software stacks."
        primaryButton={{
          href: "#modules",
          text: "Explore Electronics",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        secondaryButton={{
          href: "/electronics/documentation",
          text: "View Documentation",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
      />

      {/* Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
                Built to{" "}
                <span className="relative font-medium italic">
                  bridge
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
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                hardware and software
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                The Open-Source Leg electronics provide the signal pathway between actuators, sensors, and the software stack. 
                They are designed for dependable data capture, clean wiring, and straightforward integration so you can focus on experimentation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[var(--black)] text-white rounded-2xl p-6 shadow-2xl border border-black space-y-3">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5" />
                  <p className="text-lg font-semibold">Purpose-built DAQ</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Capture synchronized joint, load, and inertial signals with a board designed for the Open-Source Leg.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl border border-black space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[var(--light-blue)]" />
                  <p className="text-lg font-semibold text-gray-900">Future-ready</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The electronics lineup will expand to include motor drivers, power, and sensing modules as the platform grows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Electronics Lineup */}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-border">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              Choose your{" "}
              <span className="font-medium italic">electronics</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start with the DAQ today and add more modules as they are released.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-black rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--light-blue)] text-black rounded-full px-3 py-1 text-xs font-semibold border border-black">
                    Available
                  </div>
                  <span className="text-sm text-gray-600">Documentation</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">DAQ Board Docs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Read the full DAQ guide with wiring, signals, and integration notes.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5" />
                    <span>Board overview, pinout, and wiring diagrams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plug className="w-4 h-4 mt-0.5" />
                    <span>Connector callouts for joints, load cells, IMUs, and accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5" />
                    <span>Sampling notes and SDK integration tips</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  href="/electronics/documentation"
                  className="w-full sm:w-auto bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  View documentation
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white border border-dashed border-black rounded-2xl p-6 shadow-inner flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold border border-black/50">
                    Coming soon
                  </div>
                  <span className="text-sm text-gray-600">More modules</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Future Electronics</h3>
                <p className="text-gray-600 leading-relaxed">
                  We&apos;re working on additional boards for power, communication, and sensing to extend the OSL ecosystem.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Cpu className="w-4 h-4 mt-0.5" />
                    <span>Motor drivers and conditioning hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5" />
                    <span>Additional sensor breakouts and experiment-specific add-ons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5" />
                    <span>Community-driven requests via the forum</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  href="https://opensourceleg.discourse.group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="w-full sm:w-auto text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  Suggest a module
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Preview */}
      <section id="tutorials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[var(--light-blue)] text-white rounded-3xl border border-black shadow-2xl p-10 sm:p-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3 text-sm uppercase tracking-wide">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Tutorials in progress</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                Electronics tutorials are coming soon
              </h3>
              <p className="text-white/80 leading-relaxed">
                Guided setup, wiring, and validation steps will land soon. We&apos;ll cover DAQ bring-up first and expand with each new module.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="/electronics/tutorials"
                className="bg-[var(--light-green)] text-black border border-black hover:bg-white hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
              >
                See what&apos;s planned
              </Button>
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="bg-white/10 text-white border border-white hover:bg-white hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
              >
                Join the discussion
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
