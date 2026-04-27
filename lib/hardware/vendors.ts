// Vendor Configuration for Hardware Downloads

export interface VendorButton {
  type: 'quote' | 'contact' | 'buy';
  label: string;
  url: string;
  className?: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  priceUSD: string;
  buttons: VendorButton[];
}

// Vendor data configuration
export const vendors: Vendor[] = [
  {
    id: 'ztl',
    name: 'ZTL',
    description: 'Machined Parts',
    priceUSD: '$5,453',
    buttons: [
      {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1PthQ1ehd6iTGjxCnPors9dKmApbjXu5l?usp=drive_link'
      },
      {
        type: 'contact',
        label: 'Contact',
        url: 'mailto:cecilia@zintilon.com'
      }
    ]
  },
  {
    id: 'misumi',
    name: 'Misumi',
    description: 'Shafts',
    priceUSD: '$67',
    buttons: [
      {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/10W9Ak-MnvlEXWFwCPgNXeWdg0f9Kb3vf?usp=drive_link'
      },
      {
        type: 'buy',
        label: 'Buy',
        url: 'https://us.misumi-ec.com/vona2/detail/110302634310/?CategorySpec=00000042718%3a%3aa&curSearch=%7b%22field%22%3a%22%40search%22%2c%22seriesCode%22%3a%22110302634310%22%2c%22innerCode%22%3a%22%22%2c%22sort%22%3a1%2c%22specSortFlag%22%3a0%2c%22allSpecFlag%22%3a0%2c%22page%22%3a1%2c%22pageSize%22%3a%2260%22%2c%2200000028942%22%3a%22e%22%2c%2200000028941%22%3a%22mig00000001498696%22%2c%2200000028943%22%3a%2259%22%2c%22typeCode%22%3a%22PSFU%22%2c%22fixedInfo%22%3a%22MDM00000529299110302634310-15184782297907183117113089131%7c11%22%7d&Tab=wysiwyg_area_0'
      }      
    ]
  },
  {
    id: 'mcmaster',
    name: 'McMaster-Carr',
    description: 'Fasteners & Bearings',
    priceUSD: '$1,127',
    buttons: [
    {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1qMnXjJvbAHzpEqjcM6aVyvTBmkNfjMK5?usp=drive_link'
        },        
      {
        type: 'buy',
        label: 'Buy',
        url: 'https://www.mcmaster.com/'
      }
    ]
  },
  {
    id: 'igus',
    name: 'Igus',
    description: 'Thrust Washers',
    priceUSD: '$21',
    buttons: [
    {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1-9SkRZsi_Q0jM8qzYnjGqh-cenfxq74F?usp=drive_link'
        },         
      {
        type: 'buy',
        label: 'Buy',
        url: 'https://www.igus.com/product/130?artNr=LTM-0818-015'
      }
    ]
  },  
  {
    id: 'bb',
    name: 'B&B',
    description: 'Belts',
    priceUSD: '$162',
    buttons: [
        {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1__PE81kLqGV0UsOaNHkCX2ZKiGllgQbs?usp=drive_link'
        },
        {
        type: 'contact',
        label: 'Contact',
        url: 'https://www.bbman.com/contact-us/'
        }
    ]
  },
  {
    id: 'sri',
    name: 'SRI',
    description: 'Load Cell',
    priceUSD: '$3,420',
    buttons: [
      {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1BPO1_veFyFO8lNE8cSrc46x8wOkowUB-?usp=drive_link'
      },
      {
        type: 'contact',
        label: 'Contact',
        url: 'mailto:sri@srisensor.com'
      }
    ]
  },
  {
    id: 'dephy',
    name: 'Dephy',
    description: 'Batteries & Actuators',
    priceUSD: '$12,630',
    buttons: [
      {
        type: 'quote',
        label: 'Quotes',
        url: 'https://drive.google.com/drive/folders/1aiRPKrbr-BSm-Nrmsc4J3gnLb-L811e3?usp=drive_link'
      },
      {
        type: 'contact',
        label: 'Contact',
        url: 'mailto:admin@dephy.com'
      }
    ]
  },
  {
    id: 'lily',
    name: 'Lily',
    description: 'Angular Contact Bearings',
    priceUSD: '$75',
    buttons: [
      {
        type: 'buy',
        label: 'Buy',
        url: 'https://www.lily-bearing.com/products/kaa10ag0/'
      }
    ]
  },
  {
    id: 'mouser',
    name: 'Mouser',
    description: 'Encoders & Raspberry Pi',
    priceUSD: '$112',
    buttons: [      
      {
        type: 'buy',
        label: 'Buy',
        url: 'https://www.mouser.com/'
      }
    ]
  }, 
];

// Button styling configuration
export const buttonStyles = {
  quote: "w-full text-sm bg-transparent border-white text-white hover:bg-white hover:text-black",
  contact: "w-full bg-white text-black hover:bg-gray-200 text-sm",
  buy: "w-full bg-[var(--light-green)] text-black hover:bg-[var(--light-blue)] text-sm"
};

// Card styling configuration
export const cardStyles = {
  container: "@container/card bg-[var(--black)] text-white border-gray-700 hover:shadow-lg hover:shadow-gray-500/20 transition-shadow",
  description: "text-gray-300 text-sm",
  price: "py-1 sm:py-2 text-2xl sm:text-3xl font-bold tabular-nums @[250px]/card:text-4xl text-[var(--white)]",
  header: "pb-3",
  footer: "flex-col items-start gap-1.5 text-xs sm:text-sm pt-2"
}; 