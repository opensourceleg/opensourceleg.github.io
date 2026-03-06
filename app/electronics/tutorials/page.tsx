import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Clock, ListChecks, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

export default function ElectronicsTutorials() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Electronics{" "}
            <span className="font-bold italic">Tutorials</span>
          </>
        }
        description="Guided setup, wiring, and validation steps for the Open-Source Leg electronics. The first tutorials land soon."
        secondaryButton={{
          href: "/electronics#modules",
          text: "Browse boards",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: undefined
        }}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="bg-[var(--light-blue)] text-white rounded-3xl border border-black shadow-2xl p-8 sm:p-10 space-y-5">
            <div className="flex items-center gap-3 text-sm uppercase tracking-wide">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">Coming soon</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">What we&apos;re preparing</h2>
            <p className="text-white/80 leading-relaxed">
              We&apos;re documenting the most requested workflows first. Expect concise, step-by-step guides with wiring photos and downloadable configs.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-5 h-5" />
                  <p className="text-lg font-semibold text-white">Early topics</p>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>First-time DAQ bring-up and health checks</li>
                  <li>Connecting encoders, load cells, and IMUs</li>
                  <li>Streaming data into the Python SDK</li>
                </ul>
              </div>
              <div className="bg-white/10 border border-white/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <p className="text-lg font-semibold text-white">What&apos;s next</p>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>Field validation checklists</li>
                  <li>Example logging notebooks</li>
                  <li>Templates for sharing data on the forum</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--light-green)] text-black border border-black hover:bg-white hover:text-black"
              >
                Follow updates
              </Button>
              <Button
                href="/electronics/daq"
                variant="outline"
                className="text-black border-black hover:bg-white hover:text-black"
              >
                View the DAQ
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-black rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">Community</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Want to help shape these guides?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Let us know which workflows you need most. Wiring photos, schematics, or logs are especially helpful.
              </p>
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
              >
                Share feedback
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="border border-black rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-600">
                <ListChecks className="w-4 h-4" />
                <span className="font-semibold">Roadmap</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Notification checklist</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;ll post updates in the forum and link them here when tutorials are published.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>DAQ bring-up guide</li>
                <li>Calibration and validation</li>
                <li>Data logging examples</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
