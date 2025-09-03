"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

// ✅ Centralized Contact Information
const CONTACT_INFO = {
  email: "info@sahindtech.com",
  phone: "+91 97929 49822",
  whatsapp: "+91 97929 49822",
  address: "Address: B-2013, Indira Nagar Rd, opposite of PNB, B Block, Indira Nagar, Lucknow, Uttar Pradesh 226016",
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // ✅ Success message (after submission)
  if (isSubmitted) {
    return (
      <section className="bg-white text-gray-800 py-16 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg mb-6">
            Your message has been sent successfully. We will get back to you
            shortly.
          </p>
          <div className="text-left bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p>Email: {CONTACT_INFO.email}</p>
            <p>Phone: {CONTACT_INFO.phone}</p>
            <p>WhatsApp: {CONTACT_INFO.whatsapp}</p>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-golden flex-shrink-0" />
              Address: {CONTACT_INFO.address}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Default contact form (before submission)
  return (
    <section className="bg-white text-gray-800 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-8 text-lg">
            Have a question, feedback, or partnership idea? We’d love to hear
            from you. Our team is here to help.
          </p>

          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-golden" />
              <span>Email: {CONTACT_INFO.email}</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-golden" />
              <span>Phone: {CONTACT_INFO.phone}</span>
            </p>
            <p className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-golden" />
              <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-golden flex-shrink-0 mt-1" />
              <span>Address: {CONTACT_INFO.address}</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-8 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label className="block mb-2 font-medium">Your Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Your Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-golden text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
