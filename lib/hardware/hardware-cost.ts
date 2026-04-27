export interface HardwareCostItem {
  component: string
  price: number
}

export const hardwareCostData: HardwareCostItem[] = [
  {
    component: "Machined Parts",
    price: 5453.00
  },
  {
    component: "Actuators and Batteries", 
    price: 12630.00
  },
  {
    component: "Belts",
    price: 162.00
  },
  {
    component: "Bearings and Fasteners",
    price: 1323.00
  },
  {
    component: "Sensors & Electronics",
    price: 3532.00
  }
]

export const getTotalCost = (): number => {
  return hardwareCostData.reduce((total, item) => total + item.price, 0)
}

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
} 