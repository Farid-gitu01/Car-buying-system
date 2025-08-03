import HeroSlider from "@/components/HeroSlider"
import HomeFeatureSection from "@/components/HomeFeatureSection"
import AboutSection from "@/components/AboutSection" // Import the AboutSection

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <HomeFeatureSection />
      <AboutSection /> {/* Added the AboutSection here */}
    </div>
  )
}
