import { tutorialSections } from "@/lib/hardware/hardware-tutorials";

export async function generateStaticParams() {
  const params = [];
  
  for (const [tutorialId, tutorial] of Object.entries(tutorialSections)) {
    for (let stepId = 0; stepId < tutorial.steps.length; stepId++) {
      params.push({
        tutorialId,
        stepId: stepId.toString(),
      });
    }
  }
  
  return params;
}

export default function StepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 