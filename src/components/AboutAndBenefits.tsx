"use client";

import { useState } from "react";
import { ChevronDown, Award, Shield, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip: string;
}

const benefits: BenefitCard[] = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Quality Wheat",
    description: "Premium durum wheat sourced from trusted farmers",
    tooltip: "Carefully selected wheat varieties for superior taste and nutrition"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Hygienic Packaging",
    description: "Food-grade materials with sealed freshness",
    tooltip: "Advanced packaging technology ensuring product safety and longevity"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Affordable Rates",
    description: "Competitive pricing for households and businesses",
    tooltip: "Best value proposition without compromising on quality"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Shopkeeper Support",
    description: "Dedicated assistance for retail partners",
    tooltip: "Comprehensive support including marketing materials and flexible terms"
  }
];

export default function AboutAndBenefits() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Brand Story Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-brown">
                About Macronica
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  At Macronica, we bridge the gap between bulk wholesale and convenient retail. We purchase premium pasta in large 75kg industrial packs and carefully repackage them into convenient 100g, 500g, and 1kg sizes perfect for households and small shopkeepers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is simple: make high-quality pasta accessible and affordable for every Indian family while supporting local shopkeepers with flexible wholesale options.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From our hygienic repackaging facility, we ensure that every gram of pasta maintains its quality, freshness, and nutritional value from bulk to bite.
                </p>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      Our state-of-the-art repackaging facility maintains the highest standards of food safety and hygiene. Every 20kg bulk pack is carefully portioned into smaller consumer-friendly sizes using automated, food-grade packaging equipment.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By buying directly from mills in bulk quantities, we eliminate middlemen costs and pass those savings directly to our customers. This direct relationship allows us to guarantee competitive prices without compromising on quality.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, we serve over 1,000 shopkeepers across the region and thousands of families who trust Macronica for consistent quality, hygiene, and value in every pack.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="text-brown border-golden hover:bg-golden hover:text-brown">
                      Download Quality Certificate
                    </Button>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 p-0 text-golden hover:text-golden/80 font-medium group"
              >
                {isExpanded ? "Read less" : "Read full story"}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
              </Button>
            </div>

            {/* Supporting Image */}
            <div className="mt-8 rounded-lg overflow-hidden border border-golden/20">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/rustic-italian-market-background-with-go-6be62144-20250902054716.jpg"
                alt="Rustic Italian market atmosphere with golden wheat and pasta elements representing authentic pasta heritage"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Benefits Column */}
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-brown">
              Why Choose Macronica
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="relative">
                  <Card
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-golden/20 hover:border-golden/40 bg-card"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onFocus={() => setHoveredCard(index)}
                    onBlur={() => setHoveredCard(null)}
                    tabIndex={0}
                    role="button"
                    aria-describedby={`tooltip-${index}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-2 bg-golden/10 rounded-lg text-golden">
                          {benefit.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-brown text-lg mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tooltip */}
                  {hoveredCard === index && (
                    <div
                      id={`tooltip-${index}`}
                      className="absolute left-0 right-0 top-full mt-2 z-10 animate-in fade-in-0 slide-in-from-top-2 duration-200"
                      role="tooltip"
                    >
                      <div className="bg-brown text-cream text-sm px-4 py-2 rounded-lg shadow-lg">
                        <div className="absolute -top-1 left-6 w-2 h-2 bg-brown rotate-45"></div>
                        {benefit.tooltip}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}