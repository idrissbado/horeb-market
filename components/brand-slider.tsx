"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function BrandSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const brands = [
    { id: 1, name: "Brand 1", logo: "/placeholder.svg?height=60&width=120&text=Brand+1" },
    { id: 2, name: "Brand 2", logo: "/placeholder.svg?height=60&width=120&text=Brand+2" },
    { id: 3, name: "Brand 3", logo: "/placeholder.svg?height=60&width=120&text=Brand+3" },
    { id: 4, name: "Brand 4", logo: "/placeholder.svg?height=60&width=120&text=Brand+4" },
    { id: 5, name: "Brand 5", logo: "/placeholder.svg?height=60&width=120&text=Brand+5" },
    { id: 6, name: "Brand 6", logo: "/placeholder.svg?height=60&width=120&text=Brand+6" },
    { id: 7, name: "Brand 7", logo: "/placeholder.svg?height=60&width=120&text=Brand+7" },
    { id: 8, name: "Brand 8", logo: "/placeholder.svg?height=60&width=120&text=Brand+8" },
  ]

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const scrollWidth = slider.scrollWidth
    const clientWidth = slider.clientWidth

    if (scrollWidth <= clientWidth) return

    let scrollPos = 0
    const maxScroll = scrollWidth - clientWidth
    const speed = 1

    const scroll = () => {
      scrollPos += speed
      if (scrollPos >= maxScroll) {
        scrollPos = 0
      }
      if (slider) {
        slider.scrollLeft = scrollPos
      }
      requestAnimationFrame(scroll)
    }

    const animation = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animation)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div ref={sliderRef} className="flex items-center gap-12 overflow-hidden py-6">
        {brands.concat(brands).map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          >
            <Image
              src={brand.logo || "/placeholder.svg"}
              alt={brand.name}
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"></div>
    </div>
  )
}

