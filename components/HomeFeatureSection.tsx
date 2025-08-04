// components/HomeFeatureSection.tsx

'use client'; // <-- This is the crucial fix!

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Shield, Zap, Car } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";

// The car data can remain in this file or be moved to a separate `data.ts` file
// for better organization, but it doesn't affect the functionality.
const homeCars = [
  {
    id: "ferrari-488-gtb",
    imageSrc: "/images/ferrari-488-gtb.png?height=200&width=300",
    imageAlt: "Red Sports Car",
    name: "Ferrari 488 GTB",
    description: "A high-performance sports car with a powerful V8 engine and stunning design.",
    price: 36000000,
    discount: 1000000,
    category: "Sports",
    location: "Mumbai",
    year: 2022,
    mileage: "5,000 km",
    mainFeatures: [
      { name: "V8 Engine", icon: Zap },
      { name: "Carbon Fiber", icon: Shield },
      { name: "Premium Interior", icon: Star },
    ],
  },
  {
    id: "honda-city",
    imageSrc: "/images/honda-city.png?height=200&width=300",
    imageAlt: "Blue Sedan Car",
    name: "Honda City",
    description: "A reliable and fuel-efficient sedan, perfect for city driving and long commutes.",
    price: 1200000,
    discount: 50000,
    category: "Sedan",
    location: "Delhi",
    year: 2023,
    mileage: "12,000 km",
    mainFeatures: [
      { name: "Fuel Efficient", icon: Zap },
      { name: "Spacious Interior", icon: Car },
      { name: "Advanced Safety", icon: Shield },
    ],
  },
  {
    id: "mahindra-xuv700",
    imageSrc: "/images/mahindra-xuv700.png?height=200&width=300",
    imageAlt: "Black SUV Car",
    name: "Mahindra XUV700",
    description: "A feature-packed SUV offering comfort, safety, and powerful performance.",
    price: 2000000,
    discount: 75000,
    category: "SUV",
    location: "Bangalore",
    year: 2023,
    mileage: "8,000 km",
    mainFeatures: [
      { name: "7 Seater", icon: Car },
      { name: "ADAS Features", icon: Shield },
      { name: "Turbo Engine", icon: Zap },
    ],
  },
  {
    id: "tata-nexon-ev",
    imageSrc: "/images/tata-nexon-ev.png?height=200&width=300",
    imageAlt: "White Electric Car",
    name: "Tata Nexon EV",
    description: "India's best-selling electric SUV, offering great range and modern features.",
    price: 1500000,
    discount: 0,
    category: "Electric",
    location: "Pune",
    year: 2023,
    mileage: "3,000 km",
    mainFeatures: [
      { name: "300km Range", icon: Zap },
      { name: "Zero Emissions", icon: Shield },
      { name: "Fast Charging", icon: Star },
    ],
  },
  {
    id: "maruti-suzuki-swift",
    imageSrc: "/images/maruti-suzuki-swift.png?height=200&width=300",
    imageAlt: "Silver Hatchback Car",
    name: "Maruti Suzuki Swift",
    description: "A popular hatchback known for its peppy engine and agile handling.",
    price: 800000,
    discount: 20000,
    category: "Hatchback",
    location: "Chennai",
    year: 2023,
    mileage: "10,000 km",
    mainFeatures: [
      { name: "Peppy Engine", icon: Zap },
      { name: "Easy Maintenance", icon: Car },
      { name: "Great Mileage", icon: Star },
    ],
  },
  {
    id: "ford-mustang-1976",
    imageSrc: "/images/ford-mustang-1976.png?height=200&width=300",
    imageAlt: "Yellow Vintage Car",
    name: "Ford Mustang (1967)",
    description: "An iconic American muscle car, a true classic for enthusiasts.",
    price: 7500000,
    discount: 250000,
    category: "Classic",
    location: "Mumbai",
    year: 1967,
    mileage: "50,000 km",
    mainFeatures: [
      { name: "V8 Power", icon: Zap },
      { name: "Classic Design", icon: Star },
      { name: "Collector's Item", icon: Shield },
    ],
  },
];

// Stagger animation variants for the parent container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
    },
  },
};

// Animation variants for each card item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomeFeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // Animates when the element enters the viewport
          viewport={{ once: true }} // Ensures the animation runs only once
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">
              Featured Cars
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover some of the best cars available on YeloCar.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when the grid comes into view
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the grid is visible
        >
          {homeCars.map((car) => (
            <motion.div key={car.id} variants={itemVariants}>
              <FeatureCard {...car} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/cars"> {/* A more conventional URL like /cars or /listings */}
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore More Cars
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}