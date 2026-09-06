"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsSection() {
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const products = [
    {
      id: "p1",
      name: "Matte Styling Clay Pomade",
      category: "Hair Styling",
      price: "$28.00",
      rating: 4.9,
      reviews: 84,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
      tag: "Best Seller",
      description: "High hold, zero shine natural matte finish crafted with organic beeswax and cedarwood.",
    },
    {
      id: "p2",
      name: "Organic Amber Beard Oil",
      category: "Beard Care",
      price: "$24.00",
      rating: 4.8,
      reviews: 62,
      image: "https://images.unsplash.com/photo-1608248597266-3d23b7e73236?q=80&w=800&auto=format&fit=crop",
      tag: "100% Organic",
      description: "Nourishes coarse beard hair and hydrates dry skin under beard with jojoba and argan oils.",
    },
    {
      id: "p3",
      name: "Fortifying Scalp Tonic & Shampoo",
      category: "Hair Care",
      price: "$32.00",
      rating: 5.0,
      reviews: 41,
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
      tag: "New Formula",
      description: "Deep cleansing scalp shampoo infused with tea tree, peppermint, and biotin for thicker hair.",
    },
    {
      id: "p4",
      name: "Handcrafted Straight Razor Kit",
      category: "Shaving Tools",
      price: "$85.00",
      rating: 4.9,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
      tag: "Collector's Item",
      description: "Japanese stainless steel barber straight razor with genuine mahogany wood handle & leather sheath.",
    },
  ];

  const handleAddToCart = (id: string, name: string) => {
    setCartCount((prev) => prev + 1);
    setAddedItem(name);
    setTimeout(() => {
      setAddedItem(null);
    }, 3000);
  };

  return (
    <section id="products" className="py-24 bg-zinc-950/80 relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Cart Indicator */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <div className="btn-gold-glow px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl font-bold text-xs">
              <ShoppingCart className="w-4 h-4 text-black" />
              <span>Cart: {cartCount} items</span>
            </div>
          </div>
        )}

        {/* Added Toast Notification */}
        {addedItem && (
          <div className="fixed top-24 right-6 z-50 animate-bounce">
            <div className="bg-yellow-500 text-black px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Added &ldquo;{addedItem}&rdquo; to Cart!</span>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Apothecary & Products</span>
          </div>
          <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Barber Grade Grooming <br />
            <span className="text-yellow-500 italic">Essentials</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Hand-picked formulas used in-house by our master barbers every day.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 rounded-3xl flex flex-col justify-between glass-card-hover group relative border border-zinc-800"
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-zinc-950/80 border border-yellow-500/40 text-yellow-400 font-bold text-[10px] uppercase tracking-wider">
                  {prod.tag}
                </span>
              </div>

              <div>
                {/* Product Image Container */}
                <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-zinc-900/60 mb-5 flex items-center justify-center p-4">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                </div>

                <div className="text-[11px] font-semibold text-yellow-500 uppercase tracking-widest mb-1">
                  {prod.category}
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                  {prod.name}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mb-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{prod.rating}</span>
                    <span className="text-zinc-500 font-normal">({prod.reviews})</span>
                  </div>
                  <span className="font-serif-heading text-xl font-bold text-yellow-400">
                    {prod.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(prod.id, prod.name)}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-yellow-500 text-zinc-200 hover:text-black border border-zinc-800 hover:border-yellow-500 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
