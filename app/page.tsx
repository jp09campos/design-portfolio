import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import CertificatesSection from '@/components/sections/CertificatesSection'
import RecommendationsSection from '@/components/sections/RecommendationsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#080808] grain">
      <Navbar />

      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <details className="border-y border-white/15 py-5">
            <summary className="cursor-pointer text-white/80 font-medium">Explore education & certifications</summary>
            <CertificatesSection />
          </details>
        </div>
        <RecommendationsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
