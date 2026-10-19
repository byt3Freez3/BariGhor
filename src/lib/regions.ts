import { Locality, localities } from "./data";
import { imagery } from "./data";

export interface City {
  slug: string;
  nameEn: string;
  nameBn: string;
  tier: 1 | 2 | 3;
  status: "live" | "coming_soon";
  district: string;
  heroImage?: string;
  priceBand?: string;
  blurbEn: string;
  blurbBn: string;
  localities: Locality[];
}

export const cities: City[] = [
  {
    slug: "kolkata",
    nameEn: "Kolkata",
    nameBn: "কলকাতা",
    tier: 1,
    status: "live",
    district: "Kolkata",
    heroImage: imagery.heroImage,
    priceBand: "₹65 Lakh – ₹20 Cr+",
    blurbEn: "The cultural and residential heart of Bengal. From heritage Alipore to dynamic EM Bypass.",
    blurbBn: "বাংলার সাংস্কৃতিক ও আবাসিক প্রাণকেন্দ্র। ঐতিহ্যবাহী আলিপুর থেকে ইএম বাইপাস।",
    localities: localities.filter(l => l.slug === "salt-lake" || l.slug === "alipore")
  },
  {
    slug: "new-town",
    nameEn: "New Town",
    nameBn: "নিউ টাউন",
    tier: 1,
    status: "live",
    district: "North 24 Parganas",
    heroImage: imagery.newTownImage,
    priceBand: "₹75 Lakh – ₹4 Cr",
    blurbEn: "Kolkata's modern smart city. Planned layouts, IT hubs, and expansive green corridors.",
    blurbBn: "কলকাতার আধুনিক স্মার্ট সিটি। পরিকল্পিত লেআউট, আইটি হাব এবং সবুজ করিডোর।",
    localities: localities.filter(l => l.slug === "new-town")
  },
  {
    slug: "howrah",
    nameEn: "Howrah",
    nameBn: "হাওড়া",
    tier: 1,
    status: "live",
    district: "Howrah",
    heroImage: imagery.heroImage,
    priceBand: "₹45 Lakh – ₹2.5 Cr",
    blurbEn: "The twin city connecting heritage with rapid infrastructure growth across the Hooghly.",
    blurbBn: "গঙ্গার ওপারে ঐতিহ্য ও আধুনিক পরিকাঠামোর এক মেলবন্ধন।",
    localities: localities.filter(l => l.slug === "shibpur" || l.citySlug === "howrah")
  },
  {
    slug: "asansol",
    nameEn: "Asansol",
    nameBn: "আসানসোল",
    tier: 2,
    status: "coming_soon",
    district: "Paschim Bardhaman",
    blurbEn: "The bustling industrial capital of West Bengal is evolving into a premium residential hub.",
    blurbBn: "পশ্চিমবঙ্গের ব্যস্ত শিল্পশহর এখন একটি প্রিমিয়াম আবাসিক কেন্দ্রে পরিণত হচ্ছে।",
    localities: []
  },
  {
    slug: "durgapur",
    nameEn: "Durgapur",
    nameBn: "দুর্গাপুর",
    tier: 2,
    status: "coming_soon",
    district: "Paschim Bardhaman",
    blurbEn: "The steel city characterized by planned townships and wide, tree-lined avenues.",
    blurbBn: "ইস্পাত নগরী যা পরিকল্পিত টাউনশিপ এবং চওড়া রাস্তার জন্য পরিচিত।",
    localities: []
  },
  {
    slug: "siliguri",
    nameEn: "Siliguri",
    nameBn: "শিলিগুড়ি",
    tier: 2,
    status: "coming_soon",
    district: "Darjeeling",
    blurbEn: "The gateway to the North-East, experiencing rapid urbanisation and luxury real estate growth.",
    blurbBn: "উত্তর-পূর্ব ভারতের প্রবেশদ্বার, যেখানে দ্রুত নগরায়ন ও প্রিমিয়াম রিয়েল এস্টেটের বিকাশ ঘটছে।",
    localities: []
  },
  {
    slug: "bardhaman",
    nameEn: "Bardhaman",
    nameBn: "বর্ধমান",
    tier: 2,
    status: "coming_soon",
    district: "Purba Bardhaman",
    blurbEn: "Rich in history and culture, now seeing a surge in organized residential developments.",
    blurbBn: "ইতিহাস ও সংস্কৃতিতে সমৃদ্ধ এই শহর এখন নতুন আবাসিক প্রকল্পের কেন্দ্র হয়ে উঠছে।",
    localities: []
  },
  {
    slug: "malda",
    nameEn: "Malda",
    nameBn: "মালদহ",
    tier: 2,
    status: "coming_soon",
    district: "Malda",
    blurbEn: "The mango city is expanding with new lifestyle residential options.",
    blurbBn: "আমের শহর মালদহ এখন আধুনিক জীবনযাপনের নতুন ঠিকানা।",
    localities: []
  },
  {
    slug: "baharampur",
    nameEn: "Baharampur",
    nameBn: "বহরমপুর",
    tier: 2,
    status: "coming_soon",
    district: "Murshidabad",
    blurbEn: "Historic capital of Bengal blending legacy with modern housing needs.",
    blurbBn: "বাংলার ঐতিহাসিক রাজধানী যা ঐতিহ্য ও আধুনিকতার মেলবন্ধন।",
    localities: []
  },
  {
    slug: "habra",
    nameEn: "Habra",
    nameBn: "হাবড়া",
    tier: 2,
    status: "coming_soon",
    district: "North 24 Parganas",
    blurbEn: "An important commercial hub emerging as a significant real estate destination.",
    blurbBn: "একটি গুরুত্বপূর্ণ বাণিজ্যিক কেন্দ্র যা রিয়েল এস্টেটের নতুন গন্তব্য হয়ে উঠছে।",
    localities: []
  },
  {
    slug: "kharagpur",
    nameEn: "Kharagpur",
    nameBn: "খড়গপুর",
    tier: 2,
    status: "coming_soon",
    district: "Paschim Medinipur",
    blurbEn: "Home to India's premier institutes and a growing cosmopolitan workforce.",
    blurbBn: "ভারতের সেরা শিক্ষাপ্রতিষ্ঠানের শহর, যা এক ক্রমবর্ধমান কসমোপলিটান কর্মশক্তির ঠিকানা।",
    localities: []
  },
  {
    slug: "districts-of-west-bengal",
    nameEn: "Districts of West Bengal",
    nameBn: "পশ্চিমবঙ্গের অন্যান্য জেলা",
    tier: 3,
    status: "coming_soon",
    district: "Various",
    blurbEn: "We are expanding our verified listings to every district in Bengal.",
    blurbBn: "আমরা বাংলার প্রতিটি জেলায় আমাদের যাচাই করা তালিকা সম্প্রসারণ করছি।",
    localities: []
  }
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}
