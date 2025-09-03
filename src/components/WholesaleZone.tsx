"use client";

import { useState } from "react";
import { Check, Store, Handshake, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  monthlyQuantity: string;
  comments: string;
  termsAccepted: boolean;
}

interface SamplePackData {
  name: string;
  phone: string;
  address: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function WholesaleZone() {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    monthlyQuantity: "",
    comments: "",
    termsAccepted: false,
  });

  const [samplePackData, setSamplePackData] = useState<SamplePackData>({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [samplePackErrors, setSamplePackErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSamplePackSubmitting, setIsSamplePackSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSamplePackForm, setShowSamplePackForm] = useState(false);
  const [showSamplePackSuccess, setShowSamplePackSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSamplePackForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!samplePackData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!samplePackData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(samplePackData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!samplePackData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setSamplePackErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstError);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      toast.success("Partnership application received! We'll contact you within 24 hours.");
      
      // Clear form
      setFormData({
        businessName: "",
        contactName: "",
        phone: "",
        email: "",
        city: "",
        monthlyQuantity: "",
        comments: "",
        termsAccepted: false,
      });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSamplePackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSamplePackForm()) {
      return;
    }

    setIsSamplePackSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSamplePackSuccess(true);
      toast.success("Sample pack request received! We'll ship it within 2-3 business days.");
      
      // Clear sample pack form
      setSamplePackData({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      toast.error("Failed to request sample pack. Please try again.");
    } finally {
      setIsSamplePackSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSamplePackInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSamplePackData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (samplePackErrors[name]) {
      setSamplePackErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <section className="bg-cream/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brown mb-4">
            Wholesale & Shopkeeper Zone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exclusive pasta pricing and partnership opportunities for retailers, distributors, and shop owners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Exclusive Deals Summary */}
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-golden/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-golden/20 p-2 rounded-lg">
                  <Store className="h-6 w-6 text-golden" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-brown">Wholesale Pricing</h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-golden/20">
                <table className="w-full">
                  <thead className="bg-golden/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-brown">Package</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-brown">Retail Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-brown">Wholesale Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-brown">Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-golden/20">
                    <tr>
                      <td className="px-4 py-3 font-medium text-brown">100g Pack</td>
                      <td className="px-4 py-3 text-muted-foreground">₹45</td>
                      <td className="px-4 py-3 font-semibold text-golden">₹38</td>
                      <td className="px-4 py-3 text-basil font-medium">₹7</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-brown">500g Pack</td>
                      <td className="px-4 py-3 text-muted-foreground">₹180</td>
                      <td className="px-4 py-3 font-semibold text-golden">₹155</td>
                      <td className="px-4 py-3 text-basil font-medium">₹25</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-brown">1kg Pack</td>
                      <td className="px-4 py-3 text-muted-foreground">₹320</td>
                      <td className="px-4 py-3 font-semibold text-golden">₹275</td>
                      <td className="px-4 py-3 text-basil font-medium">₹45</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-brown">20kg Bulk</td>
                      <td className="px-4 py-3 text-muted-foreground">₹5,800</td>
                      <td className="px-4 py-3 font-semibold text-golden">₹4,200</td>
                      <td className="px-4 py-3 text-basil font-medium">₹1,600</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-brown">Additional Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-basil flex-shrink-0" />
                    Free delivery for orders above ₹2,000
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-basil flex-shrink-0" />
                    30-day payment terms for verified partners
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-basil flex-shrink-0" />
                    Marketing support and POS materials
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-basil flex-shrink-0" />
                    Dedicated account manager
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-golden/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-brown">Need a sample?</h4>
                  <button
                    onClick={() => setShowSamplePackForm(!showSamplePackForm)}
                    className="text-sm font-medium text-golden hover:text-golden/80 transition-colors"
                  >
                    {showSamplePackForm ? 'Cancel' : 'Request Sample Pack'}
                  </button>
                </div>

                {showSamplePackForm && !showSamplePackSuccess && (
                  <form onSubmit={handleSamplePackSubmit} className="mt-4 space-y-4 bg-cream/30 p-4 rounded-lg border border-golden/20">
                    <div>
                      <label htmlFor="sample-name" className="block text-sm font-medium text-brown mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="sample-name"
                        name="name"
                        value={samplePackData.name}
                        onChange={handleSamplePackInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown text-sm focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!samplePackErrors.name}
                      />
                      {samplePackErrors.name && (
                        <p className="mt-1 text-sm text-tomato">{samplePackErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="sample-phone" className="block text-sm font-medium text-brown mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="sample-phone"
                        name="phone"
                        value={samplePackData.phone}
                        onChange={handleSamplePackInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown text-sm focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!samplePackErrors.phone}
                      />
                      {samplePackErrors.phone && (
                        <p className="mt-1 text-sm text-tomato">{samplePackErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="sample-address" className="block text-sm font-medium text-brown mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        id="sample-address"
                        name="address"
                        value={samplePackData.address}
                        onChange={handleSamplePackInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown text-sm focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden resize-none"
                        aria-invalid={!!samplePackErrors.address}
                      />
                      {samplePackErrors.address && (
                        <p className="mt-1 text-sm text-tomato">{samplePackErrors.address}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSamplePackSubmitting}
                      className="w-full bg-golden text-brown px-4 py-2 rounded-md font-medium text-sm hover:bg-golden/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSamplePackSubmitting ? 'Requesting...' : 'Request Sample Pack'}
                    </button>
                  </form>
                )}

                {showSamplePackSuccess && (
                  <div className="mt-4 bg-basil/10 border border-basil/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CircleCheckBig className="h-5 w-5 text-basil" />
                      <h4 className="font-semibold text-basil">Sample Pack Requested!</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your pasta sample pack will be shipped within 2-3 business days. We'll send you tracking details via SMS.
                    </p>
                    <button
                      onClick={() => {
                        setShowSamplePackSuccess(false);
                        setShowSamplePackForm(false);
                      }}
                      className="mt-3 text-sm font-medium text-golden hover:text-golden/80 transition-colors"
                    >
                      Request Another Sample
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-golden/20">
              <h4 className="font-semibold text-brown mb-4">Frequently Asked Questions</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-brown mb-1">What's the minimum order quantity?</p>
                  <p className="text-muted-foreground">Just 10 units to start. No huge commitments required for quality pasta.</p>
                </div>
                <div>
                  <p className="font-medium text-brown mb-1">How quickly can I get pasta stock?</p>
                  <p className="text-muted-foreground">2-5 business days depending on your location and order size.</p>
                </div>
                <div>
                  <p className="font-medium text-brown mb-1">Do you provide marketing materials?</p>
                  <p className="text-muted-foreground">Yes! We provide shelf talkers, posters, and digital assets for pasta promotion.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Form */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-golden/20">
            {!showSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-brown/10 p-2 rounded-lg">
                    <Handshake className="h-6 w-6 text-brown" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-brown">Become a Partner</h3>
                    <p className="text-sm text-muted-foreground">Join our growing network of pasta retailers</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-brown mb-2">
                        Business / Shop Name *
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!errors.businessName}
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-sm text-tomato">{errors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-brown mb-2">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!errors.contactName}
                      />
                      {errors.contactName && (
                        <p className="mt-1 text-sm text-tomato">{errors.contactName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brown mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-tomato">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brown mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-tomato">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-brown mb-2">
                        City / Town
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                      />
                    </div>

                    <div>
                      <label htmlFor="monthlyQuantity" className="block text-sm font-medium text-brown mb-2">
                        Expected Monthly Quantity
                      </label>
                      <select
                        id="monthlyQuantity"
                        name="monthlyQuantity"
                        value={formData.monthlyQuantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden"
                      >
                        <option value="">Select quantity</option>
                        <option value="10-50">10-50 units</option>
                        <option value="50-100">50-100 units</option>
                        <option value="100-500">100-500 units</option>
                        <option value="500+">500+ units</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-brown mb-2">
                      Comments / Notes
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-golden/30 rounded-md bg-card text-brown focus:outline-none focus:ring-2 focus:ring-golden focus:border-golden resize-none"
                      placeholder="Tell us about your business, target customers, or any specific pasta requirements..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-golden border-golden/30 rounded focus:ring-golden"
                      aria-invalid={!!errors.termsAccepted}
                    />
                    <label htmlFor="termsAccepted" className="text-sm text-brown">
                      I agree to the <span className="text-golden font-medium">terms and conditions</span> and 
                      <span className="text-golden font-medium"> privacy policy</span> *
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-sm text-tomato">{errors.termsAccepted}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brown text-cream px-6 py-3 rounded-md font-medium hover:bg-brown/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Partnership Application'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="bg-basil/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CircleCheckBig className="h-8 w-8 text-basil" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-brown mb-4">
                  Application Received!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in partnering with Macronica. Our partnership team will review your 
                  application and contact you within 24 hours to discuss pasta wholesale opportunities.
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-brown">What happens next?</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Partnership team review (within 24 hours)</li>
                    <li>• Initial discussion call</li>
                    <li>• Sample pasta pack and pricing details</li>
                    <li>• Account setup and onboarding</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open('/wholesale-price-sheet.pdf', '_blank');
                      }
                    }}
                    className="flex-1 bg-golden text-brown px-4 py-2 rounded-md font-medium text-sm hover:bg-golden/90 transition-colors"
                  >
                    Download Price Sheet
                  </button>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex-1 bg-cream text-brown px-4 py-2 rounded-md font-medium text-sm hover:bg-cream/80 transition-colors border border-golden/20"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}