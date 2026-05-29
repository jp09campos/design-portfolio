import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#080808] grain">
      <Navbar />

      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
