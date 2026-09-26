import heroImage from "@/assets/barighor-hero.jpg";
import newTownImage from "@/assets/new-town.jpg";
import saltLakeImage from "@/assets/salt-lake.jpg";
import aliporeImage from "@/assets/alipore-home.jpg";

export const imagery = { heroImage, newTownImage, saltLakeImage, aliporeImage };

export const localities = [
  { name: "New Town", bengali: "নিউ টাউন", note: "Skyline living, planned around open green corridors.", price: "₹7,800–12,400 / sq ft", image: newTownImage },
  { name: "Salt Lake", bengali: "সল্ট লেক", note: "Leafy blocks, lived-in calm, and effortless city access.", price: "₹9,500–15,200 / sq ft", image: saltLakeImage },
  { name: "Alipore", bengali: "আলিপুর", note: "Old-world addresses with a quietly contemporary rhythm.", price: "₹18,000–31,000 / sq ft", image: aliporeImage },
];

export const featured = {
  slug: "verandah-residences-new-town",
  title: "The Verandah Residences",
  location: "Action Area II, New Town",
  price: "₹1.42 Cr onwards",
  configuration: "3 BHK · 1,840 sq ft",
  status: "Possession Dec 2027",
  wbhira: "WBRERA/P/NOR/2024/001234",
  developer: "Eastern Habitat",
  tenure: "Freehold",
  approval: "HIDCO",
  metro: "2.1 km from Eco Park Metro",
  floodRisk: "Low",
  image: heroImage,
};
