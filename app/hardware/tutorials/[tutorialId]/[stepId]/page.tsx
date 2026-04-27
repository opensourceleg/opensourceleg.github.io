"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Package, Wrench, AlertTriangle, Settings } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { tutorialSections } from "@/lib/hardware/hardware-tutorials";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

type TutorialProgress = {
  [tutorialId: string]: {
    completedSteps: number;
    totalSteps: number;
    currentStep: number;
  };
};

type PartWithOptionalUrl = {
  name: string;
  quantity: number;
  url?: string;
};

type ScrewWithOptionalUrl = {
  name: string;
  quantity: number;
  url?: string;
};

export default function TutorialStep() {
  const params = useParams();
  const router = useRouter();
  const tutorialId = params.tutorialId as string;
  const stepId = parseInt(params.stepId as string);
  const [tutorialProgress, setTutorialProgress] = useState<TutorialProgress>({});
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  const tutorial = tutorialSections[tutorialId as keyof typeof tutorialSections];
  const step = tutorial?.steps[stepId];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("osl-tutorial-progress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setTutorialProgress(progress);
      setIsStepCompleted(progress[tutorialId]?.completedSteps > stepId);
    }
  }, [tutorialId, stepId]);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    if (Object.keys(tutorialProgress).length > 0) {
      localStorage.setItem("osl-tutorial-progress", JSON.stringify(tutorialProgress));
    }
  }, [tutorialProgress]);

  const markStepCompleted = () => {
    setTutorialProgress(prev => ({
      ...prev,
      [tutorialId]: {
        ...prev[tutorialId],
        completedSteps: Math.max(prev[tutorialId]?.completedSteps || 0, stepId + 1),
        currentStep: Math.min(stepId + 1, tutorial.steps.length - 1),
        totalSteps: tutorial.steps.length,
      }
    }));
    setIsStepCompleted(true);
  };

  const navigateToStep = (newStepId: number) => {
    router.push(`/hardware/tutorials/${tutorialId}/${newStepId}`);
  };

  if (!tutorial || !step) {
    return (
      <div className="min-h-screen pt-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Step Not Found</h1>
          <Link
            href="/hardware/tutorials"
            className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors"
          >
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            {tutorial.title}{" "}
            <span className="font-bold italic">Step {stepId + 1}</span>
          </>
        }
        primaryButton={{
          href: `/hardware/tutorials/${tutorialId}`,
          text: `Back to ${tutorial.title}`,
          icon: <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />,     
        }}
        description={step.title}
        className="pb-8"
      />

      <div className="py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="max-w-6xl mx-auto">
          {/* Video Section */}
          {step.videoUrl && (
            <div className="rounded-lg border border-black shadow-xl mb-8">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={step.videoUrl}
                  title={`${step.title} Video Tutorial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="grid gap-0 border border-black rounded-lg overflow-hidden">
            {/* Parts Required */}
            {step.partsRequired.length > 0 && (
              <Accordion type="single" collapsible className="w-full overflow-hidden">
                <AccordionItem value="parts" className="">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      <h2 className="text-xl font-medium text-gray-900">Parts Required</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-transparent">
                          <TableHead className="font-semibold text-gray-900">Part Name</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">Quantity</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center w-16">Link</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step.partsRequired.map((part, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-900">{part.name}</TableCell>
                            <TableCell className="text-center text-gray-700">{part.quantity}</TableCell>
                            <TableCell className="text-center">
                              {(part as PartWithOptionalUrl).url && (
                                <Link
                                  href={(part as PartWithOptionalUrl).url!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 hover:border-gray-400 rounded-lg p-2 text-sm font-medium transition-colors inline-block"
                                  title="View Part"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Tools Required */}
            {step.toolsRequired.length > 0 && (
              <Accordion type="single" collapsible className="w-full overflow-hidden">
                <AccordionItem value="tools" className="">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-gray-600" />
                      <h2 className="text-xl font-medium text-gray-900">Tools Required</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-transparent">
                          <TableHead className="font-semibold text-gray-900">Tool Name</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step.toolsRequired.map((tool, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-900">
                              {typeof tool === 'string' ? tool : tool.name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Screws Required */}
            {step.screwsRequired.length > 0 && (
              <Accordion type="single" collapsible className="w-full overflow-hidden">
                <AccordionItem value="screws" className="">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      <h2 className="text-xl font-medium text-gray-900">Screws Required</h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-transparent">
                          <TableHead className="font-semibold text-gray-900">Screw Name</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">Quantity</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center w-16">Link</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step.screwsRequired.map((screw, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-900">{screw.name}</TableCell>
                            <TableCell className="text-center text-gray-700">{screw.quantity}</TableCell>
                            <TableCell className="text-center">
                              {(screw as ScrewWithOptionalUrl).url && (
                                <Link
                                  href={(screw as ScrewWithOptionalUrl).url!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 hover:border-gray-400 rounded-lg p-2 text-sm font-medium transition-colors inline-block"
                                  title="View Screw"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          {/* Instructions */}
          <div className="rounded-lg border border-black p-6 mt-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Instructions</h2>
            </div>
            <div className="space-y-2">
              {step.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 p-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[var(--light-green)] text-black rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {step.notes && step.notes.length > 0 && (
            <div className="border border-black rounded-lg p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-medium text-gray-900">Important Notes</h2>
              </div>
              <div className="space-y-2">
                {step.notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3 p-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-[var(--light-blue)] text-black rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-black leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              {stepId > 0 && (
                <button
                  onClick={() => navigateToStep(stepId - 1)}
                  className="flex items-center gap-2 text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-6 py-3 font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {!isStepCompleted ? (
                <button
                  onClick={markStepCompleted}
                  className="flex items-center gap-2 bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[var(--black)]">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Completed</span>
                </div>
              )}

              {stepId < tutorial.steps.length - 1 && (
                <button
                  onClick={() => navigateToStep(stepId + 1)}
                  className="flex items-center gap-2 bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors cursor-pointer"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 