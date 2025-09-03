"use client";

import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBannerProps {
  className?: string;
  onShopNowClick?: () => void;
  onPartnerClick?: () => void;
}

const benefits = [
  "Hygienic Repackaging",
  "Affordable Packs", 
  "Trusted by Local Shops"
];

export default function HeroBanner({ 
  className = "", 
  onShopNowClick,
  onPartnerClick 
}: HeroBannerProps) {
  const handleShopNow = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
    onShopNowClick?.();
  };

  const handlePartnerClick = () => {
    const wholesaleSection = document.getElementById('wholesale');
    if (wholesaleSection) {
      wholesaleSection.scrollIntoView({ behavior: 'smooth' });
    }
    onPartnerClick?.();
  };

  return (
    <section 
      className={`relative w-full bg-background overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-hero leading-tight"
              >
                Premium Pasta for Every Store & Home
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                From 75kg wholesale packs to convenient 100g retail sizes. Quality wheat pasta crafted with care, available in convenient retail packs and wholesale quantities for shopkeepers.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleShopNow}
                className="bg-golden text-brown hover:bg-golden/90 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Shop pasta products now"
              >
                Shop Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handlePartnerClick}
                className="border-2 border-brown text-brown hover:bg-brown hover:text-cream font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Become a wholesale partner"
              >
                <Store className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
            </div>

            {/* Benefit Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="bg-cream border border-golden rounded-full px-4 py-2 text-sm font-medium text-brown shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8 + (index * 0.1),
                    ease: "easeOut" 
                  }}
                >
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-golden/20">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/professional-product-photography-of-prem-4e4361ef-20250902054653.jpg"
                alt="Premium Macronica pasta products showcasing different package sizes from 100g to 1kg with quality packaging"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                loading="eager"
              />
              
              {/* Overlay gradient for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent" />
              
              {/* Premium Quality Badge */}
              <div className="absolute top-4 right-4 bg-golden text-brown px-3 py-2 rounded-full text-sm font-semibold shadow-md">
                Premium Quality
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}