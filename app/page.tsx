import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <Footer />
    </main>
  )
}
