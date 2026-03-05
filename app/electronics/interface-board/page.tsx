import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight, Cpu, Plug, BookOpen } from "lucide-react";

export default function InterfaceBoard() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero
        title={
          <>
            Electronics{" "}
            <span className="font-bold italic">Interface Board</span>
          </>
        }
        description="Documentation and integration notes for the compute interface board in the Open-Source Leg stack."
        primaryButton={{
          href: "#overview",
          text: "View overview",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
        secondaryButton={{
          href: "/electronics/documentation",
          text: "Back to documentation",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
      />

      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              Compute{" "}
              <span className="font-medium italic">interface</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This page will host wiring references, port maps, and bring-up steps for the interface board. More detail
              will land as the documentation is finalized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[var(--light-blue)]" />
                <h3 className="text-lg font-semibold text-gray-900">Board overview</h3>
              </div>
              <p className="text-sm text-gray-600">
                Connector map, signal naming, and quick reference sheets for the compute carrier.
              </p>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Plug className="w-5 h-5 text-[var(--light-green)]" />
                <h3 className="text-lg font-semibold text-gray-900">Wiring guidance</h3>
              </div>
              <p className="text-sm text-gray-600">
                Power and IO cabling notes to align with DAQ, sensors, and the compute stack.
              </p>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--light-blue)]" />
                <h3 className="text-lg font-semibold text-gray-900">Bring-up checklist</h3>
              </div>
              <p className="text-sm text-gray-600">
                Step-by-step validation and test checklist for first power-on.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              href="https://opensourceleg.discourse.group/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
            >
              Request documentation updates
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
