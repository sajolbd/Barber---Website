"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Heart, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    "1": 142,
    "2": 98,
    "3": 215,
    "4": 184,
    "5": 112,
    "6": 167,
  });

  const filters = [
    { id: "all", label: "All Works" },
    { id: "fade", label: "Skin & Low Fades" },
    { id: "classic", label: "Classic Cuts" },
    { id: "beard", label: "Beard Sculpting" },
  ];

  const galleryItems = [
    {
      id: "1",
      title: "Mid Taper Skin Fade",
      barber: "Alexander Ross",
      category: "fade",
      image: "/images/barber-hero.png",
    },
    {
      id: "2",
      title: "Gentleman Pompadour",
      barber: "Marcus Vance",
      category: "classic",
      image: "/images/barber-hero.png",
    },
    {
      id: "3",
      title: "Full Sculpted Beard & Sharp Razor Line",
      barber: "David Sterling",
      category: "beard",
      image: "/images/barber-hero.png",
    },
    {
      id: "4",
      title: "Drop Fade with Textured Crop",
      barber: "Alexander Ross",
      category: "fade",
      image: "/images/barber-hero.png",
    },
    {
      id: "5",
      title: "Vintage Slick Back & Beard Trim",
      barber: "Marcus Vance",
      category: "classic",
      image: "/images/barber-hero.png",
    },
    {
      id: "6",
      title: "Royal Straight Razor Shave & Beard Contour",
      barber: "David Sterling",
      category: "beard",
      image: "/images/barber-hero.png",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const toggleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  return (
    <section id="gallery" className="py-24 bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Masterpiece Showcase</span>
          </div>
          <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Our Haircut & Style <br />
            <span className="text-yellow-500 italic">Portfolio</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Explore recent cuts, fades, and beard transformations crafted by our master barbers.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeFilter === f.id
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-yellow-400 text-xs font-bold hover:scale-105 transition-transform"
                    >
                      <Heart className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{likes[item.id]}</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">
                      By {item.barber}
                    </span>
                    <h3 className="font-serif-heading text-lg font-bold text-white mt-0.5">
                      {item.title}
                    </h3>

                    <button
                      onClick={() => setSelectedImage(item.image)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-yellow-400 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Full View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 text-white hover:text-yellow-400 border border-zinc-800"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[600px] rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src={selectedImage}
                alt="Haircut style full view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
