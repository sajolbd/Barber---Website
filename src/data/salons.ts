export interface SalonService {
  id: string;
  category: string;
  title: string;
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

export const initialSalons: Salon[] = [
  {
    id: "barber-elite",
    name: "BARBER ELITE",
    tagline: "Real Cuts by Real Professionals",
    category: "Barbershop",
    city: "Dhaka",
    address: "Gulshan Avenue, Road 11, Dhaka",
    phone: "+880 1711-000111",
    rating: 4.9,
    reviewCount: 184,
    priceRange: "$$$",
    isOpen: true,
    featured: true,
    estYear: "1998",
    coverImage: "/images/barber-hero.png",
    heroBarberImage: "/images/barber-hero.png",
    aboutText:
      "Founded in 1998, Barber Elite was born out of a desire to resurrect the classic barbershop experience—a neighborhood haven where gentlemen gather for exceptional cuts, spirited conversation, and relaxed pampering.",
    workingHours: {
      weekdays: "09:00 AM – 08:00 PM",
      saturday: "09:00 AM – 07:00 PM",
      sunday: "10:00 AM – 05:00 PM",
    },
    services: [
      {
        id: "s1",
        category: "haircut",
        title: "Executive Precision Cut",
        price: "$45",
        duration: "45 mins",
        featured: true,
        description: "Consultation, custom tailored haircut, neck shave, scalp massage, and precision hot towel finish.",
        features: ["Personal Consultation", "Precision Fade / Scissors", "Neck Razor Finish", "Styling & Pomade"],
      },
      {
        id: "s2",
        category: "beard",
        title: "Beard Sculpting & Trim",
        price: "$30",
        duration: "30 mins",
        featured: false,
        description: "Detailed beard shaping, cheek line razor edge, condition oil treatment, and hot towel treatment.",
        features: ["Custom Shape & Lineup", "Warm Oil Hydration", "Straight Razor Detailing", "Balm Styling"],
      },
      {
        id: "s3",
        category: "shave",
        title: "Royal Hot Towel Shave",
        price: "$40",
        duration: "35 mins",
        featured: false,
        description: "Traditional 7-step straight razor shave with essential oils, pre-shave cream, and cold towel close.",
        features: ["Steamed Essential Oil Towels", "Rich Lather Cream", "Dual-Pass Razor Shave", "Soothing Aftershave"],
      },
      {
        id: "s4",
        category: "packages",
        title: "The Elite Master Groom",
        price: "$95",
        duration: "90 mins",
        featured: true,
        description: "The complete luxury experience: Signature Cut, Full Beard Sculpting, Scalp Scrub, & Charcoal Facial.",
        features: ["Full Precision Cut", "Beard Sculpt & Shave", "Deep Scalp Detox", "Charcoal Face Mask & Drink"],
      },
    ],
    barbers: [
      {
        id: "b1",
        name: "Alexander Ross",
        role: "Lead Master Barber",
        experience: "14 Years Exp.",
        specialty: "Precision Fades & Tapers",
        image: "/images/barber-hero.png",
        bio: "Trained in London and Milan. Specialist in sharp razor line-ups and modern drop fades.",
      },
      {
        id: "b2",
        name: "Marcus Vance",
        role: "Beard Specialist",
        experience: "10 Years Exp.",
        specialty: "Royal Hot Towel Shaves & Beard Art",
        image: "/images/barber-hero.png",
        bio: "Craftsman of luxurious beard treatments and classic straight razor shaves.",
      },
    ],
    products: [
      {
        id: "p1",
        name: "Matte Styling Clay Pomade",
        category: "Hair Styling",
        price: "$28.00",
        rating: 4.9,
        reviews: 84,
        image: "/images/barber-hero.png",
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
        image: "/images/barber-hero.png",
        tag: "100% Organic",
        description: "Nourishes coarse beard hair and hydrates dry skin under beard with jojoba and argan oils.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Medite Ranija",
        role: "Business Man",
        rating: 5,
        comment:
          "Even if this is their newest product, I see it's already powerful. I'm sure they will continue to deliver updates and features in the coming months and years!",
        avatar: "/images/avatar1.png",
      },
    ],
  },
  {
    id: "urban-fade-studio",
    name: "URBAN FADE STUDIO",
    tagline: "Modern Street Cuts & Skin Fades",
    category: "Barbershop",
    city: "Dhaka",
    address: "Banani 11, Commercial Area, Dhaka",
    phone: "+880 1822-999333",
    rating: 4.8,
    reviewCount: 142,
    priceRange: "$$",
    isOpen: true,
    featured: true,
    estYear: "2015",
    coverImage: "/images/barber-hero.png",
    heroBarberImage: "/images/barber-hero.png",
    aboutText:
      "Urban Fade Studio brings sharp contemporary street style, high-definition skin fades, and relaxed urban vibe grooming to modern trendsetters.",
    workingHours: {
      weekdays: "10:00 AM – 09:00 PM",
      saturday: "10:00 AM – 08:00 PM",
      sunday: "11:00 AM – 06:00 PM",
    },
    services: [
      {
        id: "s1",
        category: "haircut",
        title: "High Skin Fade & Crop",
        price: "$35",
        duration: "40 mins",
        featured: true,
        description: "Zero skin fade with textured top crop, sharp razor line-up, and matte clay finish.",
        features: ["Foil Shaver Finish", "Textured Top Styling", "Razor Edge Line", "Complimentary Espresso"],
      },
      {
        id: "s2",
        category: "beard",
        title: "Beard Lineup & Steamed Oil",
        price: "$25",
        duration: "25 mins",
        featured: false,
        description: "Crisp cheek & neck beard contouring with hot mint towel treatment.",
        features: ["Crisp Razor Lines", "Mint Hot Towel", "Organic Beard Elixir"],
      },
    ],
    barbers: [
      {
        id: "b1",
        name: "Rayhan Kabir",
        role: "Head Stylist",
        experience: "8 Years Exp.",
        specialty: "Low & Mid Fades",
        image: "/images/barber-hero.png",
        bio: "Creative fade artist specializing in modern textured crops and hair graphics.",
      },
    ],
    products: [],
    reviews: [
      {
        id: 1,
        name: "Imtiaz Ahmed",
        role: "Software Engineer",
        rating: 5,
        comment: "Best skin fade in town! Staff is super friendly and place looks super aesthetic.",
        avatar: "/images/avatar1.png",
      },
    ],
  },
  {
    id: "royal-cuts-lounge",
    name: "ROYAL CUTS LOUNGE",
    tagline: "Luxury Grooming for Modern Kings",
    category: "Luxury Spa",
    city: "Chittagong",
    address: "GEC Circle, Nasirabad, Chittagong",
    phone: "+880 1933-777444",
    rating: 4.9,
    reviewCount: 96,
    priceRange: "$$$$",
    isOpen: true,
    featured: false,
    estYear: "2018",
    coverImage: "/images/barber-hero.png",
    heroBarberImage: "/images/barber-hero.png",
    aboutText:
      "Experience royal indulgence with premium leather barber chairs, complimentary single malt beverages, and comprehensive head-to-toe grooming rituals.",
    workingHours: {
      weekdays: "10:00 AM – 08:30 PM",
      saturday: "10:00 AM – 08:30 PM",
      sunday: "12:00 PM – 06:00 PM",
    },
    services: [
      {
        id: "s1",
        category: "packages",
        title: "Royal VIP Grooming Package",
        price: "$120",
        duration: "100 mins",
        featured: true,
        description: "Full haircut, gold leaf facial, hot stone neck massage, beard sculpt, and manicure.",
        features: ["Gold Leaf Facial", "Hot Stone Therapy", "VIP Lounge Access", "Single Malt Drink"],
      },
    ],
    barbers: [
      {
        id: "b1",
        name: "David Sterling",
        role: "Master Craftsman",
        experience: "12 Years Exp.",
        specialty: "Scissor Precision & Facials",
        image: "/images/barber-hero.png",
        bio: "Specialist in luxury spa grooming rituals for executives.",
      },
    ],
    products: [],
    reviews: [],
  },
];
