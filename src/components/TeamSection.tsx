"use client";

import Image from "next/image";
import { Users, Scissors, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface TeamSectionProps {
  onSelectBarber: (barberName: string) => void;
}

export default function TeamSection({ onSelectBarber }: TeamSectionProps) {
  const barbers = [
    {
      id: "b1",
      name: "Alexander Ross",
      role: "Lead Master Barber",
      experience: "14 Years Exp.",
      specialty: "Precision Fades & Tapers",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
      bio: "Trained in London and Milan. Specialist in sharp razor line-ups and modern drop fades.",
    },
    {
      id: "b2",
      name: "Marcus Vance",
      role: "Beard Specialist",
      experience: "10 Years Exp.",
      specialty: "Royal Hot Towel Shaves & Beard Art",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      bio: "Craftsman of luxurious beard treatments and classic straight razor shaves.",
    },
    {
      id: "b3",
      name: "David Sterling",
      role: "Senior Stylist",
      experience: "8 Years Exp.",
      specialty: "Gentleman Pompadours & Hair Color",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      bio: "Expert in vintage scissor cuts, grey blending, and textured executive styling.",
    },
  ];

  return (
    <section className="py-24 bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>Craftsmen & Artisans</span>
          </div>
          <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Meet Our Master <br />
            <span className="text-yellow-500 italic">Barbers</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Seasoned professionals dedicated to perfecting your signature style.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-6 rounded-3xl flex flex-col justify-between glass-card-hover group border border-zinc-800"
            >
              <div>
                {/* Photo container */}
                <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-yellow-400 text-[10px] font-bold">
                      {barber.experience}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>{barber.role}</span>
                </div>

                <h3 className="font-serif-heading text-2xl font-bold text-white mb-2">
                  {barber.name}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  {barber.bio}
                </p>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/60 mb-6 flex items-center gap-2 text-[11px] text-zinc-300">
                  <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span>Specialty: {barber.specialty}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectBarber(barber.name)}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-yellow-500 text-zinc-200 hover:text-black border border-zinc-800 hover:border-yellow-500 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book with {barber.name.split(" ")[0]}</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
