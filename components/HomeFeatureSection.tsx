import Link from "next/link"
import CarCard from "@/components/CarCard"
import { Button } from "@/components/ui/button"

const homeCars = [
  {
    imageSrc: "/images/ferrari-488-gtb.png?height=200&width=300",
    imageAlt: "Red Sports Car",
    name: "Ferrari 488 GTB",
    description: "A high-performance sports car with a powerful V8 engine and stunning design.",
    price: 36000000,
    discount: 1000000,
  },
  {
    imageSrc: "/images/honda-city.png?height=200&width=300",
    imageAlt: "Blue Sedan Car",
    name: "Honda City",
    description: "A reliable and fuel-efficient sedan, perfect for city driving and long commutes.",
    price: 1200000,
    discount: 50000,
  },
  {
    imageSrc: "/images/mahindra-xuv700.png?height=200&width=300",
    imageAlt: "Black SUV Car",
    name: "Mahindra XUV700",
    description: "A feature-packed SUV offering comfort, safety, and powerful performance.",
    price: 2000000,
    discount: 75000,
  },
  {
    imageSrc: "/images/tata-nexon-ev.png?height=200&width=300",
    imageAlt: "White Electric Car",
    name: "Tata Nexon EV",
    description: "India's best-selling electric SUV, offering great range and modern features.",
    price: 1500000,
    discount: 0,
  },
  {
    imageSrc: "/images/maruti-suzuki-swift.png?height=200&width=300",
    imageAlt: "Silver Hatchback Car",
    name: "Maruti Suzuki Swift",
    description: "A popular hatchback known for its peppy engine and agile handling.",
    price: 800000,
    discount: 20000,
  },
  {
    imageSrc: "/images/ford-mustang-1976.png?height=200&width=300",
    imageAlt: "Yellow Vintage Car",
    name: "Ford Mustang (1967)",
    description: "An iconic American muscle car, a true classic for enthusiasts.",
    price: 7500000,
    discount: 250000,
  },
]

export default function HomeFeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">Featured Cars</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover some of the best cars available on YeloCar.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {homeCars.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/features">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-6">
              Explore More Cars
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
