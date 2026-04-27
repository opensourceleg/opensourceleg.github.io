"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Play, CheckCircle, Clock, Wrench, Package, ExternalLink, Eye, Settings } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { tutorialSections } from "@/lib/hardware/hardware-tutorials";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

type TutorialProgress = {
  [tutorialId: string]: {
    completedSteps: number;
    totalSteps: number;
    currentStep: number;
  };
};

export default function TutorialOverview() {
  const params = useParams();
  const tutorialId = params.tutorialId as string;
  const [tutorialProgress, setTutorialProgress] = useState<TutorialProgress>({});

  const tutorial = tutorialSections[tutorialId as keyof typeof tutorialSections];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("osl-tutorial-progress");
    if (savedProgress) {
      setTutorialProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    if (Object.keys(tutorialProgress).length > 0) {
      localStorage.setItem("osl-tutorial-progress", JSON.stringify(tutorialProgress));
    }
  }, [tutorialProgress]);

  if (!tutorial) {
    return (
      <div className="min-h-screen pt-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Tutorial Not Found</h1>
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

  const progress = tutorialProgress[tutorialId];
  const progressPercentage = progress ? Math.round((progress.completedSteps / progress.totalSteps) * 100) : 0;

  const getStepIcon = (stepIndex: number) => {
    if (progress && stepIndex < progress.completedSteps) {
      return <CheckCircle className="w-5 h-5 text-[var(--black)]" />;
    } else if (progress && stepIndex === progress.currentStep) {
      return <Play className="w-5 h-5 text-[var(--light-blue)]" />;
    } else {
      return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            <span className="font-bold italic">{tutorial.title}</span>
          </>
        }
        primaryButton={{
          href: "/hardware/tutorials",
          text: "Back to Tutorials",
          icon: <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />,     
        }}
        secondaryButton={{
          href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
          target: "_blank",
          text: "View on Onshape",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
        description={tutorial.description}
        className="pb-8"
      />

      <div className="py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="max-w-6xl mx-auto">
          {/* Tutorial Info */}
          <div className="bg-white rounded-lg border border-black p-6 mb-8">
            <div className="flex flex-wrap w-full justify-between gap-4 mb-4">
              <div className="flex flex-row gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {tutorial.estimatedTime}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  {tutorial.steps.length} steps
                </div>
              </div>
              <span className="text-gray-900 font-bold italic">{progressPercentage}%</span>
            </div>

            {progress && (
              <div className="mb-4 py-2">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[var(--light-blue)] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {progress.completedSteps} of {progress.totalSteps} steps completed
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-between">
              <Link
                href={`/hardware/tutorials/${tutorialId}/0`}
                className="bg-[var(--light-blue)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-6 py-3 font-medium transition-colors"
              >
                {progress && progress.completedSteps > 0 ? "Continue Tutorial" : "Start Tutorial"}
              </Link>
              {progress && progress.currentStep > 0 && (
                <Link
                  href={`/hardware/tutorials/${tutorialId}/${progress.currentStep}`}
                  className="text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-6 py-3 font-medium transition-colors"
                >
                  Go to Step {progress.currentStep + 1}
                </Link>
              )}
            </div>
          </div>

          {/* Steps List */}
          <div className="bg-white/80 p-6 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-black">
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead className="font-semibold text-gray-900 w-12">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-16">#</TableHead>
                  <TableHead className="font-semibold text-gray-900">Step</TableHead>
                  <TableHead className="font-semibold text-gray-900">Requirements</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center w-24">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutorial.steps.map((step, index) => (
                  <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="text-center">
                      {getStepIcon(index)}
                    </TableCell>
                    <TableCell className="text-center font-medium text-gray-900">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-gray-900">
                            {step.title}
                          </h3>
                          {progress && index < progress.completedSteps && (
                            <span className="px-2 py-1 bg-[var(--light-green)] text-[var(--black)] text-xs rounded-md border border-black">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {step.partsRequired.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {step.partsRequired.length} parts
                          </div>
                        )}
                        {step.toolsRequired.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Wrench className="w-4 h-4" />
                            {step.toolsRequired.length} tools
                          </div>
                        )}
                        {step.instructions.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Settings className="w-4 h-4" />
                            {step.instructions.length} steps
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/hardware/tutorials/${tutorialId}/${index}`}
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 hover:border-gray-400 rounded-lg p-2 text-sm font-medium transition-colors inline-block"
                        title={progress && index < progress.completedSteps ? "Review Step" : "Start Step"}
                      >
                        {progress && index < progress.completedSteps ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
} 