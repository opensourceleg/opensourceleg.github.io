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
          href: "https://available-inventions.umich.edu/product/osl-electronics--interface-pcb-for-rpi-cm-5",
          target: "_blank",
          text: "Purchase at UM",
          icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />,
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
