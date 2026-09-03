"use client";

import { useState } from "react";
import Link from "next/link";
import { useSalons } from "@/context/SalonContext";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";
import Footer from "@/components/Footer";
import { Store, Plus, Star, MapPin, ExternalLink, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { Salon } from "@/data/salons";

export default function DashboardPage() {
  const { salons, addSalon } = useSalons();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for New Salon
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<Salon["category"]>("Barbershop");
  const [city, setCity] = useState<Salon["city"]>("Dhaka");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [priceRange, setPriceRange] = useState<Salon["priceRange"]>("$$");
  const [estYear, setEstYear] = useState("2026");

  const handleAddSalonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    // Generate safe slug id
    const generatedId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newSalonData: Salon = {
      id: generatedId,
      name: name.toUpperCase(),
      tagline: tagline || "Premium Grooming & Stylist Lounge",
      category,
      city,
      address,
      phone: phone || "+880 1700-000000",
      rating: 5.0,
      reviewCount: 1,
      priceRange,
      isOpen: true,
      featured: true,
      estYear: estYear || "2026",
      coverImage: "/images/barber-hero.png",
      heroBarberImage: "/images/barber-hero.png",
      aboutText: `${name} is a premier ${category} located in ${city}, providing top-tier cuts, beard styling, and luxury pampering.`,
      workingHours: {
        weekdays: "09:00 AM – 08:00 PM",
        saturday: "09:00 AM – 07:00 PM",
        sunday: "10:00 AM – 05:00 PM",
      },
      services: [
        {
          id: "s1",
          category: "haircut",
          title: "Signature Tailored Cut",
          price: "$40",
          duration: "45 mins",
          featured: true,
          description: "Full consultation, custom haircut, razor neck cleanup, and styling finish.",
          features: ["Personal Consultation", "Precision Scissor Cut", "Styling Finish"],
        },
        {
          id: "s2",
          category: "beard",
          title: "Beard Sculpt & Razor Edge",
          price: "$25",
          duration: "25 mins",
          featured: false,
          description: "Detailed beard shaping and hot oil treatment.",
          features: ["Custom Shape", "Hot Oil Treatment"],
        },
      ],
      barbers: [
        {
          id: "b1",
          name: "Senior Master Barber",
          role: "Lead Stylist",
          experience: "10 Years Exp.",
          specialty: "Precision Fades & Scissor Work",
          image: "/images/barber-hero.png",
          bio: "Experienced barber craftsman.",
        },
      ],
      products: [],
      reviews: [],
    };

    addSalon(newSalonData);
    setIsAddModalOpen(false);

    // Reset form fields
    setName("");
    setTagline("");
    setAddress("");
    setPhone("");

    // Show toast
    setSuccessToast(`Successfully added "${newSalonData.name}" to Marketplace!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#070707] text-zinc-100 flex flex-col pt-24">
      <MarketplaceNavbar />

      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-24 right-6 z-50 animate-bounce">
          <div className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-black" />
            <span>{successToast}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <section className="py-12 bg-zinc-950/80 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>SaaS Partner Portal</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white">
              Salons Management Dashboard
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Add new shop listings, manage registered barbershops, and monitor platform performance.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-gold-glow px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 transition-all active:scale-95 shadow-xl flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Salon / Barbershop</span>
          </button>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 bg-[#070707] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Stat Cards Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Registered Salons</span>
                <Store className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="font-serif-heading text-3xl font-bold text-white">{salons.length}</div>
              <div className="text-[11px] text-emerald-400 mt-1">Active on Marketplace</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Appointments</span>
                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="font-serif-heading text-3xl font-bold text-white">1,420+</div>
              <div className="text-[11px] text-emerald-400 mt-1">+18% growth this month</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Average Platform Rating</span>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="font-serif-heading text-3xl font-bold text-white">4.89 / 5.0</div>
              <div className="text-[11px] text-zinc-400 mt-1">Based on 450+ client reviews</div>
            </div>
          </div>

          {/* Salons Table List */}
          <div className="glass-card rounded-3xl border border-zinc-800 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif-heading text-xl font-bold text-white">
                All Active Salons ({salons.length})
              </h3>
              <span className="text-xs text-zinc-400">Click &ldquo;View Storefront&rdquo; to visit a shop&apos;s live page</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="py-3.5 px-4">Salon Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">City / Location</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {salons.map((salon) => (
                    <tr key={salon.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                        <Store className="w-4 h-4 text-yellow-500" />
                        <div>
                          <div>{salon.name}</div>
                          <div className="text-[10px] font-normal text-zinc-400">{salon.tagline}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-yellow-400">{salon.category}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{salon.city}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-yellow-400">★ {salon.rating}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Live & Booking
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/salon/${salon.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-zinc-800 text-zinc-200 font-semibold text-[11px] transition-all"
                        >
                          <span>View Storefront</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Add New Salon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
                <Store className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-white">Add New Salon / Shop</h3>
                <p className="text-zinc-400 text-xs">Fill out shop details to publish it live on the marketplace.</p>
              </div>
            </div>

            <form onSubmit={handleAddSalonSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Salon Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. ROYAL BLADE LOUNGE"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Modern Fades & Royal Shaves"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Salon["category"])}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  >
                    <option value="Barbershop">Barbershop</option>
                    <option value="Hair Salon">Hair Salon</option>
                    <option value="Beard & Shave">Beard & Shave</option>
                    <option value="Luxury Spa">Luxury Spa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as Salon["city"])}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="New York">New York</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 45, Road 7, Block D, Dhanmondi, Dhaka"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1711-000000"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Price Tier
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as Salon["priceRange"])}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  >
                    <option value="$$">$$ (Standard)</option>
                    <option value="$$$">$$$ (Premium)</option>
                    <option value="$$$$">$$$$ (VIP Luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Est. Year
                  </label>
                  <input
                    type="text"
                    value={estYear}
                    onChange={(e) => setEstYear(e.target.value)}
                    placeholder="2026"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/3 py-3.5 rounded-xl bg-zinc-900 text-zinc-400 font-semibold text-xs border border-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold-glow w-2/3 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Salon to Marketplace</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
