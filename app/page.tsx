import HeroSlider from "@/components/HeroSlider"
import AboutSection from "@/components/AboutSection"
import HomeFeatureSection from "@/components/HomeFeatureSection"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is rendered in app/layout.tsx */}
      <HeroSlider />
      <HomeFeatureSection />
      <AboutSection />
      {/* Footer and Toaster are rendered in app/layout.tsx */}
    </div>
  )
}
