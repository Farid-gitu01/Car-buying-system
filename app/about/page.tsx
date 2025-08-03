import AboutSection from "@/components/AboutSection" // Existing AboutSection
import Mission from "@/components/About/Mission"
import Timeline from "@/components/About/Timeline"
import WhyChooseUs from "@/components/About/WhyChooseUs"
import TeamGrid from "@/components/About/TeamGrid"

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Existing AboutSection can be kept or replaced by the new components */}
      {/* For now, I'll include it as per previous context, but the new components provide more detail */}
      <AboutSection />
      <Mission />
      <Timeline />
      <WhyChooseUs />
      <TeamGrid />
    </div>
  )
}
