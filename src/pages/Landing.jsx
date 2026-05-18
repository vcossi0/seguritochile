import SiteHeader from "../components/SiteHeader"
import HeroSection from "../components/landing/HeroSection"
import StatsSection from "../components/landing/StatsSection"
import ServicesSection from "../components/landing/ServicesSection"
import FAQSection from "../components/landing/FAQSection"
import GovernanceSection from "../components/landing/GovernanceSection"
import CTASection from "../components/landing/CTASection"
import WhatsAppFloat from "../components/landing/WhatsAppFloat"
import Footer from "../components/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <FAQSection />
        <GovernanceSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
