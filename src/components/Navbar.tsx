"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Scissors } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/60 rounded-full px-6 shadow-xl">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Scissors className="w-5 h-5 text-yellow-500 transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-serif-heading font-bold text-lg tracking-widest text-yellow-500 uppercase">
              BARBER ELITE
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-yellow-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Join Now / Book CTA Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onOpenBooking}
              className="btn-gold-glow flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300"
            >
              <span>Join Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-yellow-400 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 shadow-2xl flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-yellow-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-gold-glow w-full py-3 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Join Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
