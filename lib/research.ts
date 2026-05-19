export interface ResearchPaper {
  id: string
  title: string
  image: string
  href: string
  rotation: string
  position: {
    top: string
    left: string
  }
  zIndex: string
}

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper1",
    title: "Paper 1",
    image: "/research/p1.png",
    href: "https://www.nature.com/articles/s41551-020-00619-3",
    rotation: "-rotate-8",
    position: {
      top: "-top-25",
      left: "left-2"
    },
    zIndex: "z-10"
  },
  {
    id: "paper2", 
    title: "Research Paper 2",
    image: "/research/p2.png",
    href: "https://ieeexplore.ieee.org/abstract/document/8488057",
    rotation: "-rotate-2",
    position: {
      top: "-top-6",
      left: "left-20"
    },
    zIndex: "z-20"
  },
  {
    id: "paper3",
    title: "Research Paper 3", 
    image: "/research/p3.png",
    href: "https://ieeexplore.ieee.org/abstract/document/9807551",
    rotation: "rotate-6",
    position: {
      top: "top-10",
      left: "left-45"
    },
    zIndex: "z-30"
  },
  {
    id: "paper4",
    title: "Research Paper 4",
    image: "/research/p4.png",
    href: "https://ieeexplore.ieee.org/abstract/document/10807510",
    rotation: "rotate-7",
    position: {
      top: "top-30",
      left: "left-70"
    },
    zIndex: "z-40"
  }
] 