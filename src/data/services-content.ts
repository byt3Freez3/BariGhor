export interface ScannableFaq {
  q: string;
  lead: string;
  bullets: string[];
}

export interface ProcessStepItem {
  num: string;
  title: string;
  titleBn?: string;
  desc: string; // Budget: <= 25 words
}

export interface ServicePageContent {
  eyebrow: string;
  title: string;
  subhead: string; // Budget: <= 20 words
  ctaHeadline: string;
  ctaCopy: string; // Budget: <= 20 words
  processSteps: ProcessStepItem[];
  faqs: ScannableFaq[];
}

/**
 * Typed Content for Services Hub (/services)
 * Strictly adheres to word budgets:
 * - Subheads: <= 20 words, one sentence
 * - Process steps: <= 25 words
 * - FAQs: one lead sentence, then bullets; <= 60 words total
 * - CTA copy: <= 20 words
 */
export const SERVICES_HUB_CONTENT: ServicePageContent = {
  eyebrow: "Unified Vertical Capabilities",
  title: "Two Disciplines. One Accountable Standard.",
  subhead: "Explore verified civil engineering rates, turnkey interior packages, and completed homes across Bengal.", // 13 words
  ctaHeadline: "Plan your next build or interior project with us.",
  ctaCopy: "Consult directly with our senior architectural desk via WhatsApp with zero brokerage intermediaries.", // 14 words
  processSteps: [
    {
      num: "01",
      title: "Field Survey & Sanction Audit",
      titleBn: "সাইট অডিট ও স্যাংশন পরীক্ষা",
      desc: "On-ground soil bore logs, road plinth elevations, HIDCO/KMC sanction compliance, and structural load allowances.", // 15 words
    },
    {
      num: "02",
      title: "Architectural Drafting & MEP Design",
      titleBn: "আর্কিটেকচারাল নকশা ও ৩ডি ড্রাফটিং",
      desc: "Millimeter-exact isometric floorplans, concealed conduit routes, plumbing pressure simulations, and 3D joinery schedules.", // 13 words
    },
    {
      num: "03",
      title: "Execution by One Dedicated Crew",
      titleBn: "নির্দিষ্ট কারিগরদের তত্ত্বাবধানে নিখুঁত কাজ",
      desc: "In-house civil engineers and master carpenters. Zero anonymous sub-contractors. One accountable site supervisor on call daily.", // 16 words
    },
    {
      num: "04",
      title: "Snag Inspection & Handover",
      titleBn: "মাল্টি-টিয়ার পরিদর্শন ও চাবি হস্তান্তর",
      desc: "Laser plinth checks, crystalline waterproofing pressure testing, acoustic verification, and clean-room cleaning before final keys.", // 15 words
    },
  ],
  faqs: [
    {
      q: "Why hire the same company to build and furnish the home?",
      lead: "Coordinated structural blueprints prevent accidental conduit damage, rebar cuts, or miscalculated load bearing.",
      bullets: [
        "Single accountable point of contact across civil and joinery",
        "Integrated master structural and craftsmanship warranty",
        "Zero blame-shifting between separate trades",
      ],
    },
    {
      q: "Are the package prices final or indicative?",
      lead: "Online rates are indicative benchmarks based on typical floorplates.",
      bullets: [
        "Comprehensive on-site physical inspection before contract",
        "Itemized Bill of Quantities (BOQ) with fixed line-item pricing",
      ],
    },
    {
      q: "Which areas in West Bengal do you operate in?",
      lead: "Active civil and interior teams operate across primary urban corridors:",
      bullets: [
        "Kolkata, Salt Lake, and New Town (Action Areas I, II, III)",
        "Howrah (Shibpur corridor) and Siliguri (Sevoke Road)",
      ],
    },
    {
      q: "What warranties do you provide on completion?",
      lead: "Turnkey handovers include two independent bonded guarantees:",
      bullets: [
        "10-year structural guarantee and 5-year waterproofing warranty",
        "3 to 5-year interior joinery, hinges, and runner coverage",
      ],
    },
  ],
};

/**
 * Typed Content for Interiors Service (/services/interiors)
 */
export const INTERIORS_CONTENT: ServicePageContent = {
  eyebrow: "Transparent Interior Rates",
  title: "Craftsmanship Package Tiers",
  subhead: "Built with certified marine plywood, branded hardware, and non-toxic low-VOC paints.", // 11 words
  ctaHeadline: "Book an interior architectural consultation.",
  ctaCopy: "Speak directly with our senior interior architects for space planning and itemized BOQ estimates.", // 14 words
  processSteps: [
    {
      num: "01",
      title: "Physical Site Scan & Space Planning",
      desc: "Laser room surveys, cross-ventilation assessment, conduit path mapping, and 2D spatial layouts with zero wasted hallway space.", // 17 words
    },
    {
      num: "02",
      title: "Material Palette & 3D Elevations",
      desc: "Physical samples of IS-710 marine ply, 1mm laminates, natural Burma teak veneers, and realistic 3D photometric renders.", // 17 words
    },
    {
      num: "03",
      title: "Factory Modular Joinery & On-Site Civil",
      desc: "German CNC precision cabinetry cutting, Gyproc moisture-resistant false ceiling framing, and concealed Finolex electrical conduits.", // 15 words
    },
    {
      num: "04",
      title: "Snag Inspection & Warranty Sign-Off",
      desc: "Multi-point soft-close hinge alignment, drawer weight testing, paint sheen audits, and official BariGhor warranty document handover.", // 16 words
    },
  ],
  faqs: [
    {
      q: "What plywood grade do you use in kitchens and bathrooms?",
      lead: "We strictly specify IS-710 Marine Grade plywood (710 BWP) for all wet areas.",
      bullets: [
        "Pressure-treated with anti-termite and anti-fungal compounds",
        "Resists continuous boiling water and high humidity exposure",
      ],
    },
    {
      q: "How long does a full 3 BHK interior fit-out take?",
      lead: "A standard 3 BHK execution takes 45 to 65 working days from 3D sign-off.",
      bullets: [
        "Pre-fabricated modular cabinetry assembled under controlled factory tolerances",
        "Clean on-site installation minimizing residential dust and noise",
      ],
    },
    {
      q: "Can I customize the packages or choose specific add-ons?",
      lead: "Every package serves as a transparent baseline tailored to your preferences.",
      bullets: [
        "Select add-ons like false ceiling coves, walk-in closets, or quartz islands",
        "Adjust finishes without paying arbitrary package markups",
      ],
    },
    {
      q: "Is the quotation fixed or indicative?",
      lead: "Online figures are indicative starting benchmarks for standard room dimensions.",
      bullets: [
        "Free physical site visit by a senior interior architect",
        "Full line-by-line itemized BOQ quote before any financial commitment",
      ],
    },
  ],
};

/**
 * Typed Content for Construction Service (/services/construction)
 */
export const CONSTRUCTION_CONTENT: ServicePageContent = {
  eyebrow: "Transparent Engineering Rates",
  title: "Turnkey Construction Packages",
  subhead: "Engineered with Fe500D structural steel, high-grade concrete, and certified waterproofing.", // 10 words
  ctaHeadline: "Engineer your home with complete structural certainty.",
  ctaCopy: "Direct architectural advisory on soil analysis, sanctioned municipal drawings, and foundation engineering.", // 13 words
  processSteps: [
    {
      num: "01",
      title: "Soil Test & Sanction Feasibility",
      desc: "Geotechnical soil bore logging to establish bearing capacity and exact pile depths for Bengal alluvial strata.", // 16 words
    },
    {
      num: "02",
      title: "Sanctioned Blueprints & Structural Modeling",
      desc: "Architectural floorplans with HIDCO/NKDA/KMC sanction drawings, 3D structural wireframes, and licensed engineer vetting.", // 13 words
    },
    {
      num: "03",
      title: "Deep Piles & Elevated Plinth Substructure",
      desc: "Bored cast-in-situ RCC piles with damp-proof plinth beams tied 30 inches above road crown to prevent monsoon waterlogging.", // 19 words
    },
    {
      num: "04",
      title: "Superstructure Frame & Masonry",
      desc: "M25/M30 concrete frame with Tata Tiscon Fe500D steel, precision autoclaved aerated blocks, and crystalline waterproofing.", // 15 words
    },
    {
      num: "05",
      title: "MEP Roughing & Occupancy Handover",
      desc: "Concealed Finolex wiring, Astral CPVC plumbing pressure-tested at 10 bar, perimeter boundary wall, and municipal occupancy sign-off.", // 16 words
    },
  ],
  faqs: [
    {
      q: "Do you assist with HIDCO, NKDA, or KMC municipal sanction approvals?",
      lead: "Our in-house architecture desk manages the entire municipal sanction workflow:",
      bullets: [
        "Architectural drafting and Floor Area Ratio (FAR) optimization",
        "Setback validation and formal portal submission to NKDA / KMC",
        "Issuance of sanctioned building permit and commencement certificate",
      ],
    },
    {
      q: "How do you protect ground-up homes against Kolkata monsoon waterlogging?",
      lead: "Every design enforces our mandatory plinth elevation safety protocol:",
      bullets: [
        "Finished plinth level elevated minimum 2.5 to 3.0 feet above central road crown",
        "Dual-chamber sump pits with automatic submersible evacuation pumps",
      ],
    },
    {
      q: "What foundation design is used for plots in New Town Action Area II and III?",
      lead: "Alluvial deltaic clay requires deep foundations to eliminate differential settlement:",
      bullets: [
        "Bored cast-in-situ RCC piles anchored into dense sand strata (12–18m)",
        "Zero reliance on unsafe shallow strip footings for multi-story loads",
      ],
    },
    {
      q: "What is your structural warranty?",
      lead: "All turnkey residential builds carry bonded long-term protection guarantees:",
      bullets: [
        "10-year bonded structural guarantee with annual engineering inspections",
        "5-year multi-layer crystalline waterproofing warranty on roof deck and sunken slabs",
      ],
    },
  ],
};
