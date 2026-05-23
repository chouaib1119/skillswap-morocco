import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SkillCategories from "@/components/landing/SkillCategories";
import FeaturedUsers from "@/components/landing/FeaturedUsers";
import Testimonials from "@/components/landing/Testimonials";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAP";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/layout/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <SkillCategories />
      <FeaturedUsers />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
