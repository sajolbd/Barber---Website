"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Scissors, ArrowRight, Sparkles, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useSalons } from "@/context/SalonContext";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function MarketplaceHome() {
  const { salons } = useSalons();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Barbershop", "Hair Salon", "Beard & Shave", "Luxury Spa"];
  const cities = ["All", "Dhaka", "Chittagong", "New York", "Sylhet"];

  const filteredSalons = salons.filter((salon) => {
    const matchesSearch =
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === "All" || salon.city === selectedCity;
    const matchesCategory = selectedCategory === "All" || salon.category === selectedCategory;

    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#070707] text-zinc-100 flex flex-col pt-24">
      <MarketplaceNavbar />

      {/* Hero Search Section (Foodpanda Style Marketplace Banner) */}
      <section className="relative py-16 lg:py-24 bg-[#080808] border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Book Top Barbershops & Salons <br />
            <span className="text-yellow-500 italic">In Your Neighborhood</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover executive barbershops, modern fade studios, and luxury spas. Compare services, view portfolios, and book appointments instantly.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-2xl mx-auto relative">
            <div className="glass-card p-2 rounded-full border border-zinc-800 shadow-2xl flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-500 ml-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by salon name, service, or street address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm px-2 focus:outline-none placeholder:text-zinc-500"
              />
              <button className="btn-gold-glow px-6 py-3 rounded-full text-xs font-bold text-black uppercase tracking-wider flex-shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* City Selection Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="text-xs text-zinc-500 flex items-center mr-2">
              <MapPin className="w-3.5 h-3.5 inline mr-1 text-yellow-500" />
              City:
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCity === city
                    ? "bg-yellow-500 text-black font-bold shadow-md shadow-yellow-500/20"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salons Marketplace Grid Section */}
      <section className="py-16 bg-[#070707] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-900">
            <div>
              <h2 className="font-serif-heading text-2xl font-bold text-white">
                Available Salons & Barbershops ({filteredSalons.length})
              </h2>
              <p className="text-zinc-400 text-xs mt-1">
                Select a shop to visit its dedicated storefront and book services.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-zinc-800 text-yellow-400 border border-yellow-500/40"
                      : "bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Salons Cards Grid (Foodpanda Style) */}
          {filteredSalons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSalons.map((salon, index) => (
                <motion.div
                  key={salon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card rounded-3xl overflow-hidden border border-zinc-800 glass-card-hover group flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-56 w-full bg-zinc-900">
                      <Image
                        src={salon.coverImage}
                        alt={salon.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                      
                      {/* Top Status & Price Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Open Now
                        </span>

                        <span className="px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-yellow-500/40 text-xs font-bold text-yellow-400">
                          {salon.priceRange} • {salon.category}
                        </span>
                      </div>

                      {/* EST Emblem badge overlay */}
                      <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 bg-zinc-950/90 px-2.5 py-1 rounded-lg border border-zinc-800">
                          EST. {salon.estYear}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-serif-heading text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {salon.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/30">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{salon.rating}</span>
                          <span className="text-zinc-400 font-normal">({salon.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-xs italic mb-4">
                        &ldquo;{salon.tagline}&rdquo;
                      </p>

                      <div className="space-y-2 text-xs text-zinc-300 mb-6">
                        <div className="flex items-start gap-2 text-zinc-400">
                          <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>{salon.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Scissors className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          <span>{salon.services.length} Services Menu & Barber Staff Available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visit Storefront Action Footer */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/salon/${salon.id}`}
                      className="w-full py-3.5 rounded-2xl bg-zinc-900 hover:bg-yellow-500 text-zinc-200 hover:text-black border border-zinc-800 hover:border-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
                    >
                      <span>Visit Storefront & Book</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <Building2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No Salons Found</h3>
              <p className="text-zinc-400 text-xs max-w-sm mx-auto mt-1 mb-6">
                No barbershop matched your search query. Try searching for a different city or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("All");
                  setSelectedCategory("All");
                }}
                className="btn-gold-glow px-6 py-2.5 rounded-full text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Partner Registration Banner */}
          <div className="mt-24 glass-card p-8 sm:p-12 rounded-3xl border border-yellow-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>For Barbershop & Salon Owners</span>
              </div>
              <h3 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white">
                Want Your Salon Listed Here?
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Join our Barber SaaS partner network. Add your shop, manage online bookings, display custom services, and grow your client base.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="btn-gold-glow px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 flex-shrink-0"
            >
              <span>Add Your Salon Now</span>
              <CheckCircle2 className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
