"use client";

import { useState } from "react";
import { Scissors, Clock, Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServicesSectionProps {
  onSelectService: (serviceName: string, price: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "haircut", label: "Haircuts" },
    { id: "beard", label: "Beard Care" },
    { id: "shave", label: "Royal Shaves" },
    { id: "packages", label: "VIP Packages" },
  ];

  const services = [
    {
      id: "1",
      category: "haircut",
      title: "Executive Precision Cut",
      price: "$45",
      duration: "45 mins",
      featured: true,
      description: "Consultation, custom tailored haircut, neck shave, scalp massage, and precision hot towel finish.",
      features: ["Personal Consultation", "Precision Fade / Scissors", "Neck Razor Finish", "Styling & Pomade"],
    },
    {
      id: "2",
      category: "beard",
      title: "Beard Sculpting & Trim",
      price: "$30",
      duration: "30 mins",
      featured: false,
      description: "Detailed beard shaping, cheek line razor edge, condition oil treatment, and hot towel treatment.",
      features: ["Custom Shape & Lineup", "Warm Oil Hydration", "Straight Razor Detailing", "Balm Styling"],
    },
    {
      id: "3",
      category: "shave",
      title: "Royal Hot Towel Shave",
      price: "$40",
      duration: "35 mins",
      featured: false,
      description: "Traditional 7-step straight razor shave with essential oils, pre-shave cream, and cold towel close.",
      features: ["Steamed Essential Oil Towels", "Rich Lather Cream", "Dual-Pass Razor Shave", "Soothing Aftershave"],
    },
    {
      id: "4",
      category: "packages",
      title: "The Elite Master Groom",
      price: "$95",
      duration: "90 mins",
      featured: true,
      description: "The complete luxury experience: Signature Cut, Full Beard Sculpting, Scalp Scrub, & Charcoal Facial.",
      features: ["Full Precision Cut", "Beard Sculpt & Shave", "Deep Scalp Detox", "Charcoal Face Mask & Drink"],
    },
    {
      id: "5",
      category: "haircut",
      title: "Junior Champion Cut",
      price: "$30",
      duration: "30 mins",
      featured: false,
      description: "Gentle, stylish cuts for young gentlemen (under 12) with complimentary soft drink and styling.",
      features: ["Patient Hair Styling", "Fun Environment", "Wash & Blowout", "Complimentary Treat"],
    },
    {
      id: "6",
      category: "beard",
      title: "Grey Blending & Color",
      price: "$50",
      duration: "40 mins",
      featured: false,
      description: "Subtle, natural-looking grey hair or beard blending using premium ammonia-free formulas.",
      features: ["Natural Ammonia-Free Dye", "Beard or Hair Application", "100% Seamless Blend", "Long Lasting Tone"],
    },
  ];

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
            <Scissors className="w-3.5 h-3.5" />
            <span>Our Menu & Pricing</span>
          </div>
          <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Crafted Services for the <br />
            <span className="text-yellow-500 italic">Modern Gentleman</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Every service includes a personalized consultation, neck shave, and premium styling finish.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between glass-card-hover ${
                service.featured ? "border-yellow-500/50 shadow-yellow-500/5" : ""
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-zinc-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {service.title}
                  </h3>
                  <span className="font-serif-heading text-2xl font-bold text-yellow-500">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                  <Clock className="w-3.5 h-3.5 text-yellow-500/80" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-2.5 mb-8 border-t border-zinc-800/80 pt-6">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-yellow-400" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectService(service.title, service.price)}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-zinc-800 hover:border-yellow-500 text-zinc-200 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <span>Book This Cut</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
