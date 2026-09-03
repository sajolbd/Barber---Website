"use client";

import Link from "next/link";
import { Scissors, Store, PlusCircle, Search } from "lucide-react";

export default function MarketplaceNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 bg-zinc-900/70 border border-zinc-800 rounded-full px-6 shadow-xl">
          
          {/* Marketplace Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-full bg-yellow-500 text-black font-bold group-hover:rotate-12 transition-transform">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif-heading font-bold text-lg tracking-wider text-white uppercase">
                BARBER<span className="text-yellow-500">SaaS</span>
              </span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-300 hover:text-yellow-400 transition-colors flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-zinc-800/60"
            >
              <Search className="w-3.5 h-3.5 text-yellow-500" />
              <span>Explore Salons</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
