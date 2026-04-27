import { Button } from "@/components/ui/button"
import { Users, BookOpen, ExternalLink, Code, Building2, MapPin, ArrowDown, Settings, ArrowUpRight, ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { toolPanels } from "@/lib/assets"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { team } from "@/lib/team"

export default function About() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            About the{" "}
            <span className="font-bold italic">Open-Source Leg</span>
          </>
        }
        description="A collaborative effort to lower the barrier to entry for researchers studying the control of robotic prosthetic legs"
        primaryButton={{
          href: "#team-section",
          text: "View Team",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        secondaryButton={{
          href: "mailto:opensourceleg@gmail.com",
          text: "Contact Us",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
          target: "_blank"
        }}
      />      

      {/* Project Overview */}
      <div className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image 
              src="/make.webp" 
              alt="Research lab with robotic leg systems" 
              width={600}
              height={400}
              className=" border-3 border-[var(--white)] rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light mb-6">
              The{" "}
              <span className="relative text-[var(--light-green)] italic font-medium">
                Problem
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--white)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-white leading-relaxed text-justify">
              Research groups focused on prosthetic control algorithms were each developing their own robotic leg systems in isolation, making it nearly 
              impossible to compare control strategies, replicate findings, or build upon each other&apos;s work.
              This fragmentation was preventing controls researchers from focusing on their core expertise. 
              Each custom hardware development required <span className="font-bold text-xl italic">$300k+</span> in funding 
              and years of dedicated work from multiple PhD researchers, forcing controls-focused labs to spend resources on hardware engineering rather than advancing control algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Our Solution */}
      <div className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Our{" "}
              <span className="relative font-medium italic">
                Solution
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto">
              An end-to-end open-source platform that provides researchers worldwide with standardized 
              hardware designs, software libraries, electronics, and comprehensive documentation to ease the development
              of state-of-the-art prosthetic control algorithms, ultimately improving the lives of people with disabilities.
            </p>
          </div>

          {/* Tool panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {toolPanels.map((tool) => {
              const IconComponent = tool.icon
              return (
                <a 
                  key={tool.id}
                  href={tool.href}
                  target="_blank"
                  className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-64 sm:h-80 flex flex-col justify-between border border-[var(--black)] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-center relative">
                    <IconComponent 
                      className="w-16 h-16 text-[var(--black)] group-hover:scale-110 group-hover:text-[var(--light-blue)] transition-transform duration-300" 
                      strokeWidth={1.0}
                    />
                    <div className="absolute top-1/2 left-1/2 transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300">
                      <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                        <Image 
                          src={tool.logo}
                          alt={`${tool.title} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-md:hidden">{tool.description}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* NSF Support */}
      <div className="bg-[var(--black)] max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 flex flex-col gap-3 sm:gap-4 justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              Backed by the{" "}
              <span className="relative text-[var(--light-blue)] italic font-medium">
                NSF
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-[var(--white)] leading-relaxed mb-6 sm:mb-8 text-justify">
              The Open-Source Leg project has been continuously supported by the National Science Foundation (NSF) through multiple grant programs, 
              enabling sustained development and community growth over seven years.
            </p>
          </div>

          {/* Right Content - Timeline Image */}
          <div className="lg:col-span-3 relative w-full h-64 sm:h-80 lg:h-96 bg-white rounded-xl sm:rounded-2xl overflow-hidden mt-8 lg:mt-0 p-4">
            <Image 
              src="/nsf-timeline.png" 
              alt="NSF funding timeline showing continuous support over seven years" 
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Our{" "}
              <span className="relative font-medium italic">
                Community
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our platform is actively used by researchers, engineers, students, and institutions worldwide, 
              fostering collaboration and advancing prosthetics research globally.
            </p>
          </div>

          {/* Map */}
          <div className="max-w-6xl mx-auto flex justify-center mb-12">
            <Image 
              src="/map.webp" 
              alt="Map of countries using the Open-Source Leg" 
              width={800}
              height={600}
              className="w-1/2 h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Research Institutions
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  28+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="/research" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    View Research →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Universities worldwide using OSL
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Active Contributors
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  20+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="https://github.com/neurobionics/opensourceleg" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    View Contributors →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Researchers, engineers & developers
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card bg-[var(--black)] text-white border-gray-700">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-300 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Countries
                </CardDescription>
                <CardTitle className="py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]">
                  18+
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-xs sm:text-sm pt-2">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <a href="https://opensourceleg.discourse.group/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--light-blue)] transition-colors">
                    Global Reach →
                  </a>
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Countries using the platform
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>


       {/* Governance Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto flex flex-col gap-8">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12 text-left">
             <span className="relative font-medium italic">
               Governance
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
             </span>
           </h2>
           
           <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-start">
             {/* Left Content */}
             <div className="space-y-6 flex flex-col justify-between h-full">
               <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
                 Our project operates under a <span className="font-bold italic">BDFL</span> model with <span className="font-bold">Prof. Elliott Rouse</span> serving as the principal investigator, supported by a Governance Advisory Board comprising esteemed professors and directors from research groups that contributed during the project&apos;s foundational phase.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                 <Button
                   href="http://oss-watch.ac.uk/resources/benevolentdictatorgovernancemodel"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                   Read More
                 </Button>
                 <Button
                   href="mailto:opensourceleg@gmail.com"
                   className="bg-transparent text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                   Contact Team
                 </Button>
               </div>
             </div>
             
             {/* Right Content - Image */}
             <div>
               <Image 
                 src="/governance.webp" 
                 alt="Research lab with robotic leg systems" 
                 width={600}
                 height={400}
                 className="border-3 border-[var(--black)] rounded-lg shadow-2xl w-full h-auto"
               />
             </div>
           </div>
           
           {/* Full-width bottom content */}
           <div className="mt-8">
             <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
               This structure balances focused leadership with collaborative decision-making, ensuring both efficiency and inclusivity in our development process. While the BDFL model provides clear direction and consistent vision, we distribute core responsibilities among key community members to minimize dependency on single leadership and foster project resilience. Through biannual board meetings, transparent communication channels, and active community engagement, we maintain alignment with our original goals while adapting to new challenges and opportunities.
             </p>
           </div>
         </div>
       </div>

        {/* Code of Conduct Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto flex flex-col gap-8">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12 text-right">
             <span className="relative font-medium italic">
               Code of Conduct
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
             </span>
           </h2>
           
           <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-start">
             {/* Left Content - Image */}
             <div>
               <Image 
                 src="/coc.jpg" 
                 alt="Research lab with robotic leg systems" 
                 width={600}
                 height={400}
                 className="border-3 border-[var(--black)] rounded-lg shadow-2xl w-full h-auto"
               />
             </div>
             
             {/* Right Content */}
             <div className="space-y-6 flex flex-col justify-between h-full">
               <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
                 We are committed to making participation in our project a <span className="font-bold italic">harassment-free experience for everyone</span>, regardless of age, disability, ethnicity, gender identity, experience level, education, nationality, race, religion, or sexual orientation. Our standards emphasize <span className="font-bold">welcoming and inclusive language</span>, respect for differing viewpoints, graceful acceptance of constructive criticism, and empathy towards community members.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                 <Button
                   href="https://www.contributor-covenant.org/version/1/4/code-of-conduct/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                   Read More
                 </Button>
                 <Button
                   href="mailto:opensourceleg@gmail.com?subject=Code%20of%20Conduct%20Report"
                   className="bg-transparent text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                 >
                   <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                   Report Issue
                 </Button>
               </div>
             </div>
           </div>
           
           {/* Full-width bottom content */}
           <div className="mt-8">
             <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-justify">
               Project maintainers are responsible for clarifying standards of acceptable behavior and taking appropriate corrective action in response to violations. Instances of unacceptable behavior may be reported by contacting the project team at <span className="font-bold">opensourceleg@gmail.com</span>. All complaints will be reviewed confidentially and investigated, resulting in responses deemed necessary and appropriate to the circumstances.
             </p>
           </div>
         </div>
       </div>

       {/* Licensing Section */}
       <div className="py-16 sm:py-20 px-4 sm:px-6">
         <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 sm:mb-16">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
               Open Source{" "}
               <span className="relative font-medium italic">
                 Licensing
                 <svg 
                   className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                   viewBox="0 0 200 12" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path 
                     d="M2 10C60 6 140 6 198 8" 
                     stroke="var(--light-green)" 
                     strokeWidth="6" 
                     strokeLinecap="round"
                     fill="none"
                   />
                 </svg>
               </span>
             </h2>
             <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
               All components of the Open-Source Leg are released under carefully chosen open-source licenses that balance 
               accessibility with practical adoption. While our licenses provide commercial flexibility, we highly encourage 
               sharing improvements to strengthen the community.
             </p>
           </div>

           <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
             {/* Software License */}
             <div className="bg-white rounded-2xl p-8 border border-black">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center">
                   <Code className="w-8 h-8 text-[var(--black)] mr-3" />
                   <h3 className="text-xl font-semibold text-gray-900">Software</h3>
                 </div>
                 <h4 className="font-bold text-2xl text-gray-900 italic">LGPL v2.1</h4>
               </div>
                <div className="mb-6">
                  <p className="text-base text-gray-600 mb-4">
                    User-focused weak copyleft license that protects software freedom while allowing commercial applications.
                  </p>
                </div>
                                <div className="space-y-3 mb-6">
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Free to use for any purpose</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Build commercial software using our libraries</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Modifications to OSL software must remain LGPL</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Clear separation between OSL and your application</p>
                   </div>
                 </div>

                 <div className="flex justify-center mt-12">
                  <Button
                    href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[var(--light-blue)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    Read Full License
                  </Button>
                 </div>
             </div>

             {/* Hardware License */}
             <div className="bg-white rounded-2xl p-8 border border-black">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center">
                   <Settings className="w-8 h-8 text-[var(--black)] mr-3" />
                   <h3 className="text-xl font-semibold text-gray-900">Hardware</h3>
                 </div>
                 <h4 className="font-bold text-2xl text-gray-900 italic">CERN-OHL-P v2.0</h4>
               </div>
               <div className="mb-6">
                 <p className="text-base text-gray-600 mb-4">
                   Permissive open hardware license providing flexibility for commercial use without sharing obligations.
                 </p>
               </div>
                                <div className="space-y-3 mb-6">
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Free to use, modify, and manufacture</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Commercial distribution without sharing requirements</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Keep acknowledgments and disclaimers intact</p>
                   </div>
                   <div className="flex items-start gap-2">
                     <div className="w-2 h-2 bg-[var(--light-green)] rounded-full mt-2 flex-shrink-0"></div>
                     <p className="text-base text-gray-700">Clearly identify and document modifications</p>
                   </div>
                 </div>
                 <div className="flex justify-center mt-12">
                  <Button
                    href="https://ohwr.org/cern_ohl_p_v2.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[var(--light-blue)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    Read Full License
                  </Button>
                 </div>
             </div>
           </div>

         </div>
       </div>

      {/* Meet the Team */}
      <div id="team-section" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Meet the{" "}
              <span className="relative font-medium italic">
                Team
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our diverse team of researchers, engineers, and students from around the world collaborates 
              to advance prosthetics technology and make it accessible to everyone.
            </p>
          </div>

          {/* Core Team */}
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.slice(0, 4).map((member, index) => {
                const CardContent = (
                  <>
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h4 className="font-semibold mb-2 text-lg">{member.name}</h4>
                      <p className="text-[var(--light-green)] font-medium mb-1">{member.role}</p>
                      {member.title && (
                        <p className="text-sm text-gray-200 mb-1">{member.title}</p>
                      )}
                      <p className="text-sm text-gray-300">{member.affliation}</p>
                    </div>
                  </>
                );

                if (member.profileUrl) {
                  return (
                    <a
                      key={index}
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative rounded-xl border-2 border-black hover:border-[6px] hover:border-[var(--light-blue)] overflow-hidden aspect-[3/4] group hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      {CardContent}
                    </a>
                  );
                }

                return (
                  <div key={index} className="relative rounded-xl border-2 border-black hover:border-[6px] hover:border-[var(--light-blue)] overflow-hidden aspect-[3/4] group hover:scale-105 transition-all duration-300">
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contributors */}
          <div>
              <h3 className="text-2xl sm:text-3xl text-center mb-12">Our Amazing <span className="relative font-bold italic">
               Contributors
               <svg 
                 className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                 viewBox="0 0 200 12" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path 
                   d="M2 10C60 6 140 6 198 8" 
                   stroke="var(--light-green)" 
                   strokeWidth="6" 
                   strokeLinecap="round"
                   fill="none"
                 />
               </svg>
             </span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {team.slice(4).map((member, index) => {
                const CardContent = (
                  <>
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-semibold mb-1 text-sm">{member.name}</h4>
                      {member.title && (
                        <p className="text-xs text-gray-200 mb-1">{member.title}</p>
                      )}
                      <p className="text-xs text-gray-300">{member.affliation}</p>
                    </div>
                  </>
                );

                if (member.profileUrl) {
                  return (
                    <a
                      key={index}
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative rounded-lg border-2 border-black hover:border-[6px] hover:border-[var(--light-blue)] overflow-hidden aspect-[3/4] group hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      {CardContent}
                    </a>
                  );
                }

                return (
                  <div key={index} className="relative rounded-lg border-2 border-black hover:border-[6px] hover:border-[var(--light-blue)] overflow-hidden aspect-[3/4] group hover:scale-105 transition-all duration-300">
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

        {/* Community Section */}
        <div className="bg-[var(--light-blue)] py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                  <span className="relative font-medium italic">
                    Join
                    <svg 
                      className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                      viewBox="0 0 200 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M2 10C60 6 140 6 198 8" 
                        stroke="var(--light-green)" 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span> the team!
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  All kinds of contributions are welcome and much appreciated! Whether you&apos;re fixing bugs, adding features, improving documentation, or sharing your research — we&apos;d love to have you on board.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    href="https://neurobionics.github.io/opensourceleg/contributing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[var(--light-blue)] border border-white hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    Contributing <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button
                    href="https://github.com/neurobionics/opensourceleg"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                  >
                    View on GitHub <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </div>
              </div>


              {/* Right Content - Image */}
              <div className="relative">
                <Image
                  src="/contribute.webp"
                  alt="Contributing to the Open-Source Leg"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg border border-white"
                />
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}