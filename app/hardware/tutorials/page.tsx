"use client";

import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle, Clock, AlertCircle, ArrowRight, PlayIcon, MessageCircle, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { tutorialSections } from "@/lib/hardware/hardware-tutorials";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TutorialProgress = {
  [tutorialId: string]: {
    completedSteps: number;
    totalSteps: number;
    currentStep: number;
  };
};

export default function Tutorials() {
  const [tutorialProgress, setTutorialProgress] = useState<TutorialProgress>({});

  useEffect(() => {
    // Load progress from localStorage on component mount
    const savedProgress = localStorage.getItem("osl-tutorial-progress");
    if (savedProgress) {
      setTutorialProgress(JSON.parse(savedProgress));
    } else {
      // Initialize progress for all tutorials
      const initialProgress: TutorialProgress = {};
      Object.keys(tutorialSections).forEach(tutorialId => {
        initialProgress[tutorialId] = {
          completedSteps: 0,
          totalSteps: tutorialSections[tutorialId as keyof typeof tutorialSections].steps.length,
          currentStep: 0,
        };
      });
      setTutorialProgress(initialProgress);
    }
  }, []);

  const getProgressPercentage = (tutorialId: string) => {
    const progress = tutorialProgress[tutorialId];
    if (!progress) return 0;
    return Math.round((progress.completedSteps / progress.totalSteps) * 100);
  };

  const getTotalProgress = () => {
    const totalSteps = Object.values(tutorialSections).reduce((acc, section) => acc + section.steps.length, 0);
    const completedSteps = Object.values(tutorialProgress).reduce((acc, progress) => acc + progress.completedSteps, 0);
    return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  };

  const getTotalCompletedSteps = () => {
    return Object.values(tutorialProgress).reduce((acc, progress) => acc + progress.completedSteps, 0);
  };

  const getTotalSteps = () => {
    return Object.values(tutorialSections).reduce((acc, section) => acc + section.steps.length, 0);
  };

  const getNextStep = () => {
    // Find the first tutorial that has incomplete steps
    for (const [tutorialId, progress] of Object.entries(tutorialProgress)) {
      if (progress.completedSteps < progress.totalSteps) {
        return {
          tutorialId,
          stepId: progress.currentStep,
          tutorial: tutorialSections[tutorialId as keyof typeof tutorialSections],
          step: tutorialSections[tutorialId as keyof typeof tutorialSections].steps[progress.currentStep],
        };
      }
    }
    return null;
  };

  const nextStep = getNextStep();

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Hardware{" "}
            <span className="font-bold italic">Tutorials</span>
          </>
        }
        description="Step-by-step assembly instructions for your Open-Source Leg system"
        secondaryButton={{
          href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
          target: "_blank",
          text: "View CAD on Onshape",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
      />

      {/* Overall Progress Section */}
      <div className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
          {/* Main Title */}
          <div className="text-center pb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
              <span className="relative font-medium italic">
                Continue
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
              {" "}Where You Left Off
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
              Progress is saved locally in your browser and device and it is not synced across different devices or browsers.
            </p>
          </div>

        
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-[var(--white)] rounded-lg shadow-md border border-black p-6 flex flex-col justify-between h-full">
              <h2 className="text-xl font-light mb-4 text-gray-900">
                Overall Progress
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[var(--black)] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getTotalProgress()}%` }}
                    />
                  </div>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {getTotalProgress()}%
                </span>
              </div>
              <p className="text-gray-600">
                {getTotalCompletedSteps()} of {getTotalSteps()} steps completed
              </p>
            </div>

            {/* Next Step Card */}
            {nextStep && (
              <div className="bg-[var(--white)] border border-black rounded-lg shadow-md p-6">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-1">
                    <p className="text-xl font-light mb-4 text-gray-900">
                      {nextStep.tutorial.title}: {nextStep.step.title}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/hardware/tutorials/${nextStep.tutorialId}/${nextStep.stepId}`}
                      className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors flex items-center gap-2 w-full justify-center"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Assembly{" "}
              <span className="relative font-medium italic">
              Tutorials
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
            <p className="text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto mb-8">
              Choose a tutorial below to start or continue building your Open-Source Leg
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(tutorialSections).map(([tutorialId, section]) => {
              const progress = tutorialProgress[tutorialId];
              const progressPercentage = getProgressPercentage(tutorialId);
              const isCompleted = progress && progress.completedSteps === progress.totalSteps;
              const isStarted = progress && progress.completedSteps > 0;
              
              return (
                <div key={tutorialId} className="bg-white rounded-lg border border-black p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-[var(--light-green)]" />
                      ) : isStarted ? (
                        <PlayIcon className="w-6 h-6 text-[var(--light-blue)]" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-gray-400" />
                      )}
                      <h3 className="text-xl font-medium text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {section.description}
                  </p>
                  
                  <div className="flex w-full justify-between gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex flex-row gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {section.estimatedTime}
                      </div>
                      <div>
                        {progress ? progress.totalSteps : section.steps.length} steps
                      </div>
                    </div>
                    <span className="text-gray-900 font-bold italic">{progressPercentage}%</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[var(--light-blue)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {progress ? progress.completedSteps : 0} of {progress ? progress.totalSteps : section.steps.length} steps completed
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      href={`/hardware/tutorials/${tutorialId}`}
                      className="flex-1 bg-[var(--black)] text-white border hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 py-3 text-center font-medium transition-colors"
                    >
                      {isCompleted ? "Review Tutorial" : isStarted ? "Continue" : "Start Tutorial"}
                    </Link>
                    {isStarted && !isCompleted && (
                      <Link
                        href={`/hardware/tutorials/${tutorialId}/${progress?.currentStep || 0}`}
                        className="text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-4 py-3 text-center font-medium transition-colors"
                      >
                        Step {(progress?.currentStep || 0) + 1}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

      {/* Contribute Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black">
              <span className="relative font-medium italic">
                Contribute
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
              {" "}to the Project
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-black/90 leading-relaxed max-w-3xl mx-auto py-8">
            If you have any suggestions or feedback to improve these tutorials, please share them on the forum or contact us directly.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-white hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Share on Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button
                href="mailto:opensourceleg@gmail.com"
                variant="outline"
                className="bg-transparent text-black border border-black hover:bg-[var(--light-blue)] hover:text-white hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Contact Us <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>          
        </div>
      </div>
    </div>
  );
}