import { createFileRoute, redirect } from "@tanstack/react-router";
import { getLocalityBySlug } from "@/lib/data";

export const Route = createFileRoute("/localities/$slug")({
  beforeLoad: ({ params }) => {
    const loc = getLocalityBySlug(params.slug);
    const citySlug = loc?.citySlug || (params.slug === "new-town" ? "new-town" : "kolkata");
    throw redirect({
      to: "/$citySlug/localities/$localitySlug",
      params: { citySlug, localitySlug: params.slug },
      statusCode: 301,
    });
  },
  component: () => null,
});
