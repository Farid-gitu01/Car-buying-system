"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { CheckCircle, Shield, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
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
    image: "/images/our-mission.png?height=400&width=600",
  },
  {
    title: "Our Vision",
    description:
      "To be the leading online marketplace for vehicles, empowering individuals to achieve the best value and experience in every transaction.",
    icon: CheckCircle,
    image: "/images/our-vision.png?height=400&width=600",
  },
  {
    title: "Why Trust YeloCar?",
    description:
      "We prioritize security, transparency, and user satisfaction. Our verified listings and secure payment gateways ensure peace of mind.",
    icon: Shield,
    image: "/images/trust-platform.png?height=400&width=600",
  },
  {
    title: "Ease of Selling",
    description:
      "List your car in minutes with our intuitive interface. Reach a wide audience and get the best value for your vehicle.",
    icon: TrendingUp,
    image: "/images/ease-selling-car.png?height=400&width=600",
  },
  {
    title: "Seamless Experience",
    description: "From listing to sale, our platform guides you every step of the way, making car selling a breeze.",
    icon: CheckCircle,
    image: "/images/seamless-experience.png?height=400&width=600",
  },
]

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % aboutSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % aboutSlides.length)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const handlePrevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [currentSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
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
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-yellow-500 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-yellow-500 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
              }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="flex flex-col space-y-4">
                <motion.div 
                  className="flex items-center gap-3 text-yellow-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Corrected dynamic icon rendering */}
                  {IconComponent && <IconComponent className="h-8 w-8" />}
                  <h3 className="text-2xl font-bold">{title}</h3>
                </motion.div>
                <motion.p 
                  className="text-lg text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {description}
                </motion.p>
                {/* Removed "Learn More" button as it's a dedicated page now */}
              </div>
              <motion.div 
                className="relative h-60 md:h-80 w-full rounded-md overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / aboutSlides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {aboutSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-yellow-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`} />
          </div>
        </div>
      </div>
    </section>
  )
}
