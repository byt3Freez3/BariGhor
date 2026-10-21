import type { PropertyCategory } from "@/lib/data";

// ============================================================================
// PLACEHOLDER DATA: CLIENT TO REPLACE WITH ACTUAL PRODUCTION RATES & SPECIFICATIONS
// All rates and packages below are indicative demonstration figures.
// Every price displayed must carry: "Indicative — final quote after site visit."
// ============================================================================

export interface ComparisonMetrics {
  price: string;
  comfort: string;
  design: string;
  materialQuality: string;
}

export interface ServicePackage {
  id: string;
  serviceType: "interiors" | "construction";
  tier: "essential" | "comfort" | "premium";
  nameEn: string;
  nameBn: string;
  indicativePricePerSqft: number;
  blurb: string;
  comparison: ComparisonMetrics; // short descriptors
  included: string[];
}

export interface AddOn {
  id: string;
  serviceType: "interiors" | "construction";
  title: string;
  titleBn: string;
  thumbnail: string;
  keySpec: string;
  indicativePrice: number;
  priceUnit: "fixed" | "per_sqft";
  appliesTo: PropertyCategory[];
}

export const PLACEHOLDER_SERVICE_PACKAGES: ServicePackage[] = [
  // ---------------- INTERIORS PACKAGES ----------------
  {
    id: "interior-essential",
    serviceType: "interiors",
    tier: "essential",
    nameEn: "Essential Finish",
    nameBn: "এসেনশিয়াল ফিনিশ",
    indicativePricePerSqft: 1250,
    blurb: "Clean, functional essentials built for longevity with termite-treated marine ply and washable acrylic emulsion.",
    comparison: {
      price: "Value-focused entry",
      comfort: "Essential functional living",
      design: "Modern minimalist lines",
      materialQuality: "IS-710 marine ply, branded fittings",
    },
    included: [
      "Commercial MR/BWR grade ply cabinetry in matte laminate",
      "Soft-close standard drawer channels and hydraulic hinges",
      "Anti-fungal acrylic tractor emulsion on all internal walls",
      "Basic warm LED concealed lighting in living and dining",
      "1-year comprehensive craftsmanship warranty",
    ],
  },
  {
    id: "interior-comfort",
    serviceType: "interiors",
    tier: "comfort",
    nameEn: "Comfort Living",
    nameBn: "কমফোর্ট লিভিং",
    indicativePricePerSqft: 1850,
    blurb: "Refined materials, boiling-water-resistant BWR ply, designer false ceilings, and ambient architectural lighting.",
    comparison: {
      price: "Balanced sweet-spot investment",
      comfort: "Enhanced acoustic & ergonomic calm",
      design: "Tailored contemporary warmth",
      materialQuality: "BWR grade ply, Hafele/Hettich hardware",
    },
    included: [
      "BWR grade boiling water-resistant ply with 1mm anti-fingerprint laminates",
      "Hettich / Hafele soft-close Quadro runners and hinges",
      "Gyproc moisture-resistant false ceiling with cove profile lighting",
      "Asian Paints Royale luxury emulsion with anti-bacterial shield",
      "Granite / Quartz kitchen counter profile edge polishing",
      "3-year comprehensive BariGhor interior warranty",
    ],
  },
  {
    id: "interior-premium",
    serviceType: "interiors",
    tier: "premium",
    nameEn: "Signature Luxe",
    nameBn: "সিগনেচার লাক্স",
    indicativePricePerSqft: 2850,
    blurb: "Bespoke veneer woodwork, Italian marble insets, concealed HVAC integration, and fully integrated smart lighting.",
    comparison: {
      price: "Boutique bespoke luxury",
      comfort: "Full acoustic isolation & smart climate",
      design: "Architectural bespoke contemporary luxury",
      materialQuality: "Imported teak/veneer, Blum soft-motion",
    },
    included: [
      "Bespoke natural teak veneer with PU polish and fluted louvers",
      "Blum soft-motion tip-on servo hardware throughout",
      "Saint-Gobain acoustic false ceiling with dimmable DALI architectural tracks",
      "Italian marble wall highlights and fluted stone paneling",
      "Designer bathroom vanities with quartz basin tops",
      "5-year comprehensive warranty with biannual maintenance visits",
    ],
  },

  // ---------------- CONSTRUCTION PACKAGES ----------------
  {
    id: "construction-essential",
    serviceType: "construction",
    tier: "essential",
    nameEn: "Standard Structural Build",
    nameBn: "স্ট্যান্ডার্ড স্ট্রাকচারাল বিল্ড",
    indicativePricePerSqft: 1950,
    blurb: "Engineered RCC pile foundation, red clay brick masonry, and essential ISI grade structural steel.",
    comparison: {
      price: "Cost-effective baseline",
      comfort: "Sturdy compliant shelter",
      design: "Classic regional residential plan",
      materialQuality: "Tata Tiscon Fe500D, Ultratech PPC cement",
    },
    included: [
      "Soil testing report and HIDCO/KMC sanction structural drawings",
      "RCC frame structure with Fe500D TMT reinforcement steel",
      "First-class local red clay brick masonry (10\" outer, 5\" inner walls)",
      "Standard 2-coat damp-proof waterproofing on plinth and roof slab",
      "3-year structural guarantee with BariGhor engineering sign-off",
    ],
  },
  {
    id: "construction-comfort",
    serviceType: "construction",
    tier: "comfort",
    nameEn: "Executive Engineered Home",
    nameBn: "এক্সিকিউটিভ ইঞ্জিনিয়ার্ড হোম",
    indicativePricePerSqft: 2650,
    blurb: "Seismic Zone IV engineered frame, fly ash AAC blocks for thermal insulation, and multi-tier crystalline waterproofing.",
    comparison: {
      price: "Optimal long-term value",
      comfort: "Thermal cooling & acoustic dampening",
      design: "Contemporary elevation with louvers",
      materialQuality: "Ultratech Super, Tata Tiscon, AAC blockwork",
    },
    included: [
      "Seismic-resistant RCC frame with deep pile foundation",
      "Precision autoclaved aerated concrete (AAC) blocks for heat reduction",
      "Dr. Fixit 5-layer crystalline waterproofing on roof deck and sunken slabs",
      "Finolex concealed conduit electrical roughing with modular GI boxes",
      "CPVC / UPVC plumbing lines (Supreme/Astral) with pressure test",
      "5-year structural and waterproofing warranty",
    ],
  },
  {
    id: "construction-premium",
    serviceType: "construction",
    tier: "premium",
    nameEn: "Mastercraft Architectural Residence",
    nameBn: "মাস্টারক্রাফট আর্কিটেকচারাল রেসিডেন্স",
    indicativePricePerSqft: 3800,
    blurb: "Architect-designed cantilevered silhouette, double-height voids, expansive glazing, and lifetime structural integrity.",
    comparison: {
      price: "Architectural luxury standard",
      comfort: "Passive solar climate comfort",
      design: "Boutique bespoke contemporary form",
      materialQuality: "Fe550D TMT, imported formwork, premium stone",
    },
    included: [
      "Custom architectural floor plan with 3D elevations and MEP engineering",
      "High-grade M25/M30 ready-mix concrete with Fe550D corrosion-resistant steel",
      "Thermal-break aluminum sliding window apertures (Schüco/Technal profile)",
      "Double-coat crystalline polymer waterproofing with 10-year bonded warranty",
      "Rooftop solar conduit provision and rainwater harvesting recharge pit",
      "10-year comprehensive structural warranty with annual engineering audit",
    ],
  },
];

export const PLACEHOLDER_ADD_ONS: AddOn[] = [
  // ---------------- INTERIORS ADD-ONS ----------------
  {
    id: "addon-modular-kitchen",
    serviceType: "interiors",
    title: "Modular Island & Counter Kitchen",
    titleBn: "মডুলার কিচেন ক্যাবিনেট",
    thumbnail: "/images/addons/modular-kitchen.svg",
    keySpec: "BWR marine-ply carcass, soft-close Blum drawers, quartz counter prep",
    indicativePrice: 220000,
    priceUnit: "fixed",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },
  {
    id: "addon-custom-wardrobes",
    serviceType: "interiors",
    title: "Custom Floor-to-Ceiling Wardrobes",
    titleBn: "কাস্টম ফুল-হাইট ওয়ারড্রোব",
    thumbnail: "/images/addons/custom-wardrobes.svg",
    keySpec: "Full-height BWR ply with anti-warp aluminum stiffeners & soft sliding",
    indicativePrice: 480,
    priceUnit: "per_sqft",
    appliesTo: ["apartment", "villa", "independent_house"],
  },
  {
    id: "addon-false-ceiling",
    serviceType: "interiors",
    title: "False Ceiling & Ambient Lighting Grid",
    titleBn: "ফলস সিলিং ও লাইটিং গ্রিড",
    thumbnail: "/images/addons/false-ceiling.svg",
    keySpec: "Gyproc moisture board, COB recessed warm downlights & indirect perimeter cove",
    indicativePrice: 165,
    priceUnit: "per_sqft",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },
  {
    id: "addon-bathroom-fittings",
    serviceType: "interiors",
    title: "Designer Bathroom Vanities & Fittings",
    titleBn: "ডিজাইনার বাথরুম ভ্যানিটি ও ফিটিংস",
    thumbnail: "/images/addons/bathroom-fittings.svg",
    keySpec: "Kohler / Jaquar brassware, wall-hung WC, backlit LED defogger mirror",
    indicativePrice: 85000,
    priceUnit: "fixed",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },
  {
    id: "addon-flooring-upgrade",
    serviceType: "interiors",
    title: "Large Slab Marble & Vitrified Flooring",
    titleBn: "লার্জ স্ল্যাব মার্বেল ও ফ্লোরিং আপগ্রেড",
    thumbnail: "/images/addons/flooring-upgrade.svg",
    keySpec: "1200x1800mm glazed vitrified tiles or polished composite marble insets",
    indicativePrice: 280,
    priceUnit: "per_sqft",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },
  {
    id: "addon-painting",
    serviceType: "interiors",
    title: "Luxury Wall Finishes & Venetian Plaster",
    titleBn: "লাক্সারি ওয়াল ফিনিশ ও ভেনিসিয়ান প্লাস্টার",
    thumbnail: "/images/addons/luxury-painting.svg",
    keySpec: "Asian Paints Royale Aspira washable emulsion with accent texture feature wall",
    indicativePrice: 95,
    priceUnit: "per_sqft",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },
  {
    id: "addon-soft-furnishings",
    serviceType: "interiors",
    title: "Bespoke Drapes & Soft Furnishings Pack",
    titleBn: "কাস্টম পর্দা ও সফট ফার্নিশিং প্যাক",
    thumbnail: "/images/addons/soft-furnishings.svg",
    keySpec: "Custom blackout and sheer dual-track linen drapes, upholstery fabrics & rugs",
    indicativePrice: 120000,
    priceUnit: "fixed",
    appliesTo: ["apartment", "villa", "independent_house"],
  },
  {
    id: "addon-smart-home",
    serviceType: "interiors",
    title: "Smart Home Automation Hub",
    titleBn: "স্মার্ট হোম অটোমেশন হাব",
    thumbnail: "/images/addons/smart-home.svg",
    keySpec: "Zigbee scene controller touch panel, smart locks, motorized curtain relays & app",
    indicativePrice: 95000,
    priceUnit: "fixed",
    appliesTo: ["apartment", "villa", "independent_house", "commercial"],
  },

  // ---------------- CONSTRUCTION ADD-ONS ----------------
  {
    id: "addon-structural-package",
    serviceType: "construction",
    title: "Heavy Structural Reinforcement & Deep Pile",
    titleBn: "হেভি স্ট্রাকচারাল রিইনফোর্সমেন্ট ও ডিপ পাইল",
    thumbnail: "/images/addons/structural-package.svg",
    keySpec: "High-load bored cast-in-situ RCC pile foundation for multi-story load bearing",
    indicativePrice: 380,
    priceUnit: "per_sqft",
    appliesTo: ["plot"],
  },
  {
    id: "addon-mep-package",
    serviceType: "construction",
    title: "Concealed MEP Infrastructure & Sump Grid",
    titleBn: "কনসিল্ড এমইপি ইনফ্রাস্ট্রাকচার ও প্লাম্বিং",
    thumbnail: "/images/addons/mep-package.svg",
    keySpec: "Dual-circuit fire-retardant wiring, multi-stage filtration sump & overhead tank",
    indicativePrice: 240,
    priceUnit: "per_sqft",
    appliesTo: ["plot"],
  },
  {
    id: "addon-roofing",
    serviceType: "construction",
    title: "Insulated Sloped Roofing & Terrace Deck",
    titleBn: "ইনসুলেটেড রুফিং ও টেরাস ডেক",
    thumbnail: "/images/addons/roofing-terrace.svg",
    keySpec: "Terracotta tile cladding or insulated composite deck with stormwater drainage",
    indicativePrice: 195,
    priceUnit: "per_sqft",
    appliesTo: ["plot"],
  },
  {
    id: "addon-boundary-wall",
    serviceType: "construction",
    title: "Perimeter Boundary Wall & Cast Iron Gate",
    titleBn: "পেরিমিটার বাউন্ডারি ওয়াল ও গেট",
    thumbnail: "/images/addons/boundary-wall.svg",
    keySpec: "8-foot reinforced brick perimeter wall with solar beacon caps and security gate",
    indicativePrice: 180000,
    priceUnit: "fixed",
    appliesTo: ["plot"],
  },
  {
    id: "addon-landscaping",
    serviceType: "construction",
    title: "Native Flora Landscaping & Paver Driveway",
    titleBn: "ল্যান্ডস্কেপিং ও পেভার ড্রাইভওয়ে",
    thumbnail: "/images/addons/landscaping.svg",
    keySpec: "Subtropical lawn turf, native date palms, stone paver driveway & perimeter lighting",
    indicativePrice: 125000,
    priceUnit: "fixed",
    appliesTo: ["plot"],
  },
];
