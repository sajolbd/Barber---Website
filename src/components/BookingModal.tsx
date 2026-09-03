"use client";

import { useState } from "react";
import { X, Calendar, Clock, User, Check, Scissors, ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBarber?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "Executive Precision Cut",
  initialBarber = "Any Available Barber",
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(initialService);
  const [barber, setBarber] = useState(initialBarber);
  const [date, setDate] = useState("2026-09-05");
  const [time, setTime] = useState("11:30 AM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const servicesList = [
    { name: "Executive Precision Cut", price: "$45" },
    { name: "Beard Sculpting & Trim", price: "$30" },
    { name: "Royal Hot Towel Shave", price: "$40" },
    { name: "The Elite Master Groom", price: "$95" },
    { name: "Junior Champion Cut", price: "$30" },
    { name: "Grey Blending & Color", price: "$50" },
  ];

  const barbersList = [
    "Any Available Barber",
    "Alexander Ross (Lead Master Barber)",
    "Marcus Vance (Beard Specialist)",
    "David Sterling (Senior Stylist)",
  ];

  const timeSlots = [
    "09:00 AM",
    "10:15 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "07:00 PM",
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
                <Scissors className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-serif-heading text-2xl font-bold text-white">
                  Book Appointment
                </h3>
                <p className="text-zinc-400 text-xs">
                  Step {step} of 3 — {step === 1 ? "Select Service & Barber" : step === 2 ? "Pick Date & Time" : "Your Contact Details"}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 mb-8">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-yellow-500" : "bg-zinc-800"}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-yellow-500" : "bg-zinc-800"}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-yellow-500" : "bg-zinc-800"}`} />
            </div>

            {/* Step 1: Select Service & Barber */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Select Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {servicesList.map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setService(s.name)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          service === s.name
                            ? "bg-yellow-500/15 border-yellow-500 text-yellow-400 font-bold"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="font-bold text-yellow-500">{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Barber
                  </label>
                  <select
                    value={barber}
                    onChange={(e) => setBarber(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  >
                    {barbersList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-gold-glow w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
                >
                  <span>Next: Choose Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-yellow-500" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-yellow-500" />
                    Available Time Slot
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                          time === slot
                            ? "bg-yellow-500 text-black border-yellow-500 font-bold"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 rounded-xl bg-zinc-900 text-zinc-400 font-semibold text-xs border border-zinc-800 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-gold-glow w-2/3 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Next: Your Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info Form */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                {/* Summary Card */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-yellow-500/30 text-xs space-y-1">
                  <div className="text-yellow-400 font-bold">Booking Summary:</div>
                  <div className="text-zinc-300">• Service: {service}</div>
                  <div className="text-zinc-300">• Barber: {barber}</div>
                  <div className="text-zinc-300">• Date & Time: {date} at {time}</div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3.5 rounded-xl bg-zinc-900 text-zinc-400 font-semibold text-xs border border-zinc-800 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-gold-glow w-2/3 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center mx-auto text-yellow-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-heading text-3xl font-bold text-white">
              Appointment Confirmed!
            </h3>

            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              Thank you, <span className="text-yellow-400 font-bold">{fullName}</span>. Your appointment for{" "}
              <span className="text-white font-semibold">{service}</span> on{" "}
              <span className="text-white font-semibold">{date}</span> at{" "}
              <span className="text-white font-semibold">{time}</span> has been successfully scheduled.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 max-w-sm mx-auto">
              We have sent a SMS & Email confirmation with calendar invite to {email || phone}.
            </div>

            <button
              onClick={handleResetAndClose}
              className="btn-gold-glow px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
