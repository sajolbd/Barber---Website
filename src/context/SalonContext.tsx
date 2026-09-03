"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Salon, initialSalons } from "@/data/salons";

interface SalonContextType {
  salons: Salon[];
  addSalon: (salon: Salon) => void;
  getSalonById: (id: string) => Salon | undefined;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export function SalonProvider({ children }: { children: React.ReactNode }) {
  const [salons, setSalons] = useState<Salon[]>(initialSalons);

  // Fetch live active approved salons from MongoDB Atlas Express Backend API
  useEffect(() => {
    async function loadLiveSalons() {
      try {
        const res = await fetch("http://localhost:5000/api/marketplace/salons");
        const data = await res.json();
        if (data.success && Array.isArray(data.salons)) {
          const liveSalons: Salon[] = data.salons.map((s: any) => ({
            id: s.shopId || s._id,
            name: s.name,
            tagline: s.tagline || "Executive Cuts, Beard Styling & Luxury Grooming",
            rating: s.rating || 5.0,
            reviewCount: 42,
            coverImage: s.coverImage || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop",
            address: s.address || "Main Road, Dhaka",
            city: s.city || "Dhaka",
            priceRange: "$$$",
            category: s.category || "Barbershop",
            estYear: "2026",
            services: [
              { id: "s1", name: "Royal Haircut & Styling", price: "$35", duration: "45 min" },
              { id: "s2", name: "Hot Towel Beard Trim", price: "$25", duration: "30 min" },
              { id: "s3", name: "Executive Facial & Scrub", price: "$45", duration: "40 min" },
            ],
            barbers: [
              { id: "b1", name: "Master Barber", role: "Senior Stylist", experience: "8 yrs", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" }
            ],
          }));

          setSalons((prev) => {
            // Merge live API salons with initial dataset avoiding duplicates
            const liveIds = new Set(liveSalons.map((l) => l.id));
            const filteredInitial = prev.filter((p) => !liveIds.has(p.id));
            return [...liveSalons, ...filteredInitial];
          });
        }
      } catch (err) {
        console.error("Live API backend connect info:", err);
      }
    }
    loadLiveSalons();
  }, []);

  const addSalon = (newSalon: Salon) => {
    setSalons((prev) => {
      const updated = [newSalon, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("barber_saas_salons", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const getSalonById = (id: string) => {
    return salons.find((s) => s.id === id);
  };

  return (
    <SalonContext.Provider value={{ salons, addSalon, getSalonById }}>
      {children}
    </SalonContext.Provider>
  );
}

export function useSalons() {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error("useSalons must be used within a SalonProvider");
  }
  return context;
}
