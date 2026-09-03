import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SalonProvider } from "@/context/SalonContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barber SaaS | Find & Book Top Salons & Barbershops Near You",
  description:
    "Discover top-rated barbershops, luxury salons, and grooming lounges in your city. Book instant appointments online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} dark scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070707] text-zinc-100 font-sans selection:bg-yellow-500 selection:text-black">
        <SalonProvider>{children}</SalonProvider>
      </body>
    </html>
  );
}


