import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ControllersPageClient } from "./controllers-client"
import { controllers } from "@/lib/research/controllers"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const metadata = {
  title: "Research Controllers - OpenSourceLeg",
  description: "Downloadable controllers for the Open-Source Leg platform. Free, safe, and ready-to-use controllers created by and for our community.",
}

export default async function ControllersPage() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Downloadable{" "}
            <span className="font-bold italic">Controllers</span>
          </>
        }
        description="Free to download, safe, and ready-to-use controllers created by and for our community"
        primaryButton={{
          href: "/software",
          text: "View Software",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
        secondaryButton={{
          href: "mailto:opensourceleg@gmail.com",
          text: "Contact Us",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
      />

      {/* Controllers Section */}
      <div id="controllers-section" className="py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ControllersPageClient controllers={controllers} />
        </div>
      </div>

      {/* Join Controller Community Section */}
      <div className="bg-[var(--black)] py-16 sm:py-20 px-4 sm:px-6 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                <span className="font-medium italic text-[var(--light-green)]">Share</span>{" "}your controller!
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Developed a controller for the Open-Source Leg?  
                Share your work with the community to help advance the field of prosthetic research.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  href="/software"
                  variant="outline"
                  className="bg-[var(--light-green)] text-black border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Software <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  href="https://opensourceleg.discourse.group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="bg-transparent text-white border border-white hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <Image
                src="/research/controllers.webp"
                alt="Controllers in development"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg border border-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}