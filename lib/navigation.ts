export interface NavigationItem {
  title: string
  href: string
  description?: string
  disabled?: boolean
  children?: NavigationItem[]
}

export interface NavigationDropdown {
  title: string
  items: NavigationItem[]
}

export interface NavigationSection {
  title: string
  href?: string
  type: 'link' | 'dropdown' | 'featured'
  items?: NavigationItem[]
  featured?: {
    title: string
    description: string
    href: string
  }
}

// Main navigation structure
export const navigationConfig: NavigationSection[] = [
  {
    title: "About",
    type: "link",
    href: "/about"
  },
  // TODO: Add this back once we have enough articles
  // {
  //   title: "Articles",
  //   type: "link",
  //   href: "/articles"
  // },
  {
    title: "Hardware",
    type: "featured",
    featured: {
      title: "Hardware",
      description: "Designed to be easy to manufacture, assemble, and repair",
      href: "/hardware"
    },
    items: [
      {
        title: "Downloads",
        href: "/hardware/downloads",
        description: "One stop shop for all things hardware"
      },
      {
        title: "Tutorials",
        href: "/hardware/tutorials",
        description: "Step by step guides to build our hardware"
      }
    ]
  },
  {
    title: "Software",
    type: "featured",
    featured: {
      title: "Software",
      description: "Designed to be easy to use, modify, and extend",
      href: "/software"
    },
    items: [
      {
        title: "API Documentation",
        href: "https://neurobionics.github.io/opensourceleg/",
        description: "Documentation for the opensourceleg SDK"
      },
      {
        title: "Tutorials",
        href: "#",
        description: "Coming soon",
        disabled: true
      }
    ]
  },
  {
    title: "Electronics",
    type: "featured",
    featured: {
      title: "Electronics",
      description: "Signal conditioning, sensing, and integrations",
      href: "/electronics"
    },
    items: [
      {
        title: "Interface Board",
        href: "/electronics/interface-board",
        description: "RPi CM5 interface board overview"
      },
      {
        title: "DAQ",
        href: "/electronics/daq",
        description: "Data acquisition board overview"
      },
      {
        title: "Tutorials",
        href: "#",
        description: "Coming soon"
      }
    ]
  },
  // {
  //   title: "Electronics",
  //   type: "featured",
  //   featured: {
  //     title: "Electronics",
  //     description: "Designed to be easy to use and reliable",
  //     href: "/electronics"
  //   },
  //   items: [
  //     {
  //       title: "Downloads",
  //       href: "/electronics/downloads",
  //       description: "One stop shop for all things electronics"
  //     },
  //     {
  //       title: "Tutorials",
  //       href: "/electronics/tutorials",
  //       description: "Step by step guides to use our electronics"
  //     }
  //   ]
  // },
  {
    title: "Research",
    type: "featured",
    featured: {
      title: "Research",
      description: "Research papers, presentations, and other resources",
      href: "/research"
    },
    items: [
      {
        title: "Downloadable Controllers",
        href: "/research/controllers",
        description: "Controllers to try out on the Open-Source Leg hardware"
      },
      {
        title: "Dataset",
        href: "#",
        description: "Coming soon"
      },
      {
        title: "Lending Program",
        href: "#",
        description: "Coming soon"
      }
    ]
  },
]


