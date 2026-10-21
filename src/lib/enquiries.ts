/**
 * Client-safe enquiry submission and anonymous query telemetry.
 * All submissions gracefully fall back if offline or private browsing is active.
 */

export interface EnquiryPayload {
  propertyId: string;
  propertyTitle: string;
  propertyPrice?: string;
  serviceType?: "interiors" | "construction";
  selectedTier?: {
    id: string;
    nameEn: string;
    ratePerSqft: number;
  };
  selectedAddOns?: Array<{
    id: string;
    title: string;
    indicativePrice: number;
    priceUnit: string;
  }>;
  indicativeEstimatedCost?: number;
  enquiryType: "full_selection" | "property_only" | "search_log";
  searchTerm?: string;
  resultCount?: number;
  timestamp?: number;
}

export async function postEnquiry(payload: EnquiryPayload): Promise<boolean> {
  const data = {
    ...payload,
    timestamp: payload.timestamp || Date.now(),
  };

  // Local backup in case of offline/network issues
  try {
    const raw = localStorage.getItem("barighor_enquiry_log");
    const existing: EnquiryPayload[] = raw ? JSON.parse(raw) : [];
    existing.unshift(data);
    localStorage.setItem("barighor_enquiry_log", JSON.stringify(existing.slice(0, 30)));
  } catch {
    // Ignore private browsing storage restrictions
  }

  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    // Network failure is non-blocking for the user
    return false;
  }
}

export async function logSearchQuery(term: string, resultCount: number): Promise<void> {
  if (!term.trim()) return;
  // Anonymized: term and resultCount only, zero PII, zero cookies, zero IP tracking
  await postEnquiry({
    propertyId: "search-telemetry",
    propertyTitle: "Search Query",
    enquiryType: "search_log",
    searchTerm: term.trim().toLowerCase(),
    resultCount,
  });
}
