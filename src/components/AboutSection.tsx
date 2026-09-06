"use client";

import Image from "next/image";
import { ShieldCheck, Award, Users, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { label: "Years Experience", value: "25+", icon: Award },
    { label: "Satisfied Clients", value: "18,000+", icon: Users },
    { label: "Master Barbers", value: "12", icon: Flame },
    { label: "Average Rating", value: "4.9 ★", icon: Star },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950/60 relative overflow-hidden border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Image & EST Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop"
                  alt="Barber Elite Heritage"
                  fill
                  className="object-cover object-center filter brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 glass-card p-5 rounded-2xl border border-yellow-500/30 max-w-[220px] shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <ShieldCheck className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-serif-heading text-xl font-bold text-white">EST. 1998</div>
                    <div className="text-[11px] text-zinc-400">Quarter century of master grooming</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
                <span>Our Heritage</span>
              </div>
              <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
                Where Old School Craft <br />
                <span className="text-yellow-500 italic">Meets Modern Distinction</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Founded in 1998, Barber Elite was born out of a desire to resurrect the classic barbershop experience—a neighborhood haven where gentlemen gather for exceptional cuts, spirited conversation, and relaxed pampering.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Our master barbers combine time-honored straight razor techniques with contemporary styling trends. We take pride in precise scissor handiwork, hot towel rituals, and using only premium organic products.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card p-4 rounded-2xl text-center border border-zinc-800 hover:border-yellow-500/30 transition-all duration-300"
                  >
                    <IconComp className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                    <div className="font-serif-heading text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-zinc-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
