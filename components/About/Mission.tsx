import { Target } from "lucide-react"

export default function Mission() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-yellow-500 mb-4">
              <Target className="h-10 w-10" />
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
              At YeloCar, our mission is to revolutionize the car selling and buying experience by providing a
              transparent, efficient, and trustworthy platform for everyone. We aim to empower individuals to achieve
              the best value and experience in every transaction, making automotive sales seamless and secure.
            </p>
          </div>
          <div className="md:w-1/2 relative h-60 md:h-80 w-full rounded-lg overflow-hidden">
            <img src="/images/our-mission.png?height=400&width=600" alt="Our Mission" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
