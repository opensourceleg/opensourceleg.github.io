import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { BookOpen, Plug, Activity, Sparkles, ArrowUpRight, Clock, Cpu } from "lucide-react";

export default function ElectronicsDocumentation() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Electronics{" "}
            <span className="font-bold italic">Documentation</span>
          </>
        }
        description="Board-level references, wiring guides, and integration notes for the Open-Source Leg electronics."
        secondaryButton={{
          href: "/electronics/tutorials",
          text: "Tutorials (coming soon)",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              Pick a{" "}
              <span className="font-medium italic">board</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start with the DAQ board today. More boards will appear here as they roll out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-black rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--light-blue)] text-black rounded-full px-3 py-1 text-xs font-semibold border border-black">
                    Available
                  </div>
                  <span className="text-sm text-gray-600">DAQ Board</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Data Acquisition</h3>
                <p className="text-gray-600 leading-relaxed">
                  Full documentation for the DAQ: connectors, pinout, supported sensors, and software hooks.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5" />
                    <span>Board overview, pin map, and signaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plug className="w-4 h-4 mt-0.5" />
                    <span>Wiring guides for joints, load cells, IMUs, and accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5" />
                    <span>Sampling considerations plus SDK integration tips</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  href="/electronics/daq"
                  className="w-full sm:w-auto bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  Open DAQ docs
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--light-blue)] text-black rounded-full px-3 py-1 text-xs font-semibold border border-black">
                    Available
                  </div>
                  <span className="text-sm text-gray-600">Interface Board</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Compute Interface</h3>
                <p className="text-gray-600 leading-relaxed">
                  Interface board documentation for wiring, ports, and integration with the Open-Source Leg compute stack.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Cpu className="w-4 h-4 mt-0.5" />
                    <span>Compute carrier overview and port map</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plug className="w-4 h-4 mt-0.5" />
                    <span>Power, data, and IO wiring guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5" />
                    <span>Integration notes and bring-up checklist</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  href="/electronics/interface-board"
                  className="w-full sm:w-auto bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-base flex items-center justify-center gap-2"
                >
                  Open interface board docs
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
                  <span className="text-sm text-gray-600">Next boards</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Future hardware</h3>
                <p className="text-gray-600 leading-relaxed">
                  Power, motor driver, and sensing breakouts will be added as they are released.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5" />
                    <span>Planned docs for drivers, power, and expansion boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5" />
                    <span>Publish timelines and beta calls will be posted here</span>
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
                  Request a board doc
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
