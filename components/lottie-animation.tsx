"use client"

import Lottie from "lottie-react"
import Image from "next/image"
import landingAnimation from "@/public/lottie.json"

export default function LottieAnimation() {
  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-90 lg:h-90 mb-2 sm:mb-4">
      <Lottie animationData={landingAnimation} loop={true} />
      <div className="absolute bottom-5 right-0 sm:bottom-6 sm:right-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-black/10">
        <Image
          src="/logo/um-block.png"
          alt="University of Michigan block M"
          width={24}
          height={24}
          className="h-4/5 w-4/5 object-contain"
        />
      </div>
    </div>
  )
}
