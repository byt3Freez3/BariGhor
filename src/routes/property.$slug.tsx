import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPropertyBySlug } from "@/lib/data";

export const Route = createFileRoute("/property/$slug")({
  beforeLoad: ({ params }) => {
    const slug =
      params.slug === "verandah-residences-new-town" ? "the-verandah-residences" : params.slug;
    const prop = getPropertyBySlug(slug);
    const citySlug = prop?.citySlug || "kolkata";
    throw redirect({
      to: "/$citySlug/properties/$propertySlug",
      params: { citySlug, propertySlug: slug },
      statusCode: 301,
    });
  },
  component: () => null,
});
