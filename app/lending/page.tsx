import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import AvailabilityTimelineClient from "@/components/availability-timeline-client"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  HelpCircle,
  Shield,
  Truck,
  Wrench,
} from "lucide-react"

export const metadata = {
  title: "Lending Program - Open-Source Leg",
  description:
    "Borrow a fully built Open-Source Leg (OSL) for your research. Pilot lending, training, and support designed for labs, courses, and collaborative projects.",
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTBbZKmMVI_bm6FLVrXy16Q2g53F7EETvJtNcgZY3BOULHP70-HsUMduFtbqiAF2-g1hA1TiFd1vkh/pub?output=csv"

export default function LendingProgram() {
  return (
    <div className="min-h-screen pt-12">
      {/* HERO */}
      <PageHero
        title={
          <>
            OSL <span className="font-bold italic">Lending Program</span>
          </>
        }
        description="The OSL Lending Program is designed to lower barriers for researchers and instructors who want to study powered prosthetics with Open-Source Leg. Borrow a fully assembled system for medium-term research, teaching, or pilot studies, shipped, supported, and ready to run."
        primaryButton={{
          href: "#apply",
          text: "Apply to Borrow",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
        secondaryButton={{
          href: "#availability",
          text: "Check Availability",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
      />

      {/* HOW IT WORKS */}
      <section className="py-16 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              How it <span className="relative font-medium italic">Works
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-blue)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              A researcher-friendly flow from request to return: quick application, agreement, billed-if-damaged policy,
              and structured onboarding.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5" /> 1) Request</CardTitle>
                <CardDescription>Project + timeline</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Share goals, environment (bench/human subject), dates, and team experience.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> 2) Review</CardTitle>
                <CardDescription>Safety & readiness</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                We confirm bench safety readiness, basic robotics tooling, and IRB documentation (if human use) before allocating an available unit.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> 3) Agreement</CardTitle>
                <CardDescription>No deposit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Sign loan agreement. We don't take an upfront deposit; <b>damages are billed</b> per the agreement.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5" /> 4) Ship & Support</CardTitle>
                <CardDescription>Use & return</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                We ship in a padded case; you run tests with our remote support, then ship back with included labels.
              </CardContent>
            </Card>
          </div>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Learn more about requirements and prep on our forum.
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              href="https://opensourceleg.discourse.group/t/osl-lending-program-requirements/157"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-green)]"
            >
              Learn more about requirements and prep <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-16 px-4 sm:px-6" id="included">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              What's <span className="relative font-medium italic">Included
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-green)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
            <div className="bg-white rounded-2xl border border-black overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-gray-900">Item</TableHead>
                    <TableHead className="font-semibold text-gray-900">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>OSL knee/ankle assembly</TableCell>
                    <TableCell>Pre-tested, configured drivetrain</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Batteries + charger</TableCell>
                    <TableCell>Transport-compliant packaging</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Raspberry Pi image</TableCell>
                    <TableCell>Robot CI-built image, opensourceleg SDK</TableCell>
                  </TableRow>
                    <TableRow>
                      <TableCell>Flight case + cables</TableCell>
                      <TableCell>Outbound prepaid by OSL; return shipping covered by borrower (labels provided)</TableCell>
                    </TableRow>
                  <TableRow>
                    <TableCell>2x long aluminum pylons + pyramids</TableCell>
                    <TableCell>Adjustable-length pylons for configuring knee-to-ankle or socket length</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Manual pipe cutter</TableCell>
                    <TableCell>Cut aluminum pylons to length (per patient/specimen)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Not a clinical device. Human-subject testing requires local approvals and qualified supervision.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING & TERMS */}
      <section className="py-16 px-4 sm:px-6" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="mb-3">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900">
              Pricing & <span className="relative font-medium italic">Terms
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-green)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Deposit</CardTitle>
                <CardDescription>No upfront deposit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                We don't require a deposit. Per the loan agreement, <b>damages are billed</b> after inspection and parts/labor estimate.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5" /> Program fee</CardTitle>
                <CardDescription>TBD (pilot)</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                A modest program fee may apply to offset wear, QA, and support. Final details published with the pilot cohort.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5" /> Shipping</CardTitle>
                  <CardDescription>Outbound covered by OSL</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  OSL covers one-way outbound shipping to your site. Borrowers cover return shipping.
                </CardContent>
              </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5" /> Loan window</CardTitle>
                <CardDescription>Medium-term research blocks</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-4 space-y-2">
                  <li>Typical: <b>4-6 months</b> (extensions case-by-case)</li>
                  <li>Lead time for shipping & onboarding</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Readiness & safety</CardTitle>
                <CardDescription>Training and checks before ship</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <ul className="list-disc ml-4 space-y-2">
                  <li>Required remote onboarding session</li>
                  <li>Bench tests & verification logs</li>
                  <li>Human-subject use requires local IRB approval</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Enabled by support from the National Science Foundation (NSF).
          </p>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section className="py-16 px-4 sm:px-6" id="availability">
        <div className="max-w-6xl mx-auto">
          <div className="mb-3">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900">
              Availability <span className="relative font-medium italic">Timeline
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-blue)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next 12 months</CardTitle>
            </CardHeader>
            <CardContent>
              <AvailabilityTimelineClient sheetUrl={SHEET_CSV_URL} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SUPPORT & TRAINING */}
      <section className="py-16 px-4 sm:px-6" id="support">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              Support & <span className="relative font-medium italic">Training
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-green)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
            <p className="text-gray-700 mb-4">
              We guide teams through a simple support path from setup to day-to-day use:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2"><Wrench className="w-4 h-4 mt-1" /> Required remote onboarding session (setup, safety, run-through)</li>
              <li className="flex items-start gap-2"><Shield className="w-4 h-4 mt-1" /> Bench test checklists and verification logs before active testing</li>
              <li className="flex items-start gap-2"><FileText className="w-4 h-4 mt-1" /> Documentation and tutorials for assembly, SDK, and Robot CI workflows</li>
              <li className="flex items-start gap-2"><HelpCircle className="w-4 h-4 mt-1" /> Ongoing Q&A through the community forum</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <Button
                href="https://opensourceleg.discourse.group/t/osl-lending-program-requirements/157"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="text-black border-black hover:bg-[var(--light-green)]"
              >
                Start with Requirements <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="/hardware/tutorials" className="bg-[var(--black)] text-white border hover:bg-[var(--light-blue)] hover:text-black">
                Tutorials <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="https://neurobionics.github.io/opensourceleg/" target="_blank" rel="noopener noreferrer" variant="outline" className="text-black border-black hover:bg-[var(--light-green)]">
                Documentation <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border-2 border-black">
            <Image src="/software.png" alt="OSL software and SDK support" width={1100} height={800} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* APPLY / INTEREST */}
      <section id="apply" className="py-16 px-4 sm:px-6 bg-[var(--light-blue)]">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h3 className="text-3xl sm:text-4xl font-light">
            Apply to <span className="relative font-medium italic">Borrow
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-green)" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h3>
          <p className="text-white/90 max-w-3xl mx-auto mt-4">
            Tell us about your project, dates, and team. We'll review, confirm readiness, and schedule a unit.
          </p>
          <p className="text-white/80 max-w-3xl mx-auto mt-2 text-sm">
            * Human-subject projects are required to submit local IRB approval documentation before they can be approved.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href="https://docs.google.com/forms/d/e/1FAIpQLSeaq-64_nynM7e6XX0fHaXXhXb7DZ1eeHb83ZuQlaUZlv3rWw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[var(--light-blue)] border border-white hover:bg-[var(--light-green)] hover:text-black"
            >
              Open Application Form <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="mt-4 text-sm text-white/90">
            Have questions first? Ask on our{" "}
            <a
              href="https://opensourceleg.discourse.group/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Discourse forum
            </a>
            .
          </p>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6">
            Frequently <span className="relative font-medium italic">Asked
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-blue)" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span> Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            <Card>
              <CardHeader>
                <CardTitle>Can students apply?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Yes. Applications from student teams are welcome with a faculty advisor and a clear safety plan.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Human-subject testing?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Allowed only with local IRB approval and qualified supervision. We provide device-level safety checklists; your team is responsible for protocol compliance.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can we modify the hardware?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Non-destructive changes (e.g., sensors, external fixtures) are fine if documented and reversible. Contact us first for anything invasive.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens if it breaks?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Pause use and contact us. We will review the issue with you and determine the best path forward, including whether the hardware should be sent back for repairs.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900">
              Share your <span className="relative font-medium italic">Results
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 6 140 6 198 8" stroke="var(--light-green)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h3>
            <p className="text-gray-700">
              Publish your findings, add your paper to our research page, and swap controllers or experiment configs with the community.
            </p>
            <div className="flex gap-3">
              <Button href="/research" className="bg-[var(--black)] text-white border hover:bg-[var(--light-blue)] hover:text-black">
                Research & Publications <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="https://opensourceleg.discourse.group/" target="_blank" rel="noopener noreferrer" variant="outline" className="text-black border-black hover:bg-[var(--light-green)]">
                Join Forum <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border-2 border-black">
            <Image src="/community/iros.webp" alt="OSL community" width={1200} height={900} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>
    </div>
  )
}

