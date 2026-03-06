import { PageHero } from "@/components/page-hero";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import InterfaceBoardContent from "@/components/interface-board/interface-board-content";

export default function InterfaceBoard() {
  return (
    <div className="min-h-screen pt-12">
      <PageHero
        title={
          <>
            RPi CM5 <span className="font-bold italic">interface board</span>
          </>
        }
        description="Documentation and integration notes for the RPi CM5 interface board in the Open-Source Leg stack."
        primaryButton={{
          href: "#pcb-layout",
          text: "View board layout",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
        middleButton={{
          text: "Purchase at UM (coming soon)",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
          disabled: true,
        }}
        secondaryButton={{
          href: "/electronics#modules",
          text: "Back to electronics",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
        }}
      />

      <InterfaceBoardContent />
    </div>
  );
}
