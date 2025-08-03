import { ShieldCheck, Headphones, DollarSign, Lock, Users, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface FeatureItem {
  icon: React.ElementType
  title: string
  description: string
}

const features: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: "Verified Cars",
    description: "Every car listed undergoes a rigorous verification process for quality and authenticity.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you with any queries.",
  },
  {
    icon: DollarSign,
    title: "Flexible Financing",
    description: "Explore various financing options tailored to your needs for an easy purchase.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description: "Your data and transactions are protected with industry-leading security measures.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join our growing community of satisfied buyers and sellers across the nation.",
  },
  {
    icon: Zap,
    title: "Instant Listing Approval",
    description: "List your car quickly and get it approved to reach potential buyers in no time.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">Why Choose YeloCar?</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Experience the YeloCar difference with our commitment to excellence and customer satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <feature.icon className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
