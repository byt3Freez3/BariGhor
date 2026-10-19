import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPropertyBySlug } from "@/lib/data";

export const Route = createFileRoute("/properties/$slug")({
  beforeLoad: ({ params }) => {
    const prop = getPropertyBySlug(params.slug);
    const citySlug = prop?.citySlug || "kolkata";
    throw redirect({
      to: "/$citySlug/properties/$propertySlug",
      params: { citySlug, propertySlug: params.slug },
      statusCode: 301,
    });
  },
  component: () => null,
});
