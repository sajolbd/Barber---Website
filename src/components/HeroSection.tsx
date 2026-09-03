"use client";

import Image from "next/image";
import { Star, Scissors, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const reviews = [
    {
      id: 1,
      name: "Medite Ranija",
      role: "Business Man",
      rating: 5,
      comment:
        "Even if this is their newest product, I see it's already powerful. I'm sure they will continue to deliver updates and features in the coming months and years!",
      avatar: "/images/avatar1.png",
    },
    {
      id: 2,
      name: "Medite Ranija",
      role: "Business Man",
      rating: 5,
      comment:
        "Even if this is their newest product, I see it's already powerful. I'm sure they will continue to deliver updates and features in the coming months and years!",
      avatar: "/images/avatar2.png",
    },
    {
      id: 3,
      name: "Medite Ranija",
      role: "Business Man",
      rating: 5,
      comment:
        "Even if this is their newest product, I see it's already powerful. I'm sure they will continue to deliver updates and features in the coming months and years!",
      avatar: "/images/avatar3.png",
    },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-[#070707]">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Heading & Call to action (Cols 1 to 5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 text-left z-20"
          >
            <div className="relative">
              <h1 className="font-serif-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Real Cuts by Real <br />
                <span className="text-yellow-500 font-serif-heading italic">
                  Professionals
                </span>
              </h1>
            </div>

            <p className="text-zinc-400 text-base sm:text-lg max-w-lg font-normal leading-relaxed">
              Experience the art of grooming in our premium barbershop where
              tradition meets modern excellence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="btn-gold-glow px-8 py-4 rounded-xl font-bold text-sm tracking-wide text-zinc-950 flex items-center gap-3 transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>

          {/* Middle Column: Emblem Badge & Barber Hero Image (Cols 6 to 9) */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[450px] lg:min-h-[600px] z-10">
            {/* EST. 1998 Circular Emblem Badge (Matching exact design) */}
            <div className="absolute top-10 left-0 sm:left-4 z-20 pointer-events-none">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* SVG Circular Dashed Border with EST. 1998 text */}
                <svg
                  className="w-full h-full animate-spin-slow text-yellow-500/80"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text className="text-[10px] uppercase tracking-[0.25em] fill-yellow-400 font-bold">
                    <textPath href="#circlePath" startOffset="0%">
                      • EST. 1998 • PREMIUM BARBER
                    </textPath>
                  </text>
                </svg>
                {/* Center Scissors Icon */}
                <div className="absolute flex items-center justify-center p-2 rounded-full border border-yellow-500/40 bg-zinc-950/80">
                  <Scissors className="w-5 h-5 text-yellow-500 rotate-90" />
                </div>
              </div>
            </div>

            {/* Main Barber Cutout Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] flex items-end justify-center"
            >
              <div className="relative w-full h-full max-w-md">
                <Image
                  src="/images/barber-hero.png"
                  alt="Barber Elite Master Barber"
                  fill
                  priority
                  className="object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stacked Floating Review Cards (Cols 10 to 12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-4 flex flex-col justify-center z-20"
          >
            {reviews.map((rev, index) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className={`glass-card p-4 sm:p-5 rounded-2xl border border-zinc-800/80 shadow-2xl relative transition-all duration-300 hover:border-yellow-500/40 ${
                  index === 0 ? "scale-100 z-30 opacity-100" : index === 1 ? "scale-95 opacity-90" : "scale-90 opacity-75 hidden sm:block"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-yellow-500/30 flex-shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-zinc-400 text-[10px]">{rev.role}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-3">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
