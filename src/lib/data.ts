import heroImage from "@/assets/barighor-hero.jpg";
import newTownImage from "@/assets/new-town.jpg";
import saltLakeImage from "@/assets/salt-lake.jpg";
import aliporeImage from "@/assets/alipore-home.jpg";
import { formatINR } from "@/lib/utils";

export type ListingType = "buy" | "rent" | "new_launch";
export type PropertyType =
  | "Apartment"
  | "Independent House"
  | "Villa"
  | "Plot"
  | "Commercial";

export type PropertyCategory =
  | "apartment"
  | "villa"
  | "independent_house"
  | "plot"
  | "commercial";

export type PossessionStatus = "Ready to move" | "Possession 2027" | "Possession 2028+";

export interface Property {
  id: string;
  slug: string;
  citySlug?: string;
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
  listingType?: ListingType;
  propertyType?: PropertyType;
  propertyCategory: PropertyCategory;
  serviceType?: string;
  verified: boolean;
  verifiedDate: string;
}

export function getDerivedPossessionStatus(possessionDate: string): PossessionStatus {
  if (!possessionDate) return "Ready to move";
  const lower = possessionDate.toLowerCase();
  if (lower.includes("ready") || lower.includes("immediate")) {
    return "Ready to move";
  }
  const match = possessionDate.match(/20\d\d/);
  if (match) {
    const year = parseInt(match[0], 10);
    if (year <= 2026) {
      return "Ready to move";
    }
    if (year === 2027) {
      return "Possession 2027";
    }
    if (year >= 2028) {
      return "Possession 2028+";
    }
  }
  return "Ready to move";
}

export interface Locality {
  slug: string;
  name: string;
  bengali: string;
  citySlug?: string;
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
  avgPricePerSqft?: number;
  priceTrendPercent: string;
  propertyCount: number;
  rating: number; // editorial score out of 5, set by admin — NOT user-generated
  reviewCount: number; // set to 0 (hidden unless real editorial reviews)
  connectivityNotes: string;
  nearestMetro: string;
  nearestMetroDistance: string;
  floodRiskRating: "Low" | "Minimal" | "Moderate";
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
  id?: string;
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
  coverImage?: string;
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
    citySlug: "new-town",
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
    avgPricePerSqft: 9800,
    priceTrendPercent: "+12.4% YoY",
    propertyCount: 64,
    rating: 4.8,
    reviewCount: 0,
    connectivityNotes:
      "Direct access via Major Arterial Road, Orange Line Metro, and 15-minute reach to Netaji Subhash Chandra Bose International Airport.",
    nearestMetro: "Eco Park Metro (Orange Line)",
    nearestMetroDistance: "1.2 km",
    floodRiskRating: "Low",
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
    citySlug: "kolkata",
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
    avgPricePerSqft: 12500,
    priceTrendPercent: "+8.6% YoY",
    propertyCount: 48,
    rating: 4.7,
    reviewCount: 0,
    connectivityNotes:
      "Seamless connectivity through Green Line (East-West Metro) connecting directly to Sealdah and Howrah stations, with EM Bypass on the eastern rim.",
    nearestMetro: "Karunamoyee & Central Park Metro (Green Line)",
    nearestMetroDistance: "800m",
    floodRiskRating: "Low",
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
    citySlug: "kolkata",
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
    avgPricePerSqft: 24500,
    priceTrendPercent: "+14.8% YoY",
    propertyCount: 31,
    rating: 4.9,
    reviewCount: 0,
    connectivityNotes:
      "AJC Bose Road Flyover connects directly to Kolkata CBD and Park Street within 8 minutes. Close to Blue Line Metro.",
    nearestMetro: "Rabindra Sarobar / Netaji Bhavan (Blue Line)",
    nearestMetroDistance: "1.4 km",
    floodRiskRating: "Minimal",
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
  {
    slug: "ballygunge",
    name: "Ballygunge",
    bengali: "বালিগঞ্জ",
    citySlug: "kolkata",
    tagline: "Stately southern boulevard, elite clubs, and heritage leafy paras.",
    description:
      "[PLACEHOLDER] Ballygunge forms the traditional cultural and aristocratic core of South Kolkata. Shaded avenues along Ballygunge Circular Road, premier educational institutions, and heritage co-operative housing societies.",
    priceRange: "₹2.2 Cr – ₹12 Cr+",
    price_trend: {
      yoyGrowth: "+9.2% YoY",
      historicalRates: [
        { year: "2023", avgRate: 12200 },
        { year: "2024", avgRate: 13100 },
        { year: "2025", avgRate: 14200 },
        { year: "2026", avgRate: 15500 },
      ],
      rentalYield: "3.1% – 3.5%",
      demandRating: "Very High (Prime South Kolkata prestige addresses)",
    },
    avgPriceSqFt: "₹12,000 – ₹19,500 / sq ft",
    avgPricePerSqft: 15500,
    priceTrendPercent: "+9.2% YoY",
    propertyCount: 36,
    rating: 4.8,
    reviewCount: 0,
    connectivityNotes:
      "Direct transit along Sarat Bose Road, Gariahat Crossing, and quick access to Netaji Bhavan / Rabindra Sadan Blue Line Metro.",
    nearestMetro: "Netaji Bhavan & Jatin Das Park Metro (Blue Line)",
    nearestMetroDistance: "1.2 km",
    floodRiskRating: "Minimal",
    verifiedHomesCount: 36,
    connectivity_score: "9.3 / 10",
    connectivityScore: "9.3 / 10",
    airportTime: "40 min",
    metroConnectivity: "Blue Line Metro & AJC Bose Road Flyover",
    floodRiskNote: "Minimal (Well-maintained British-era trunk storm sewers & elevated street crowns)",
    hero_image: aliporeImage,
    image: aliporeImage,
    keyHighlights: [
      "Immediate proximity to Calcutta Punjab Club and Ballygunge Club",
      "Premier schools: South Point, St. Lawrence, Modern High School for Girls",
      "Vibrant paras: Dover Park, Sunny Park, Queens Park, and Broad Street",
      "Enduring capital stability with strong legacy ownership",
    ],
    editorialNote:
      "[PLACEHOLDER] Client to verify exact paras and circle rate schedule for Ballygunge.",
  },
  {
    slug: "tollygunge",
    name: "Tollygunge",
    bengali: "টালিগঞ্জ",
    citySlug: "kolkata",
    tagline: "Historic golf greens, film-heritage calm & premier South Kolkata transit.",
    description:
      "[PLACEHOLDER] Famous for the historic Royal Calcutta Golf Club and Tollygunge Club, this lush South Kolkata enclave balances tranquil verdant fairways with high-frequency Blue Line Metro connectivity.",
    priceRange: "₹95 Lakh – ₹4.8 Cr",
    price_trend: {
      yoyGrowth: "+10.1% YoY",
      historicalRates: [
        { year: "2023", avgRate: 7800 },
        { year: "2024", avgRate: 8500 },
        { year: "2025", avgRate: 9400 },
        { year: "2026", avgRate: 10350 },
      ],
      rentalYield: "3.4% – 3.7%",
      demandRating: "High (Golf vistas & Blue Line terminal connectivity)",
    },
    avgPriceSqFt: "₹8,200 – ₹13,000 / sq ft",
    avgPricePerSqft: 10350,
    priceTrendPercent: "+10.1% YoY",
    propertyCount: 42,
    rating: 4.6,
    reviewCount: 0,
    connectivityNotes:
      "Dual metro access via Mahanayak Uttam Kumar (Tollygunge) and Netaji stations on the Blue Line, connecting direct to Park Street and Esplanade.",
    nearestMetro: "Mahanayak Uttam Kumar (Tollygunge) Metro",
    nearestMetroDistance: "600m",
    floodRiskRating: "Low",
    verifiedHomesCount: 42,
    connectivity_score: "9.1 / 10",
    connectivityScore: "9.1 / 10",
    airportTime: "50 min",
    metroConnectivity: "Blue Line Metro (Mahanayak Uttam Kumar / Netaji)",
    floodRiskNote: "Low (Upgraded Keorapukur canal drainage system)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Twin golf greens: Royal Calcutta Golf Club & Tollygunge Club fairways",
      "Fast 15-minute Blue Line metro commute directly into Central Kolkata CBD",
      "Serene cultural heritage of Tollywood studios and quiet residential paras",
      "Proximity to South City Mall and Prince Anwar Shah Road",
    ],
    editorialNote:
      "[PLACEHOLDER] Client to verify exact block designations and latest circle rates.",
  },
  {
    slug: "rajarhat",
    name: "Rajarhat",
    bengali: "রাজারহাট",
    citySlug: "kolkata",
    tagline: "Emerging IT residential belt, airport expressway & modern condominiums.",
    description:
      "[PLACEHOLDER] The dynamic eastern expansion corridor linking VIP Road to New Town Action Area II. Offers modern lifestyle residential complexes, retail destinations like City Centre 2, and convenient airport access.",
    priceRange: "₹45 Lakh – ₹1.9 Cr",
    price_trend: {
      yoyGrowth: "+11.5% YoY",
      historicalRates: [
        { year: "2023", avgRate: 5400 },
        { year: "2024", avgRate: 6100 },
        { year: "2025", avgRate: 6850 },
        { year: "2026", avgRate: 7600 },
      ],
      rentalYield: "3.9% – 4.3%",
      demandRating: "Very High (Airport & Sector V tech workforce)",
    },
    avgPriceSqFt: "₹6,000 – ₹9,200 / sq ft",
    avgPricePerSqft: 7600,
    priceTrendPercent: "+11.5% YoY",
    propertyCount: 52,
    rating: 4.5,
    reviewCount: 0,
    connectivityNotes:
      "Direct 10-minute commute to Netaji Subhash Chandra Bose International Airport via Rajarhat Main Road and VIP Road.",
    nearestMetro: "City Centre 2 Metro (Orange Line)",
    nearestMetroDistance: "1.1 km",
    floodRiskRating: "Low",
    verifiedHomesCount: 52,
    connectivity_score: "8.7 / 10",
    connectivityScore: "8.7 / 10",
    airportTime: "12 min",
    metroConnectivity: "Orange Line Metro & Rajarhat Main Road Expressway",
    floodRiskNote: "Low (Upgraded drainage networks under NKDA municipal coverage)",
    hero_image: newTownImage,
    image: newTownImage,
    keyHighlights: [
      "12-minute reach to Kolkata International Airport terminal",
      "Major retail and entertainment at City Centre 2 and Chinar Park",
      "High rental yield driven by IT Sector V and New Town workforce",
      "Affordable entry pricing relative to inner core Kolkata",
    ],
    editorialNote:
      "[PLACEHOLDER] Client to provide verified developer list and sanctioned municipal master plan.",
  },
  {
    slug: "shibpur",
    name: "Shibpur & Mandirtala",
    bengali: "শিবপুর ও মন্দিরতলা",
    citySlug: "howrah",
    tagline: "Heritage riverfront addresses, Vidyasagar Setu connectivity & quiet residential avenues.",
    description:
      "Howrah's most established residential neighborhood facing the Hooghly riverfront. Direct 10-minute access to Rabindra Sadan via Second Hooghly Bridge, century-old botanical gardens, and modern river-facing gated developments.",
    priceRange: "₹45 Lakh – ₹2.2 Cr",
    price_trend: {
      yoyGrowth: "+10.2% YoY",
      historicalRates: [
        { year: "2023", avgRate: 4800 },
        { year: "2024", avgRate: 5300 },
        { year: "2025", avgRate: 5900 },
        { year: "2026", avgRate: 6500 },
      ],
      rentalYield: "3.5% – 3.8%",
      demandRating: "High (Rapid flyover connectivity to South Kolkata)",
    },
    avgPriceSqFt: "₹5,200 – ₹8,400 / sq ft",
    avgPricePerSqft: 6500,
    priceTrendPercent: "+10.2% YoY",
    propertyCount: 28,
    rating: 4.5,
    reviewCount: 0,
    connectivityNotes:
      "Direct approach to Vidyasagar Setu (Second Hooghly Bridge), Foreshore Road riverfront corridor, and Howrah Maidan Metro.",
    nearestMetro: "Howrah Maidan Metro (Green Line)",
    nearestMetroDistance: "2.4 km",
    floodRiskRating: "Low",
    verifiedHomesCount: 28,
    connectivity_score: "8.6 / 10",
    connectivityScore: "8.6 / 10",
    airportTime: "45 min",
    metroConnectivity: "Green Line Howrah Maidan Metro & Vidyasagar Setu",
    floodRiskNote: "Low (Natural elevated river bank & upgraded municipal sluices)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Immediate access to Vidyasagar Setu (Second Hooghly Bridge)",
      "Minutes to AJC Bose Indian Botanic Garden (largest in India)",
      "Green Line underwater metro connecting directly to Esplanade & Salt Lake",
      "Panoramic Hooghly river vistas and fresh river breezes",
    ],
    editorialNote:
      "Vidyasagar Setu proximity makes Shibpur functionally closer to South Kolkata CBD than many southern suburbs.",
  },
  {
    slug: "burnpur-road",
    name: "Burnpur Road & Polo Ground",
    bengali: "বার্নপুর রোড ও পোলো গ্রাউন্ড",
    citySlug: "asansol",
    tagline: "Wide tree-lined avenues, industrial executive estates & premier schools.",
    description:
      "Asansol's most sought-after residential stretch. Established bungalows, modern mid-rise gated communities, and immediate proximity to Asansol Club and IISCO executive quarters.",
    priceRange: "₹22 Lakh – ₹95 Lakh",
    price_trend: {
      yoyGrowth: "+9.2% YoY",
      historicalRates: [
        { year: "2023", avgRate: 2600 },
        { year: "2024", avgRate: 2850 },
        { year: "2025", avgRate: 3100 },
        { year: "2026", avgRate: 3400 },
      ],
      rentalYield: "4.2% – 4.6%",
      demandRating: "High (Executive workforce & medical hub)",
    },
    avgPriceSqFt: "₹3,100 – ₹4,200 / sq ft",
    avgPricePerSqft: 3400,
    priceTrendPercent: "+9.2% YoY",
    propertyCount: 19,
    rating: 4.4,
    reviewCount: 0,
    connectivityNotes: "Direct 5-minute approach to GT Road (NH-19) and Asansol Junction main terminal.",
    nearestMetro: "Asansol Main Junction (Rail Corridor)",
    nearestMetroDistance: "1.2 km",
    floodRiskRating: "Low",
    verifiedHomesCount: 19,
    connectivity_score: "8.2 / 10",
    connectivityScore: "8.2 / 10",
    airportTime: "40 min to Kazi Nazrul Islam Airport (RGD)",
    metroConnectivity: "NH-19 & Eastern Railway High-Speed Line",
    floodRiskNote: "Low (Naturally undulating Deccan plateau topography)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Walkable reach to prestigious schools like St. Vincent's and Loreto",
      "Undulating topography ensures natural stormwater runoff",
      "Clear freehold municipal titles under AMC jurisdiction",
    ],
    editorialNote: "Burnpur Road offers the highest resale liquidity and rental tenancy stability in Paschim Bardhaman.",
  },
  {
    slug: "city-centre-durgapur",
    name: "City Centre & B-Zone",
    bengali: "সিটি সেন্টার ও বি-জোন",
    citySlug: "durgapur",
    tagline: "Planned steel-city township, Junction Mall entertainment & broad boulevards.",
    description:
      "Durgapur's premier urban core. Designed with broad 4-lane boulevards, landscaped parks, Junction Mall retail strip, and upscale gated apartment projects.",
    priceRange: "₹25 Lakh – ₹1.1 Cr",
    price_trend: {
      yoyGrowth: "+11.1% YoY",
      historicalRates: [
        { year: "2023", avgRate: 2700 },
        { year: "2024", avgRate: 3000 },
        { year: "2025", avgRate: 3300 },
        { year: "2026", avgRate: 3650 },
      ],
      rentalYield: "4.0% – 4.5%",
      demandRating: "Very High (IT Parks, Hospitals & NH-19)",
    },
    avgPriceSqFt: "₹3,200 – ₹4,500 / sq ft",
    avgPricePerSqft: 3600,
    priceTrendPercent: "+11.1% YoY",
    propertyCount: 24,
    rating: 4.6,
    reviewCount: 0,
    connectivityNotes: "NH-19 arterial connectivity, City Centre bus terminus, and Andal Airport within 25 minutes.",
    nearestMetro: "City Centre Multi-Modal Hub",
    nearestMetroDistance: "500m",
    floodRiskRating: "Low",
    verifiedHomesCount: 24,
    connectivity_score: "8.9 / 10",
    connectivityScore: "8.9 / 10",
    airportTime: "25 min to Andal Kazi Nazrul Islam Airport",
    metroConnectivity: "Grand Trunk Road Expressway (NH-19)",
    floodRiskNote: "Low (Planned subterranean storm drain network)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Immediate proximity to Junction Mall and Fortune Park",
      "Mission Hospital and IQ City multi-speciality reach",
      "Planned wide avenues with zero bottleneck congestion",
    ],
    editorialNote: "City Centre is Durgapur's most prestigious postal code with maximum capital appreciation.",
  },
  {
    slug: "sevoke-road-corridor",
    name: "Sevoke Road Corridor",
    bengali: "সেভক রোড করিডোর",
    citySlug: "siliguri",
    tagline: "Tea garden foothills, gateway to Sikkim & high-end shopping destinations.",
    description:
      "North Bengal's most prestigious residential address. Spanning the Sevoke Road arterial, upscale gated condominiums, tea garden perimeter villas, and shopping malls.",
    priceRange: "₹35 Lakh – ₹1.8 Cr",
    price_trend: {
      yoyGrowth: "+13.5% YoY",
      historicalRates: [
        { year: "2023", avgRate: 3800 },
        { year: "2024", avgRate: 4300 },
        { year: "2025", avgRate: 4800 },
        { year: "2026", avgRate: 5450 },
      ],
      rentalYield: "4.5% – 5.0%",
      demandRating: "Ultra-High (Commerce gateway & foothill tourism)",
    },
    avgPriceSqFt: "₹4,200 – ₹6,800 / sq ft",
    avgPricePerSqft: 5200,
    priceTrendPercent: "+13.5% YoY",
    propertyCount: 22,
    rating: 4.7,
    reviewCount: 0,
    connectivityNotes: "Direct highway to Darjeeling, Sikkim, and 25-minute transit to Bagdogra International Airport.",
    nearestMetro: "New Jalpaiguri (NJP) Railway Junction",
    nearestMetroDistance: "8.5 km",
    floodRiskRating: "Minimal",
    verifiedHomesCount: 22,
    connectivity_score: "9.0 / 10",
    connectivityScore: "9.0 / 10",
    airportTime: "25 min to Bagdogra Airport (IXB)",
    metroConnectivity: "AH2 Asian Highway & Sevoke Express Link",
    floodRiskNote: "Minimal (Natural mountain drainage gradient)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Mountain horizon vistas and cooler foothill micro-climate",
      "Cosmopolitan retail: Vega Circle Mall and Cosmos Mall",
      "High commercial capital inflow from entire North-East",
    ],
    editorialNote: "Sevoke Road offers the strongest commercial-residential hybrid yield profile in Eastern India.",
  },
  {
    slug: "curzon-gate-district",
    name: "Curzon Gate Heritage District",
    bengali: "কার্জন গেট চত্বর",
    citySlug: "bardhaman",
    tagline: "Historic Rajbari avenues, Burdwan University campus & serene community paras.",
    description:
      "The cultural epicenter of Bardhaman. Lined with historic landmarks, lush university gardens, and modern boutique residential townhouses along GT Road.",
    priceRange: "₹20 Lakh – ₹85 Lakh",
    price_trend: {
      yoyGrowth: "+7.8% YoY",
      historicalRates: [
        { year: "2023", avgRate: 2300 },
        { year: "2024", avgRate: 2550 },
        { year: "2025", avgRate: 2800 },
        { year: "2026", avgRate: 3050 },
      ],
      rentalYield: "3.9% – 4.2%",
      demandRating: "Moderate-High (Academic & administrative hub)",
    },
    avgPriceSqFt: "₹2,600 – ₹3,800 / sq ft",
    avgPricePerSqft: 3100,
    priceTrendPercent: "+7.8% YoY",
    propertyCount: 16,
    rating: 4.3,
    reviewCount: 0,
    connectivityNotes: "Direct approach to Bardhaman Junction on the Kolkata-Delhi main rail line.",
    nearestMetro: "Bardhaman Junction Main Station",
    nearestMetroDistance: "1.5 km",
    floodRiskRating: "Low",
    verifiedHomesCount: 16,
    connectivity_score: "8.1 / 10",
    connectivityScore: "8.1 / 10",
    airportTime: "90 min to Kolkata Airport",
    metroConnectivity: "Eastern Railway Suburban & High-Speed Hub",
    floodRiskNote: "Low (Damodar flood control barriers & elevated town layout)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Historic landmark charm with pedestrian-friendly tree avenues",
      "Proximity to Burdwan University & Medical College",
      "Low cost of living with exceptional heritage food markets",
    ],
    editorialNote: "Bardhaman offers peaceful residential retirement calm with direct 1-hour train commute to Howrah.",
  },
  {
    slug: "jessore-road-corridor",
    name: "Jessore Road Corridor",
    bengali: "যশোর রোড করিডোর",
    citySlug: "habra",
    tagline: "Commuter express line to Sealdah, flourishing trade markets & affordable homes.",
    description:
      "Habra's primary growth corridor along Jessore Road (NH-112). Fast rail commute to Kolkata, bustling municipal markets, and affordable starter homes.",
    priceRange: "₹18 Lakh – ₹65 Lakh",
    price_trend: {
      yoyGrowth: "+8.4% YoY",
      historicalRates: [
        { year: "2023", avgRate: 2100 },
        { year: "2024", avgRate: 2300 },
        { year: "2025", avgRate: 2550 },
        { year: "2026", avgRate: 2800 },
      ],
      rentalYield: "4.1% – 4.4%",
      demandRating: "High (Suburban Kolkata commuters)",
    },
    avgPriceSqFt: "₹2,400 – ₹3,400 / sq ft",
    avgPricePerSqft: 2800,
    priceTrendPercent: "+8.4% YoY",
    propertyCount: 14,
    rating: 4.2,
    reviewCount: 0,
    connectivityNotes: "Direct local EMU rail connectivity to Sealdah terminal in 55 minutes.",
    nearestMetro: "Habra Railway Station (EMU Local)",
    nearestMetroDistance: "800m",
    floodRiskRating: "Low",
    verifiedHomesCount: 14,
    connectivity_score: "7.9 / 10",
    connectivityScore: "7.9 / 10",
    airportTime: "40 min to Kolkata Airport via Jessore Road",
    metroConnectivity: "Sealdah-Bangaon EMU Suburban Railway Line",
    floodRiskNote: "Low (Municipal box drain canal upgrades completed in 2024)",
    hero_image: heroImage,
    image: heroImage,
    keyHighlights: [
      "Extremely affordable entry pricing under ₹25 Lakhs",
      "Frequent EMU train frequencies directly to Sealdah and Dum Dum",
      "Rapidly developing residential complexes with municipal water supply",
    ],
    editorialNote: "Ideal starter homes for young professionals commuting to central and north Kolkata.",
  },
];

export const properties: Property[] = [
  {
    id: "prop-1",
    slug: "the-verandah-residences",
    title: "The Verandah Residences",
    bengaliTitle: "দ্য ভেরান্দা রেসিডেন্সেস",
    citySlug: "new-town",
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
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-2",
    slug: "the-saltlake-manor",
    title: "The Salt Lake Manor",
    bengaliTitle: "সল্ট লেক ম্যানর",
    citySlug: "kolkata",
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
    listingType: "buy",
    propertyType: "Villa",
    propertyCategory: "villa",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-3",
    slug: "alipore-palms-penthouse",
    title: "Alipore Palms Penthouse",
    bengaliTitle: "আলিপুর পামস পেন্টহাউস",
    citySlug: "kolkata",
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
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-4",
    slug: "ecopark-greens-villa",
    title: "Eco Park Greens Garden Villa",
    bengaliTitle: "ইকোপার্ক গ্রিন্স ভিলা",
    citySlug: "new-town",
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
    listingType: "buy",
    propertyType: "Villa",
    propertyCategory: "villa",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-5",
    slug: "baisakhi-terraces-saltlake",
    title: "Baisakhi Terraces",
    bengaliTitle: "বৈশাখী টেরেস",
    citySlug: "kolkata",
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
    listingType: "rent",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-6",
    slug: "queens-court-manor-alipore",
    title: "Queens Court Manor",
    bengaliTitle: "কুইনস কোর্ট ম্যানর",
    citySlug: "kolkata",
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
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-7",
    slug: "canopy-greens-rajarhat",
    title: "Canopy Greens Residence",
    bengaliTitle: "ক্যানোপি গ্রিন্স",
    citySlug: "new-town",
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
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-8",
    slug: "horizon-heights-action-area-3",
    title: "Horizon Heights Sky Residences",
    bengaliTitle: "হরাইজন হাইটস",
    citySlug: "new-town",
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
    listingType: "new_launch",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-9",
    slug: "the-grand-hooghly-residences",
    title: "The Grand Hooghly Residences",
    bengaliTitle: "দ্য গ্র্যান্ড হুগলি রেসিডেন্সেস",
    citySlug: "howrah",
    locality: "Shibpur & Mandirtala",
    localitySlug: "shibpur",
    locationDetails: "Foreshore Road, Near Botanic Garden Gate",
    price: formatINR(92),
    priceNumericLakhs: 92,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 1540,
    pricePerSqFt: 5974,
    status: "Under Construction · Possession Dec 2026",
    reraProjectNo: "WBRERA/P/HOW/2024/000412",
    developer: "Hooghly Riverfront Infra",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HMC & WBRERA Registered",
    metro: "2.4 km from Howrah Maidan Green Line Metro",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, saltLakeImage, newTownImage],
    galleryImages: [heroImage, saltLakeImage, newTownImage],
    floor_plan_url: "/assets/floorplans/hooghly-3bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1240,
      balconyAreaSqFt: 160,
      livingDiningSqFt: "23'0\" x 14'0\"",
      masterBedroomSqFt: "15'6\" x 12'6\"",
      kitchenSqFt: "11'0\" x 8'6\"",
    },
    description:
      "A river-facing three-bedroom condominium offering unobstructed panoramic vistas of the Hooghly river, Vidyasagar Setu, and the Princep Ghat skyline across the water. Designed with dual cross-ventilation, double-height lobby, and direct access to Foreshore Road.",
    highlights: [
      "Unobstructed panoramic Hooghly river & Vidyasagar Setu vistas",
      "10 minutes drive to Kolkata CBD via Second Hooghly Bridge",
      "Generous 7-foot deep river-facing balcony",
      "100% Vastu-compliant layout",
    ],
    amenities: [
      "Riverfront promenade and gazebo",
      "Rooftop clubhouse and gymnasium",
      "Automated covered car parking",
      "24/7 security with RFID gate access",
    ],
    floor: "12th of 18 Floors",
    facing: "East Facing (Sunrise & River View)",
    possessionDate: "December 2026",
    isFeatured: true,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-10",
    slug: "habra-green-meadows",
    title: "Habra Green Meadows",
    bengaliTitle: "হাবড়া গ্রিন মেডোজ",
    citySlug: "habra",
    locality: "Jessore Road Corridor",
    localitySlug: "jessore-road-corridor",
    locationDetails: "Jessore Road, Near Habra Station & Municipal Market",
    price: formatINR(18),
    priceNumericLakhs: 18,
    bhk: "1 BHK",
    bhkCount: 1,
    sqft: 580,
    pricePerSqFt: 3103,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/NOR/2023/000219",
    developer: "North 24 Parganas Urban Living",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "Habra Municipality Approved",
    metro: "Local EMU Rail 800m to Sealdah line",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, newTownImage],
    galleryImages: [heroImage, newTownImage],
    floor_plan_url: "/assets/floorplans/habra-1bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 465,
      balconyAreaSqFt: 45,
      livingDiningSqFt: "14'0\" x 10'0\"",
      masterBedroomSqFt: "12'0\" x 10'0\"",
      kitchenSqFt: "7'0\" x 5'6\"",
    },
    description:
      "An affordable, compact 1 BHK home built for first-time buyers and retirees. Direct rail connectivity to Kolkata, airy layout, and minimal maintenance fees.",
    highlights: [
      "Under ₹20 Lakh budget",
      "800m from Habra Railway Station",
      "Low monthly maintenance",
      "Clear freehold municipal title",
    ],
    amenities: [
      "24/7 potable filtered water supply",
      "CCTV gated perimeter",
      "Community courtyard",
      "Two-wheeler dedicated parking",
    ],
    floor: "2nd of 4 Floors",
    facing: "South Facing",
    possessionDate: "Immediate / Ready",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-11",
    slug: "asansol-greenfield-studio",
    title: "Asansol Greenfield Studio",
    bengaliTitle: "আসানসোল গ্রিনফিল্ড স্টুডিও",
    citySlug: "asansol",
    locality: "Burnpur Road",
    localitySlug: "burnpur-road",
    locationDetails: "Burnpur Road, Near Asansol Polo Ground",
    price: formatINR(22),
    priceNumericLakhs: 22,
    bhk: "1 BHK",
    bhkCount: 1,
    sqft: 640,
    pricePerSqFt: 3438,
    status: "Under Construction · Possession Dec 2027",
    reraProjectNo: "WBRERA/P/PAS/2024/000881",
    developer: "Damodar Valley Infrastructure",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "AMC Sanctioned",
    metro: "1.2 km from Asansol Junction",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, saltLakeImage],
    galleryImages: [heroImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/asansol-1bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 510,
      balconyAreaSqFt: 50,
      livingDiningSqFt: "15'0\" x 10'6\"",
      masterBedroomSqFt: "12'6\" x 10'6\"",
      kitchenSqFt: "7'6\" x 6'0\"",
    },
    description:
      "A smart 1 BHK condominium in Asansol's prime industrial corridor. Modern security, solar water heating, and excellent connectivity to national highway network.",
    highlights: [
      "Ideal starter residence under ₹25 Lakhs",
      "Minutes from Asansol Junction and market",
      "100% Vastu-compliant north-east entry",
      "Dedicated power backup for elevators",
    ],
    amenities: [
      "Rooftop community lounge",
      "Gated perimeter with guards",
      "Ample resident car parking",
      "Kids play park",
    ],
    floor: "4th of 7 Floors",
    facing: "North-East",
    possessionDate: "December 2027",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-12",
    slug: "durgapur-steel-city-residency",
    title: "Durgapur Steel City Residency",
    bengaliTitle: "দুর্গাপুর স্টিল সিটি রেসিডেন্সি",
    citySlug: "durgapur",
    locality: "City Centre",
    localitySlug: "city-centre-durgapur",
    locationDetails: "City Centre, Near Junction Mall",
    price: formatINR(36),
    priceNumericLakhs: 36,
    bhk: "2 BHK",
    bhkCount: 2,
    sqft: 980,
    pricePerSqFt: 3673,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/PAS/2023/000542",
    developer: "DMC Habitat Developers",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "DMC & WBRERA Registered",
    metro: "NH-19 Corridor 500m",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, newTownImage],
    galleryImages: [heroImage, newTownImage],
    floor_plan_url: "/assets/floorplans/durgapur-2bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 785,
      balconyAreaSqFt: 85,
      livingDiningSqFt: "18'0\" x 11'6\"",
      masterBedroomSqFt: "13'6\" x 11'0\"",
      kitchenSqFt: "8'6\" x 6'6\"",
    },
    description:
      "A ready-to-move 2 BHK apartment in Durgapur City Centre. Walkable to Junction Mall, hospitals, and national schools with immediate registration.",
    highlights: [
      "Priced in the sweet spot of ₹25–50L band",
      "Ready to move with Occupancy Certificate",
      "Walkable to City Centre commercial zone",
      "Wide balconies with green campus outlook",
    ],
    amenities: [
      "Clubhouse with badminton court",
      "24/7 security with RFID gate barrier",
      "Elevator with automatic rescue device",
      "Covered car parking",
    ],
    floor: "5th of 9 Floors",
    facing: "East Facing",
    possessionDate: "Ready to Move",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-13",
    slug: "bardhaman-heritage-enclave",
    title: "Bardhaman Heritage Enclave",
    bengaliTitle: "বর্ধমান হেরিটেজ এনক্লেভ",
    citySlug: "bardhaman",
    locality: "Curzon Gate Heritage District",
    localitySlug: "curzon-gate-district",
    locationDetails: "GT Road, Near Burdwan University campus",
    price: formatINR(44),
    priceNumericLakhs: 44,
    bhk: "2 BHK",
    bhkCount: 2,
    sqft: 1100,
    pricePerSqFt: 4000,
    status: "Under Construction · Possession June 2028",
    reraProjectNo: "WBRERA/P/PUR/2024/000321",
    developer: "Damodar Heritage Infratech",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "Burdwan Municipality Registered",
    metro: "1.5 km to Bardhaman Railway Station",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, saltLakeImage],
    galleryImages: [heroImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/bardhaman-house.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 920,
      balconyAreaSqFt: 90,
      livingDiningSqFt: "19'0\" x 12'0\"",
      masterBedroomSqFt: "14'0\" x 12'0\"",
      kitchenSqFt: "9'0\" x 7'0\"",
    },
    description:
      "An independent townhouse duplex in Bardhaman with private terrace, ground lawn, and direct freehold title on historic Grand Trunk corridor.",
    highlights: [
      "Independent house format under ₹50 Lakhs",
      "Private roof rights and ground parking",
      "Quiet residential neighbourhood near University",
      "WBRERA sanctioned construction roadmap",
    ],
    amenities: [
      "Gated community with solar streetlights",
      "Paved walking tracks & landscaped park",
      "Deep borewell and overhead water storage",
      "24/7 security cabin",
    ],
    floor: "Ground + 1 Floor Duplex",
    facing: "North Facing",
    possessionDate: "June 2028",
    isFeatured: false,
    listingType: "new_launch",
    propertyType: "Independent House",
    propertyCategory: "independent_house",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-14",
    slug: "sector-v-tech-square-suite",
    title: "Sector V Tech Square Suite",
    bengaliTitle: "সেক্টর ফাইভ টেক স্কয়ার স্যুট",
    citySlug: "kolkata",
    locality: "Salt Lake",
    localitySlug: "salt-lake",
    locationDetails: "Block EP & GP, Sector V, Salt Lake",
    price: formatINR(68),
    priceNumericLakhs: 68,
    bhk: "Commercial",
    bhkCount: 0,
    sqft: 850,
    pricePerSqFt: 8000,
    status: "Ready to Move",
    reraProjectNo: "WBRERA/P/NOR/2023/001402",
    developer: "Bengal Tech Parks Ltd",
    tenure_type: "Leasehold",
    tenure: "Leasehold",
    approval: "NKDA & Bidhannagar Sanctioned",
    metro: "200m from Sector V Metro Station",
    floodRisk: "Low",
    image_url: saltLakeImage,
    gallery_images: [saltLakeImage, heroImage],
    galleryImages: [saltLakeImage, heroImage],
    floor_plan_url: "/assets/floorplans/sectorv-office.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 680,
      balconyAreaSqFt: 0,
      livingDiningSqFt: "Open Workspace 26' x 20'",
      masterBedroomSqFt: "Director Cabin 12' x 10'",
      kitchenSqFt: "Pantry & Server 8' x 6'",
    },
    description:
      "A premium ready-to-fit commercial office suite in Kolkata's primary IT hub. 100% power backup, high-speed fiber backbone, and direct pedestrian bridge to Sector V Metro.",
    highlights: [
      "Commercial Grade-A business address",
      "High rental yield potential of 7.5%–8.5%",
      "Walking reach to Sector V Metro hub",
      "Double-height air-conditioned corporate lobby",
    ],
    amenities: [
      "Central cafeteria and executive meeting rooms",
      "6 high-speed passenger elevators + service lift",
      "Multi-level basement parking with EV points",
      "Round-the-clock enterprise grade security",
    ],
    floor: "8th of 16 Floors",
    facing: "East Facing",
    possessionDate: "Immediate",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Commercial",
    propertyCategory: "commercial",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-15",
    slug: "new-town-aa3-villa-plot",
    title: "New Town AA-III Freehold Villa Plot",
    bengaliTitle: "নিউ টাউন ভিলা প্লট",
    citySlug: "new-town",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Action Area III, Near Fin-Tech Hub & Outer Ring Road",
    price: formatINR(48),
    priceNumericLakhs: 48,
    bhk: "Plot",
    bhkCount: 0,
    sqft: 2160,
    pricePerSqFt: 2222,
    status: "Ready for Registration",
    reraProjectNo: "WBRERA/P/NOR/2024/000998",
    developer: "Bengal Freehold Land Estates",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HIDCO Master Plan Approved",
    metro: "2.3 km from AA-III Metro Hub",
    floodRisk: "Low",
    image_url: newTownImage,
    gallery_images: [newTownImage, heroImage],
    galleryImages: [newTownImage, heroImage],
    floor_plan_url: "/assets/floorplans/plot-3cottah.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 2160,
      balconyAreaSqFt: 0,
      livingDiningSqFt: "Plot Frontage 36 Feet",
      masterBedroomSqFt: "Plot Depth 60 Feet",
      kitchenSqFt: "Road Width 40 Feet",
    },
    description:
      "A rare 3-Cottah demarcated residential villa plot with clear freehold title and underground utility conduits in New Town Action Area III. Ready for immediate boundary construction.",
    highlights: [
      "Direct freehold title — no HIDCO lease encumbrances",
      "40-foot wide asphalt blacktop access road",
      "Underground drainage, power and water lines ready",
      "High capital appreciation near upcoming FinTech Hub",
    ],
    amenities: [
      "Demarcated boundary pillars installed",
      "Gated enclave with security post",
      "Street lighting and manicured tree avenue",
      "Municipal water connection at plot edge",
    ],
    floor: "Residential Plot (G+3 Sanctionable)",
    facing: "North-East Facing",
    possessionDate: "Immediate",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Plot",
    propertyCategory: "plot",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-16",
    slug: "siliguri-tea-hills-sanctuary",
    title: "Siliguri Tea Hills Sanctuary",
    bengaliTitle: "শিলিগুড়ি টি হিলস স্যাঙ্কচুয়ারি",
    citySlug: "siliguri",
    locality: "Sevoke Road Corridor",
    localitySlug: "sevoke-road-corridor",
    locationDetails: "Sevoke Road Foothills, Near Coronation Bridge approach",
    price: formatINR(135),
    priceNumericLakhs: 135,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 2450,
    pricePerSqFt: 5510,
    status: "Under Construction · Possession Dec 2028",
    reraProjectNo: "WBRERA/P/DAR/2024/000109",
    developer: "Himalayan Foothills Living",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "SJDA & WBRERA Registered",
    metro: "New Jalpaiguri (NJP) 9 km / Bagdogra Airport 18 km",
    floodRisk: "Minimal",
    image_url: heroImage,
    gallery_images: [heroImage, aliporeImage],
    galleryImages: [heroImage, aliporeImage],
    floor_plan_url: "/assets/floorplans/siliguri-villa.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1980,
      balconyAreaSqFt: 280,
      livingDiningSqFt: "26'0\" x 16'0\"",
      masterBedroomSqFt: "17'0\" x 14'0\"",
      kitchenSqFt: "13'0\" x 10'0\"",
    },
    description:
      "A luxury boutique villa enclave nestled along the Sevoke Road tea garden foothills with unobstructed Kanchenjunga horizon views and crisp foothill breezes.",
    highlights: [
      "Foothills climate with tea garden perimeter",
      "Independent private garden and upper timber sundeck",
      "Earthquake resistant Seismic Zone IV construction",
      "25 minutes to Bagdogra Airport",
    ],
    amenities: [
      "Heated indoor plunge pool & clubhouse",
      "Organic tea tasting pavilion & reading lounge",
      "24/7 guarded security & solar electric fencing",
      "Concierge and holiday maintenance package",
    ],
    floor: "Ground + 1 Independent Villa",
    facing: "North-West (Mountain Facing)",
    possessionDate: "December 2028",
    isFeatured: true,
    listingType: "new_launch",
    propertyType: "Villa",
    propertyCategory: "villa",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-17",
    slug: "eco-park-skyline-rental-suite",
    title: "Eco Park Skyline Rental Suite",
    bengaliTitle: "ইকোপার্ক স্কাইলাইন রেন্টাল স্যুট",
    citySlug: "new-town",
    locality: "New Town",
    localitySlug: "new-town",
    locationDetails: "Action Area II, Facing Eco Park Lake",
    price: "₹32,000 / mo",
    priceNumericLakhs: 1,
    bhk: "2 BHK",
    bhkCount: 2,
    sqft: 1150,
    pricePerSqFt: 28,
    status: "Available for Rent",
    reraProjectNo: "WBRERA/P/NOR/2023/000780",
    developer: "Eastern Habitat Infrastructure",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "HIDCO Sanctioned",
    metro: "1.2 km from Eco Park Metro",
    floodRisk: "Low",
    image_url: newTownImage,
    gallery_images: [newTownImage, heroImage],
    galleryImages: [newTownImage, heroImage],
    floor_plan_url: "/assets/floorplans/ecopark-rent.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 920,
      balconyAreaSqFt: 110,
      livingDiningSqFt: "20'0\" x 13'0\"",
      masterBedroomSqFt: "14'0\" x 12'0\"",
      kitchenSqFt: "10'0\" x 8'0\"",
    },
    description:
      "Fully verified, semi-furnished 2 BHK apartment for long-term lease. Lake views, modular kitchen with chimney, AC in all bedrooms, and designated covered parking.",
    highlights: [
      "Curated single-owner verified rental",
      "Direct lake views over Eco Park",
      "Semi-furnished with modular kitchen & wardrobes",
      "Standard registered lease agreement",
    ],
    amenities: [
      "Full clubhouse and gym membership included",
      "High-speed elevator with power backup",
      "Covered reserved basement car parking",
      "24/7 biometric security",
    ],
    floor: "11th of 18 Floors",
    facing: "North-East",
    possessionDate: "Immediate",
    isFeatured: false,
    listingType: "rent",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: true,
    verifiedDate: "October 2026",
  },
  {
    id: "prop-18",
    slug: "ballygunge-circular-court",
    title: "Ballygunge Circular Court",
    bengaliTitle: "বালিগঞ্জ সার্কুলার কোর্ট",
    citySlug: "kolkata",
    locality: "Ballygunge",
    localitySlug: "ballygunge",
    locationDetails: "Ballygunge Circular Road, Near Calcutta Punjab Club",
    price: formatINR(275),
    priceNumericLakhs: 275,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 2150,
    pricePerSqFt: 12790,
    status: "Ready to Move · Audit Pending",
    reraProjectNo: "WBRERA/PLACEHOLDER/PENDING-AUDIT",
    developer: "Ballygunge Prime Properties (Placeholder)",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "KMC Sanctioned (Verification Pending)",
    metro: "1.2 km from Netaji Bhavan Metro",
    floodRisk: "Minimal",
    image_url: aliporeImage,
    gallery_images: [aliporeImage, heroImage, saltLakeImage],
    galleryImages: [aliporeImage, heroImage, saltLakeImage],
    floor_plan_url: "/assets/floorplans/ballygunge-3bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1720,
      balconyAreaSqFt: 180,
      livingDiningSqFt: "24'0\" x 15'0\"",
      masterBedroomSqFt: "17'0\" x 13'6\"",
      kitchenSqFt: "12'0\" x 9'0\"",
    },
    description:
      "[PLACEHOLDER ENTRY - CLIENT TO SUPPLY VERIFIED COPY & PHOTOGRAPHY] An elegant 3 BHK residence situated along the leafy banyan canopy of Ballygunge Circular Road. Features expansive cross-ventilated living suites, south-facing balconies, and covered multi-vehicle parking.",
    highlights: [
      "[PLACEHOLDER] Leafy South Kolkata address near Punjab Club and Dover Park",
      "[PLACEHOLDER] Generous 3 BHK layout with 10.5-foot finished ceiling heights",
      "[PLACEHOLDER] Two reserved covered parking spaces included",
      "[PLACEHOLDER] Audit in progress with West Bengal Directorate of Registration",
    ],
    amenities: [
      "Resident community hall and library",
      "Automatic hydraulic lift with power backup",
      "24/7 manned security and CCTV perimeter surveillance",
      "Potable filtered municipal water connection with overhead backup",
    ],
    floor: "4th of 7 Floors",
    facing: "South Facing (Continuous Natural Breeze)",
    possessionDate: "Immediate",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: false,
    verifiedDate: "Pending Audit",
  },
  {
    id: "prop-19",
    slug: "tollygunge-greens-enclave",
    title: "Tollygunge Greens Enclave",
    bengaliTitle: "টালিগঞ্জ গ্রিন্স এনক্লেভ",
    citySlug: "kolkata",
    locality: "Tollygunge",
    localitySlug: "tollygunge",
    locationDetails: "Golf Club Road, Overlooking Royal Calcutta Golf Club",
    price: formatINR(165),
    priceNumericLakhs: 165,
    bhk: "3 BHK",
    bhkCount: 3,
    sqft: 1720,
    pricePerSqFt: 9593,
    status: "Under Construction · Possession 2027",
    reraProjectNo: "WBRERA/PLACEHOLDER/PENDING-AUDIT",
    developer: "South Heritage Infratech (Placeholder)",
    tenure_type: "Freehold",
    tenure: "Freehold",
    approval: "KMC Sanctioned (Verification Pending)",
    metro: "600m from Mahanayak Uttam Kumar Metro",
    floodRisk: "Low",
    image_url: heroImage,
    gallery_images: [heroImage, saltLakeImage, newTownImage],
    galleryImages: [heroImage, saltLakeImage, newTownImage],
    floor_plan_url: "/assets/floorplans/tollygunge-3bhk.svg",
    floorPlanSpecs: {
      carpetAreaSqFt: 1380,
      balconyAreaSqFt: 140,
      livingDiningSqFt: "22'0\" x 13'6\"",
      masterBedroomSqFt: "15'6\" x 12'6\"",
      kitchenSqFt: "11'0\" x 8'0\"",
    },
    description:
      "[PLACEHOLDER ENTRY - CLIENT TO SUPPLY VERIFIED COPY & PHOTOGRAPHY] Modern high-rise residence overlooking tranquil golf fairways. High transit connectivity with 5-minute walk to Mahanayak Uttam Kumar (Tollygunge) Blue Line Metro station.",
    highlights: [
      "[PLACEHOLDER] Unobstructed green horizon views towards Tolly Club greens",
      "[PLACEHOLDER] 5-minute walking distance to Tollygunge Metro Station",
      "[PLACEHOLDER] Double-glazed acoustic window apertures",
      "[PLACEHOLDER] Audit in progress with West Bengal RERA Registry",
    ],
    amenities: [
      "Rooftop infinity swimming pool and sundeck",
      "Gymnasium with cardio theatre",
      "24/7 multi-tier security and RFID gate validation",
      "Covered basement vehicle parking bay",
    ],
    floor: "9th of 16 Floors",
    facing: "East Facing (Morning Sunshine & Golf View)",
    possessionDate: "October 2027",
    isFeatured: false,
    listingType: "buy",
    propertyType: "Apartment",
    propertyCategory: "apartment",
    verified: false,
    verifiedDate: "Pending Audit",
  },
];

export const featuredProperty = properties[0];

export const journalArticles: JournalArticle[] = [
  {
    id: "art-1",
    slug: "freehold-leasehold-kolkata",
    title: "Freehold, Leasehold, or Co-operative Share in Kolkata?",
    bengaliTitle: "ফ্রিহোল্ড, লিজহোল্ড না সমবায় শেয়ার?",
    category: "Legal & Documentation",
    readTime: "6 min read",
    date: "September 2026",
    author: "BariGhor Advisory Desk",
    coverImage: aliporeImage,
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
    id: "art-2",
    slug: "understanding-wbrera",
    title: "Understanding WBRERA: The Bengal Buyer's Checklist",
    bengaliTitle: "WBRERA এবং ক্রেতার সুরক্ষা নির্দেশিকা",
    category: "Regulatory & Compliance",
    readTime: "5 min read",
    date: "September 2026",
    author: "Siddhartha Sen, Legal Advisor",
    coverImage: heroImage,
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
    id: "art-3",
    slug: "kolkata-monsoon-drainage-guide",
    title: "An Honest Monsoon & Drainage Assessment for New Town & Salt Lake",
    bengaliTitle: "বর্ষায় জলনিকাশী ব্যবস্থা: নিউ টাউন ও সল্টলেক",
    category: "Neighbourhood Intelligence",
    readTime: "7 min read",
    date: "September 2026",
    author: "BariGhor Field Research",
    coverImage: saltLakeImage,
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
  {
    id: "art-4",
    slug: "kolkata-monsoon-proof-interiors-guide",
    title: "The Kolkata Homeowner's Guide to Monsoon-Proof Interiors & Marine Ply",
    bengaliTitle: "বর্ষায় সুরক্ষিত ইন্টেরিয়র: মেরিন প্লাই ও আর্কিটেকচারাল ফিনিশ",
    category: "Interior Architecture",
    readTime: "6 min read",
    date: "October 2026",
    author: "BariGhor Interior Studio",
    coverImage: newTownImage,
    excerpt:
      "Why standard commercial plywood delaminates during Bengal's 95% humidity months, and what specifications to demand for kitchens and wardrobes.",
    content: [
      "Bengal's subtropical monsoon delivers consecutive months with ambient relative humidity exceeding 90%. Under these conditions, standard MR commercial plywood absorbs ambient vapor, swelling at the core.",
      "At BariGhor, our interior studio specifies IS-710 Marine Grade plywood (710 BWP) for all wet-zone carcasses, withstanding 72 hours of continuous boiling water immersion without ply separation.",
      "We also mandate full-height aluminum anti-warp stiffeners inside all floor-to-ceiling wardrobe shutters over 7 feet tall.",
    ],
    keyTakeaways: [
      "Demand certified IS-710 Marine Grade ply for all kitchen and vanity cabinetry.",
      "Insist on 1mm calibrated anti-fingerprint laminates bonded with waterproof D3/D4 PVA adhesives.",
      "Ensure false ceilings use moisture-resistant Gyproc boards rather than regular gypsum.",
    ],
  },
  {
    id: "art-5",
    slug: "seismic-zone-iv-bengal-soil-construction",
    title: "Seismic Zone IV & Alluvial Soil: Engineering Freehold Plot Homes",
    bengaliTitle: "সিসমিক জোন ৪ ও পাইলিং: বাংলায় নিরাপদ বাড়ি নির্মাণ",
    category: "Civil Engineering",
    readTime: "8 min read",
    date: "October 2026",
    author: "BariGhor Civil Engineering Division",
    coverImage: saltLakeImage,
    excerpt:
      "What every plot buyer in New Town and Salt Lake must demand before laying foundations on Bengal's deep alluvial clay delta.",
    content: [
      "The Greater Kolkata deltaic basin rests upon young alluvial strata characterized by silty clays and shallow water tables. Furthermore, revised BIS maps place the region within Seismic Zone IV.",
      "Building a multi-story residence on shallow strip footings in this soil profile creates dangerous risks of differential settlement and hairline shear cracks.",
      "BariGhor's construction standard mandates geotechnical soil bore-log drilling to a minimum depth of 18 meters, anchoring bored cast-in-situ RCC piles into hard dense sand layers.",
    ],
    keyTakeaways: [
      "Never begin plot excavation without a licensed geotechnical soil bore-log report.",
      "Require bored cast-in-situ RCC piles tied to an elevated plinth beam minimum 30 inches above the finished road crown.",
      "Specify Tata Tiscon Fe500D / Fe550D corrosion-resistant TMT steel.",
    ],
  },
];

export function getPropertyCategory(property: Property): PropertyCategory {
  if (property.propertyCategory) return property.propertyCategory;
  if (property.propertyType === "Plot") return "plot";
  if (property.propertyType === "Commercial") return "commercial";
  if (property.propertyType === "Villa") return "villa";
  if (property.propertyType === "Independent House") return "independent_house";
  return "apartment";
}

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
  citySlug,
  locality,
  budget,
  budgetMin,
  budgetMax,
  bhk,
  listingType,
  propertyType,
  possession,
  verifiedOnly,
}: {
  citySlug?: string;
  locality?: string;
  budget?: string;
  budgetMin?: number;
  budgetMax?: number;
  bhk?: string;
  listingType?: string;
  propertyType?: string;
  possession?: string;
  verifiedOnly?: boolean;
}): Property[] {
  return properties.filter((p) => {
    // City check
    if (citySlug && citySlug !== "all") {
      const pCity = p.citySlug || (p.localitySlug === "new-town" ? "new-town" : "kolkata");
      if (pCity !== citySlug) return false;
    }

    // Locality check
    if (locality && locality !== "all" && locality !== "All Localities" && locality !== "All Neighbourhoods") {
      const locNorm = locality.toLowerCase().replace(/\s+/g, "-");
      if (
        p.localitySlug !== locNorm &&
        !p.locality.toLowerCase().includes(locality.toLowerCase())
      ) {
        return false;
      }
    }

    // Listing Type check (buy / rent / new_launch)
    if (listingType && listingType !== "all") {
      const pListing = p.listingType || "buy";
      if (pListing !== listingType) return false;
    }

    // Property Type check (Apartment / Independent House / Villa / Plot / Commercial)
    if (propertyType && propertyType !== "all" && propertyType !== "All Types") {
      const pType = p.propertyType || "Apartment";
      if (pType.toLowerCase() !== propertyType.toLowerCase()) return false;
    }

    // BHK check
    if (bhk && bhk !== "all" && bhk !== "All BHKs" && bhk !== "All Layouts") {
      const bhkClean = bhk.toUpperCase();
      if (bhkClean === "1 BHK" || bhkClean === "1") {
        if (p.bhkCount !== 1) return false;
      } else if (bhkClean === "2 BHK" || bhkClean === "2") {
        if (p.bhkCount !== 2) return false;
      } else if (bhkClean === "3 BHK" || bhkClean === "3") {
        if (p.bhkCount !== 3) return false;
      } else if (bhkClean.includes("4") || bhkClean === "4 BHK+" || bhkClean === "4 BHK") {
        if (p.bhkCount < 4) return false;
      } else if (!p.bhk.toUpperCase().includes(bhkClean.replace(" BHK", ""))) {
        return false;
      }
    }

    // Possession check
    if (possession && possession !== "all") {
      const derived = getDerivedPossessionStatus(p.possessionDate);
      if (possession === "ready" || possession === "Ready to move") {
        if (derived !== "Ready to move") return false;
      } else if (possession === "2027" || possession === "Possession 2027") {
        if (derived !== "Possession 2027") return false;
      } else if (possession === "2028" || possession === "2028+" || possession === "Possession 2028+") {
        if (derived !== "Possession 2028+") return false;
      }
    }

    // Verified only check
    if (verifiedOnly) {
      if (!p.verified) return false;
    }

    // Explicit numeric budget range
    if (budgetMin !== undefined && p.priceNumericLakhs < budgetMin) return false;
    if (budgetMax !== undefined && p.priceNumericLakhs > budgetMax) return false;

    // Budget slug check
    if (budget && budget !== "all" && budget !== "All Budgets" && budget !== "Any Price Band") {
      if (budget === "under-25l" || budget === "Under ₹25L") {
        if (p.priceNumericLakhs > 25) return false;
      } else if (budget === "25l-50l" || budget === "₹25–50L" || budget === "₹25-50L") {
        if (p.priceNumericLakhs < 25 || p.priceNumericLakhs > 50) return false;
      } else if (budget === "50l-1cr" || budget === "₹50L–1Cr" || budget === "₹50L-1Cr") {
        if (p.priceNumericLakhs < 50 || p.priceNumericLakhs > 100) return false;
      } else if (budget === "1cr-3cr" || budget === "₹1–3Cr" || budget === "₹1-3Cr") {
        if (p.priceNumericLakhs < 100 || p.priceNumericLakhs > 300) return false;
      } else if (budget === "3cr-plus" || budget === "₹3Cr+") {
        if (p.priceNumericLakhs < 300) return false;
      }
      // Backward compatibility with older query parameters
      else if (budget === "under-1cr" || budget.includes("75 L") || budget.includes("< ₹1 Cr")) {
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
