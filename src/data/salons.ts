export interface SalonService {
  id: string;
  category: string;
  title: string;
  name?: string;
  price: string;
  duration: string;
  featured?: boolean;
  description: string;
  features: string[];
}

export interface BarberTeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface SalonProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  description: string;
}

export interface SalonReview {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Salon {
  id: string;
  name: string;
  tagline: string;
  category: "Barbershop" | "Hair Salon" | "Beard & Shave" | "Luxury Spa";
  city: "Dhaka" | "Chittagong" | "New York" | "Sylhet";
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  priceRange: "$$" | "$$$" | "$$$$";
  isOpen: boolean;
  featured: boolean;
  estYear: string;
  status?: string;
  coverImage: string;
  heroBarberImage: string;
  aboutText: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: SalonService[];
  barbers: BarberTeamMember[];
  products: SalonProduct[];
  reviews: SalonReview[];
}

export const initialSalons: Salon[] = [];
