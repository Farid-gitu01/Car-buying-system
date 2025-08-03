"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { CheckCircle, Car, DollarSign, LayoutDashboard, Settings, Search, Filter, Grid3X3, List } from "lucide-react"
import FeatureCard from "@/components/FeatureCard"
import Filters from "@/components/Features/Filters"
import TrendingTags from "@/components/Features/TrendingTags"
import MidCtaBanner from "@/components/Features/MidCtaBanner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Feature {
  name: string
  icon?: React.ElementType
}

interface CarData {
  id: string
  name: string
  description: string
  price: number
  discount?: number
  imageSrc: string
  imageAlt: string
  type: "Sedan" | "SUV" | "Hatchback" | "Sports" | "Electric" | "Vintage" | "Luxury" | "Compact"
  mainFeatures: Feature[]
  fuelType: string
  mileage: string
  transmission: string
}

const allCars: CarData[] = [
  {
    id: "1",
    name: "Ferrari 488 GTB",
    description: "A high-performance sports car with a powerful V8 engine and stunning design.",
    price: 36000000,
    discount: 1000000,
    imageSrc: "/images/ferrari-488-gtb.png?height=200&width=300",
    imageAlt: "Red Sports Car",
    type: "Sports",
    mainFeatures: [
      { name: "V8 Twin-Turbo Engine", icon: Settings },
      { name: "0-100 km/h in 3.0s", icon: Car },
      { name: "Carbon Ceramic Brakes", icon: CheckCircle },
    ],
    fuelType: "Petrol",
    mileage: "8 kmpl",
    transmission: "Automatic",
  },
  {
    id: "2",
    name: "Honda City",
    description: "A reliable and fuel-efficient sedan, perfect for city driving and long commutes.",
    price: 1200000,
    discount: 50000,
    imageSrc: "/images/honda-city.png?height=200&width=300",
    imageAlt: "Blue Sedan Car",
    type: "Sedan",
    mainFeatures: [
      { name: "i-VTEC Engine", icon: Settings },
      { name: "Spacious Cabin", icon: LayoutDashboard },
      { name: "Excellent Fuel Economy", icon: DollarSign },
    ],
    fuelType: "Petrol",
    mileage: "18 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "3",
    name: "Mahindra XUV700",
    description: "A feature-packed SUV offering comfort, safety, and powerful performance.",
    price: 2000000,
    discount: 75000,
    imageSrc: "/images/mahindra-xuv700.png?height=200&width=300",
    imageAlt: "Black SUV Car",
    type: "SUV",
    mainFeatures: [
      { name: "AdrenoX Infotainment", icon: LayoutDashboard },
      { name: "ADAS Features", icon: CheckCircle },
      { name: "All-Wheel Drive", icon: Settings },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "15 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "4",
    name: "Tata Nexon EV",
    description: "India's best-selling electric SUV, offering great range and modern features.",
    price: 1500000,
    discount: 0,
    imageSrc: "/images/tata-nexon-ev.png?height=200&width=300",
    imageAlt: "White Electric Car",
    type: "Electric",
    mainFeatures: [
      { name: "312 km Range (ARAI)", icon: Car },
      { name: "Fast Charging Support", icon: DollarSign },
      { name: "ZConnect Connected Car Tech", icon: LayoutDashboard },
    ],
    fuelType: "Electric",
    mileage: "312 km/charge",
    transmission: "Automatic",
  },
  {
    id: "5",
    name: "Maruti Suzuki Swift",
    description: "A popular hatchback known for its peppy engine and agile handling.",
    price: 800000,
    discount: 20000,
    imageSrc: "/images/maruti-suzuki-swift.png?height=200&width=300",
    imageAlt: "Silver Hatchback Car",
    type: "Hatchback",
    mainFeatures: [
      { name: "K-Series Engine", icon: Settings },
      { name: "Compact & Agile", icon: Car },
      { name: "High Fuel Efficiency", icon: DollarSign },
    ],
    fuelType: "Petrol",
    mileage: "23 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "6",
    name: "Ford Mustang (1967)",
    description: "An iconic American muscle car, a true classic for enthusiasts.",
    price: 7500000,
    discount: 250000,
    imageSrc: "/images/ford-mustang-1976.png?height=200&width=300",
    imageAlt: "Yellow Vintage Car",
    type: "Vintage",
    mainFeatures: [
      { name: "Classic V8 Power", icon: Settings },
      { name: "Iconic Design", icon: CheckCircle },
      { name: "Collector's Item", icon: DollarSign },
    ],
    fuelType: "Petrol",
    mileage: "5 kmpl",
    transmission: "Manual",
  },
  {
    id: "7",
    name: "Toyota Innova Crysta",
    description: "A spacious and comfortable MPV, ideal for families and long journeys.",
    price: 2500000,
    discount: 0,
    imageSrc: "/images/toyota-innova-crysta.png?height=200&width=300",
    imageAlt: "White MPV Car",
    type: "Sedan", // Categorizing as sedan for simplicity in filter
    mainFeatures: [
      { name: "Reliable Diesel Engine", icon: Settings },
      { name: "7-Seater Comfort", icon: LayoutDashboard },
      { name: "Toyota Safety Sense", icon: CheckCircle },
    ],
    fuelType: "Diesel",
    mileage: "14 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "8",
    name: "Hyundai Creta",
    description: "A popular compact SUV with a stylish design and feature-rich interior.",
    price: 1600000,
    discount: 40000,
    imageSrc: "/images/hyundai.png?height=200&width=300",
    imageAlt: "Grey Compact SUV",
    type: "SUV",
    mainFeatures: [
      { name: "Panoramic Sunroof", icon: LayoutDashboard },
      { name: "Ventilated Seats", icon: CheckCircle },
      { name: "Multiple Engine Options", icon: Settings },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "17 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "9",
    name: "Mercedes-Benz C-Class",
    description: "A luxurious sedan offering a blend of elegance, performance, and advanced technology.",
    price: 6000000,
    discount: 150000,
    imageSrc: "/images/mercedez-c-class.png?height=200&width=300",
    imageAlt: "Silver Luxury Sedan",
    type: "Luxury",
    mainFeatures: [
      { name: "MBUX Infotainment", icon: LayoutDashboard },
      { name: "Burmester Sound System", icon: CheckCircle },
      { name: "Advanced Driver Assistance", icon: Settings },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "12 kmpl",
    transmission: "Automatic",
  },
  {
    id: "10",
    name: "Porsche 911",
    description: "The legendary sports car, known for its iconic design and exhilarating driving experience.",
    price: 18000000,
    discount: 500000,
    imageSrc: "/images/porche-911.png?height=200&width=300",
    imageAlt: "Yellow Porsche 911",
    type: "Sports",
    mainFeatures: [
      { name: "Flat-Six Engine", icon: Settings },
      { name: "Iconic Design", icon: CheckCircle },
      { name: "Track-Ready Performance", icon: Car },
    ],
    fuelType: "Petrol",
    mileage: "9 kmpl",
    transmission: "Automatic",
  },
  {
    id: "11",
    name: "BMW 3 Series",
    description: "A dynamic luxury sedan combining sporty performance with premium comfort.",
    price: 5000000,
    discount: 100000,
    imageSrc: "/images/bmw-3-series.png?height=200&width=300",
    imageAlt: "Blue BMW 3 Series",
    type: "Luxury",
    mainFeatures: [
      { name: "Sport Suspension", icon: Settings },
      { name: "iDrive Infotainment", icon: LayoutDashboard },
      { name: "Leather Interior", icon: CheckCircle },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "13 kmpl",
    transmission: "Automatic",
  },
  {
    id: "12",
    name: "Audi Q5",
    description: "A sophisticated luxury SUV with a refined interior and strong performance.",
    price: 6500000,
    discount: 200000,
    imageSrc: "/images/audi-q7.png?height=200&width=300",
    imageAlt: "White Audi Q5",
    type: "SUV",
    mainFeatures: [
      { name: "Quattro All-Wheel Drive", icon: Settings },
      { name: "Virtual Cockpit", icon: LayoutDashboard },
      { name: "Panoramic Sunroof", icon: CheckCircle },
    ],
    fuelType: "Petrol",
    mileage: "11 kmpl",
    transmission: "Automatic",
  },
  {
    id: "13",
    name: "Kia Seltos",
    description: "A stylish and feature-rich compact SUV, popular for its modern design.",
    price: 1400000,
    discount: 30000,
    imageSrc: "/images/kia-seltos.png?height=200&width=300",
    imageAlt: "Red Kia Seltos",
    type: "Compact",
    mainFeatures: [
      { name: "Bose Sound System", icon: CheckCircle },
      { name: "Smart Pure Air Purifier", icon: Settings },
      { name: "Ventilated Front Seats", icon: LayoutDashboard },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "16 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "14",
    name: "MG Hector",
    description: "The 'Internet Car' with advanced connectivity features and a spacious cabin.",
    price: 1700000,
    discount: 50000,
    imageSrc: "/images/mg-hector.png?height=200&width=300",
    imageAlt: "Silver MG Hector",
    type: "SUV",
    mainFeatures: [
      { name: "i-SMART Connectivity", icon: LayoutDashboard },
      { name: "Panoramic Sunroof", icon: CheckCircle },
      { name: "Voice Assistant", icon: Settings },
    ],
    fuelType: "Petrol/Diesel",
    mileage: "14 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "15",
    name: "Skoda Slavia",
    description: "A premium mid-size sedan known for its robust build and driving dynamics.",
    price: 1300000,
    discount: 25000,
    imageSrc: "/images/skoda-slavia.png?height=200&width=300",
    imageAlt: "Blue Skoda Slavia",
    type: "Sedan",
    mainFeatures: [
      { name: "Turbocharged Engine", icon: Settings },
      { name: "MySKODA Connect", icon: LayoutDashboard },
      { name: "6 Airbags", icon: CheckCircle },
    ],
    fuelType: "Petrol",
    mileage: "19 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "16",
    name: "Volkswagen Virtus",
    description: "A stylish and powerful sedan offering a fun-to-drive experience.",
    price: 1450000,
    discount: 35000,
    imageSrc: "/images/volkswagen-virtus.png?height=200&width=300",
    imageAlt: "White Volkswagen Virtus",
    type: "Sedan",
    mainFeatures: [
      { name: "GT Line Variant", icon: Car },
      { name: "Digital Cockpit", icon: LayoutDashboard },
      { name: "Wireless Charging", icon: CheckCircle },
    ],
    fuelType: "Petrol",
    mileage: "18 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "17",
    name: "Jeep Compass",
    description: "A rugged and capable SUV, perfect for both city and off-road adventures.",
    price: 2200000,
    discount: 60000,
    imageSrc: "/images/jeep-compass.png?height=200&width=300",
    imageAlt: "Green Jeep Compass",
    type: "SUV",
    mainFeatures: [
      { name: "4x4 Capability", icon: Settings },
      { name: "Uconnect Infotainment", icon: LayoutDashboard },
      { name: "7 Airbags", icon: CheckCircle },
    ],
    fuelType: "Diesel",
    mileage: "15 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "18",
    name: "Renault Kwid",
    description: "An affordable and compact hatchback, ideal for urban mobility.",
    price: 500000,
    discount: 10000,
    imageSrc: "/images/renault-kwid.png?height=200&width=300",
    imageAlt: "Orange Renault Kwid",
    type: "Hatchback",
    mainFeatures: [
      { name: "SUV-inspired Design", icon: Car },
      { name: "8-inch Touchscreen", icon: LayoutDashboard },
      { name: "Reverse Parking Camera", icon: CheckCircle },
    ],
    fuelType: "Petrol",
    mileage: "22 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "19",
    name: "Nissan Magnite",
    description: "A sub-compact SUV offering bold styling and value for money.",
    price: 700000,
    discount: 15000,
    imageSrc: "/images/nissan-magnite.png?height=200&width=300",
    imageAlt: "Red Nissan Magnite",
    type: "Compact",
    mainFeatures: [
      { name: "Turbo Petrol Engine", icon: Settings },
      { name: "360-degree Camera", icon: CheckCircle },
      { name: "Wireless Apple CarPlay/Android Auto", icon: LayoutDashboard },
    ],
    fuelType: "Petrol",
    mileage: "19 kmpl",
    transmission: "Manual/Automatic",
  },
  {
    id: "20",
    name: "Rolls-Royce Phantom",
    description: "The epitome of luxury, offering unparalleled comfort and bespoke craftsmanship.",
    price: 100000000,
    discount: 5000000,
    imageSrc: "/images/rolls-roys-phantom.png?height=200&width=300",
    imageAlt: "Black Rolls-Royce Phantom",
    type: "Luxury",
    mainFeatures: [
      { name: "Starlight Headliner", icon: CheckCircle },
      { name: "Hand-built Interior", icon: Settings },
      { name: "Silent Ride", icon: Car },
    ],
    fuelType: "Petrol",
    mileage: "7 kmpl",
    transmission: "Automatic",
  },
]

export default function FeatureSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [carTypeFilter, setCarTypeFilter] = useState<string>("All")
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("All")
  const [activeTag, setActiveTag] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleTagClick = (tag: string) => {
    setActiveTag(tag === activeTag ? "" : tag) // Toggle active tag
    setSearchTerm("") // Clear search when tag is clicked
    setCarTypeFilter("All") // Reset type filter
    setPriceRangeFilter("All") // Reset price filter

    // Apply filter based on tag
    if (tag === "Top Deals") {
      // Filter for cars with discount
      setPriceRangeFilter("All") // Ensure price filter doesn't conflict
    } else if (tag === "Under ₹5L") {
      setPriceRangeFilter("Under 5L")
    } else if (tag === "Electric Cars") {
      setCarTypeFilter("Electric")
    } else if (tag === "SUVs") {
      setCarTypeFilter("SUV")
    } else if (tag === "Sedans") {
      setCarTypeFilter("Sedan")
    } else if (tag === "Hatchbacks") {
      setCarTypeFilter("Hatchback")
    } else if (tag === "Luxury Cars") {
      setCarTypeFilter("Luxury")
    } else if (tag === "Vintage") {
      setCarTypeFilter("Vintage")
    }
    // Add more tag logic as needed
  }

  const filteredCars = useMemo(() => {
    let cars = allCars

    // Apply search term
    if (searchTerm) {
      cars = cars.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply type filter
    if (carTypeFilter !== "All") {
      cars = cars.filter((car) => car.type === carTypeFilter)
    }

    // Apply price range filter
    if (priceRangeFilter !== "All") {
      cars = cars.filter((car) => {
        const price = car.price
        switch (priceRangeFilter) {
          case "Under 5L":
            return price <= 500000
          case "5L-10L":
            return price > 500000 && price <= 1000000
          case "10L-25L":
            return price > 1000000 && price <= 2500000
          case "25L-50L":
            return price > 2500000 && price <= 5000000
          case "Over 50L":
            return price > 5000000
          default:
            return true
        }
      })
    }

    // Apply active tag filter (if any)
    if (activeTag) {
      if (activeTag === "Top Deals") {
        cars = cars.filter((car) => car.discount && car.discount > 0)
      } else if (activeTag === "Under ₹5L") {
        cars = cars.filter((car) => car.price <= 500000)
      } else if (activeTag === "Electric Cars") {
        cars = cars.filter((car) => car.type === "Electric")
      } else if (activeTag === "EMI Options") {
        // Placeholder for EMI options logic
        // For now, just return all cars, or a subset
      } else if (activeTag === "SUVs") {
        cars = cars.filter((car) => car.type === "SUV")
      } else if (activeTag === "Sedans") {
        cars = cars.filter((car) => car.type === "Sedan")
      } else if (activeTag === "Hatchbacks") {
        cars = cars.filter((car) => car.type === "Hatchback")
      } else if (activeTag === "Luxury Cars") {
        cars = cars.filter((car) => car.type === "Luxury")
      } else if (activeTag === "Vintage") {
        cars = cars.filter((car) => car.type === "Vintage")
      }
    }

    return cars
  }, [searchTerm, carTypeFilter, priceRangeFilter, activeTag])

  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-theme-accent-50 via-white to-theme-primary-50/30">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text-primary">
              Explore All Cars
            </h2>
            <p className="max-w-3xl text-theme-accent-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed">
              Find your perfect car with our advanced search and filtering options. 
              Discover amazing deals and premium vehicles tailored to your needs.
            </p>
          </div>
          
          <div className="w-full max-w-4xl">
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              carTypeFilter={carTypeFilter}
              setCarTypeFilter={setCarTypeFilter}
              priceRangeFilter={priceRangeFilter}
              setPriceRangeFilter={setPriceRangeFilter}
            />
            <TrendingTags onTagClick={handleTagClick} activeTag={activeTag} />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <p className="text-theme-accent-600">
            Showing <span className="font-semibold text-theme-accent-900">{filteredCars.length}</span> cars
          </p>
          <div className="flex items-center gap-2 text-sm text-theme-accent-600">
            <Filter className="h-4 w-4" />
            <span>Active filters: {[carTypeFilter, priceRangeFilter, activeTag].filter(Boolean).length}</span>
          </div>
        </div>

        {/* Cars Grid */}
        <div className={`grid gap-6 md:gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        } justify-items-center`}>
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div
                key={car.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard {...car} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-theme-accent-100 rounded-full flex items-center justify-center">
                  <Car className="w-12 h-12 text-theme-accent-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-theme-accent-900 mb-3">
                  No cars found
                </h3>
                <p className="text-theme-accent-600 mb-6">
                  No cars match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("")
                    setCarTypeFilter("All")
                    setPriceRangeFilter("All")
                    setActiveTag("")
                  }}
                  className="bg-gradient-primary hover:bg-gradient-primary text-white font-semibold"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        <MidCtaBanner />

        {/* CTA Section */}
        <div className="flex justify-center mt-16 animate-fade-in-up">
          <Link href="/contact">
            <Button className="bg-gradient-secondary hover:bg-gradient-secondary text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Contact Us for More Options
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
