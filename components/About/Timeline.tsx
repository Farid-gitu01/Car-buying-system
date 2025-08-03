import { CalendarCheck, Rocket, Users, Globe } from "lucide-react"

const timelineEvents = [
  {
    year: "2023",
    title: "Founded YeloCar",
    description: "Established with a vision to simplify car transactions.",
    icon: CalendarCheck,
  },
  {
    year: "2024",
    title: "Launched MVP",
    description: "Minimum Viable Product released to early adopters.",
    icon: Rocket,
  },
  { year: "2024", title: "Reached 1000 Users", description: "Celebrated our first major user milestone.", icon: Users },
  {
    year: "2025",
    title: "Future Expansion",
    description: "Planning to expand services globally and introduce new features.",
    icon: Globe,
  },
]

export default function Timeline() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-500">Our Journey</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A brief history of YeloCar&apos;s milestones and growth.
          </p>
        </div>
        <div className="relative flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full hidden md:block" />

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center w-full my-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 flex justify-center md:justify-end px-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center md:text-right">
                  <h3 className="text-xl font-semibold text-yellow-600">{event.year}</h3>
                  <h4 className="text-lg font-medium text-gray-800 mt-2">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white flex-shrink-0 -mt-5 md:mt-0">
                <event.icon className="h-6 w-6" />
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-start px-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center md:text-left md:hidden">
                  <h3 className="text-xl font-semibold text-yellow-600">{event.year}</h3>
                  <h4 className="text-lg font-medium text-gray-800 mt-2">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
