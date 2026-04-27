import { PageHero } from "@/components/page-hero";
import { ArrowDown, ExternalLink, Github, BookOpen, ArrowUpRight, Terminal, Settings, Package, Monitor, PackageIcon, Blocks, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RobotCISequenceDiagram from "@/components/robot-ci-sequence-diagram";
import OpenSourceLegArchitectureDiagram from "@/components/opensourceleg-architecture-diagram";

export default function Software() {
    return (
      <div className="min-h-screen pt-12">
        <PageHero 
          title={
            <>
              Open-Source Leg{" "}
              <span className="font-bold italic">Software</span>
            </>
          }
          description="Modular, extensible software stack for robotics research and development"
          primaryButton={{
            href: "#components",
            text: "View Components",
            icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          }}
          secondaryButton={{
            href: "https://neurobionics.github.io/opensourceleg/",
            text: "View Documentation",
            icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />,
            target: "_blank"
          }}
        />
        
        {/* Software Video Section */}
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
            
            {/* Text Content */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <p className="text-base text-gray-600 leading-relaxed text-justify">
              The Open-Source Leg software platform is designed to be modular and flexible to allow for easy integration with a wide variety of sensors and robotics frameworks.
                Built around a Raspberry Pi compute platform, our software stack includes Robot CI for automated OS builds and a comprehensive Python SDK with abstract interfaces 
                for device control. This ecosystem enables researchers to focus on their specific research questions rather than infrastructure setup.
              </p>
            </div>
          </div>
        </section>

        {/* Software Principles Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                Software{" "}
                <span className="relative font-medium italic">
                  Principles
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
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Our software development follows core principles that ensure consistency, reliability, and usability across 
                Robot CI and the Python SDK, providing researchers with powerful yet accessible tools.
              </p>
            </div>
            
            {/* Software Principles */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Open */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl text-[var(--white)] font-semibold flex items-center gap-2 justify-center">
                  Open
                  <Github className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Both Robot CI and our Python SDK are fully open source with permissive licensing. All code, documentation, 
                  and development processes are transparent and accessible. Researchers can inspect, modify, fork, and contribute 
                  to every aspect of our software stack, fostering collaborative innovation across the robotics community.
                </p>
              </div>
              
              {/* Modular */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--white)] flex items-center gap-2 justify-center">
                  Modular
                  <PackageIcon className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Our software is designed with clear separation of concerns. Robot CI handles OS provisioning independently, 
                  while the Python SDK provides discrete modules for actuators, sensors, and control logic. Each component 
                  can be used independently or combined seamlessly, allowing researchers to adopt only what they need.
                </p>
              </div>
              
              {/* Extensible */}
              <div className="bg-[var(--black)] border border-black rounded-2xl p-6 space-y-4 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--white)] flex items-center gap-2 justify-center">
                  Extensible
                  <Blocks className="w-5 h-5" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Built around abstract base classes and plugin architectures that encourage customization. Add new sensors, 
                  implement custom actuators, or extend Robot CI workflows without modifying core functionality. 
                  Our software is designed to grow with your research needs and evolving hardware requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Robot CI Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                <span className="relative font-medium italic">
                  Robot CI
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
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                  Whether you&apos;re a researcher working with the Open-Source Leg platform, a student working on course projects, or a hobbyist building your next robot, 
                  setting up and maintaining consistent development environments is a time-consuming challenge that takes focus away from what really matters
              </p>
            </div>

            {/* The Problem */}
            <div className="bg-transparent">
              {/* Problem Section Header */}
              <div className="text-right mb-12">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  <span className="font-medium italic">Challenges</span> we addressed
                </h3>
                <p className="text-gray-600 text-base">
                  These common development obstacles led us to create Robot CI
                </p>
              </div>
              
              {/* Pain Points Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-black shadow-xl relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Repetitive Setup</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Hours spent manually configuring each Raspberry Pi with the same packages, users, and network settings. 
                    Every new device means starting from scratch.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-black shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Environment Drift</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    &quot;It works on my Pi but not yours.&quot; Inconsistent environments lead to debugging nightmares 
                    and make collaboration difficult.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-black shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Onboarding Friction</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    New team members, students, or collaborators spend days just getting their development 
                    environment working before they can contribute.
                  </p>
                </div>
              </div>
            </div>

            {/* Sequence Diagram */}
            <div className="mb-12 flex flex-col gap-6 my-20">
              <h2 className="text-2xl font-light text-gray-900">Our <span className="font-medium italic">Solution</span></h2>
              <p className="text-gray-800 leading-relaxed mx-auto mb-4 text-base">
                  Define your entire development environment as code, build it automatically with GitHub Actions, 
                  and deploy consistent, reproducible systems in minutes instead of hours. Perfect for research labs, 
                  educational projects, hobby builds, and commercial robotics development.
              </p>
              <RobotCISequenceDiagram />
            </div>


            {/* Key Features */}
            <div className="my-16">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Settings className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Version-Controlled OS</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Track and manage your robot environment in code. Enable reproducible builds with GitHub Actions, 
                    easy rollbacks, and seamless collaboration across your research team.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Monitor className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Remote Development</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Optimized headless server images with automatic IP notifications via email. 
                    Develop remotely using VS Code without ever needing physical access to your robot.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Package className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Customizable Environment</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pre-install drivers, custom packages, and configure services automatically. 
                    Tailor the environment to your specific research needs without manual intervention.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Terminal className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Network Auto-Config</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Automatically connects to WiFi networks and establishes a fallback access point 
                    when no networks are available, ensuring continuous connectivity for development.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                href="https://github.com/neurobionics/robot-ci"
                target="_blank"
                className="bg-[var(--light-green)] text-black hover:bg-[var(--light-blue)] border border-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                Build Your Own Custom OS <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>    
            </div>        

          </div>
        </section>

        {/* Python SDK Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
                <span className="relative font-medium italic">
                  opensourceleg SDK
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
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                A comprehensive Python SDK that provides standardized interfaces for common actuators and sensors, 
                ready-to-use implementations for popular hardware components, and an extensible architecture for custom robotics applications.
              </p>
            </div>

            {/* What it Solves */}
            <div className="bg-transparent">
              {/* Problem Section Header */}
              <div className="text-right mb-12">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  <span className="font-medium italic">Challenges</span> we addressed
                </h3>
                <p className="text-gray-600 text-base">
                  These common development obstacles led us to create the OpenSourceLeg SDK
                </p>
              </div>
              
              {/* Pain Points Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-black shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Hardware Integration</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Each actuator and sensor requires custom drivers, communication protocols, and calibration procedures. 
                    Researchers spend weeks just getting hardware to talk to their code.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-black shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Inconsistent APIs</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Every component has its own API, units, and conventions. Switching between different sensors 
                    or actuators means rewriting significant portions of your control code.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-black shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Reinventing the Wheel</h4>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Common robotics tasks like real-time control loops, data logging, and safety monitoring 
                    are implemented from scratch for every project, leading to bugs and wasted time.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Overview */}
            <div className="mb-12 flex flex-col gap-6 text-left my-20">
              <h2 className="text-2xl font-light text-gray-900">Our <span className="font-medium italic">Solution</span></h2>
              <p className="text-gray-800 leading-relaxed mx-auto mb-4">
                The opensourceleg Python SDK provides a unified interface for robotics hardware, comprehensive utilities for 
                control and data collection, and extensive documentation with examples.
              </p>
              
              {/* Architecture Diagram */}
              <OpenSourceLegArchitectureDiagram />
            </div>

            {/* Key Features */}
            <div className="my-16">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Package className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Standardized Interfaces</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Consistent APIs across all actuators and sensors. Switch between different hardware components 
                    without changing your control code. All components follow the same patterns and conventions.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Settings className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Hardware Support</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ready-to-use implementations for Dephy actuators, AS5048B encoders, Lord Microstrain IMUs, 
                    and more. Each component includes comprehensive testing and documentation.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Terminal className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Control Utilities</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Built-in real-time control loops, finite state machines, compiled controller support, 
                    and safety monitoring. Everything you need for robust robotics control.
                  </p>
                </div>

                <div className="bg-white border border-black rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Monitor className="w-6 h-6 text-[var(--black)] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Data & Logging</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Comprehensive logging system with variable tracking, automatic CSV generation, 
                    and configurable output formats. Capture all the data you need for analysis.
                  </p>
                </div>
              </div>
            </div>


            <div className="flex justify-center">
              <Button 
                href="https://github.com/neurobionics/opensourceleg"
                target="_blank"
                className="bg-[var(--light-green)] text-black hover:bg-[var(--light-blue)] border border-black rounded-lg px-6 py-6 text-base flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                Get Started with the library <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>    
            </div>        

          </div>
        </section>

        {/* Community Driven Section */}
        <div className="py-16 sm:py-20 px-4 sm:px-6 bg-[var(--light-blue)] mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
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
                {" "}Driven
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto py-8">
                Our software is a community-driven effort, and we welcome contributions of all kinds! 
                Whether you&apos;re reporting bugs, adding features, improving documentation, or sharing your 
                research, every contribution helps advance robotics research for everyone.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  href="https://neurobionics.github.io/opensourceleg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[var(--light-blue)] border border-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Read Documentation <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  href="https://neurobionics.github.io/opensourceleg/contributing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Contributing Guidelines <Github className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  href="https://opensourceleg.discourse.group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
                >
                  Join Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }