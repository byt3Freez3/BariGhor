import heroImage from "@/assets/barighor-hero.jpg";
import newTownImage from "@/assets/new-town.jpg";
import saltLakeImage from "@/assets/salt-lake.jpg";
import aliporeImage from "@/assets/alipore-home.jpg";

export interface PortfolioProject {
  id: string;
  title: string;
  titleBn: string;
  category: "interiors" | "construction";
  locality: string;
  city: string;
  areaSqft: number;
  completedYear: string;
  scope: string;
  keyFeatures: string[];
  image: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // ---------------- INTERIORS PORTFOLIO ----------------
  {
    id: "portfolio-new-town-verandah",
    title: "The Verandah Residence, New Town AA-II",
    titleBn: "দ্য ভেরান্দা রেসিডেন্স, নিউ টাউন",
    category: "interiors",
    locality: "Action Area II, New Town",
    city: "Kolkata",
    areaSqft: 1840,
    completedYear: "2026",
    scope: "Full Turnkey Interior Architecture & Joinery",
    keyFeatures: [
      "Natural Burma teak fluted wall paneling",
      "Island kitchen with Caesarstone quartz & Blum motion hardware",
      "Saint-Gobain acoustic false ceiling with indirect cove lighting",
      "Full-height master wardrobe suite with anti-warp aluminum stiffeners",
    ],
    image: heroImage,
  },
  {
    id: "portfolio-saltlake-manor",
    title: "The Salt Lake Sector III Manor",
    titleBn: "সল্ট লেক সেক্টর ৩ ম্যানর",
    category: "interiors",
    locality: "Sector III, Salt Lake",
    city: "Kolkata",
    areaSqft: 3200,
    completedYear: "2025",
    scope: "Colonial-Contemporary Heritage Interior Fit-Out",
    keyFeatures: [
      "Traditional terracotta brick accent wall with brass profile niches",
      "Bespoke solid teak library & study cabinetry",
      "Large-format Italian marble floor inlays",
      "DALI smart scene lighting throughout entertaining zones",
    ],
    image: saltLakeImage,
  },
  {
    id: "portfolio-alipore-penthouse",
    title: "Queens Park Penthouse, Alipore",
    titleBn: "কুইন্স পার্ক পেন্টহাউস, আলিপুর",
    category: "interiors",
    locality: "Queens Park, Alipore",
    city: "Kolkata",
    areaSqft: 4100,
    completedYear: "2026",
    scope: "Ultra-Luxury Signature Turnkey Interiors",
    keyFeatures: [
      "Custom Italian Statuario marble slabs in living and master bath",
      "Fully integrated concealed VRV HVAC air-handling systems",
      "Automated blackout and sheer linen drapery on silent dual motors",
      "Designer walk-in wardrobe with smoked glass and LED motion sensor rails",
    ],
    image: aliporeImage,
  },
  {
    id: "portfolio-southern-avenue",
    title: "Lake Vista Apartment, Southern Avenue",
    titleBn: "লেক ভিউ অ্যাপার্টমেন্ট, সাউদার্ন অ্যাভিনিউ",
    category: "interiors",
    locality: "Southern Avenue, South Kolkata",
    city: "Kolkata",
    areaSqft: 2250,
    completedYear: "2025",
    scope: "Mid-Century Modern Interior Renovation",
    keyFeatures: [
      "Walnut wood partition screen isolating private family quarters",
      "Anti-bacterial Asian Paints Royale Aspira washable finish",
      "Kohler brushed bronze sanitaryware and custom vanity tops",
      "Integrated audio wiring conduits and acoustic ceiling baffle panels",
    ],
    image: newTownImage,
  },

  // ---------------- CONSTRUCTION PORTFOLIO ----------------
  {
    id: "portfolio-construct-aa3-plot",
    title: "Action Area III Contemporary Villa",
    titleBn: "অ্যাকশন এরিয়া ৩ সমসাময়িক ভিলা",
    category: "construction",
    locality: "Action Area III, New Town",
    city: "New Town",
    areaSqft: 3400,
    completedYear: "2026",
    scope: "Turnkey Ground-Up Villa Construction on 3-Cottah Freehold Plot",
    keyFeatures: [
      "Bored cast-in-situ RCC pile foundation engineered for alluvial soil",
      "Seismic Zone IV reinforced concrete structural frame (Tata Tiscon Fe500D)",
      "Autoclaved aerated concrete (AAC) masonry for superior thermal insulation",
      "Dr. Fixit 5-layer crystalline waterproofing on roof deck and sunken slabs",
    ],
    image: newTownImage,
  },
  {
    id: "portfolio-construct-saltlake-duplex",
    title: "Bidhannagar Sustainable Residence",
    titleBn: "বিধাননগর টেকসই বাসস্থান",
    category: "construction",
    locality: "Sector II, Salt Lake",
    city: "Kolkata",
    areaSqft: 2800,
    completedYear: "2025",
    scope: "Independent Residential G+2 Engineering & Civil Handover",
    keyFeatures: [
      "HIDCO/NKDA sanctioned plan compliance and municipal occupancy sign-off",
      "3-foot plinth elevation above road crown for complete monsoon flood immunity",
      "Concealed Finolex fire-retardant electrical conduits with GI junction boxes",
      "Rooftop solar grid conduits and subterranean rainwater recharge pit",
    ],
    image: saltLakeImage,
  },
  {
    id: "portfolio-construct-shibpur-riverview",
    title: "Shibpur Riverfront Custom House",
    titleBn: "শিবপুর রিভারফ্রন্ট কাস্টম হাউস",
    category: "construction",
    locality: "Shibpur Riverfront Corridor",
    city: "Howrah",
    areaSqft: 3100,
    completedYear: "2026",
    scope: "Heavy Foundation Engineering & Structural Frame Execution",
    keyFeatures: [
      "Deep plinth foundation with anti-damp chemical barrier membranes",
      "Double-height living pavilion void with architecturally exposed concrete lintels",
      "Perimeter reinforced brick boundary wall with automatic sliding security gate",
      "Turnkey civil construction delivered in 11 months with zero milestone delays",
    ],
    image: heroImage,
  },
  {
    id: "portfolio-construct-siliguri-villa",
    title: "Sevoke Road Foothills Sanctuary",
    titleBn: "সেভক রোড ফুটহিলস স্যাঙ্কচুয়ারি",
    category: "construction",
    locality: "Sevoke Road Foothills",
    city: "Siliguri",
    areaSqft: 2450,
    completedYear: "2026",
    scope: "Hillside Seismic Resistant Construction",
    keyFeatures: [
      "Seismic Zone IV tie-beam grid with corrosion-resistant Fe550D TMT bars",
      "Pitched terracotta roof design with engineered rainwater collection runnels",
      "Large-aperture thermal-break aluminum windows with panoramic hill orientation",
      "Comprehensive 10-year structural integrity guarantee from BariGhor Engineering",
    ],
    image: aliporeImage,
  },
];
