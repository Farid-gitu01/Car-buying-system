'use client'; // <-- ADD THIS LINE

import HeroSlider from "@/components/HeroSlider"
import HomeFeatureSection from "@/components/HomeFeatureSection"
import AboutSection from "@/components/AboutSection"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import HomeClientView from '@/components/HomeClientView'
import { Star, Quote, User, Shield, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Car Buyer",
    content: "YeloCar made buying my dream car so easy! The verification process gave me confidence, and the customer support was excellent.",
    rating: 5,
    avatar: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Car Seller",
    content: "Sold my car in just 3 days! The platform is user-friendly and the team helped me get the best price for my vehicle.",
    rating: 5,
    avatar: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Car Enthusiast",
    content: "The quality of cars on YeloCar is outstanding. I found my perfect match with all the features I was looking for.",
    rating: 5,
    avatar: "/images/avatar-3.jpg",
  },
]

// Features data
const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All cars are thoroughly verified for authenticity and quality assurance.",
  },
  {
    icon: Zap,
    title: "Quick Process",
    description: "Buy or sell your car in minutes with our streamlined process.",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Get the best value for your money with competitive pricing.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 z-10" />
        
        <div className="container px-4 md:px-6 relative z-20">
          <motion.div 
            className="text-center text-white space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Dream Car
              <span className="block text-yellow-400">Awaits Here</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, buy, and sell premium vehicles with confidence. 
              Join thousands of satisfied customers on India's trusted car marketplace.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/features">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Browse Cars
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 rounded-xl transition-all duration-300">
                  Sell Your Car
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose YeloCar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best car buying and selling experience with our innovative platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HomeFeatureSection />
      <AboutSection />
    </div>
  )
}