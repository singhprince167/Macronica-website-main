"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CookingPot, 
  Images, 
  TextQuote, 
  GalleryHorizontal,
  Utensils,
  Clock,
  ChefHat
} from "lucide-react";
import { toast } from "sonner";

interface ServingIdea {
  id: string;
  title: string;
  image: string;
  description: string;
  prepTime: string;
  servingTips: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  message: string;
  avatar?: string;
}

const mockServingIdeas: ServingIdea[] = [
  {
    id: "1",
    title: "Classic Italian Style",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/high-quality-raw-macaroni-pasta-tubes-in-029e30d5-20250902054727.jpg",
    description: "Perfect pasta preparation for authentic Italian dishes with our premium macaroni tubes",
    prepTime: "8-10 mins",
    servingTips: [
      "Boil in salted water until al dente",
      "Reserve pasta water for sauce consistency", 
      "Toss with quality olive oil and herbs"
    ]
  },
  {
    id: "2", 
    title: "Family Meal Portions",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/premium-pasta-packaging-photography-show-02a79ba0-20250902054705.jpg",
    description: "Convenient 500g packs perfect for family dinners and gatherings",
    prepTime: "10-12 mins",
    servingTips: [
      "Ideal serving size for 4-6 people",
      "Combine with seasonal vegetables",
      "Add protein for complete nutrition"
    ]
  },
  {
    id: "3",
    title: "Quick Weeknight Solutions",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/professional-product-photography-of-prem-4e4361ef-20250902054653.jpg",
    description: "Small 100g packs for individual portions and quick meal preparation",
    prepTime: "6-8 mins",
    servingTips: [
      "Perfect for single servings",
      "Great for meal prep containers",
      "Ideal for children's lunch boxes"
    ]
  },
  {
    id: "4",
    title: "Restaurant Quality", 
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/rustic-italian-market-background-with-go-6be62144-20250902054716.jpg",
    description: "Bulk quantities for professional kitchens and large-scale cooking",
    prepTime: "12-15 mins",
    servingTips: [
      "Consistent cooking times for large batches",
      "Maintains texture under heat lamps",
      "Excellent sauce absorption"
    ]
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Grocery Store Owner",
    location: "Mumbai, Maharashtra",
    message: "My customers love the quality of Macronica pasta and my margins are excellent. It has become our bestselling pasta brand!",
    avatar: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2", 
    name: "Priya Sharma",
    role: "Home Cook",
    location: "Delhi, NCR",
    message: "Perfect texture every time I cook it. My family can taste the difference in quality - worth every rupee spent.",
    avatar: "https://media.istockphoto.com/id/678420912/photo/portrait-of-an-indian-lady-teacher.jpg?s=2048x2048&w=is&k=20&c=DX5L4J6Et8RR5DCQ7LPU0vK64w_w_ERZd3T7QnHulm8="
  },
  {
    id: "3",
    name: "Mohammed Ali",
    role: "Restaurant Owner", 
    location: "Hyderabad, Telangana",
    message: "Consistent quality for our restaurant dishes. Customers regularly compliment our pasta preparations.",
    avatar: "https://images.unsplash.com/photo-1667104445036-a3bd1c8333f5?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "4",
    name: "Lakshmi Nair",
    role: "Homemaker",
    location: "Kochi, Kerala", 
    message: "Easy to cook and my children love the taste. Great value for money compared to other pasta brands.",
    avatar: "https://media.istockphoto.com/id/1205299877/photo/portrait-of-confident-woman-in-sari.jpg?s=2048x2048&w=is&k=20&c=EMBVt0NySEOzjxXr2uDvF5FQQji3bNGB84YMNf9Y34w="
  }
];

export default function InspirationRecipesAndTestimonials() {
  const [servingIdeas] = useState<ServingIdea[]>(mockServingIdeas);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [selectedIdea, setSelectedIdea] = useState<ServingIdea | null>(null);
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "", 
    location: "",
    message: ""
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>(null);

  // Auto-advance testimonials
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentTestimonialIndex((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  const handleIdeaClick = (idea: ServingIdea) => {
    setSelectedIdea(idea);
    setIsIdeaModalOpen(true);
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...testimonialForm
      };

      setTestimonials(prev => [newTestimonial, ...prev]);
      setTestimonialForm({ name: "", role: "", location: "", message: "" });
      setIsTestimonialModalOpen(false);
      
      toast.success("Thank you for your testimonial! It has been added successfully.");
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextTestimonial = () => {
    goToTestimonial(currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1);
  };

  const prevTestimonial = () => {
    goToTestimonial(currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1);
  };

  return (
    <section className="w-full bg-cream/20 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Serving Ideas & Preparation Tips */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ChefHat className="h-6 w-6 text-golden" />
              <Badge className="px-3 py-1 bg-golden/20 text-brown border-golden/30">
                Serving Ideas
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brown mb-4">
              Perfect Pasta Preparation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the best ways to prepare and serve our premium pasta for authentic taste and perfect texture every time.
            </p>
          </div>

          {/* Serving Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {servingIdeas.map((idea) => (
              <Card 
                key={idea.id} 
                className="group cursor-pointer overflow-hidden border-golden/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-golden/40"
                onClick={() => handleIdeaClick(idea)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={idea.image}
                    alt={`${idea.title} - Premium Macronica pasta showcase`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-golden/90 text-brown border-none">
                      <Clock className="h-3 w-3 mr-1" />
                      {idea.prepTime}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-3 text-brown group-hover:text-golden transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {idea.description}
                  </p>
                  <div className="flex items-center gap-2 text-golden text-sm font-medium">
                    <Utensils className="h-4 w-4" />
                    View Tips
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TextQuote className="h-6 w-6 text-golden" />
              <Badge className="px-3 py-1 bg-golden/20 text-brown border-golden/30">
                Customer Stories
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brown mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from shopkeepers and families who trust Macronica for consistent quality and authentic taste.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative mb-8">
            <div 
              ref={carouselRef}
              className="overflow-hidden rounded-lg"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="w-full flex-shrink-0 border-golden/20 bg-card">
                    <CardContent className="p-8 text-center">
                      <div className="flex items-center justify-center mb-6">
                        <Avatar className="h-16 w-16 border-2 border-golden/30">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-golden text-brown text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <blockquote className="text-lg md:text-xl text-brown mb-6 font-medium leading-relaxed">
                        "{testimonial.message}"
                      </blockquote>
                      <div className="text-center">
                        <div className="font-semibold text-brown">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card border border-golden/20 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105"
                  aria-label="Previous testimonial"
                >
                  <GalleryHorizontal className="h-5 w-5 rotate-180 text-golden" />
                </button>
                <button
                  onClick={nextTestimonial} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card border border-golden/20 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105"
                  aria-label="Next testimonial"
                >
                  <GalleryHorizontal className="h-5 w-5 text-golden" />
                </button>
              </>
            )}

            {/* Carousel Indicators */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTestimonialIndex 
                        ? 'bg-golden w-6' 
                        : 'bg-golden/30 hover:bg-golden/60'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Write Testimonial CTA */}
          <div className="text-center">
            <Dialog open={isTestimonialModalOpen} onOpenChange={setIsTestimonialModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-golden text-brown hover:bg-golden/90" size="lg">
                  <TextQuote className="h-5 w-5" />
                  Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-brown">Share Your Macronica Experience</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-brown">Your Name</Label>
                    <Input
                      id="name"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="Enter your full name"
                      className="border-golden/30 focus:border-golden"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-brown">Role</Label>
                    <Input
                      id="role"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                      required
                      placeholder="e.g., Home Cook, Store Owner"
                      className="border-golden/30 focus:border-golden"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-brown">Location</Label>
                    <Input
                      id="location"
                      value={testimonialForm.location}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, location: e.target.value }))}
                      required
                      placeholder="City, State"
                      className="border-golden/30 focus:border-golden"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-brown">Your Experience</Label>
                    <Textarea
                      id="message"
                      value={testimonialForm.message}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      placeholder="Share your experience with Macronica pasta..."
                      rows={4}
                      className="border-golden/30 focus:border-golden"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsTestimonialModalOpen(false)} className="border-golden/30 text-brown hover:bg-golden/10">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-golden text-brown hover:bg-golden/90">
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Serving Idea Detail Modal */}
        <Dialog open={isIdeaModalOpen} onOpenChange={setIsIdeaModalOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedIdea && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-brown">{selectedIdea.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <img
                    src={selectedIdea.image}
                    alt={selectedIdea.title}
                    className="w-full h-64 object-cover rounded-lg border border-golden/20"
                  />
                  
                  <div className="flex items-center gap-4">
                    <Badge className="gap-1 bg-golden/20 text-brown border-golden/30">
                      <Clock className="h-4 w-4" />
                      {selectedIdea.prepTime}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {selectedIdea.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-brown">Preparation Tips</h3>
                    <ul className="space-y-3">
                      {selectedIdea.servingTips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-golden text-brown rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-golden/20">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedIdea.title,
                            text: `Check out this pasta serving idea: ${selectedIdea.title}`,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success("Serving idea link copied to clipboard!");
                        }
                      }}
                      className="border-golden/30 text-brown hover:bg-golden/10"
                    >
                      Share Idea
                    </Button>
                    <Button onClick={() => setIsIdeaModalOpen(false)} className="bg-golden text-brown hover:bg-golden/90">
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}