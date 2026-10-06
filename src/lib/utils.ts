import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(lakhs: number): string {
  if (lakhs >= 100) {
    const cr = (lakhs / 100).toFixed(2).replace(/\.00$/, "");
    return `₹${cr} Cr`;
  }
  return `₹${lakhs} Lakh`;
}
