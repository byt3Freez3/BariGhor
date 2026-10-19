import { Locality, localities, imagery } from "@/lib/data";

export interface City {
  slug: string;
  nameEn: string;
  nameBn: string;
  tier: 1 | 2 | 3;
  district: string;
  status: "live" | "coming_soon"; // keep the field; set ALL to "live" for now
  heroImage?: string;
  priceBandMin: number; // in Lakhs
  priceBandMax: number; // in Lakhs
  priceBand: string;
  avgPricePerSqft: number; // in ₹/sq ft
  blurbEn: string;
  blurbBn: string;
  localities: Locality[];
}

export const cities: City[] = [
  // ─── TIER 1 CITIES ──────────────────────────────────────────────
  {
    slug: "kolkata",
    nameEn: "Kolkata",
    nameBn: "কলকাতা",
    tier: 1,
    district: "Kolkata",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 65,
    priceBandMax: 2000,
    priceBand: "₹65 Lakh – ₹20 Cr+",
    avgPricePerSqft: 14500,
    blurbEn: "The cultural and residential heart of Bengal. From heritage Alipore to dynamic EM Bypass.",
    blurbBn: "বাংলার সাংস্কৃতিক ও আবাসিক প্রাণকেন্দ্র। ঐতিহ্যবাহী আলিপুর থেকে ইএম বাইপাস।",
    localities: localities.filter((l) => l.citySlug === "kolkata"),
  },
  {
    slug: "howrah",
    nameEn: "Howrah",
    nameBn: "হাওড়া",
    tier: 1,
    district: "Howrah",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 45,
    priceBandMax: 250,
    priceBand: "₹45 Lakh – ₹2.5 Cr",
    avgPricePerSqft: 5800,
    blurbEn: "The twin city connecting heritage with rapid infrastructure growth across the Hooghly.",
    blurbBn: "গঙ্গার ওপারে ঐতিহ্য ও আধুনিক পরিকাঠামোর এক মেলবন্ধন।",
    localities: localities.filter((l) => l.citySlug === "howrah"),
  },
  {
    slug: "new-town",
    nameEn: "New Town",
    nameBn: "নিউ টাউন",
    tier: 1,
    district: "North 24 Parganas",
    status: "live",
    heroImage: imagery.newTownImage,
    priceBandMin: 75,
    priceBandMax: 400,
    priceBand: "₹75 Lakh – ₹4 Cr",
    avgPricePerSqft: 8200,
    blurbEn: "Kolkata's modern smart city. Planned layouts, IT hubs, and expansive green corridors.",
    blurbBn: "কলকাতার আধুনিক স্মার্ট সিটি। পরিকল্পিত লেআউট, আইটি হাব এবং সবুজ করিডোর।",
    localities: localities.filter((l) => l.citySlug === "new-town"),
  },

  // ─── TIER 2 CITIES (ALL LIVE) ──────────────────────────────────
  {
    slug: "asansol",
    nameEn: "Asansol",
    nameBn: "আসানসোল",
    tier: 2,
    district: "Paschim Bardhaman",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 22,
    priceBandMax: 95,
    priceBand: "₹22 Lakh – ₹95 Lakh",
    avgPricePerSqft: 3200,
    blurbEn: "The bustling industrial capital of West Bengal is evolving into a premium residential hub.",
    blurbBn: "পশ্চিমবঙ্গের ব্যস্ত শিল্পশহর এখন একটি প্রিমিয়াম আবাসিক কেন্দ্রে পরিণত হচ্ছে।",
    localities: localities.filter((l) => l.citySlug === "asansol"),
  },
  {
    slug: "durgapur",
    nameEn: "Durgapur",
    nameBn: "দুর্গাপুর",
    tier: 2,
    district: "Paschim Bardhaman",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 25,
    priceBandMax: 110,
    priceBand: "₹25 Lakh – ₹1.1 Cr",
    avgPricePerSqft: 3400,
    blurbEn: "The steel city characterized by planned townships, tech hubs, and wide, tree-lined avenues.",
    blurbBn: "পরিকল্পিত টাউনশিপ, টেক পার্ক ও চওড়া সবুজ রাস্তার আধুনিক ইস্পাত নগরী।",
    localities: localities.filter((l) => l.citySlug === "durgapur"),
  },
  {
    slug: "siliguri",
    nameEn: "Siliguri",
    nameBn: "শিলিগুড়ি",
    tier: 2,
    district: "Darjeeling & Jalpaiguri",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 35,
    priceBandMax: 180,
    priceBand: "₹35 Lakh – ₹1.8 Cr",
    avgPricePerSqft: 4800,
    blurbEn: "The gateway to the North-East, experiencing rapid urbanisation and luxury real estate growth.",
    blurbBn: "উত্তর-পূর্ব ভারতের প্রবেশদ্বার, যেখানে দ্রুত নগরায়ন ও প্রিমিয়াম রিয়েল এস্টেটের বিকাশ ঘটছে।",
    localities: localities.filter((l) => l.citySlug === "siliguri"),
  },
  {
    slug: "bardhaman",
    nameEn: "Bardhaman",
    nameBn: "বর্ধমান",
    tier: 2,
    district: "Purba Bardhaman",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 20,
    priceBandMax: 85,
    priceBand: "₹20 Lakh – ₹85 Lakh",
    avgPricePerSqft: 2900,
    blurbEn: "Rich in history and culture, now seeing a surge in organized, modern residential developments.",
    blurbBn: "ইতিহাস ও সংস্কৃতিতে সমৃদ্ধ এই শহর এখন নতুন আবাসিক প্রকল্পের কেন্দ্র হয়ে উঠছে।",
    localities: localities.filter((l) => l.citySlug === "bardhaman"),
  },
  {
    slug: "malda",
    nameEn: "Malda",
    nameBn: "মালদহ",
    tier: 2,
    district: "Malda",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 20,
    priceBandMax: 75,
    priceBand: "₹20 Lakh – ₹75 Lakh",
    avgPricePerSqft: 2800,
    blurbEn: "The mango city is expanding with new lifestyle residential options and transit connectivity.",
    blurbBn: "আমের শহর মালদহ এখন আধুনিক জীবনযাপনের নতুন ঠিকানা।",
    localities: localities.filter((l) => l.citySlug === "malda"),
  },
  {
    slug: "baharampur",
    nameEn: "Baharampur",
    nameBn: "বহরমপুর",
    tier: 2,
    district: "Murshidabad",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 22,
    priceBandMax: 80,
    priceBand: "₹22 Lakh – ₹80 Lakh",
    avgPricePerSqft: 2950,
    blurbEn: "Historic capital of Bengal blending nawabi legacy with modern housing needs.",
    blurbBn: "বাংলার ঐতিহাসিক রাজধানী যা ঐতিহ্য ও আধুনিকতার মেলবন্ধন।",
    localities: localities.filter((l) => l.citySlug === "baharampur"),
  },
  {
    slug: "habra",
    nameEn: "Habra",
    nameBn: "হাবড়া",
    tier: 2,
    district: "North 24 Parganas",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 18,
    priceBandMax: 65,
    priceBand: "₹18 Lakh – ₹65 Lakh",
    avgPricePerSqft: 2600,
    blurbEn: "An important commercial hub emerging as a significant commuter real estate destination.",
    blurbBn: "একটি গুরুত্বপূর্ণ বাণিজ্যিক কেন্দ্র যা রিয়েল এস্টেটের নতুন গন্তব্য হয়ে উঠছে।",
    localities: localities.filter((l) => l.citySlug === "habra"),
  },
  {
    slug: "kharagpur",
    nameEn: "Kharagpur",
    nameBn: "খড়গপুর",
    tier: 2,
    district: "Paschim Medinipur",
    status: "live",
    heroImage: imagery.heroImage,
    priceBandMin: 20,
    priceBandMax: 85,
    priceBand: "₹20 Lakh – ₹85 Lakh",
    avgPricePerSqft: 3100,
    blurbEn: "Home to India's premier institutes and a growing cosmopolitan workforce.",
    blurbBn: "ভারতের সেরা শিক্ষাপ্রতিষ্ঠানের শহর, যা এক ক্রমবর্ধমান কসমোপলিটান কর্মশক্তির ঠিকানা।",
    localities: localities.filter((l) => l.citySlug === "kharagpur"),
  },
];

// Tier 3: structure kept in place (empty array) for future districts
export const tier3Districts: City[] = [];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByTier(tier: 1 | 2 | 3): City[] {
  if (tier === 3) return tier3Districts;
  return cities.filter((c) => c.tier === tier);
}

export function getLiveCities(): City[] {
  return cities.filter((c) => c.status === "live");
}
