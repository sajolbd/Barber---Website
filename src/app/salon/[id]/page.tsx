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
import { ArrowLeft, Building2 } from "lucide-react";

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
      {/* Top Floating Marketplace Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 border-b border-zinc-800/80 px-4 py-2 text-xs flex items-center justify-between backdrop-blur-md">
        <Link
          href="/"
          className="text-zinc-400 hover:text-yellow-400 flex items-center gap-1.5 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Salons</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-300 font-bold">{salon.name}</span>
          <span className="text-zinc-500">({salon.city})</span>
        </div>
      </div>

      <div className="pt-8">
        {/* Salon Specific Header */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Salon Hero */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* Salon About */}
        <AboutSection />

        {/* Salon Services */}
        <ServicesSection onSelectService={handleSelectService} />

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
        />
      </div>
    </main>
  );
}
