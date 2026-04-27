import { LucideIcon, Move3DIcon, ComputerIcon, Code2, CircuitBoard } from "lucide-react"

export interface ToolPanel {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  logo: string
}

export const toolPanels: ToolPanel[] = [
  {
    id: "hardware",
    title: "CAD",
    description: "Onshape CAD files, drawings, and bill of materials for our hardware",
    href: "/hardware",
    icon: Move3DIcon,
    logo: "/logo/other/onshape.webp",
  },
  {
    id: "robot-ci",
    title: "Robot CI", 
    description: "Build, test, and deploy operating systems for robots at scale",
    href: "https://github.com/neurobionics/robot-ci",
    icon: ComputerIcon,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    id: "opensourceleg",
    title: "Python API",
          description: "SDK for developing control algorithms for robotic hardware",
    href: "https://github.com/neurobionics/opensourceleg",
    icon: Code2,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    id: "electronics",
    title: "Electronics",
    description: "Turn-key electronics for building robotic hardware",
    href: "https://available-inventions.umich.edu/product/osl-electronics",
    icon: CircuitBoard,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg",
  },
] 