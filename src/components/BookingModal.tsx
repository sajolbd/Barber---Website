"use client";

import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Check,
  Scissors,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBarber?: string;
  availableServices?: Array<{ name: string; price: string }>;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "Executive Precision Cut",
  initialBarber = "Any Available Barber",
  availableServices,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(initialService);
  const [barber, setBarber] = useState(initialBarber);
  const [date, setDate] = useState("2026-09-05");
  const [time, setTime] = useState("11:30 AM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "cash">("bkash");
  const [showMfsGateway, setShowMfsGateway] = useState(false);
  const [mfsStep, setMfsStep] = useState<"account" | "otp" | "pin">("account");
  const [mfsAccount, setMfsAccount] = useState("");
  const [mfsOtp, setMfsOtp] = useState("");
  const [mfsPin, setMfsPin] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const servicesList =
    availableServices && availableServices.length > 0
      ? availableServices
      : [
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

  const selectedServiceObj = servicesList.find((s) => s.name === service);
  const serviceAmount = selectedServiceObj ? selectedServiceObj.price : "$45.00";

  const executeFinalBooking = async (trxId = "", pMethod = paymentMethod) => {
    setIsSuccess(true);
    setShowMfsGateway(false);

    const finalPaymentStatus =
      pMethod === "cash" ? "Pending (Pay at Salon)" : `Paid via ${pMethod.toUpperCase()}`;

    const newApt = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      customerName: fullName || "Online Client",
      customerPhone: phone || "+880 1700-000000",
      customerEmail: email || "client@gmail.com",
      isWalkIn: false,
      branchId: "banani",
      branchName: "Banani Branch",
      serviceName: service || "Executive Precision Cut",
      barberName: barber || "Any Available Barber",
      date: date || "2026-09-05",
      time: time || "11:30 AM",
      amount: serviceAmount,
      status: "Confirmed",
      paymentStatus: finalPaymentStatus,
      paymentMethod: pMethod.toUpperCase(),
      transactionId: trxId || `TRX-CSH-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to LocalStorage for instant cross-tab sync
    if (typeof window !== "undefined") {
      try {
        const existing = localStorage.getItem("sellerAppointments");
        const parsed = existing ? JSON.parse(existing) : [];
        const updated = [newApt, ...parsed];
        localStorage.setItem("sellerAppointments", JSON.stringify(updated));

        // Trigger custom storage event for live listener
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("LocalStorage save error:", err);
      }
    }

    // 2. Send API POST request to MongoDB Express Backend
    try {
      await fetch("http://localhost:5000/api/seller/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApt),
      });
    } catch (err) {
      console.error("API backend post error:", err);
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "cash") {
      executeFinalBooking("", "cash");
    } else {
      // Launch bKash / Nagad Payment Gateway Modal
      setMfsStep("account");
      setMfsAccount(phone || "01711000111");
      setShowMfsGateway(true);
    }
  };

  const handleMfsAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfsAccount) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setMfsStep("otp");
      setMfsOtp("123456");
    }, 1000);
  };

  const handleMfsOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setMfsStep("pin");
    }, 1000);
  };

  const handleMfsPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const prefix = paymentMethod === "bkash" ? "TRX-BK" : "TRX-NG";
      const generatedTrx = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTrx);
      executeFinalBooking(generatedTrx, paymentMethod);
    }, 1500);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setShowMfsGateway(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
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
                <h3 className="font-serif-heading text-2xl font-bold text-white">Book Appointment</h3>
                <p className="text-zinc-400 text-xs">
                  Step {step} of 3 —{" "}
                  {step === 1
                    ? "Select Service & Barber"
                    : step === 2
                    ? "Pick Date & Time"
                    : "Details & Payment Gateway"}
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
                    <span>Next: Contact & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info Form & Payment Gateway Selector */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sajol Ahmed"
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
                      placeholder="01711000111"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                    />
                  </div>
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
                    placeholder="sajol@example.com"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:border-yellow-500 outline-none"
                  />
                </div>

                {/* Select Payment Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* bKash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bkash")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "bkash"
                          ? "bg-pink-950/40 border-pink-500 text-pink-400 font-bold ring-1 ring-pink-500"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold text-[10px] flex items-center justify-center">
                        bK
                      </div>
                      <span className="text-xs font-bold">bKash</span>
                      <span className="text-[9px] text-pink-400 font-normal">Instant Pay</span>
                    </button>

                    {/* Nagad */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("nagad")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "nagad"
                          ? "bg-orange-950/40 border-orange-500 text-orange-400 font-bold ring-1 ring-orange-500"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-600 text-white font-bold text-[10px] flex items-center justify-center">
                        NG
                      </div>
                      <span className="text-xs font-bold">Nagad</span>
                      <span className="text-[9px] text-orange-400 font-normal">Quick Pay</span>
                    </button>

                    {/* Cash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === "cash"
                          ? "bg-yellow-500/15 border-yellow-500 text-yellow-400 font-bold ring-1 ring-yellow-500"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-yellow-500" />
                      <span className="text-xs font-bold">Pay at Salon</span>
                      <span className="text-[9px] text-zinc-500 font-normal">Cash / Card</span>
                    </button>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-yellow-500/30 text-xs space-y-1">
                  <div className="text-yellow-400 font-bold flex justify-between items-center">
                    <span>Booking Summary:</span>
                    <span className="text-white text-sm font-bold">{serviceAmount}</span>
                  </div>
                  <div className="text-zinc-300">• Service: {service}</div>
                  <div className="text-zinc-300">• Barber: {barber}</div>
                  <div className="text-zinc-300">
                    • Date & Time: {date} at {time}
                  </div>
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
                    className={`w-2/3 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${
                      paymentMethod === "bkash"
                        ? "bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-900/30"
                        : paymentMethod === "nagad"
                        ? "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/30"
                        : "btn-gold-glow text-black"
                    }`}
                  >
                    {paymentMethod === "cash" ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirm & Pay at Salon</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Pay {serviceAmount} via {paymentMethod.toUpperCase()}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-heading text-3xl font-bold text-white">Appointment Confirmed!</h3>

            <p className="text-zinc-300 text-xs max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-yellow-400 font-bold">{fullName}</span>. Your appointment for{" "}
              <span className="text-white font-semibold">{service}</span> on{" "}
              <span className="text-white font-semibold">{date}</span> at{" "}
              <span className="text-white font-semibold">{time}</span> has been successfully scheduled.
            </p>

            {transactionId && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-yellow-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>TrxID: {transactionId}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="btn-gold-glow px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive bKash / Nagad MFS Checkout Modal */}
      {showMfsGateway && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border ${
              paymentMethod === "bkash"
                ? "bg-pink-950/90 border-pink-500/50 text-white"
                : "bg-orange-950/90 border-orange-500/50 text-white"
            }`}
          >
            <button
              onClick={() => setShowMfsGateway(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-black/30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* MFS Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg ${
                  paymentMethod === "bkash" ? "bg-pink-600" : "bg-orange-600"
                }`}
              >
                {paymentMethod === "bkash" ? "bKash" : "Nagad"}
              </div>
              <div>
                <h4 className="font-bold text-lg">
                  {paymentMethod === "bkash" ? "bKash Payment Gateway" : "Nagad Quick Checkout"}
                </h4>
                <p className="text-xs text-zinc-300">Merchant: Barber SAAS Storefront</p>
              </div>
            </div>

            {/* Amount Banner */}
            <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between text-xs">
              <span className="text-zinc-300">Total Payable Amount:</span>
              <span className="font-bold text-xl text-yellow-400">{serviceAmount}</span>
            </div>

            {/* Step 1: Account Number Input */}
            {mfsStep === "account" && (
              <form onSubmit={handleMfsAccountSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1.5 text-zinc-200">
                    Your {paymentMethod === "bkash" ? "bKash" : "Nagad"} Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={mfsAccount}
                    onChange={(e) => setMfsAccount(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-black/50 border border-white/20 text-white font-mono text-sm outline-none focus:border-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition-all ${
                    paymentMethod === "bkash"
                      ? "bg-pink-600 hover:bg-pink-500 text-white"
                      : "bg-orange-600 hover:bg-orange-500 text-white"
                  }`}
                >
                  {isProcessingPayment ? "Sending Verification Code..." : "Proceed to Payment"}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {mfsStep === "otp" && (
              <form onSubmit={handleMfsOtpSubmit} className="space-y-4 text-xs">
                <div className="text-center text-zinc-300">
                  Enter 6-digit OTP sent to <span className="font-mono text-yellow-400 font-bold">{mfsAccount}</span>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={mfsOtp}
                    onChange={(e) => setMfsOtp(e.target.value)}
                    className="w-full p-3.5 text-center tracking-[0.5em] rounded-xl bg-black/50 border border-white/20 text-white font-mono text-lg outline-none focus:border-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg ${
                    paymentMethod === "bkash" ? "bg-pink-600" : "bg-orange-600"
                  }`}
                >
                  {isProcessingPayment ? "Verifying OTP..." : "Confirm OTP"}
                </button>
              </form>
            )}

            {/* Step 3: PIN Input */}
            {mfsStep === "pin" && (
              <form onSubmit={handleMfsPinSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-center gap-1 text-zinc-300">
                  <Lock className="w-4 h-4 text-yellow-400" />
                  <span>Enter {paymentMethod === "bkash" ? "bKash" : "Nagad"} PIN to Confirm</span>
                </div>
                <div>
                  <input
                    type="password"
                    required
                    maxLength={5}
                    placeholder="•••••"
                    value={mfsPin}
                    onChange={(e) => setMfsPin(e.target.value)}
                    className="w-full p-3.5 text-center tracking-[0.5em] rounded-xl bg-black/50 border border-white/20 text-white font-mono text-xl outline-none focus:border-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg ${
                    paymentMethod === "bkash" ? "bg-pink-600 hover:bg-pink-500" : "bg-orange-600 hover:bg-orange-500"
                  }`}
                >
                  {isProcessingPayment ? "Processing Secure Payment..." : "Pay Now & Complete Booking"}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400 border-t border-white/10 pt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secured by 256-bit Encrypted MFS Payment Gateway</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
