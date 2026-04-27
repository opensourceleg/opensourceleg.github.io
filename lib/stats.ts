export interface StatsPanel {
    id: string
    title: string
    href: string
    value: number
    trend: "up" | "down"
    trendValue: number

    description: string
  }

export const statsPanels: StatsPanel[] = [
    {
        id: "robot-ci",
        title: "Robot CI",
        href: "https://github.com/neurobionics/robot-ci",
        value: 359,
        trend: "up",
        trendValue: 16,
        description: "Number of repository forks",
    },    
    {
      id: "osl-pypi",
      title: "opensourceleg",
      href: "https://pypi.org/project/opensourceleg/",
      value: 42840,
      trend: "up",
      trendValue: 31,
      description: "Number of downloads from PyPI",
    },
    {
      id: "osl-cad",
      title: "CAD on Onshape",
      href: "https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4",
      value: 37,
      trend: "up",
      trendValue: 94,
      description: "Number of copies of the CAD file",
    },
    {
        id: "opensourceleg.org",
        title: "opensourceleg.org",
        href: "https://opensourceleg.org",
        value: 16208,
        trend: "up",
        trendValue: 19,
        description: "Number of website visitors",
    },
]