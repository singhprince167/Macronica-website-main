import HeroBanner from "@/components/HeroBanner";
import AboutAndBenefits from "@/components/AboutAndBenefits";
import ProductShowcase from "@/components/ProductShowcase";
import WholesaleZone from "@/components/WholesaleZone";
import InspirationRecipesAndTestimonials from "@/components/InspirationRecipesAndTestimonials";
import ContactAndFooter from "@/components/ContactAndFooter";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      
      
      {/* Hero Section */}
      <section id="hero" className="scroll-mt-16">
        <HeroBanner />
      </section>

      {/* About & Benefits Section */}
      <section id="about" className="scroll-mt-16">
        <AboutAndBenefits />
      </section>

      {/* Product Showcase Section */}
      <section id="products" className="scroll-mt-16">
        <ProductShowcase />
      </section>

      {/* Wholesale Zone Section */}
      <section id="wholesale" className="scroll-mt-16">
        <WholesaleZone />
      </section>

      {/* Recipes & Testimonials Section */}
      <section id="recipes" className="scroll-mt-16">
        <InspirationRecipesAndTestimonials />
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" className="scroll-mt-16">
        <ContactAndFooter />
      </section>
    </main>
  );
}