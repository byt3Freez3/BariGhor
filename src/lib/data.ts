import heroImage from "@/assets/barighor-hero.jpg";
import newTownImage from "@/assets/new-town.jpg";
import saltLakeImage from "@/assets/salt-lake.jpg";
import aliporeImage from "@/assets/alipore-home.jpg";
import { formatINR } from "@/lib/utils";

export interface Property {
  id: string;
  slug: string;
  title: string;
  bengaliTitle: string;
  locality: string;
  localitySlug: string;
  locationDetails: string;
  price: string;
  priceNumericLakhs: number;
  bhk: string;
  bhkCount: number;
  sqft: number;
  pricePerSqFt: number;
  status: string;
  reraProjectNo: string;
  developer: string;
  tenure_type: "Freehold" | "Leasehold" | "Co-operative Share";
  tenure?: "Freehold" | "Leasehold" | "Co-operative Share";
  approval: string;
  metro: string;
  floodRisk: "Low" | "Minimal" | "Moderate";
  image_url: string;
  gallery_images: string[];
  galleryImages?: string[];
  floor_plan_url: string;
  floorPlanSpecs: {
    carpetAreaSqFt: number;
    balconyAreaSqFt: number;
    livingDiningSqFt: string;
    masterBedroomSqFt: string;
    kitchenSqFt: string;
  };
  description: string;
  highlights: string[];
  amenities: string[];
  floor: string;
  facing: string;
  possessionDate: string;
  isFeatured?: boolean;
}

export interface Locality {
  slug: string;
  name: string;
  bengali: string;
  tagline: string;
  description: string;
  priceRange: string;
  price_trend: {
    yoyGrowth: string;
    historicalRates: { year: string; avgRate: number }[];
    rentalYield: string;
    demandRating: string;
  };
  avgPriceSqFt: string;
  verifiedHomesCount: number;
  connectivity_score: string;
  connectivityScore?: string;
  airportTime: string;
  metroConnectivity: string;
  floodRiskNote: string;
  hero_image: string;
  image?: string;
  keyHighlights: string[];
  editorialNote: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  bengaliTitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export const imagery = {
  heroImage,
  newTownImage,
  saltLakeImage,
  aliporeImage,
};

export const localities: Locality[] = [
  {
    slug: "new-town",
    name: "New Town",
    bengali: "নিউ টাউন",
    tagline: "Planned green corridors, smart-city infrastructure & modern high-rises.",
    description:
      "Kolkata's most modern planned satellite city, designed with broad arterial boulevards, extensive green parks (Eco Park), top IT parks, educational hubs, and modern gated condominiums.",
    priceRange: "₹75 Lakh – ₹3.5 Cr",
    price_trend: {
      yoyGrowth: "+12.4% YoY",
      historicalRates: [
        { year: "2023", avgRate: 6900 },
        { year: "2024", avgRate: 7800 },
        { year: "2025", avgRate: 8800 },
        { year: "2026", avgRate: 9900 },
      ],
      rentalYield: "3.8% – 4.2%",
      demandRating: "Very High (IT Corridors & Airport proximity)",
    },
    avgPriceSqFt: "₹7,800 – ₹12,400 / sq ft",
    verifiedHomesCount: 64,
    connectivity_score: "8.8 / 10",
    connectivityScore: "8.8 / 10",
    airportTime: "15-20 min",
    metroConnectivity: "Orange Line Metro & Major Arterial Roads",
    floodRiskNote: "Low (Engineered canal and subterranean storm drainage)",
    hero_image: newTownImage,
    image: newTownImage,
    keyHighlights: [
      "HIDCO planned layout with 48% reserved green cover",
      "Immediate proximity to Eco Park, Mother's Wax Museum, and Biswa Bangla Gate",
      "Major hospitals: Tata Medical Center, Ohio Heart Hospital, Bhagirathi Neotia",
      "Top institutions: DPS Megacity, Newtown School, St. Xavier's University",
    ],
    editorialNote:
      "Action Area II and I offer the most balanced residential calm while retaining 5-minute reach to arterial connections.",
  },
  {
    slug: "salt-lake",
    name: "Salt Lake",
    bengali: "সল্ট লেক",
    tagline: "Leafy blocks, lived-in calm, quiet lanes, and central Kolkata proximity.",
    description:
      "Bidhannagar (Salt Lake) remains the gold standard for serene community living in Kolkata. Divided into quiet residential sectors with local parks in every block, bustling local bazaars, and deep cultural heritage.",
    priceRange: "₹1.1 Cr – ₹5.5 Cr",
    price_trend: {
      yoyGrowth: "+8.6% YoY",
      historicalRates: [
        { year: "2023", avgRate: 9800 },
        { year: "2024", avgRate: 10600 },
        { year: "2025", avgRate: 11800 },
        { year: "2026", avgRate: 12900 },
      ],
      rentalYield: "3.2% – 3.6%",
      demandRating: "High (Limited new supply & high heritage appeal)",
    },
    avgPriceSqFt: "₹9,500 – ₹15,200 / sq ft",
    verifiedHomesCount: 48,
    connectivity_score: "9.2 / 10",
    connectivityScore: "9.2 / 10",
    airportTime: "25 min",
    metroConnectivity: "Green Line (East-West Metro) & EM Bypass",
    floodRiskNote: "Low-to-Moderate (Sector-specific municipal drainage upgrades)",
    hero_image: saltLakeImage,
    image: saltLakeImage,
    keyHighlights: [
      "Sector I, II & III planned grid with community parks in every block",
      "Operational Green Line Metro connecting directly to Howrah and Sealdah",
      "Established food joints, CA Market, GD Market, and City Centre 1",
      "Rich cultural associations and calm walking tree-lined avenues",
    ],
    editorialNote:
      "Leasehold transfers from Bidhannagar Municipality require proper due diligence, which BariGhor verifies end-to-end.",
  },
  {
    slug: "alipore",
    name: "Alipore",
    bengali: "আলিপুর",
    tagline: "Old-world aristocratic addresses with quiet heritage avenues.",
    description:
      "Kolkata's most prestigious postal code. Stately tree-lined roads, heritage bungalows, private estates, and boutique ultra-luxury developments near the National Library and Kolkata Zoo.",
    priceRange: "₹3.5 Cr – ₹18 Cr+",
    price_trend: {
      yoyGrowth: "+14.8% YoY",
      historicalRates: [
        { year: "2023", avgRate: 18500 },
        { year: "2024", avgRate: 21000 },
        { year: "2025", avgRate: 24200 },
        { year: "2026", avgRate: 27500 },
      ],
      rentalYield: "2.8% – 3.1%",
      demandRating: "Ultra-High / Scarcity Driven (Trophy addresses)",
    },
    avgPriceSqFt: "₹18,000 – ₹31,000 / sq ft",
    verifiedHomesCount: 31,
    connectivity_score: "9.5 / 10",
    connectivityScore: "9.5 / 10",
    airportTime: "40 min",
    metroConnectivity: "Blue Line (Rabindra Sarobar / Netaji Bhavan) & AJC Bose Flyover",
    floodRiskNote: "Minimal (Natural elevated topography & established heritage infrastructure)",
    hero_image: aliporeImage,
    image: aliporeImage,
    keyHighlights: [
      "Home to historic mansions, elite clubs (Calcutta Club, Royal Calcutta Golf Club)",
      "Lush century-old banyan canopies and zero commercial noise",
      "Direct flyover access to Central Business District, Park Street, and EM Bypass",
      "Highest capital appreciation stability in Eastern India",
    ],
    editorialNote:
      "True freehold title in Alipore is scarce and represents legacy wealth preservation.",
  },
];

export const properties: Property[] = [
  {
    id: "prop-1",
    slug: "the-verandah-residences",
    title: "The Verandah Residences",
    bengaliTitle: "দ্য ভেরান্দা রেসিডেন্সেস",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Action Area II, Near Eco Park West Gate",
    price: formatINR(142),
    priceNumericLakhs: 142,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 1840,
    pricePerSqFt: 7717,
    status: "Under Construction · Possession Dec 2027",
    reraProjectNo: "WBRERA/P/NOR/2024/001234",
    developer: "Eastern Habitat Infrastructure",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HIDCO & WBRERA Registered",
    metro: "2.1 km from Eco Park Metro Station",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, aliporeImage, newTownImage, saltLakeImage],
    galleryImages: [heroImage, aliporeImage, newTownImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/verandah-3bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1485,
      balconyAreaSqFt: 195,
      livingDiningSqFt: "24'6\" x 14'2\"",
      masterBedroomSqFt: "16'0\" x 13'6\"",
      kitchenSqFt: "12'0\" x 9'6\"",
    },
    description:
      "A considered three-bedroom residence designed around the classic Bengali verandah tradition, featuring two-sided cross-ventilation, expansive 9-foot deep shaded balconies, and unobstructed views over New Town's eco-corridor wetlands. The layout thoughtfully isolates family quarters from entertaining spaces without wasteful long corridors.",
    highlights: [
      "Dual-aspect corner living room with sunrise and sunset daylight",
      "9-foot deep private covered verandah with terracotta tile finishes",
      "Independent utility balcony and modular maid's quarters option",
      "100% Vastu-compliant north-east entry foyer",
    ],
    amenities: [
      "Central landscaped garden & meditation grove",
      "Rooftop infinity swimming pool & deck",
      "Fitness studio with steam & sauna",
      "Dedicated EV fast charging bays for each slot",
      "24/7 multi-tier security with biometric access",
      "100% power backup including heavy air-conditioning load",
    ],
    floor: "18th of 24 Floors",
    facing: "North-East (Wetland & Park Facing)",
    possessionDate: "December 2027",
    isFeatured: true,
  },
  {
    id: "prop-2",
    slug: "the-saltlake-manor",
    title: "The Salt Lake Manor",
    bengaliTitle: "সল্ট লেক ম্যানর",
    locality: "Salt Lake",
    localitySlug: "salt-lake",
    locationDetails: "Sector III, Near GD Block Island",
    price: formatINR(385),
    priceNumericLakhs: 385,
    bhk: "4 BHK",
    bhkCount: 4,
    sqft: 3200,
    pricePerSqFt: 12031,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/NOR/2023/000892",
    developer: "Bengal Heritage Living",
    tenure_type: "Leasehold",
    tenure: "Leasehold",
    approval: "Bidhannagar Municipality",
    metro: "900m from Karunamoyee Metro",
    floodRisk: "Minimal",
    image_url: saltLakeImage,
    gallery_images: [saltLakeImage, heroImage, aliporeImage, newTownImage],
    galleryImages: [saltLakeImage, heroImage, aliporeImage, newTownImage],
    floor_plan_url: "/assets/floorplans/saltlake-4bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 2680,
      balconyAreaSqFt: 280,
      livingDiningSqFt: "28'0\" x 18'0\"",
      masterBedroomSqFt: "18'6\" x 15'0\"",
      kitchenSqFt: "14'0\" x 11'0\"",
    },
    description:
      "A rare boutique residence situated on a quiet cul-de-sac in Sector III. Designed with exposed brick facades, high 11-foot ceilings, Burmese teak woodwork, and a private internal courtyard that echoes North Kolkata's traditional Rajbari architecture in a contemporary silhouette.",
    highlights: [
      "Private elevator access with dedicated security lobby",
      "Internal open-to-sky courtyard with heritage stone fountain",
      "Solid Burma teak flooring in master and library suites",
      "Covered parking for 3 large vehicles",
    ],
    amenities: [
      "Private landscaped rooftop terrace with pergola",
      "Full smart-home automation system",
      "Library & private cigar lounge",
      "Solar rooftop panel grid integration",
      "24/7 concierge & on-call maintenance crew",
    ],
    floor: "Independent 3-Story Luxury Villa",
    facing: "South Facing (Perpetual Breeze)",
    possessionDate: "Immediate / Ready",
    isFeatured: false,
  },
  {
    id: "prop-3",
    slug: "alipore-palms-penthouse",
    title: "Alipore Palms Penthouse",
    bengaliTitle: "আলিপুর পামস পেন্টহাউস",
    locality: "Alipore",
    localitySlug: "alipore",
    locationDetails: "Queens Park Road, Alipore",
    price: formatINR(650),
    priceNumericLakhs: 650,
    bhk: "4 BHK",
    bhkCount: 4,
    sqft: 4100,
    pricePerSqFt: 15853,
    status: "Under Construction · Possession Mid 2026",
    reraProjectNo: "WBRERA/P/SOU/2024/002145",
    developer: "Sterling Apex Developers",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "Kolkata Municipal Corporation (KMC)",
    metro: "1.4 km from Rabindra Sarobar Metro",
    floodRisk: "Minimal",
    image_url: aliporeImage,
    gallery_images: [aliporeImage, heroImage, saltLakeImage, newTownImage],
    galleryImages: [aliporeImage, heroImage, saltLakeImage, newTownImage],
    floor_plan_url: "/assets/floorplans/alipore-penthouse.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 3450,
      balconyAreaSqFt: 420,
      livingDiningSqFt: "32'0\" x 20'0\"",
      masterBedroomSqFt: "20'0\" x 16'0\"",
      kitchenSqFt: "16'0\" x 12'0\"",
    },
    description:
      "An ultra-exclusive penthouse offering panoramic 270-degree canopy views of South Kolkata and the National Library green belt. Features double-height living spaces, imported Italian Statuario marble, a private plunge pool on the upper deck, and bespoke concierge services.",
    highlights: [
      "Private plunge pool and landscaped timber terrace",
      "Double-height 22-foot grand living hall",
      "Imported Italian marble across all living & dining quarters",
      "Direct private high-speed elevator with retinal security",
    ],
    amenities: [
      "Temperature-controlled infinity pool",
      "Private wine cellar and banquet lounge",
      "Full-service private gym with personal trainer suite",
      "Chauffeur waiting lounge & car wash bay",
      "Sub-station tier backup generator",
    ],
    floor: "Top Floor (16th & 17th Duplex)",
    facing: "South-West (Lush Green Canopy Views)",
    possessionDate: "June 2026",
    isFeatured: false,
  },
  {
    id: "prop-4",
    slug: "ecopark-greens-villa",
    title: "Eco Park Greens Garden Villa",
    bengaliTitle: "ইকোপার্ক গ্রিন্স ভিলা",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Action Area I, Opposite Deer Park Enclave",
    price: formatINR(185),
    priceNumericLakhs: 185,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 2250,
    pricePerSqFt: 8222,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/NOR/2024/001780",
    developer: "Green Urban Spaces",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HIDCO & NKDA Approved",
    metro: "1.2 km from Nazrul Tirtha Metro",
    floodRisk: "Low",
    image_url: newTownImage,
    gallery_images: [newTownImage, heroImage, saltLakeImage, aliporeImage],
    galleryImages: [newTownImage, heroImage, saltLakeImage, aliporeImage],
    floor_plan_url: "/assets/floorplans/ecopark-villa.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1890,
      balconyAreaSqFt: 210,
      livingDiningSqFt: "26'0\" x 15'0\"",
      masterBedroomSqFt: "17'0\" x 14'0\"",
      kitchenSqFt: "13'0\" x 10'0\"",
    },
    description:
      "A garden-level duplex villa featuring a 600 sq ft private lawn, dual car porch, floor-to-ceiling soundproof French windows, and direct pedestrian walkway access to Eco Park's jogging and cycling trails.",
    highlights: [
      "600 sq ft private landscaped lawn with drip irrigation",
      "Duplex configuration with internal floating staircase",
      "Direct access gate to Eco Park green trails",
      "Zero shared walls with adjacent units",
    ],
    amenities: [
      "Clubhouse with badminton & squash courts",
      "Children's organic garden & play zone",
      "24-hour piped natural gas (PNG)",
      "Solar water heating on rooftop",
    ],
    floor: "Ground + 1st Floor Duplex",
    facing: "East Facing (Morning Sun)",
    possessionDate: "Ready to Move",
    isFeatured: false,
  },
  {
    id: "prop-5",
    slug: "baisakhi-terraces-saltlake",
    title: "Baisakhi Terraces",
    bengaliTitle: "বৈশাখী টেরেস",
    locality: "Salt Lake",
    localitySlug: "salt-lake",
    locationDetails: "Sector II, Near Baisakhi Island",
    price: formatINR(125),
    priceNumericLakhs: 125,
    bhk: "2 BHK",
    bhkCount: 2,
    sqft: 1520,
    pricePerSqFt: 8223,
    status: "Under Construction · Possession March 2026",
    reraProjectNo: "WBRERA/P/NOR/2023/000456",
    developer: "Baisakhi Residential Projects",
    tenure_type: "Leasehold",
    tenure: "Leasehold",
    approval: "Bidhannagar Municipal Corporation",
    metro: "800m from Central Park Metro",
    floodRisk: "Low",
    image_url: saltLakeImage,
    gallery_images: [saltLakeImage, aliporeImage, heroImage, newTownImage],
    galleryImages: [saltLakeImage, aliporeImage, heroImage, newTownImage],
    floor_plan_url: "/assets/floorplans/baisakhi-2bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1220,
      balconyAreaSqFt: 140,
      livingDiningSqFt: "21'0\" x 13'0\"",
      masterBedroomSqFt: "15'0\" x 12'6\"",
      kitchenSqFt: "10'6\" x 8'6\"",
    },
    description:
      "A well-planned boutique apartment in the heart of Sector II, Salt Lake. Offers generous bedrooms, wide utility terraces, modern kitchen ergonomics, and peaceful surroundings amidst mature mahogany trees.",
    highlights: [
      "Generous 14x16 ft master bedroom suite with attached balcony",
      "Walking distance to Central Park and local morning markets",
      "Only 2 residences per floor for maximum privacy",
      "Full municipal water supply + deep borewell backup",
    ],
    amenities: [
      "Rooftop community deck with barbecue station",
      "Automatic hydraulic elevator with battery backup",
      "CCTV surveillance across all communal zones",
      "Intercom system with visitor video validation",
    ],
    floor: "3rd of 5 Floors",
    facing: "South-East",
    possessionDate: "March 2026",
    isFeatured: false,
  },
  {
    id: "prop-6",
    slug: "queens-court-manor-alipore",
    title: "Queens Court Manor",
    bengaliTitle: "কুইনস কোর্ট ম্যানর",
    locality: "Alipore",
    localitySlug: "alipore",
    locationDetails: "Alipore Park Road, Near Horticultural Gardens",
    price: formatINR(820),
    priceNumericLakhs: 820,
    bhk: "4 BHK",
    bhkCount: 4,
    sqft: 4950,
    pricePerSqFt: 16565,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/SOU/2024/003112",
    developer: "Rajbari Heritage Estates",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "KMC Certified O.C. Received",
    metro: "1.8 km from Jatin Das Park Metro",
    floodRisk: "Minimal",
    image_url: aliporeImage,
    gallery_images: [aliporeImage, heroImage, newTownImage, saltLakeImage],
    galleryImages: [aliporeImage, heroImage, newTownImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/queens-court.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 4120,
      balconyAreaSqFt: 540,
      livingDiningSqFt: "36'0\" x 22'0\"",
      masterBedroomSqFt: "22'0\" x 18'0\"",
      kitchenSqFt: "18'0\" x 13'0\"",
    },
    description:
      "An architectural landmark on Alipore Park Road. Designed with classical colonnades, expansive wrap-around verandahs, Italian marble flooring throughout, staff quarters, and dedicated multi-vehicle basement parking.",
    highlights: [
      "Historic address overlooking lush Horticultural Garden greens",
      "Occupancy Certificate (OC) fully received; ready for immediate registry",
      "4 dedicated basement parking bays included",
      "Separate service entry and attached staff suite",
    ],
    amenities: [
      "Heated indoor lap pool",
      "Private screening room / cinema theatre",
      "Full spa treatment room with steam room",
      "Round-the-clock armed concierge & valets",
    ],
    floor: "5th of 8 Floors (Single Unit Floor Plate)",
    facing: "South-West Facing",
    possessionDate: "Immediate",
    isFeatured: false,
  },
  {
    id: "prop-7",
    slug: "canopy-greens-rajarhat",
    title: "Canopy Greens Residence",
    bengaliTitle: "ক্যানোপি গ্রিন্স",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Rajarhat Main Road, Near Chinar Park Crossing",
    price: formatINR(78),
    priceNumericLakhs: 78,
    bhk: "2 BHK",
    bhkCount: 2,
    sqft: 1120,
    pricePerSqFt: 6964,
    status: "Under Construction · Possession Aug 2026",
    reraProjectNo: "WBRERA/P/NOR/2024/000911",
    developer: "Sunrise Habitat Infra",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "NKDA Approved",
    metro: "1.5 km from City Centre 2 Metro",
    floodRisk: "Low",
    image_url: newTownImage,
    gallery_images: [newTownImage, heroImage, saltLakeImage, aliporeImage],
    galleryImages: [newTownImage, heroImage, saltLakeImage, aliporeImage],
    floor_plan_url: "/assets/floorplans/canopy-greens.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 895,
      balconyAreaSqFt: 110,
      livingDiningSqFt: "19'0\" x 12'0\"",
      masterBedroomSqFt: "14'0\" x 11'0\"",
      kitchenSqFt: "9'6\" x 7'6\"",
    },
    description:
      "An efficient, contemporary 2 BHK home tailored for young professionals. High usable carpet area ratio, sunlit interiors, acoustic double glazing, and immediate connectivity to Sector V IT hubs.",
    highlights: [
      "80% carpet-to-super-built-up efficiency",
      "Acoustic noise-dampening double-glazed UPVC windows",
      "7 minutes to Sector V Tech Park and Chinar Park dining strip",
      "Affordable maintenance cost structure",
    ],
    amenities: [
      "Co-working lounge with high-speed fiber internet",
      "Rooftop yoga deck & reflexology path",
      "Kids play park with synthetic soft turf",
      "Automatic dual lifts per block",
    ],
    floor: "9th of 14 Floors",
    facing: "North-East",
    possessionDate: "August 2026",
    isFeatured: false,
  },
  {
    id: "prop-8",
    slug: "horizon-heights-action-area-3",
    title: "Horizon Heights Sky Residences",
    bengaliTitle: "হরাইজন হাইটস",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Action Area III, Near Downtown Mall & IT SEZ",
    price: formatINR(118),
    priceNumericLakhs: 118,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 1650,
    pricePerSqFt: 7151,
    status: "Under Construction · Possession Nov 2026",
    reraProjectNo: "WBRERA/P/NOR/2024/001550",
    developer: "Horizon Group Kolkata",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HIDCO Sanctioned",
    metro: "1.9 km from AA-III Metro",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, newTownImage, aliporeImage, saltLakeImage],
    galleryImages: [heroImage, newTownImage, aliporeImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/horizon-heights.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1340,
      balconyAreaSqFt: 165,
      livingDiningSqFt: "23'0\" x 13'6\"",
      masterBedroomSqFt: "15'6\" x 13'0\"",
      kitchenSqFt: "11'0\" x 8'6\"",
    },
    description:
      "High-rise luxury overlooking the lake wetlands of Action Area III. Designed with floor-to-ceiling glass facades, spacious modular kitchen provisions, and seamless access to educational institutions.",
    highlights: [
      "Panoramic wetland and sunrise horizon views",
      "Walkable distance to top universities & IT SEZs",
      "Grand double-height air-conditioned entrance lobby",
      "Rainwater harvesting & wastewater recycling plant",
    ],
    amenities: [
      "Sky-deck lounge on 20th floor",
      "Mini theatre & indoor gaming arcade",
      "Cricket practice pitch and turf court",
      "Multi-brand convenience grocery store on premises",
    ],
    floor: "14th of 22 Floors",
    facing: "East Facing",
    possessionDate: "November 2026",
    isFeatured: false,
  },
];

export const featuredProperty = properties[0];

export const journalArticles: JournalArticle[] = [
  {
    slug: "freehold-leasehold-kolkata",
    title: "Freehold, Leasehold, or Co-operative Share in Kolkata?",
    bengaliTitle: "ফ্রিহোল্ড, লিজহোল্ড না সমবায় শেয়ার?",
    category: "Legal & Documentation",
    readTime: "6 min read",
    date: "September 2026",
    author: "BariGhor Advisory Desk",
    excerpt:
      "In Bengal, title structure shapes your long-term ownership, mortgage ease, and resale value just as much as square footage. Here is the plain-language guide.",
    content: [
      "When looking at homes across New Town, Salt Lake, and South Kolkata, one of the most critical yet frequently misunderstood aspects is the land title structure.",
      "In Salt Lake (Bidhannagar), almost all residential plots were initially allotted on 999-year municipal leases by the Urban Development Department. While ownership is secure and transferable through Mutation and Permission fees, buyers must ensure complete chain-of-title records and municipal non-encumbrance certificates.",
      "In New Town, HIDCO allots freehold residential parcels for gated complexes, offering direct freehold deed registrations that provide simpler mortgage processes with all major national banks.",
      "In South Kolkata (like Alipore and Ballygunge), traditional freehold land carries the highest premium, though heritage co-operative housing societies also exist with share certificates and strict member transfer bylaws.",
    ],
    keyTakeaways: [
      "Always verify if the property has a direct registered Deed of Sale or a Lease Assignment.",
      "In Salt Lake, ensure Bidhannagar Municipality mutation dues and transfer permissions are in order.",
      "Freehold properties in New Town and Alipore offer immediate, frictionless mortgage eligibility.",
    ],
  },
  {
    slug: "understanding-wbrera",
    title: "Understanding WBRERA: The Bengal Buyer's Checklist",
    bengaliTitle: "WBRERA এবং ক্রেতার সুরক্ষা নির্দেশিকা",
    category: "Regulatory & Compliance",
    readTime: "5 min read",
    date: "September 2026",
    author: "Siddhartha Sen, Legal Advisor",
    excerpt:
      "How West Bengal Real Estate Regulatory Authority protects home buyers, and what 4 numbers you must check before writing a token cheque.",
    content: [
      "Following Supreme Court directives and the transition from WBHIRA to the unified WBRERA (West Bengal Real Estate Regulatory Authority), property buyers in West Bengal enjoy robust statutory protection.",
      "Every new residential project with more than 8 apartments or 500 square meters of land MUST have an active WBRERA registration number prior to marketing, advertising, or taking advances.",
      "The registered project page on the official portal (rera.wb.gov.in) provides public access to sanctioned building plans, developer encumbrance disclosures, quarterly construction progress reports, and designated escrow account details.",
    ],
    keyTakeaways: [
      "Check the exact WBRERA registration number format (e.g. WBRERA/P/NOR/2024/001234).",
      "Verify that all advance payments are routed strictly to the designated project RERA Escrow account.",
      "Demand the sanctioned structural drawing approval letter from HIDCO, NKDA, or KMC.",
    ],
  },
  {
    slug: "kolkata-monsoon-drainage-guide",
    title: "An Honest Monsoon & Drainage Assessment for New Town & Salt Lake",
    bengaliTitle: "বর্ষায় জলনিকাশী ব্যবস্থা: নিউ টাউন ও সল্টলেক",
    category: "Neighbourhood Intelligence",
    readTime: "7 min read",
    date: "September 2026",
    author: "BariGhor Field Research",
    excerpt:
      "Why street elevation and canal connectivity matter more than pin codes during Kolkata's heaviest July downpours.",
    content: [
      "During Kolkata's intense monsoon spells (often exceeding 100mm in 6 hours), neighbourhood storm water management becomes the real test of liveability.",
      "New Town was engineered with dedicated underground box drains, high-capacity pumping stations at Bagjola Canal and Kestopur Canal, and natural retention basins around Eco Park wetlands, making water evacuation remarkably fast in Action Areas I and II.",
      "In Salt Lake, recent municipal investments in storm sewer desilting and high-discharge pumps along the Eastern Drainage Channel have resolved legacy waterlogging in Sectors I and III.",
      "Before purchasing, BariGhor inspects road crown heights, building plinth levels (minimum 2.5 to 3 feet above finished road level), and basement sump pump redundancies.",
    ],
    keyTakeaways: [
      "Look for building plinths raised at least 30 inches above the peripheral municipal road level.",
      "Inspect dedicated stormwater drainage channels and backup generators for sump pumps.",
      "Check our neighbourhood flood risk tag on every BariGhor listing.",
    ],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}

export function getJournalBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((j) => j.slug === slug);
}

export function filterProperties({
  locality,
  budget,
  bhk,
}: {
  locality?: string;
  budget?: string;
  bhk?: string;
}): Property[] {
  return properties.filter((p) => {
    // Locality check
    if (locality && locality !== "all" && locality !== "All Localities") {
      const locNorm = locality.toLowerCase().replace(/\s+/g, "-");
      if (
        p.localitySlug !== locNorm &&
        !p.locality.toLowerCase().includes(locality.toLowerCase())
      ) {
        return false;
      }
    }

    // BHK check
    if (bhk && bhk !== "all" && bhk !== "All BHKs") {
      const bhkClean = bhk.toUpperCase();
      if (!p.bhk.toUpperCase().includes(bhkClean.replace(" BHK", ""))) {
        return false;
      }
    }

    // Budget check
    if (budget && budget !== "all" && budget !== "All Budgets") {
      if (budget === "under-1cr" || budget.includes("75 L") || budget.includes("< ₹1 Cr")) {
        if (p.priceNumericLakhs > 100) return false;
      } else if (budget === "1cr-2cr" || budget.includes("1–2 Cr") || budget.includes("1-2 Cr")) {
        if (p.priceNumericLakhs < 100 || p.priceNumericLakhs > 200) return false;
      } else if (budget === "2cr-4cr" || budget.includes("2–4 Cr") || budget.includes("2-4 Cr")) {
        if (p.priceNumericLakhs < 200 || p.priceNumericLakhs > 400) return false;
      } else if (budget === "4cr-plus" || budget.includes("4 Cr+")) {
        if (p.priceNumericLakhs < 400) return false;
      }
    }

    return true;
  });
}
