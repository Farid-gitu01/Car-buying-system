"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { CheckCircle, Shield, TrendingUp } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import type React from "react" // Import React for React.ElementType

interface AboutSlide {
  title: string
  description: string
  icon: React.ElementType // Correctly typed as a React component
  image: string
}

const aboutSlides: AboutSlide[] = [
  {
    title: "Our Mission",
    description:
      "To revolutionize the car selling and buying experience by providing a transparent, efficient, and trustworthy platform for everyone.",
    icon: TrendingUp,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Our Vision",
    description:
      "To be the leading online marketplace for vehicles, empowering individuals to achieve the best value and experience in every transaction.",
    icon: CheckCircle,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Why Trust YeloCar?",
    description:
      "We prioritize security, transparency, and user satisfaction. Our verified listings and secure payment gateways ensure peace of mind.",
    icon: Shield,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Ease of Selling",
    description:
      "List your car in minutes with our intuitive interface. Reach a wide audience and get the best value for your vehicle.",
    icon: TrendingUp,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Seamless Experience",
    description: "From listing to sale, our platform guides you every step of the way, making car selling a breeze.",
    icon: CheckCircle,
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aboutSlides.length)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Destructure the current slide data
  const { title, description, icon: IconComponent, image } = aboutSlides[currentSlide]

  return (
    <section id="about-content" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">About YeloCar</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Learn more about our company, mission, and why we are the best choice for your automotive needs.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white p-6 md:p-10">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3 text-yellow-500">
                  {/* Corrected dynamic icon rendering */}
                  {IconComponent && <IconComponent className="h-8 w-8" />}
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="text-lg text-gray-600">{description}</p>
                {/* Removed "Learn More" button as it's a dedicated page now */}
              </div>
              <div className="relative h-60 md:h-80 w-full rounded-md overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {aboutSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-yellow-500 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
