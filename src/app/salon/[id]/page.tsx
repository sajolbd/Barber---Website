"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSalons } from "@/context/SalonContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import TeamSection from "@/components/TeamSection";
import ProductsSection from "@/components/ProductsSection";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { ArrowLeft, Building2, MapPin, Star } from "lucide-react";

export default function SalonStorefrontPage() {
  const params = useParams();
  const router = useRouter();
  const salonId = params?.id as string;
  const { getSalonById } = useSalons();
  const salon = getSalonById(salonId);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Executive Precision Cut");
  const [selectedBarber, setSelectedBarber] = useState("Any Available Barber");

  if (!salon) {
    return (
      <main className="min-h-screen bg-[#070707] text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <Building2 className="w-16 h-16 text-yellow-500 mx-auto" />
          <h1 className="font-serif-heading text-3xl font-bold text-white">Salon Not Found</h1>
          <p className="text-zinc-400 text-xs">
            The salon you are trying to visit does not exist or has been removed from the platform.
          </p>
          <Link
            href="/"
            className="btn-gold-glow inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-black uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </main>
    );
  }

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleSelectBarber = (barberName: string) => {
    setSelectedBarber(barberName);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#070707] text-zinc-100 flex flex-col relative">
      {/* Top Floating Marketplace Bar - Redesigned Premium Glassmorphism Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between shadow-2xl transition-all">
        {/* Back to All Salons Pill */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/40 text-xs font-bold transition-all group shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-yellow-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Salons</span>
        </Link>

        {/* Active Salon Brand & Live Status Badges */}
        <div className="flex items-center gap-2.5">
          {/* Live Status Pulse Badge */}
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider hidden sm:inline">LIVE PARTNER</span>
            <span className="text-white font-bold tracking-wide">{salon.name}</span>
          </div>

          {/* Location Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-yellow-500" />
            <span>{salon.city}</span>
          </div>

          {/* Rating Badge */}
          {salon.rating && (
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>{salon.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Salon Specific Header */}
        <Navbar onOpenBooking={handleOpenBooking} salonName={salon.name} hasTopBar={true} />

        {/* Salon Hero */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          salonName={salon.name}
          tagline={salon.tagline}
          address={salon.address}
        />

        {/* Salon About */}
        <AboutSection />

        {/* Salon Services */}
        <ServicesSection customServices={salon.services} onSelectService={handleSelectService} />

        {/* Salon Gallery */}
        <GallerySection />

        {/* Salon Team */}
        <TeamSection onSelectBarber={handleSelectBarber} />

        {/* Salon Products (if available) */}
        {salon.products && salon.products.length > 0 && <ProductsSection />}

        {/* Footer */}
        <Footer />

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialService={selectedService}
          initialBarber={selectedBarber}
          availableServices={salon.services.map((s) => ({ name: s.title || s.name || "Service", price: s.price }))}
        />
      </div>
    </main>
  );
}
