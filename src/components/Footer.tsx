"use client";

import { useState } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export default function Footer() {
  const [emailSub, setEmailSub] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailSub("");
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#040404] text-zinc-400 border-t border-zinc-900 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-yellow-500" />
              <span className="font-serif-heading font-bold text-xl tracking-widest text-yellow-500 uppercase">
                BARBER ELITE
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Premium barbershop experience in the heart of the city. Preserving classic grooming traditions with modern precision craftsmanship since 1998.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.889V8z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Opening Hours (Cols 5-8) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-heading text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span>Working Hours</span>
            </h4>

            <ul className="space-y-3 text-xs">
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Monday — Friday</span>
                <span className="text-white font-bold">09:00 AM – 08:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Saturday</span>
                <span className="text-white font-bold">09:00 AM – 07:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Sunday</span>
                <span className="text-yellow-500 font-bold">10:00 AM – 05:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact & Location (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-heading text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-500" />
              <span>Visit Our Lounge</span>
            </h4>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>452 Lexington Avenue, 5th Floor, Manhattan, NY 10017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-white font-semibold">+1 (212) 555-0198</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span>concierge@barberelite.com</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 mb-2 font-medium">
                Subscribe for grooming tips & VIP offers:
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-yellow-500 outline-none flex-1"
                />
                <button
                  type="submit"
                  className="btn-gold-glow px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center justify-center"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} BARBER ELITE. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Appointment FAQ</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
