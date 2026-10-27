/**
 * Seed Placeholder Registry
 *
 * Tracks all placeholder entries added to fill visual layout grids.
 * The client must audit and supply real-world verified data, photography,
 * WBRERA registration numbers, and editorial copy before final production sign-off.
 */

export interface PlaceholderItem {
  id: string;
  type: "property" | "locality";
  titleOrName: string;
  slug: string;
  city: string;
  status: "placeholder_pending_client_audit";
  requiredClientInputs: string[];
  notes: string;
}

export const SEED_PLACEHOLDERS: PlaceholderItem[] = [
  {
    id: "prop-18",
    type: "property",
    titleOrName: "Ballygunge Circular Court",
    slug: "ballygunge-circular-court",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "Official sanctioned project name & marketing title",
      "Valid WBRERA project registration number (currently WBRERA/PLACEHOLDER/PENDING-AUDIT)",
      "Accurate verified pricing (₹ Lakhs) and ₹/sq ft transaction basis",
      "Actual carpet area and built-up area schedule",
      "Architectural photography (exterior, lobby, unit interiors)",
      "Developer entity name and DRO deed title lineage",
      "Floor plan SVG / architectural line drawing",
    ],
    notes:
      "Added to expand Curated Kolkata Residences grid from 4 to 6 cards. Tagged with verified: false (Audit Pending).",
  },
  {
    id: "prop-19",
    type: "property",
    titleOrName: "Tollygunge Greens Enclave",
    slug: "tollygunge-greens-enclave",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "Official sanctioned project name & marketing title",
      "Valid WBRERA project registration number (currently WBRERA/PLACEHOLDER/PENDING-AUDIT)",
      "Accurate verified pricing (₹ Lakhs) and ₹/sq ft transaction basis",
      "Actual carpet area and built-up area schedule",
      "Architectural photography (exterior, golf vista, unit interiors)",
      "Developer entity name and title lineage",
      "Floor plan SVG / architectural line drawing",
    ],
    notes:
      "Added to expand Curated Kolkata Residences grid from 4 to 6 cards. Tagged with verified: false (Audit Pending).",
  },
  {
    id: "prop-20",
    type: "property",
    titleOrName: "Rajarhat Orchid Heights",
    slug: "rajarhat-orchid-heights",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "Official sanctioned project name & marketing title",
      "Valid WBRERA project registration number (currently WBRERA/PLACEHOLDER/PENDING-AUDIT)",
      "Accurate verified pricing (₹ Lakhs) and ₹/sq ft transaction basis",
      "Actual carpet area and built-up area schedule",
      "Architectural photography (exterior, retail frontage, unit interiors)",
      "Developer entity name and title lineage",
      "Floor plan SVG / architectural line drawing",
    ],
    notes:
      "Added to ensure Curated Kolkata Residences maintains 6 active non-sold cards when hideSold filter is active. Tagged with verified: false (Audit Pending).",
  },
  {
    id: "loc-ballygunge",
    type: "locality",
    titleOrName: "Ballygunge",
    slug: "ballygunge",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "High-resolution locality hero photo (Ballygunge Circular Road / Queen's Park)",
      "Client-confirmed avg ₹/sq ft range and circle rate reference",
      "Verified YoY capital growth percentage",
      "Specific paras/blocks to spotlight (e.g. Dover Park, Sunny Park, Broad Street)",
    ],
    notes: "Added to expand Kolkata Localities & Paras dossier grid from 2 to 6 cards.",
  },
  {
    id: "loc-tollygunge",
    type: "locality",
    titleOrName: "Tollygunge",
    slug: "tollygunge",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "High-resolution locality hero photo (Golf Club Road / Royal Calcutta Golf Club fringes)",
      "Client-confirmed avg ₹/sq ft range and circle rate reference",
      "Verified YoY capital growth percentage",
      "Specific paras/blocks to spotlight (e.g. Golf Green, Prince Anwar Shah Road, Moore Avenue)",
    ],
    notes: "Added to expand Kolkata Localities & Paras dossier grid from 2 to 6 cards.",
  },
  {
    id: "loc-rajarhat",
    type: "locality",
    titleOrName: "Rajarhat",
    slug: "rajarhat",
    city: "Kolkata",
    status: "placeholder_pending_client_audit",
    requiredClientInputs: [
      "High-resolution locality hero photo (Chinar Park / Rajarhat Chowmatha corridor)",
      "Client-confirmed avg ₹/sq ft range and circle rate reference",
      "Verified YoY capital growth percentage",
      "Specific paras/pockets to spotlight (e.g. Chinar Park, Kalipark, Dashadrone)",
    ],
    notes: "Added to expand Kolkata Localities & Paras dossier grid from 2 to 6 cards.",
  },
];
