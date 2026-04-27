import { tutorialSections } from "@/lib/hardware/hardware-tutorials";

export async function generateStaticParams() {
  return Object.keys(tutorialSections).map((tutorialId) => ({
    tutorialId,
  }));
}

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 