"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Customer",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      content:
        "I've been shopping with Horeb Market for over a year now, and I'm consistently impressed by their product quality and customer service. The delivery is always on time, and their return policy is hassle-free.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Customer",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
      content:
        "The selection of products is amazing, and the website is so easy to navigate. I found exactly what I was looking for within minutes. Will definitely be shopping here again!",
      rating: 4,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Customer",
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
      content:
        "The quality of the products exceeded my expectations. Everything arrived well-packaged and exactly as described. The customer support team was also very helpful when I had questions.",
      rating: 5,
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <Card className="border-0 shadow-lg mx-auto max-w-3xl">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-primary/10">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <Quote className="h-8 w-8 text-primary/20 mb-2 mx-auto md:mx-0" />
                      <p className="text-lg italic mb-4">{testimonial.content}</p>
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={i < testimonial.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400" : "text-muted-foreground"}`}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

