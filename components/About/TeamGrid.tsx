import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Emily White",
    role: "Head of Sales",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "David Green",
    role: "Marketing Director",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
]

export default function TeamGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">Meet Our Team</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Dedicated professionals working to bring you the best car selling and buying experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="w-full max-w-xs rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="relative w-full h-60">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                <p className="text-sm text-gray-600">{member.role}</p>
              </CardHeader>
              <CardContent className="flex justify-center pt-0">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-yellow-500 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn profile of {member.name}</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
